// src/pages/Portfolio.tsx
import React, { useMemo, useState } from "react";
import { FaFilter, FaSearch, FaEllipsisV, FaTrash, FaEdit, FaEye } from "react-icons/fa";

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

const VisibilityBadge: React.FC<{ v: Project["visibility"] }> = ({ v }) => {
  if (v === "public") return <span className="text-xs bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] px-2 py-0.5 rounded-full">Public</span>;
  if (v === "portfolio") return <span className="text-xs bg-blue-700/20 text-blue-400 px-2 py-0.5 rounded-full">Portfolio</span>;
  return <span className="text-xs bg-gray-700/20 text-gray-300 px-2 py-0.5 rounded-full">Private</span>;
};

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedVisibility, setSelectedVisibility] = useState<"all" | Project["visibility"]>("all");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  // gather all tags for filter chips
  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [projects]);

  const filtered = useMemo(() => {
    let list = projects.slice();

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.tags.join(" ").toLowerCase().includes(q));
    }

    if (selectedTag !== "all") {
      list = list.filter((p) => p.tags.includes(selectedTag));
    }

    if (selectedVisibility !== "all") {
      list = list.filter((p) => p.visibility === selectedVisibility);
    }

    list.sort((a, b) => {
      if (sortOrder === "new") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return list;
  }, [projects, search, selectedTag, selectedVisibility, sortOrder]);

  const handleDelete = (id: string) => {
    const confirmed = confirm("Delete this project? This action cannot be undone.");
    if (!confirmed) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (id: string) => {
    // hook: navigate to edit page or open modal
    alert(`Open editor for ${id} — wire to your edit flow.`);
  };

  const handleView = (p: Project) => {
    // hook: navigate to project page
    window.open(p.projectLink ?? "#", "_blank");
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="mb-2">
            <h1 className="text-2xl font-bold">My Portfolio</h1>
            <p className="text-sm text-gray-400">Showcase of your projects. {projects.length} total</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex items-center bg-[#232323] border border-gray-700 rounded-md px-3 py-2 w-full md:w-80">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, tags or description..."
                className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-xs text-gray-400 ml-2">Clear</button>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSortOrder((s) => (s === "new" ? "old" : "new"))}
                className="px-3 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md text-sm"
                title="Toggle sort"
              >
                {sortOrder === "new" ? "Newest" : "Oldest"}
              </button>

              <div className="px-3 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md text-sm flex items-center gap-2">
                <FaFilter />
                <select value={selectedVisibility} onChange={(e) => setSelectedVisibility(e.target.value as any)} className="bg-transparent outline-none text-sm">
                  <option value="all">All visibility</option>
                  <option value="public">Public</option>
                  <option value="portfolio">Portfolio only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Tag chips row */}
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-3 py-1 text-sm rounded-full ${selectedTag === "all" ? "bg-[var(--color-brand-orange)] text-black" : "bg-[#232323] border border-gray-700 text-gray-300"}`}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1 text-sm rounded-full ${selectedTag === t ? "bg-[var(--color-brand-orange)] text-black" : "bg-[#232323] border border-gray-700 text-gray-300"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="p-8 bg-[#232323] rounded-xl border border-gray-700 text-center text-gray-400">
            No projects found. Try adjusting filters or create a new project.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="bg-[#232323] rounded-xl border border-gray-700 overflow-hidden shadow">
                <div className="relative h-44 bg-gray-900">
                  {p.cover ? (
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button title="View" onClick={() => handleView(p)} className="bg-black/50 p-2 rounded-md hover:bg-black/60">
                      <FaEye />
                    </button>
                    <div className="relative">
                      <button className="bg-black/50 p-2 rounded-md hover:bg-black/60">
                        <FaEllipsisV />
                      </button>
                      {/* dropdown could be added here */}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{p.shortDescription}</p>
                    </div>
                    <div className="text-right">
                      <VisibilityBadge v={p.visibility} />
                      <div className="text-xs text-gray-500 mt-2">{new Date(p.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#1a1a1a] border border-gray-700 text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(p.id)} className="px-3 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-sm flex items-center gap-2">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-[#1a1a1a] border border-red-700 rounded-md text-sm text-red-400 flex items-center gap-2">
                        <FaTrash /> Delete
                      </button>
                    </div>

                    <a href={p.projectLink ?? "#"} onClick={(e) => { if (!p.projectLink) e.preventDefault(); }} className={`text-sm font-semibold px-4 py-2 rounded-md ${p.projectLink ? "bg-[var(--color-brand-orange)] text-black" : "bg-gray-700 text-gray-300 cursor-not-allowed"}`}>
                      {p.projectLink ? "Open" : "No link"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Portfolio;
