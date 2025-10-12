import { useEffect, useState, Suspense } from "react";
import { useUserStore } from "../store/userStore";

import { FaCheckCircle } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import CommunityPost from "../components/AppComponent/CommunityPost";
import EditProfile from "../components/Profile/EditProfile";
import ProjectCard from "../components/AppComponent/ProjectCard";




const UserProfile = () => {
  const store = useUserStore();
  const profile = store.profile;
  

  console.log("User profile data:", profile);
  // Prefer backend-provided full name when available, otherwise derive from bio

  // Prefer backend-provided `fullName`, fall back to snake_case `full_name` or derive from bio
  const resolvedFullName =
    profile?.fullName ||
    (profile as any)?.full_name ||
    (() => {
      if (profile?.bio) {
        const parts = profile.bio.trim().split(/\s+/);
        return parts.slice(0, 2).join(" ");
      }
      return "Creativity Verse";
    })();
    
      const handleEdit = (id: string) => {
    // hook: navigate to edit page or open modal
    alert(`Open editor for ${id} — wire to your edit flow.`);
  };

    const handleDelete = (id: string) => {
    const confirmed = confirm("Delete this project? This action cannot be undone.");
    if (!confirmed) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

    const handleView = (p: Project) => {
    // hook: navigate to project page
    window.open(p.projectLink ?? "#", "_blank");
  };

  const author = {
    full_name: resolvedFullName,
    isVerified: true,
    profilePicture:
      profile?.avatar ||
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&w=256&h=256&facepad=2",
    // Use tags or skills from profile; fall back to sensible defaults
    skills: profile?.skills?.length
      ? profile.skills
      : profile?.tags?.slice(0, 4) || ["Freelancing", "Networking"],
    badges: [<PiCertificateFill className="text-orange-500" key="badge1" />],
  };

  console.log("Author data:", author.full_name);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchProfile } = useUserStore();

  type Project = {
  id: string;
  title: string;
  shortDescription: string;
  cover?: string; // image url
  tags: string[];
  skills: string[];
  projectLink?: string;
  visibility: "public" | "portfolio" | "private";
  createdAt: string; // ISO string
};


const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Portfolio Website Redesign",
    shortDescription: "Complete redesign with improved performance and accessibility.",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    tags: ["web", "design"],
    skills: ["React", "Tailwind", "Figma"],
    projectLink: "https://example.com/portfolio-redesign",
    visibility: "public",
    createdAt: "2025-06-12T10:00:00.000Z",
  },
  {
    id: "p2",
    title: "Brand Identity Pack",
    shortDescription: "Logo, brand guidelines and illustration set for a fintech startup.",
    cover: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&w=1200&q=80",
    tags: ["branding", "illustration"],
    skills: ["Illustrator", "Photoshop"],
    visibility: "portfolio",
    createdAt: "2025-07-01T08:30:00.000Z",
  },
  {
    id: "p3",
    title: "Mobile App — Health Tracker",
    shortDescription: "End-to-end MVP with onboarding, analytics and premium features.",
    cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    tags: ["mobile", "ui-ux"],
    skills: ["Figma", "React Native", "UX Research"],
    projectLink: "https://example.com/health-track",
    visibility: "private",
    createdAt: "2025-05-20T14:12:00.000Z",
  },
  {
    id: "p4",
    title: "Ebook — UI Patterns",
    shortDescription: "A practical guide to modern UI patterns and component libraries.",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    tags: ["ebook", "ui"],
    skills: ["Writing", "Design"],
    projectLink: "https://example.com/ui-patterns",
    visibility: "public",
    createdAt: "2025-07-15T09:00:00.000Z",
  },
];
const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);


  return (
    <div
      className="overflow-y-scroll custom-scrollbar h-screen text-white "
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#FF6F00] to-[#863b02] p-8 rounded-br-xl rounded-bl-xl shadow-md relative min-h-[212px] mb-10">
        <img
          src={author.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover absolute left-10 -bottom-[20%] border-3 border-black"
        />
      </div>

      {/* User details  */}
      <div className="">
        <div className="p-4 border-b border-[#FF6F00]/20">
          <div className="">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {author.full_name}
                {author.isVerified && (
                  <FaCheckCircle className="text-blue-500 text-sm" />
                )}
              </h1>
              <p className="text-sm text-white/70">
                {profile?.bio ||
                  "Interface and Brand Designer based in San Antonio"}
              </p>
              <div className="flex gap-2 mt-1 text-sm">
                {author.skills.map(skill => (
                  <span key={skill} className="bg-white/10 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {author.badges.map(badge => badge)}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-lg font-semibold">2,985</p>
                    <p className="text-xs text-white/50">Followers</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">132</p>
                    <p className="text-xs text-white/50">Following</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-semibold">548</p>
                    <p className="text-xs text-white/50">Likes</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-1 text-sm bg-[var(--color-brand-orange)] rounded-md hover:bg-white/10">
                    Follow
                  </button>
                  <button
                    className="px-4 py-1 bg-black rounded-md text-sm border border-white/20 hover:bg-white/10"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                  <button className="px-4 py-1 bg-black rounded-md text-sm border border-white/20 hover:bg-white/10">
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Portfolio</h2>
            
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {MOCK_PROJECTS.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}

          </div>
        </div>
      </div>
      {editing && <EditProfile onClose={() => setEditing(false)} />}
    </div>
  );
};

export default UserProfile;

// upnext i want you to create a editProfile component, where user will be able to edit and add skill set, social handles, add a business/portfolio website, edit profile pic nd cover photo, edit username and bio.
