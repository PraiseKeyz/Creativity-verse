import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../store/job.store";

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
// ...existing code...

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
  const [applications, setApplications] = useState<Application[]>([]);
  const getAppliedJobs = useJobStore(s => s.getAppliedJobs);
  const isLoading = useJobStore(s => s.isLoading);
  const error = useJobStore(s => s.error);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Application["status"]>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await getAppliedJobs();
        if (res.status === "success") {
          const jobs = res.payload.jobs || [];
          // Map backend Job -> Application UI shape
          const apps: Application[] = jobs.map((j: any) => ({
            id: j._id || j.id || "",
            title: j.title || "Untitled",
            description: j.description || "",
            company: j.company || j.postedBy?.name || "Unknown",
            employmentType: (j.employmentType as any) || "remote",
            salary: j.salary || "",
            schedule: j.schedule || "Full-time",
            skillsRequired: j.skillsRequired || [],
            skillLevel: (j.skillLevel as any) || "intermediate",
            applicationMethod: j.applicationMethod || "internal",
            applicationLink: j.applicationLink,
            postedBy: j.postedBy || "",
            createdAt: j.createdAt || new Date().toISOString(),
            appliedAt: j.appliedAt || new Date().toISOString(),
            status: (j.status as any) || "pending",
            coverLetterSnippet: j.coverLetterSnippet || "",
          }));

          if (mounted) setApplications(apps);
        }
      } catch (err) {
        // error handled in store; keep UI quiet and allow manual retry later
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [getAppliedJobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter(a => {
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
    const app = applications.find(a => a.id === id);
    if (!app) return;
    const confirmed = confirm(
      `Withdraw application for "${app.title}" at ${app.company}?`
    );
    if (!confirmed) return;
    setApplications(prev => prev.filter(p => p.id !== id));
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
                onChange={e => {
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
              onChange={e => {
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
          {error && (
            <div className="p-4 rounded-md bg-red-900/10 border border-red-700 text-red-300">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="p-8 bg-[#232323] rounded-xl border border-gray-700 text-center text-gray-400">
              Loading your applications...
            </div>
          ) : pageItems.length === 0 ? (
            <div className="p-8 bg-[#232323] rounded-xl border border-gray-700 text-center text-gray-400">
              No applications found. Try changing filters or submit new
              applications.
            </div>
          ) : (
            pageItems.map(app => {
              const s = statusLabel(app.status);
              return (
                <div
                  key={app.id}
                  className="bg-[#232323] p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center gap-4 justify-between"
                >
                  <div className="flex gap-4 items-start md:items-center flex-1">
                    <div className="w-12 h-12 rounded-md bg-[#1a1a1a] border border-gray-700 flex-shrink-0 flex items-center justify-center text-[var(--color-brand-orange)] font-bold">
                      {app.company?.charAt?.(0)?.toUpperCase() || "?"}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{app.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${s.color}`}
                        >
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
                      <FaExternalLinkAlt />{" "}
                      <span className="text-sm">View</span>
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
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-[#232323] border border-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            <div className="px-3 py-1 rounded-md bg-[#232323] border border-gray-700">
              {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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
