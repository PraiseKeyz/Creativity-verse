import { create } from "zustand";
import apiClient, { ApiResponse } from "../services/api";

// Basic chat types
export type ChatMessage = {
  _id?: string;
  id?: string;
  senderId: string;
  receiverId?: string; // may be absent for group/conversation messages
  conversationId?: string;
  content: string;
  attachments?: any[];
  createdAt: string;
  read?: boolean;
};

export type Conversation = {
  _id?: string;
  id?: string;
  participants: string[]; // user ids
  lastMessage?: ChatMessage;
  updatedAt?: string;
};

type ChatState = {
  conversations: Conversation[];
  messagesByConversation: Record<string, ChatMessage[]>;
  isLoading: boolean;
  error: string | null;

  fetchConversations: () => Promise<
    ApiResponse<{ conversations: Conversation[] }>
  >;
  fetchConversationMessages: (
    conversationId: string
  ) => Promise<ApiResponse<{ messages: ChatMessage[] }>>;
  fetchMessagesWithUser: (
    receiverId: string
  ) => Promise<ApiResponse<{ messages: ChatMessage[] }>>;
  sendMessageToUser: (
    receiverId: string,
    payload: any
  ) => Promise<ApiResponse<any>>;
  sendMessageToConversation: (
    conversationId: string,
    payload: any
  ) => Promise<ApiResponse<any>>;

  clearError: () => void;
};

export const useChatStore = create<ChatState>()(set => ({
  conversations: [],
  messagesByConversation: {},
  isLoading: false,
  error: null,

  fetchConversations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<
        ApiResponse<{ conversations: Conversation[] }>
      >(`/api/v1/chat/conversations`);
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        set({
          conversations: apiResponse.payload.conversations || [],
          isLoading: false,
        });
      } else {
        set({
          error: apiResponse.message || "Failed to fetch conversations",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching conversations";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchConversationMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<
        ApiResponse<{ messages: ChatMessage[] }>
      >(`/api/v1/chat/conversations/${conversationId}/messages`);
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        const msgs = apiResponse.payload.messages.map(m => ({
          ...m,
          id: (m as any)._id || (m as any).id,
        }));
        set(state => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: msgs,
          },
          isLoading: false,
        }));
      } else {
        set({
          error: apiResponse.message || "Failed to fetch messages",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching messages";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchMessagesWithUser: async (receiverId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<
        ApiResponse<{ messages: ChatMessage[] }>
      >(`/api/v1/chat/messages/${receiverId}`);
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        const key = `user_${receiverId}`;
        const msgs = apiResponse.payload.messages.map(m => ({
          ...m,
          id: (m as any)._id || (m as any).id,
        }));
        set(state => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [key]: msgs,
          },
          isLoading: false,
        }));
      } else {
        set({
          error: apiResponse.message || "Failed to fetch messages",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching messages";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  sendMessageToUser: async (receiverId: string, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<ApiResponse<any>>(
        `/api/v1/chat/messages/${receiverId}`,
        payload
      );
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        // push to messagesByConversation under user_{receiverId}
        const key = `user_${receiverId}`;
        const msg: ChatMessage =
          (apiResponse.payload as any)?.message || payload;
        msg.id =
          (msg as any)._id || (msg as any).id || new Date().toISOString();
        set(state => {
          const existing = state.messagesByConversation[key] || [];
          return {
            messagesByConversation: {
              ...state.messagesByConversation,
              [key]: [...existing, msg],
            },
            isLoading: false,
          };
        });
      } else {
        set({
          error: apiResponse.message || "Failed to send message",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while sending message";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  sendMessageToConversation: async (conversationId: string, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<ApiResponse<any>>(
        `/api/v1/chat/conversations/${conversationId}/messages`,
        payload
      );
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        const msg: ChatMessage =
          (apiResponse.payload as any)?.message || payload;
        msg.id =
          (msg as any)._id || (msg as any).id || new Date().toISOString();
        set(state => {
          const existing = state.messagesByConversation[conversationId] || [];
          return {
            messagesByConversation: {
              ...state.messagesByConversation,
              [conversationId]: [...existing, msg],
            },
            isLoading: false,
          };
        });
      } else {
        set({
          error: apiResponse.message || "Failed to send message",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while sending message";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useChatStore;
