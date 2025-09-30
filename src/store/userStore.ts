import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import apiClient, { ApiResponse } from "../services/api";

// Define the user profile type
type UserProfile = {
  bio: string;
  skills: string[]; // kept for UI (mapped from tags when available)
  location: string;
  website: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  // Additional fields from backend
  avatar?: string;
  backgroundCover?: string;
  portfolio?: any;
  tags?: string[];
  preferredCurrency?: string;
  isPremium?: boolean;
  links?: string[];
  fullName?: string;
};

// Backend response types (exact shape from the server)
export type PortfolioProject = {
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  _id?: string;
  id?: string;
};

export type Portfolio = {
  default?: any[];
  projects?: PortfolioProject[];
};

export type BackendInfo = {
  portfolio?: Portfolio;
  bio?: string;
  avatar?: string; // avatar URL
  background_cover?: string; // cover image URL (note underscore)
  links?: string[]; // array of links
  talented?: boolean;
  tags?: string[]; // array of tag strings
  preferred_currency?: string;
  is_premium?: boolean;
  // other keys may exist but we intentionally model the known fields
};

export type BackendPayload = {
  full_name?: string;
  fullName?: string; // allow camelCase from backend
  country?: string;
  info?: BackendInfo;
};

export type BackendProfileResponse = {
  status: string;
  statusCode?: number;
  message?: string;
  payload?: BackendPayload;
};

