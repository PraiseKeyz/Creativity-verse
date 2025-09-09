import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/constants';
import { useAuthStore } from '../store/authStore';

// Create a custom Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
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
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  payload: T; // Only payload is used in the backend response
  errors?: Record<string, string[]>;
}

// Export the API client
export default apiClient;