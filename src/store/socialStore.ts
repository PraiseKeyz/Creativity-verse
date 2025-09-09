import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../config/constants";

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

  fetchBlogs: () => Promise<void>;
  postBlog: (title: string, content: string) => Promise<void>;
  likeBlog: (blogId: string) => Promise<void>;
  commentBlog: (blogId: string, content: string) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
}

export const useSocialStore = create<SocialState>(set => ({
  blogs: [],
  isLoading: false,
  error: null,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/api/v1/feed/posts`
      );
      // Extract posts from payload
      //@ts-ignore
      const posts = response.data?.payload?.posts || [];
      set({ blogs: posts, isLoading: false });
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
      await axios.post(`${API_BASE_URL}/api/v1/blogs`, { title, content });
      await useSocialStore.getState().fetchBlogs();
    } catch (error: any) {
      set({ error: error.message || "Failed to post blog", isLoading: false });
    }
  },

  likeBlog: async blogId => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_BASE_URL}/api/v1/feed/posts/${blogId}/like`);
      await useSocialStore.getState().fetchBlogs();
    } catch (error: any) {
      set({ error: error.message || "Failed to like blog", isLoading: false });
    }
  },

  commentBlog: async (blogId, content) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_BASE_URL}/api/v1/feed/posts/${blogId}/comments`, {
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
      await axios.post(`${API_BASE_URL}/api/v1/users/${userId}/follow`);
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
      await axios.post(`${API_BASE_URL}/api/v1/users/${userId}/unfollow`);
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