// Define the user store state
type UserState = {
  profile: UserProfile | null;
  isProfileLoading: boolean;
  profileError: string | null;
  // caching
  lastFetched?: number | null;

  // Actions
  updateProfile: (profile: Partial<UserProfile>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  updateSocialLink: (
    platform: keyof UserProfile["socialLinks"],
    url: string
  ) => void;
  clearProfileError: () => void;
  // API actions
  fetchProfile: () => Promise<ApiResponse<any>>;
  saveProfile: (profileData: Partial<UserProfile>) => Promise<ApiResponse<any>>;
};

// Define persist configuration type
type UserPersist = {
  name: string;
  storage: ReturnType<typeof createJSONStorage>;
};

// Create the user store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set: any) => ({
      profile: null,
      isProfileLoading: false,
      profileError: null,
      lastFetched: null,

      // Update profile action
      updateProfile: (profileData: Partial<UserProfile>) => {
        set((state: UserState) => ({
          profile: state.profile
            ? { ...state.profile, ...profileData }
            : (profileData as UserProfile),
        }));
      },

      // Add skill action
      addSkill: (skill: string) => {
        set((state: UserState) => {
          if (!state.profile) return { profile: null } as any;

          const skills = state.profile.skills || [];
          if (skills.includes(skill)) {
            return { profileError: "Skill already exists" } as any;
          }

          return {
            profile: {
              ...state.profile,
              skills: [...skills, skill],
            },
            profileError: null,
          } as any;
        });
      },

      // Remove skill action
      removeSkill: (skill: string) => {
        set((state: UserState) => {
          if (!state.profile) return { profile: null } as any;
          return {
            profile: {
              ...state.profile,
              skills: state.profile.skills.filter(s => s !== skill),
            },
          } as any;
        });
      },

      // Update social link action
      updateSocialLink: (
        platform: keyof UserProfile["socialLinks"],
        url: string
      ) => {
        set((state: UserState) => {
          if (!state.profile) return { profile: null } as any;

          return {
            profile: {
              ...state.profile,
              socialLinks: {
                ...state.profile.socialLinks,
                [platform]: url,
              },
            },
          } as any;
        });
      },

      // Clear profile error
      clearProfileError: () => set({ profileError: null }),

      fetchProfile: async (): Promise<ApiResponse<BackendPayload>> => {
        const PROFILE_TTL = 1000 * 60 * 5; // 5 minutes
        const state: UserState = useUserStore.getState();
        if (
          state.profile &&
          state.lastFetched &&
          Date.now() - state.lastFetched < PROFILE_TTL
        ) {
          return { status: "success", payload: state.profile } as any;
        }

        set({ isProfileLoading: true, profileError: null });
        try {
          const res = await apiClient.get<ApiResponse<BackendPayload>>(
            "/api/v1/profile/get-profile"
          );
          const apiResponse = res.data as ApiResponse<BackendPayload>;
          if (apiResponse.status === "success" && apiResponse.payload) {
            const payload = apiResponse.payload as BackendPayload;
            const info = payload.info || {};

            // Map direct backend fields into our UI model without inventing keys
            const normalized: UserProfile = {
              bio: info.bio || "",
              skills: Array.isArray(info.tags) ? info.tags : [],
              location: payload.country || "",
              website:
                Array.isArray(info.links) && info.links.length > 0
                  ? info.links.find(
                      (l: string) => !/linkedin|github|instagram/i.test(l)
                    ) || ""
                  : "",
              socialLinks: {
                github: Array.isArray(info.links)
                  ? info.links.find((l: string) => /github.com/i.test(l))
                  : undefined,
                linkedin: Array.isArray(info.links)
                  ? info.links.find((l: string) => /linkedin.com/i.test(l))
                  : undefined,
                instagram: Array.isArray(info.links)
                  ? info.links.find((l: string) => /instagram.com/i.test(l))
                  : undefined,
              },
              avatar: info.avatar || "",
              backgroundCover: info.background_cover || "",
              portfolio: info.portfolio || { default: [], projects: [] },
              tags: Array.isArray(info.tags) ? info.tags : [],
              preferredCurrency: info.preferred_currency || "",
              isPremium: !!info.is_premium,
              links: Array.isArray(info.links) ? info.links : [],
              fullName: (payload as any).fullName || payload.full_name || "",
            };
            set({
              profile: normalized,
              isProfileLoading: false,
              lastFetched: Date.now(),
            });
            return {
              status: "success",
              payload,
            } as ApiResponse<BackendPayload>;
          } else {
            set({
              profileError: apiResponse.message || "Failed to fetch profile",
              isProfileLoading: false,
            });
            return apiResponse as ApiResponse<any>;
          }
        } catch (err: any) {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Error fetching profile";
          set({ profileError: msg, isProfileLoading: false });
          throw err;
        }
      },

      // Save profile to backend (partial updates allowed)
      saveProfile: async profileData => {
        set({ isProfileLoading: true, profileError: null });
        try {
          // Send updates to backend. Backend expects updates under `info` and top-level `full_name` is allowed.
          const payloadToSend: any = { info: {} };
          if (profileData.bio !== undefined)
            payloadToSend.info.bio = profileData.bio;
          if (profileData.skills !== undefined)
            payloadToSend.info.tags = profileData.skills;
          if (profileData.website !== undefined)
            payloadToSend.info.website = profileData.website;
          if ((profileData as any).avatar !== undefined)
            payloadToSend.info.avatar = (profileData as any).avatar;
          if ((profileData as any).backgroundCover !== undefined)
            payloadToSend.info.background_cover = (
              profileData as any
            ).backgroundCover;
          if ((profileData as any).links !== undefined)
            payloadToSend.info.links = (profileData as any).links;
          if ((profileData as any).portfolio !== undefined)
            payloadToSend.info.portfolio = (profileData as any).portfolio;
          if ((profileData as any).preferredCurrency !== undefined)
            payloadToSend.info.preferred_currency = (
              profileData as any
            ).preferredCurrency;
          if ((profileData as any).isPremium !== undefined)
            payloadToSend.info.is_premium = !!(profileData as any).isPremium;
          // Accept either UI-provided `fullName` (camelCase) or `full_name` (snake_case)
          if ((profileData as any).fullName !== undefined)
            payloadToSend.full_name = (profileData as any).fullName;
          if ((profileData as any).full_name !== undefined)
            payloadToSend.full_name = (profileData as any).full_name;

          const res = await apiClient.patch<ApiResponse<BackendPayload>>(
            "/api/v1/profile/update-profile",
            payloadToSend
          );
          const apiResponse = res.data;
          if (apiResponse.status === "success") {
            const payload = apiResponse.payload as any;
            const info = payload.info || {};
            // Normalize backend response back into UI model using exact backend keys
            const normalized: UserProfile = {
              bio: info.bio || "",
              skills: Array.isArray(info.tags) ? info.tags : [],
              location: payload.country || "",
              website:
                Array.isArray(info.links) && info.links.length > 0
                  ? info.links.find(
                      (l: string) => !/linkedin|github|instagram/i.test(l)
                    ) || ""
                  : "",
              socialLinks: {
                github: Array.isArray(info.links)
                  ? info.links.find((l: string) => /github.com/i.test(l))
                  : undefined,
                linkedin: Array.isArray(info.links)
                  ? info.links.find((l: string) => /linkedin.com/i.test(l))
                  : undefined,
                instagram: Array.isArray(info.links)
                  ? info.links.find((l: string) => /instagram.com/i.test(l))
                  : undefined,
              },
              avatar: info.avatar || "",
              backgroundCover: info.background_cover || "",
              portfolio: info.portfolio || { default: [], projects: [] },
              tags: Array.isArray(info.tags) ? info.tags : [],
              preferredCurrency: info.preferred_currency || "",
              isPremium: !!info.is_premium,
              links: Array.isArray(info.links) ? info.links : [],
              fullName: (payload as any).fullName || payload.full_name || "",
            };
            set({
              profile: normalized,
              isProfileLoading: false,
              lastFetched: Date.now(),
            });
          } else {
            set({
              profileError: apiResponse.message || "Failed to update profile",
              isProfileLoading: false,
            });
          }
          return apiResponse;
        } catch (err: any) {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Error saving profile";
          set({ profileError: msg, isProfileLoading: false });
          throw err;
        }
      },
    }),
    {
      name: "user-profile-storage", // name of the item in the storage
      storage: createJSONStorage(() => localStorage), // use localStorage
      onRehydrateStorage: () => persistedState => {
        try {
          if (!persistedState) return;
          const p: any = persistedState.profile;
          if (!p) return;
          if (!p.fullName && p.full_name) {
            p.fullName = p.full_name;
          }
        } catch (e) {
          // ignore
        }
      },
    } as PersistOptions<UserState, UserState>
  )
);
