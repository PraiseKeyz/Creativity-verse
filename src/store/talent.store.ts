import { create } from "zustand";
import apiClient, { ApiResponse } from "../services/api";

type Plan = "free" | "rise" | "plus" | "elite";

export type Talent = {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  headline?: string;
  category: string;
  skills: string[];
  projectsApproved: number;
  plan: Plan;
  location?: string;
};

type BackendUser = any;

type TalentState = {
  talents: Talent[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;

  fetchTalents: (opts?: {
    page?: number;
    limit?: number;
    search?: string;
    skills?: string[];
  }) => Promise<void>;
  clear: () => void;
  setPage: (p: number) => void;
};

const mapUserToTalent = (u: BackendUser): Talent => {
  const id = u._id || u.id || "";
  const firstname =
    u.first_name || (u.email ? String(u.email).split("@")[0] : "Unknown");
  const lastname = u.last_name || "";
  const avatar = u.info?.avatar || undefined;
  const headline = u.info?.bio || undefined;
  const skills =
    Array.isArray(u.info?.tags) && u.info.tags.length ? u.info.tags : [];
  const projectsApproved =
    typeof u.projectsApproved === "number" ? u.projectsApproved : 0;
  const plan: Plan = u.info?.is_premium ? "elite" : "free";
  const category = skills.length ? skills[0] : "General";
  const location = u.country || undefined;
  return {
    id,
    firstname,
    lastname,
    avatar,
    headline,
    category,
    skills,
    projectsApproved,
    plan,
    location,
  };
};

export const useTalentStore = create<TalentState>((set, get) => ({
  talents: [],
  total: 0,
  page: 1,
  limit: 20,
  isLoading: false,
  error: null,

  fetchTalents: async opts => {
    set({ isLoading: true, error: null });
    // remove pagination parameters — fetch all verified talents
    const params: any = {};
    if (opts?.search) params.search = opts.search;
    if (opts?.skills && opts.skills.length)
      params.skills = opts.skills.join(",");

    try {
      const res = await apiClient.get<ApiResponse<any>>(
        `/api/v1/talent/verified`,
        { params }
      );
      const apiResponse = res.data;
      if (apiResponse && apiResponse.status === "success") {
        const payload = apiResponse.payload || {};
        const users: BackendUser[] = Array.isArray(payload.talents)
          ? payload.talents
          : [];
        const mapped = users.map(mapUserToTalent);
        set({ talents: mapped, total: payload.total || 0, isLoading: false });
      } else {
        set({
          error: apiResponse?.message || "Failed to load talents",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("[talent.store] fetchTalents error:", error);
      set({ error: error?.message || "Network error", isLoading: false });
    }
  },

  clear: () => set({ talents: [], total: 0, page: 1, limit: 20, error: null }),

  setPage: (p: number) => set({ page: p }),
}));

export default useTalentStore;
