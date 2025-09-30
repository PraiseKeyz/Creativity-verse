import { create } from "zustand";
import apiClient, { ApiResponse } from "../services/api";

// Job type matching backend response
export type Job = {
  _id?: string;
  id?: string; // UI components sometimes expect `id`
  title: string;
  description: string;
  company: string;
  employmentType:
    | "freelance"
    | "remote"
    | "full-time"
    | "part-time"
    | "contract"
    | string;
  skillsRequired: string[];
  skillLevel: "entry" | "intermediate" | "expert" | string;
  applicationMethod: "internal" | "external" | string;
  applicationLink?: string;
  postedBy: string;
  createdAt: string;
  __v?: number;
};

type JobsPayload = {
  jobs: Job[];
};

type JobState = {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  getJobs: () => Promise<ApiResponse<JobsPayload>>;
  getAppliedJobs: () => Promise<ApiResponse<JobsPayload>>;
  applyJob: (id: string, payload?: any) => Promise<ApiResponse<any>>;
  getJobById: (id: string) => Promise<ApiResponse<{ job: Job }>>;
  clearError: () => void;
};

export const useJobStore = create<JobState>()(set => ({
  jobs: [],
  isLoading: false,
  error: null,

  getJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      // many other stores use /api/v1 prefix (see authStore). Use that prefix
      // to match backend route structure and avoid 404s.
      const response = await apiClient.get<ApiResponse<JobsPayload>>(
        "/api/v1/job/get-jobs"
      );
      const apiResponse = response.data;

      if (apiResponse.status === "success") {
        // Normalize job id field for UI components that expect `id`
        const normalized = apiResponse.payload.jobs.map(j => ({
          ...j,
          id: (j as any)._id || (j as any).id,
        }));

        set({ jobs: normalized, isLoading: false });
      } else {
        set({
          error: apiResponse.message || "Failed to fetch jobs",
          isLoading: false,
        });
      }

      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching jobs";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  getAppliedJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<ApiResponse<JobsPayload>>(
        "/api/v1/job/get-interal-applied-jobs"
      );
      const apiResponse = response.data;

      if (apiResponse.status === "success") {
        const normalized = apiResponse.payload.jobs.map(j => ({
          ...j,
          id: (j as any)._id || (j as any).id,
        }));

        set({ jobs: normalized, isLoading: false });
      } else {
        set({
          error: apiResponse.message || "Failed to fetch applied jobs",
          isLoading: false,
        });
      }

      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching applied jobs";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  applyJob: async (id: string, payload?: any) => {
    set({ isLoading: true, error: null });
    try {
      // POST to the apply-job endpoint. Backend expects job id in the path.
      const response = await apiClient.post<ApiResponse<any>>(
        `/api/v1/job/apply-job/${id}`,
        payload || {}
      );
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        set({ isLoading: false });
      } else {
        set({
          error: apiResponse.message || "Failed to apply to job",
          isLoading: false,
        });
      }
      return apiResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while applying to job";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  getJobById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<ApiResponse<{ job: Job }>>(
        `/api/v1/job/get-job/${id}`
      );
      const apiResponse = response.data;
      if (apiResponse.status === "success") {
        // normalize id
        const j = apiResponse.payload.job;
        const normalized = { ...j, id: (j as any)._id || (j as any).id };
        set({ isLoading: false });
        return {
          status: "success" as const,
          statusCode: apiResponse.statusCode,
          message: apiResponse.message,
          payload: { job: normalized },
        };
      } else {
        set({
          error: apiResponse.message || "Failed to fetch job",
          isLoading: false,
        });
        return apiResponse as ApiResponse<{ job: Job }>;
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while fetching job";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useJobStore;
