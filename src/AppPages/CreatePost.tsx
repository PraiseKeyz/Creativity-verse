// src/components/CreatePost.tsx
import React, { useRef, useState } from "react";
import { useSocialStore } from "../store/socialStore";
import { useUserStore } from "../store/userStore";
import {
  FaTimes,
  FaUserFriends,
  FaImage,
  FaMapMarkerAlt,
  FaRegBookmark,
} from "react-icons/fa";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
};

type Attachment = {
  id: string;
  file?: File;
  url?: string; // data URL for preview or external URL
  type: "image" | "gif";
};

type CreatePostProps = {
  user: User;
  isVisible: boolean;
  onClose?: () => void;
  onSubmit?: (payload: {
    text: string;
    audience: "public" | "friends" | "only-me";
    attachments: Attachment[];
    location?: string;
  }) => void;
};

const CreatePost: React.FC<CreatePostProps> = ({ user, onSubmit, isVisible, onClose }) => {
  const [text, setText] = useState("");
  const [audience, setAudience] = useState<"public" | "friends" | "only-me">(
    "friends"
  );
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAudience, setShowAudience] = useState(false);
  const [location, setLocation] = useState<string | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canPost = text.trim().length > 0 || attachments.length > 0;

  // Prefer backend-provided full name and avatar from userStore; fall back to prop
  const profile = useUserStore(state => state.profile);
  const resolvedFullName =
    profile?.fullName ||
    (profile as any)?.full_name ||
    `${user.firstname} ${user.lastname}`;
  const resolvedAvatar = profile?.avatar || user.avatar || undefined;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const arr = Array.from(files).slice(0, 6 - attachments.length); // limit to 6
    const previews: Attachment[] = await Promise.all(
      arr.map(async file => {
        const isGif = file.type.includes("gif");
        const dataUrl = await fileToDataURL(file);
        return {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          url: dataUrl,
          type: isGif ? "gif" : "image",
        } as Attachment;
      })
    );
    setAttachments(prev => [...prev, ...previews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileToDataURL = (file: File) =>
    new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(String(reader.result));
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!canPost) return;
    const payload = {
      text: text.trim(),
      audience,
      attachments,
      location,
    };
    if (onSubmit) onSubmit(payload);
    else {
      // Use social store createPost
      const createPost = useSocialStore.getState().createPost;
      // Map local payload to API payload
      const apiPayload = {
        content: text.trim(),
        type: "question", // default to question per user's example; could be dynamic
        category: "tech",
        attachments: attachments.map(a => ({ url: a.url, type: a.type })),
      };
      createPost(apiPayload).catch((err: unknown) => {
        console.error("Failed to create feed post:", err);
      });
    }

    // reset
    setText("");
    setAttachments([]);
    setLocation(undefined);
    setAudience("friends");
    setShowAudience(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/80 z-50 ${isVisible ? "block" : "hidden"} flex items-center justify-center p-4`}
      onClick={() => {
        // close when clicking outside the modal
        if (isVisible) onClose?.();
      }}
    >
      <div
        className="w-full max-w-3xl mx-auto bg-[#232323] border border-gray-700 rounded-xl shadow-lg p-4 text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold">Create post</h3>
          <button
            className="p-1 rounded-full hover:bg-white/5"
            aria-label="Close create post"
            onClick={() => onClose?.()}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* user row */}
          <div className="flex items-start gap-3">
            <img
              src={resolvedAvatar}
              alt={resolvedFullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-800"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold">{resolvedFullName}</div>
                  <button
                    type="button"
                    className="mt-1 text-xs text-gray-300 inline-flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded-md"
                    onClick={() => setShowAudience(s => !s)}
                    aria-expanded={showAudience}
                  >
                    <FaUserFriends />{" "}
                    <span className="capitalize">
                      {audience === "public"
                        ? "Public"
                        : audience === "friends"
                        ? "Friends"
                        : "Only me"}
                    </span>
                  </button>

                  {/* audience dropdown */}
                  {showAudience && (
                    <div className="mt-2 bg-[#1a1a1a] border border-gray-700 rounded-md p-2 w-44 shadow-lg absolute z-30">
                      {(["public", "friends", "only-me"] as const).map(opt => (
                        <button
                          key={opt}
                          className={`w-full text-left px-2 py-1 rounded ${
                            audience === opt
                              ? "bg-[var(--color-brand-orange)] text-black"
                              : "hover:bg-white/5"
                          }`}
                          onClick={() => {
                            setAudience(opt);
                            setShowAudience(false);
                          }}
                        >
                          {opt === "public"
                            ? "Public"
                            : opt === "friends"
                            ? "Friends"
                            : "Only me"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* textarea */}
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={`What's on your mind, ${user.firstname}?`}
                rows={4}
                className="mt-3 w-full resize-none bg-transparent border border-dashed border-gray-700 rounded-md px-4 py-3 placeholder-gray-400 outline-none focus:border-[var(--color-brand-orange)]"
              />

              {/* previews */}
              {attachments.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {attachments.map(a => (
                    <div
                      key={a.id}
                      className="relative rounded-md overflow-hidden bg-[#111]"
                    >
                      <img
                        src={a.url}
                        alt="attachment preview"
                        className="w-full h-28 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttachment(a.id)}
                        className="absolute top-1 right-1 bg-white/10 p-1 rounded-full hover:bg-white/20"
                        aria-label="Remove attachment"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* actions row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* hidden file input */}
              <input
                ref={fileInputRef as any}
                type="file"
                multiple
                accept="image/*,image/gif"
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />

              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-700 hover:border-[var(--color-brand-orange)]"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaImage />{" "}
                <span className="hidden md:inline text-sm">Photo</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!canPost}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  canPost
                    ? "bg-[var(--color-brand-orange)] text-black"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default CreatePost;
