import { create } from "zustand";
import { AxiosResponse } from "axios";
import apiClient from "../services/api";
import { useAuthStore } from "./authStore";
import { CookieStorage } from "./cookie/cookieStorage";

// Types
export interface BlogUser {
  _id: string;
  first_name: string;
  last_name: string;
  info: {
    avatar: string;
  };
  badges: [string];
}

export interface Blog {
  _id: string;
  user: BlogUser | null;
  content: string;
  type: string;
  category: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  id: string;
  blogId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface SocialState {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  // caching
  lastFetched?: number | null;

  fetchBlogs: () => Promise<void>;
  postBlog: (title: string, content: string) => Promise<void>;
  likeBlog: (blogId: string) => Promise<void>;
  commentBlog: (blogId: string, content: string) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  createPost: (payload: {
    content: string;
    type?: string;
    category?: string;
    attachments?: any[];
  }) => Promise<void>;
}

export const useSocialStore = create<SocialState>(set => ({
  blogs: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchBlogs: async () => {
    const FEED_CACHE_TTL = 1000 * 60 * 2; // 2 minutes
    const state = useSocialStore.getState();
    // Serve from cache if fresh
    if (
      state.blogs &&
      state.blogs.length > 0 &&
      state.lastFetched &&
      Date.now() - state.lastFetched < FEED_CACHE_TTL
    ) {
      // no-op, cached data is already in store
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse<any> = await apiClient.get(
        "/api/v1/feed/posts"
      );
      // Extract posts from payload
      //@ts-ignore
      const posts = response.data?.payload?.posts || [];
      set({ blogs: posts, isLoading: false, lastFetched: Date.now() });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch blogs",
        isLoading: false,
      });
    }
  },

  postBlog: async (title, content) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post("/api/v1/blogs", { title, content });
      await useSocialStore.getState().fetchBlogs();
    } catch (error: any) {
      set({ error: error.message || "Failed to post blog", isLoading: false });
    }
  },

  // Create a feed post - maps to POST /feed/posts
  createPost: async (payload: {
    content: string;
    type?: string; // e.g. 'question' | 'post'
    category?: string;
    attachments?: any[];
  }) => {
    set({ isLoading: true, error: null });
    try {
      // Build body expected by server
      const body: any = {
        content: payload.content,
        type: payload.type || "post",
        category: payload.category || "general",
      };

      // If attachments are provided, include them. Backend may expect different handling (multipart).
      if (payload.attachments && payload.attachments.length > 0) {
        body.attachments = payload.attachments;
      }

      // Debug: check token availability before request
      try {
        const zustandToken = useAuthStore.getState().token;
        const cookieToken = CookieStorage.getItem("auth_token");
        const mask = (t: any) => {
          try {
            if (!t) return "<no-token>";
            const s = typeof t === "string" ? t : String(t);
            return `${s.slice(0, 6)}...${s.slice(-4)}`;
          } catch (e) {
            return "<masked>";
          }
        };
        // eslint-disable-next-line no-console
        console.debug(
          `[socialStore] creating post - token(zustand): ${mask(
            zustandToken
          )}, token(cookie): ${mask(cookieToken)}`
        );
      } catch (e) {
        // swallow debug errors
      }

      await apiClient.post("/api/v1/feed/posts", body);
      // Invalidate cache and refresh feed after creating a post
      set({ lastFetched: null });
      await useSocialStore.getState().fetchBlogs();
    } catch (error: any) {
      set({
        error: error.message || "Failed to create post",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  likeBlog: async blogId => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post(`/api/v1/feed/posts/${blogId}/like`);
      await useSocialStore.getState().fetchBlogs();
    } catch (error: any) {
      set({ error: error.message || "Failed to like blog", isLoading: false });
    }
  },

  commentBlog: async (blogId, content) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post(`/api/v1/feed/posts/${blogId}/comments`, {
        content,
      });
      await useSocialStore.getState().fetchBlogs();
    } catch (error: any) {
      set({ error: error.message || "Failed to comment", isLoading: false });
    }
  },

  followUser: async userId => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post(`/api/v1/users/${userId}/follow`);
    } catch (error: any) {
      set({
        error: error.message || "Failed to follow user",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  unfollowUser: async userId => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post(`/api/v1/users/${userId}/unfollow`);
    } catch (error: any) {
      set({
        error: error.message || "Failed to unfollow user",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
