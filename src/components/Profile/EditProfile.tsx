import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import apiClient from "../../services/api";

const EditProfile: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { profile, fetchProfile, saveProfile } = useUserStore();
  const [bio, setBio] = useState(profile?.bio || "");
  const [skills, setSkills] = useState<string[]>(
    profile?.skills || profile?.tags || []
  );
  const [skillInput, setSkillInput] = useState("");
  const [website, setWebsite] = useState(profile?.website || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    profile?.socialLinks || ({} as Record<string, string>)
  );
  const [avatar, setAvatar] = useState<string>(profile?.avatar || "");
  const [backgroundCover, setBackgroundCover] = useState<string>(
    profile?.backgroundCover || ""
  );
  const [fullName, setFullName] = useState<string>("");
  const [links, setLinks] = useState<string[]>(profile?.links || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) fetchProfile().catch(() => {});
    else {
      setAvatar(profile.avatar || "");
      setBackgroundCover(profile.backgroundCover || "");
      setFullName(profile.fullName || "");
      setLinks(profile.links || []);
    }
  }, []);

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (skills.includes(s)) return setSkillInput("");
    setSkills(prev => [...prev, s]);
    setSkillInput("");
  };

  const removeSkill = (s: string) =>
    setSkills(prev => prev.filter(x => x !== s));

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    // other fields may be required by uploader; adapt as needed
    const res = await apiClient.post("/api/v1/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.payload?.url || res.data?.payload || "";
  };

  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      setLoading(true);
      const url = await uploadImage(f);
      // backend expects info.* fields; for profilePicture and coverPhoto map to info
      if (field === "profilePicture") {
        setAvatar(url);
        setSocialLinks((prev: Record<string, string>) => ({
          ...prev,
          profilePicture: url,
        }));
      } else if (field === "coverPhoto") {
        setBackgroundCover(url);
        setSocialLinks((prev: Record<string, string>) => ({
          ...prev,
          coverPhoto: url,
        }));
      }
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload: any = {
        full_name: fullName,
        bio,
        skills,
        website,
        location,
        socialLinks,
        avatar,
        backgroundCover,
        links,
      };
      await saveProfile(payload);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}

        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          Skills
        </label>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 p-2 border rounded"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
          />
          <button
            className="px-3 bg-[var(--color-brand-orange)] text-white rounded"
            onClick={addSkill}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map(s => (
            <span
              key={s}
              className="px-2 py-1 bg-gray-200 rounded flex items-center gap-2"
            >
              {s}{" "}
              <button onClick={() => removeSkill(s)} className="text-xs">
                x
              </button>
            </span>
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={website}
          onChange={e => setWebsite(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={e => onFileChange(e, "profilePicture")}
          className="mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          Cover Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={e => onFileChange(e, "coverPhoto")}
          className="mb-3"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[var(--color-brand-orange)] text-white rounded"
            onClick={onSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
