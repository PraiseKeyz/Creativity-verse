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
