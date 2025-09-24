// src/components/CreateProject.tsx
import React, { useRef, useState } from "react";
import { FaTimes, FaImage, FaLink, FaSave } from "react-icons/fa";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
};

type Attachment = {
  id: string;
  file?: File;
  url?: string; // data URL for preview
  type: "image";
};

type CreateProjectPayload = {
  title: string;
  shortDescription: string;
  description: string;
  cover?: Attachment | null;
  gallery: Attachment[];
  tags: string[];
  skills: string[];
  projectLink?: string;
  collaborators?: string[]; // simple names or user ids
  visibility: "public" | "private" | "portfolio";
  createdAt: string;
};

type CreateProjectProps = {
  user: User;
  onSubmit?: (payload: CreateProjectPayload, saveAsDraft?: boolean) => void;
};

const AddProject: React.FC<CreateProjectProps> = ({ user, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<Attachment | null>(null);
  const [gallery, setGallery] = useState<Attachment[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [collaborators, setCollaborators] = useState<string>("");
  const [visibility, setVisibility] = useState<"public" | "private" | "portfolio">("public");

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const canPublish = title.trim().length > 3 && (shortDescription.trim().length > 10 || description.trim().length > 20);

  /* Helpers */
  const fileToDataURL = (file: File) =>
    new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(String(reader.result));
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  const handleCoverFile = async (f: File | null) => {
    if (!f) return;
    const url = await fileToDataURL(f);
    setCover({
      id: `cover-${Date.now()}`,
      file: f,
      url,
      type: "image",
    });
  };

  const handleGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files).slice(0, 8 - gallery.length); // max 8 images
    const previews: Attachment[] = await Promise.all(
      arr.map(async (file) => {
        const url = await fileToDataURL(file);
        return {
          id: `g-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          file,
          url,
          type: "image",
        } as Attachment;
      })
    );
    setGallery((prev) => [...prev, ...previews]);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGallery = (id: string) => setGallery((prev) => prev.filter((g) => g.id !== id));
  const removeCover = () => setCover(null);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || tags.includes(t)) return;
    setTags((s) => [...s, t]);
    setTagInput("");
  };
  const removeTag = (t: string) => setTags((s) => s.filter((x) => x !== t));

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || skills.includes(s)) return;
    setSkills((x) => [...x, s]);
    setSkillInput("");
  };
  const removeSkill = (s: string) => setSkills((x) => x.filter((k) => k !== s));

  const handlePublish = (saveAsDraft = false) => {
    if (!saveAsDraft && !canPublish) {
      alert("Title and a short description (or long description) are required.");
      return;
    }
    const payload: CreateProjectPayload = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      cover,
      gallery,
      tags,
      skills,
      projectLink: projectLink.trim() || undefined,
      collaborators: collaborators.split(",").map((c) => c.trim()).filter(Boolean),
      visibility,
      createdAt: new Date().toISOString(),
    };
    if (onSubmit) onSubmit(payload, saveAsDraft);
    else console.log("CreateProject payload:", payload);

    if (!saveAsDraft) {
      // reset form
      setTitle("");
      setShortDescription("");
      setDescription("");
      setCover(null);
      setGallery([]);
      setTags([]);
      setSkills([]);
      setProjectLink("");
      setCollaborators("");
      setVisibility("public");
    } else {
      alert("Saved draft.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#232323] border border-gray-700 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Create Project</h2>
        <div className="text-sm text-gray-400">by {user.firstname} {user.lastname}</div>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm mb-2">Project Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Portfolio Website Redesign"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            maxLength={120}
            required
          />
        </div>

        {/* Short description */}
        <div>
          <label className="block text-sm mb-2">Short description</label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One-liner summary for listings (max 140 chars)"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            maxLength={140}
          />
        </div>

        {/* Long description */}
        <div>
          <label className="block text-sm mb-2">Full description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project, challenges, your role, tools used, and outcomes..."
            rows={6}
            className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
          />
        </div>

        {/* Cover + Gallery */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Cover Image</label>
            <div className="flex items-center gap-3">
              <input ref={coverInputRef as any} type="file" accept="image/*" className="hidden" onChange={(e) => handleCoverFile(e.target.files?.[0] || null)} />
              <button type="button" onClick={() => coverInputRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 hover:border-[var(--color-brand-orange)]">
                <FaImage /> Upload cover
              </button>
              {cover && (
                <div className="relative">
                  <img src={cover.url} alt="cover preview" className="w-36 h-20 object-cover rounded-md border border-gray-700" />
                  <button onClick={removeCover} className="absolute -top-2 -right-2 bg-black/60 p-1 rounded-full">
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">Recommended 1200×600px — JPG/PNG</p>
          </div>

          <div>
            <label className="block text-sm mb-2">Gallery (optional)</label>
            <div className="flex items-center gap-3">
              <input ref={galleryInputRef as any} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleGalleryFiles(e.target.files)} />
              <button type="button" onClick={() => galleryInputRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 hover:border-[var(--color-brand-orange)]">
                <FaImage /> Add images
              </button>
              <p className="text-xs text-gray-400">Up to 8 images</p>
            </div>

            {gallery.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {gallery.map((g) => (
                  <div key={g.id} className="relative rounded-md overflow-hidden bg-[#111]">
                    <img src={g.url} alt="gallery preview" className="w-full h-24 object-cover" />
                    <button onClick={() => removeGallery(g.id)} className="absolute top-1 right-1 bg-white/10 p-1 rounded-full">
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tags & Skills */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g. branding" className="flex-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 outline-none" />
              <button type="button" onClick={addTag} className="px-3 py-2 rounded-md bg-[var(--color-brand-orange)] text-black font-semibold">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-gray-600 px-3 py-1 rounded-full text-sm">
                  {t}
                  <button onClick={() => removeTag(t)} className="ml-1 text-red-400">✕</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Skills</label>
            <div className="flex gap-2 mb-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="e.g. Figma" className="flex-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 outline-none" />
              <button type="button" onClick={addSkill} className="px-3 py-2 rounded-md bg-[var(--color-brand-orange)] text-black font-semibold">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-gray-600 px-3 py-1 rounded-full text-sm">
                  {s}
                  <button onClick={() => removeSkill(s)} className="ml-1 text-red-400">✕</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Link, collaborators, visibility */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Project Link (optional)</label>
            <div className="flex items-center gap-2">
              <FaLink className="text-gray-400" />
              <input value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="https://yourproject.com" className="flex-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Collaborators (comma separated)</label>
            <input value={collaborators} onChange={(e) => setCollaborators(e.target.value)} placeholder="Jane Doe, john.doe" className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 outline-none" />
          </div>

          <div>
            <label className="block text-sm mb-2">Visibility</label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value as any)} className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 outline-none">
              <option value="public">Public</option>
              <option value="portfolio">Portfolio only</option>
              <option value="private">Private (only me)</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="flex gap-3">
            <button type="button" onClick={() => handlePublish(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600">
              <FaSave /> Save draft
            </button>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => handlePublish(false)} disabled={!canPublish} className={`px-5 py-2 rounded-md font-semibold ${canPublish ? "bg-[var(--color-brand-orange)] text-black" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}>
              Publish Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
