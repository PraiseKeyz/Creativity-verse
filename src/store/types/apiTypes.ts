/**
 * API response types for the application
 */

// Standard API response wrapper
export interface ApiResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  payload: T; // Only payload is used in the backend response
}

// User interface based on API response
export interface AuthRes {
  _id: number;
  token?: string;
}

export interface User {
  info: {
    portfolio: {
      default: any[];
      projects: any[];
    };
    bio: string;
    avatar: string;
    background_cover: string;
    links: any[];
    talented: boolean;
    tags: any[];
    preferred_currency: string;
    is_premium: boolean;
  };
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  email: string;
  agree_terms: boolean;
  agree_terms_date: string;
  role: string;
  is_verified: boolean;
  savedPosts: any[];
  following: any[];
  followers: any[];
  referrals: any[];
  referralPoints: number;
  badges: any[];
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  __v: number;
  full_name: string;
  id: string;
}

// Auth related interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  agree_terms: boolean;
  referralCode?: string;
  confirm_password?: string;
}

export interface AuthResponse {
  user: AuthRes;
  token: string;
}

export interface ConfirmEmailRequest {
  verificationCode: string;
}
