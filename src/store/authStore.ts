import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import apiClient from "../services/api";
import { API_BASE_URL } from "../config/constants";
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  ConfirmEmailRequest,
  AuthRes,
  User,
} from "./types/apiTypes";
import { CookieStorage } from "./cookie/cookieStorage";

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  token?: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<ApiResponse<AuthRes>>;
  confirmEmail: (payload: ConfirmEmailRequest) => Promise<ApiResponse<AuthRes>>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, new_password: string) => Promise<any>;
  currentUser: () => Promise<User | null>;
  logout: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(set => ({
  user: null,
  isLoggedIn: false,
  // initialize token from cookie so refreshes/refreshing pages keep auth
  token: CookieStorage.getItem("auth_token"),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const loginData: LoginRequest = { email, password };
      const response: AxiosResponse<ApiResponse<AuthRes>> =
        await apiClient.post(`${API_BASE_URL}/api/v1/auth/sign-in`, loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      //@ts-ignore
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        const token = (apiResponse.payload as any).access_token;
        set({
          isLoggedIn: true,
          isLoading: false,
          token,
        });
        //@ts-ignore store token in cookie for persistence
        CookieStorage.setItem("auth_token", token);
        if (import.meta.env.DEV) {
          try {
            const masked =
              typeof token === "string"
                ? `${token.slice(0, 6)}...${token.slice(-4)}`
                : String(token);
            // eslint-disable-next-line no-console
            console.debug(`[authStore] login token set: ${masked}`);
          } catch (e) {}
        }
      } else {
        set({
          error: apiResponse.message || "Login failed",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
        isLoading: false,
      });
    }
  },

  register: async (payload: RegisterRequest): Promise<ApiResponse<AuthRes>> => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse<ApiResponse<AuthRes>> = await axios.post(
        `${API_BASE_URL}/api/v1/auth/sign-up`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //@ts-ignore
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        // After sign-up we should NOT mark the user as fully authenticated yet
        // because they still need to verify their email. Keep them signed out
        // so public-only routes (like /verify-email) are reachable.
        set({
          //@ts-ignore
          user: apiResponse.payload,
          isLoggedIn: false,
          isLoading: false,
        });
      } else {
        set({
          error: apiResponse.message || "Registration failed",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      console.error("Registration error:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
        isLoading: false,
      });
      throw error;
    }
  },

  confirmEmail: async (
    payload: ConfirmEmailRequest
  ): Promise<ApiResponse<AuthRes>> => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse<ApiResponse<AuthRes>> = await axios.post(
        `${API_BASE_URL}/api/v1/auth/confirm-email`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //@ts-ignore
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        // If the backend returned an access token on confirmation, save it and
        // mark the user as logged in. This performs the 'auto-login after
        // email confirmation' flow while keeping initial registration
        // unauthenticated.
        const payloadData: any = apiResponse.payload || {};
        const token = payloadData?.access_token || payloadData?.token || null;

        set({
          //@ts-ignore
          user: apiResponse.payload,
          isLoggedIn: !!token,
          isLoading: false,
          token: token,
        });

        if (token) {
          // persist token in cookie for session persistence
          CookieStorage.setItem("auth_token", token);
          if (import.meta.env.DEV) {
            try {
              const masked =
                typeof token === "string"
                  ? `${token.slice(0, 6)}...${token.slice(-4)}`
                  : String(token);
              // eslint-disable-next-line no-console
              console.debug(`[authStore] confirmEmail token set: ${masked}`);
            } catch (e) {}
          }
        }
      } else {
        set({
          error: apiResponse.message || "Email confirmation failed",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      console.error("Email confirmation error:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during email confirmation",
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse<ApiResponse<void>> = await axios.post(
        `${API_BASE_URL}/api/v1/auth/request-password-reset`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //@ts-ignore
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        set({ isLoading: false });
      } else {
        set({
          error: apiResponse.message || "Forgot password failed",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      console.error("Forgot password error:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during forgot password",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token: string, new_password: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse<ApiResponse<void>> = await axios.post(
        `${API_BASE_URL}/api/v1/auth/reset-password`,
        { token, new_password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //@ts-ignore
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        set({ isLoading: false });
      } else {
        set({
          error: apiResponse.message || "Reset password failed",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during reset password",
        isLoading: false,
      });
    }
  },

  currentUser: async (): Promise<User | null> => {
    try {
      // Use apiClient so the interceptor sets the Authorization header
      const response: AxiosResponse<any> = await apiClient.get(
        `/api/v1/auth/current-user`
      );
      //@ts-ignore
      const apiResponse = response.data;
      if (apiResponse.status == "success") {
        set({ user: apiResponse.payload, isLoggedIn: true });
      }
      return apiResponse.payload;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  },

  logout: () => {
    set({ user: null, isLoggedIn: false, token: null });
    CookieStorage.removeItem("auth_token");
  },

  clearError: () => set({ error: null }),
}));
