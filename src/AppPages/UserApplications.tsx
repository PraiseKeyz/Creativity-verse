import React, { useMemo, useState } from "react";
import { FaSearch, FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Application = {
  id: string;
  title: string;
  description: string;
  company: string;
  employmentType: "remote" | "onsite" | "hybrid";
  salary: string; // e.g. "$70k-$90k",
  schedule: string; // e.g. "Full-time", "Part-time"
  skillsRequired: string[];
  skillLevel: "beginner" | "intermediate" | "advanced";
  applicationMethod: "internal" | "external";
  applicationLink?: string; // if external
  postedBy: string; // user id of poster
  createdAt: string; // ISO
  appliedAt: string; // ISO
  status: "pending" | "reviewed" | "interview" | "hired" | "rejected";
  coverLetterSnippet?: string;
};

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "j1",
    title: "Frontend Developer",
    description: "Build and maintain user interfaces for web applications.",
    company: "TechNova",
    employmentType: "remote",
    salary: "$1,200 - $1,800 / month",
    schedule: "Full-time",
    skillsRequired: ["React", "JavaScript", "CSS", "HTML"],
    skillLevel: "intermediate",
    applicationMethod: "external",
    applicationLink: "https://technova.com/careers/frontend",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6b7",
    createdAt: "2025-08-01T10:00:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "pending" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j2",
    title: "Backend Engineer",
    description: "Design and develop APIs, databases, and backend services.",
    company: "CloudBase",
    employmentType: "hybrid",
    salary: "$2,000 - $3,000 / month",
    schedule: "Full-time",
    skillsRequired: ["Node.js", "Express", "MongoDB", "REST APIs"],
    skillLevel: "advanced",
    applicationMethod: "internal",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6b8",
    createdAt: "2025-08-05T09:00:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "reviewed" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j2",
    title: "Backend Engineer",
    description: "Design and develop APIs, databases, and backend services.",
    company: "CloudBase",
    employmentType: "hybrid",
    salary: "$2,000 - $3,000 / month",
    schedule: "Full-time",
    skillsRequired: ["Node.js", "Express", "MongoDB", "REST APIs"],
    skillLevel: "advanced",
    applicationMethod: "internal",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6b8",
    createdAt: "2025-08-05T09:00:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "reviewed" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j4",
    title: "Data Analyst",
    description: "Analyze datasets and provide insights for business decisions.",
    company: "DataWorks",
    employmentType: "remote",
    salary: "$900 - $1,200 / month",
    schedule: "Part-time",
    skillsRequired: ["SQL", "Python", "Tableau", "Statistics"],
    skillLevel: "beginner",
    applicationMethod: "internal",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6c0",
    createdAt: "2025-08-12T11:15:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "interview" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j5",
    title: "Mobile Developer",
    description: "Develop and maintain cross-platform mobile applications.",
    company: "AppVerse",
    employmentType: "hybrid",
    salary: "$1,500 - $2,200 / month",
    schedule: "Full-time",
    skillsRequired: ["React Native", "JavaScript", "TypeScript"],
    skillLevel: "intermediate",
    applicationMethod: "external",
    applicationLink: "https://appverse.dev/careers/mobile",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6c1",
    createdAt: "2025-08-15T16:00:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "interview" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j5",
    title: "Mobile Developer",
    description: "Develop and maintain cross-platform mobile applications.",
    company: "AppVerse",
    employmentType: "hybrid",
    salary: "$1,500 - $2,200 / month",
    schedule: "Full-time",
    skillsRequired: ["React Native", "JavaScript", "TypeScript"],
    skillLevel: "intermediate",
    applicationMethod: "external",
    applicationLink: "https://appverse.dev/careers/mobile",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6c1",
    createdAt: "2025-08-15T16:00:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "hired" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j7",
    title: "Product Manager",
    description: "Lead product strategy and coordinate cross-functional teams.",
    company: "InnovateX",
    employmentType: "remote",
    salary: "$2,500 - $3,500 / month",
    schedule: "Full-time",
    skillsRequired: ["Agile", "Scrum", "Communication", "Leadership"],
    skillLevel: "intermediate",
    applicationMethod: "external",
    applicationLink: "https://innovatex.com/careers/pm",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6c3",
    createdAt: "2025-08-20T10:30:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "hired" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
  {
    id: "j8",
    title: "Content Writer",
    description: "Write SEO-friendly blogs, articles, and website copy.",
    company: "WordCraft",
    employmentType: "remote",
    salary: "₦80,000 - ₦120,000",
    schedule: "Contract",
    skillsRequired: ["SEO", "Content Writing", "Research", "Editing"],
    skillLevel: "beginner",
    applicationMethod: "internal",
    postedBy: "64e1a1f2c1a4b2d3e4f5a6c4",
    createdAt: "2025-08-25T13:20:00Z",
    appliedAt: '2025-08-01T10:00:00Z',
    status: "rejected" ,
    coverLetterSnippet: "I am excited to apply for the Frontend Developer position at TechNova. With over 3 years of experience in React and modern web technologies, I am confident in my ability to contribute effectively to your team..."
  },
];

