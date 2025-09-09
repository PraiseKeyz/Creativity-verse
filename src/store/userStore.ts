import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

// Define the user profile type
type UserProfile = {
  bio: string;
  skills: string[];
  location: string;
  website: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
};

// Define the user store state
type UserState = {
  profile: UserProfile | null;
  isProfileLoading: boolean;
  profileError: string | null;

  // Actions
  updateProfile: (profile: Partial<UserProfile>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  updateSocialLink: (platform: keyof UserProfile['socialLinks'], url: string) => void;
  clearProfileError: () => void;
};

// Define persist configuration type
type UserPersist = {
  name: string;
  storage: ReturnType<typeof createJSONStorage>;
};

// Create the user store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      isProfileLoading: false,
      profileError: null,

      // Update profile action
      updateProfile: (profileData) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...profileData } : profileData as UserProfile,
        }));
      },

      // Add skill action
      addSkill: (skill) => {
        set((state) => {
          if (!state.profile) return { profile: null };
          
          // Check if skill already exists
          if (state.profile.skills.includes(skill)) {
            return { profileError: 'Skill already exists' };
          }
          
          return {
            profile: {
              ...state.profile,
              skills: [...state.profile.skills, skill],
            },
            profileError: null,
          };
        });
      },

      // Remove skill action
      removeSkill: (skill) => {
        set((state) => {
          if (!state.profile) return { profile: null };
          
          return {
            profile: {
              ...state.profile,
              skills: state.profile.skills.filter((s) => s !== skill),
            },
          };
        });
      },

      // Update social link action
      updateSocialLink: (platform, url) => {
        set((state) => {
          if (!state.profile) return { profile: null };
          
          return {
            profile: {
              ...state.profile,
              socialLinks: {
                ...state.profile.socialLinks,
                [platform]: url,
              },
            },
          };
        });
      },

      // Clear profile error
      clearProfileError: () => set({ profileError: null }),
    }),
    {
      name: 'user-profile-storage', // name of the item in the storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    } as PersistOptions<UserState, UserState>
  )
);