import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/constants";
import { useAuthStore } from "../store/authStore";
import { CookieStorage } from "../store/cookie/cookieStorage";

// Create a custom Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
});

// --- Simple in-memory cache for GET requests ---
type CacheEntry = {
  expiresAt: number;
  response: any;
};

const _cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 60 * 1000; // 60 seconds

function makeCacheKey(config: AxiosRequestConfig) {
  const url = String(config.url || "");
  const params = config.params ? JSON.stringify(config.params) : "";
  // include Authorization header fingerprint to avoid leaking other users' cached data
  const auth = (config.headers && (config.headers as any)["Authorization"]) || "";
  return `${url}|params:${params}|auth:${auth}`;
}

// expose cache helpers on the client instance (typed as any)
(apiClient as any)._cache = _cache;
(apiClient as any).clearCache = () => _cache.clear();
(apiClient as any).cacheSize = () => _cache.size;
(apiClient as any).cacheDefaultTtl = DEFAULT_TTL;

// keep original request fn
const _originalRequest = apiClient.request.bind(apiClient);

// override request to support automatic GET caching
apiClient.request = async function (config: AxiosRequestConfig) {
  try {
    const method = (config.method || "get").toString().toLowerCase();

    // allow callers to opt-out of cache via header or config flag
    const noCacheHeader = config.headers && (config.headers as any)["x-cache"] === "false";
    const skipCacheFlag = (config as any).skipCache === true;

    if (method === "get" && !noCacheHeader && !skipCacheFlag) {
      const key = makeCacheKey(config);
      const entry = _cache.get(key);
      const now = Date.now();
      if (entry && entry.expiresAt > now) {
        // return a shallow clone of cached response to avoid accidental mutation
        return Promise.resolve({ ...entry.response });
      }
    }

    // perform real request
    const res = await _originalRequest(config as any);

    // cache GET responses (successful)
    if (String((config.method || "get")).toLowerCase() === "get" && res && res.status >= 200 && res.status < 300) {
      const ttl = (config as any).cacheTtlMs || DEFAULT_TTL;
      const key = makeCacheKey(config);
      _cache.set(key, { expiresAt: Date.now() + ttl, response: res });
    }

    return res;
  } catch (err) {
    // bubble up errors unchanged
    return Promise.reject(err);
  }
} as any;

// Request interceptor for API calls
apiClient.interceptors.request.use(
  config => {
    // Prefer token from in-memory auth store, but fall back to cookie storage
    // because auth flow currently persists token in cookies (CookieStorage)
    // rather than updating the zustand `token` field.
    //@ts-ignore
    let token = useAuthStore.getState().token;
    if (!token) {
      const cookieToken = CookieStorage.getItem("auth_token");
      if (cookieToken) token = cookieToken;
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;

      // Dev-only debug: log masked token source so we can troubleshoot auth issues without
      // printing the full secret. Remove/disable in production.
      if (import.meta.env.DEV) {
        try {
          const masked =
            typeof token === "string"
              ? `${token.slice(0, 6)}...${token.slice(-4)}`
              : String(token);
          const source = useAuthStore.getState().token ? "zustand" : "cookie";
          // eslint-disable-next-line no-console
          console.debug(`[api] Authorization set from ${source}: ${masked}`);
        } catch (e) {
          // swallow logging errors
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle unauthorized errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we get a 401, log the user out
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

// Generic API response type
export interface ApiResponse<T> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  payload: T; // Only payload is used in the backend response
  errors?: Record<string, string[]>;
}

// Export the API client
export default apiClient;