const statusLabel = (s: Application["status"]) => {
  switch (s) {
    case "pending":
      return { text: "Pending", color: "text-yellow-400 bg-yellow-600/10" };
    case "reviewed":
      return { text: "Reviewed", color: "text-sky-400 bg-sky-900/10" };
    case "interview":
      return { text: "Interview", color: "text-indigo-300 bg-indigo-900/10" };
    case "hired":
      return { text: "Hired", color: "text-green-400 bg-green-900/10" };
    case "rejected":
      return { text: "Rejected", color: "text-red-400 bg-red-900/10" };
    default:
      return { text: s, color: "" };
  }
};

const PAGE_SIZE = 6;

const UserApplications: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>(
    MOCK_APPLICATIONS
  );
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Application["status"]>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        (a.company || "").toLowerCase().includes(q)
      );
    });
  }, [applications, query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleView = (id: string) => {
    // replace with real route if you have one
    navigate(`/verse/my-applications/${id}`, { state: { applicationId: id } });
  };

  const handleWithdraw = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    const confirmed = confirm(
      `Withdraw application for "${app.title}" at ${app.company}?`
    );
    if (!confirmed) return;
    setApplications((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMarkRead = (id: string) => {
    // for applications we might not have unread concept; left as placeholder
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Applications</h1>
            <p className="text-sm text-gray-400 mt-1">
              Track applications you submitted — view status, withdraw, or view
              details.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by job or company..."
                className="pl-10 pr-4 py-2 rounded-lg bg-[#232323] border border-gray-700 placeholder:text-gray-500 focus:border-[var(--color-brand-orange)] outline-none"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as any);
                setPage(1);
              }}
              className="px-3 py-2 rounded-lg bg-[#232323] border border-gray-700 outline-none"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="interview">Interview</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {pageItems.length === 0 ? (
            <div className="p-8 bg-[#232323] rounded-xl border border-gray-700 text-center text-gray-400">
              No applications found. Try changing filters or submit new
              applications.
            </div>
          ) : (
            pageItems.map((app) => {
              const s = statusLabel(app.status);
              return (
                <div
                  key={app.id}
                  className="bg-[#232323] p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center gap-4 justify-between"
                >
                  <div className="flex gap-4 items-start md:items-center flex-1">
                    <div className="w-12 h-12 rounded-md bg-[#1a1a1a] border border-gray-700 flex-shrink-0 flex items-center justify-center text-[var(--color-brand-orange)] font-bold">
                      {app.company.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{app.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${s.color}`}>
                          {s.text}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {app.company} • {app.company || "Remote"} •{" "}
                        <span className="text-gray-500">
                          Applied {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </p>
                      {app.coverLetterSnippet && (
                        <p className="mt-2 text-sm text-gray-300">
                          {app.coverLetterSnippet}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <button
                      onClick={() => handleView(app.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1f1f1f] border border-gray-700 hover:border-[var(--color-brand-orange)] transition"
                    >
                      <FaExternalLinkAlt /> <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-red-700 text-red-400 hover:bg-red-700/5 transition"
                    >
                      <FaTrashAlt /> <span className="text-sm">Withdraw</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {(page - 1) * PAGE_SIZE + 1} -
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-[#232323] border border-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            <div className="px-3 py-1 rounded-md bg-[#232323] border border-gray-700">
              {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md bg-[#232323] border border-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserApplications;