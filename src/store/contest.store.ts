import { create } from "zustand";
import apiClient, { ApiResponse } from "../services/api";

export type Contest = {
  id: string;
  title: string;
  cover: string;
  description: string;
  prizePool: number;
  entryFee: number;
  participants: number;
  maxParticipants: number;
  deadline: string; // ISO
  status: string;
  tags: string[];
};

type ContestsPayload = {
  contests: Contest[];
};

type ContestState = {
  contests: Contest[];
  isLoading: boolean;
  error: string | null;
  getContests: (category?: string) => Promise<ApiResponse<ContestsPayload>>;
  getContestById: (id: string) => Promise<ApiResponse<{ contest: Contest }>>;
  clearError: () => void;
};

export const useContestStore = create<ContestState>()(set => ({
  contests: [],
  isLoading: false,
  error: null,

  getContests: async (category?: string) => {
    set({ isLoading: true, error: null });
    try {
      const url = category
        ? `/api/v1/contest/get?category=${encodeURIComponent(category)}`
        : "/api/v1/contest/get";

      const response = await apiClient.get<ApiResponse<ContestsPayload>>(url);
      const apiResponse = response.data;

      if (apiResponse.status === "success") {
        // normalize ids (backend already returns id, but be defensive)
        const normalizeTag = (t: any) => {
          if (!t) return "";
          // trim and title-case each word, preserve hyphens like "No-code"
          return String(t)
            .trim()
            .split(/\s+/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        };

        const normalized = apiResponse.payload.contests.map((c: any) => {
          const id = c.id || c._id || "";
          const entryFee =
            typeof c.entryFee === "number"
              ? c.entryFee
              : Number(c.entryFee) || 0;
          const rawTags: string[] = Array.isArray(c.tags)
            ? c.tags
            : c.tags
            ? [c.tags]
            : [];

          const cleaned = rawTags.map(normalizeTag).filter(Boolean);

          // add Free/Paid tag to match mock style
          if (entryFee === 0) cleaned.push("Free");
          else cleaned.push("Paid");

          const deduped = Array.from(new Set(cleaned));

          return {
            id,
            title: c.title,
            cover: c.cover || c.featuredImage || "",
            description: c.description,
            prizePool:
              typeof c.prizePool === "number"
                ? c.prizePool
                : Number(c.prize) || 0,
            entryFee,
            participants:
              typeof c.participants === "number"
                ? c.participants
                : Number(c.participants) || 0,
            maxParticipants:
              typeof c.maxParticipants === "number"
                ? c.maxParticipants
                : Number(c.maxParticipants) || 0,
            deadline: c.deadline
              ? new Date(c.deadline).toISOString()
              : c.endDate
              ? new Date(c.endDate).toISOString()
              : new Date().toISOString(),
            status: (c.status || "upcoming").toLowerCase(),
            tags: deduped,
          } as Contest;
        });

        set({ contests: normalized, isLoading: false });
      } else {
        set({
          error: apiResponse.message || "Failed to fetch contests",
          isLoading: false,
        });
      }

      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching contests";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  getContestById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<ApiResponse<{ contest: Contest }>>(
        `/api/v1/contest/get/${id}`
      );
      const apiResponse = response.data;

      if (apiResponse.status === "success") {
        const c = apiResponse.payload.contest as any;
        const normalized = { ...c, id: c.id || c._id } as Contest;
        set({ isLoading: false });
        return {
          status: "success",
          statusCode: apiResponse.statusCode,
          message: apiResponse.message,
          payload: { contest: normalized },
        } as ApiResponse<{ contest: Contest }>;
      } else {
        set({
          error: apiResponse.message || "Failed to fetch contest",
          isLoading: false,
        });
        return apiResponse as ApiResponse<{ contest: Contest }>;
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching contest";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useContestStore;
