// src/pages/career/SavedJobs.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaExternalLinkAlt } from "react-icons/fa";


type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  employmentType: "remote" | "onsite" | "hybrid";
  salary?: string;
  schedule?: string;
  skillsRequired: string[];
  skillLevel: "beginner" | "intermediate" | "advanced";
  applicationMethod: "internal" | "external";
  applicationLink?: string;
  postedBy: string;
  createdAt: string;
};

const STORAGE_KEY = "saved_jobs";

const SavedJobs: React.FC = () => {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  // load saved ids from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    setSavedIds(ids);
  }, []);


    useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      fetch("/Data/joblisting.json")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.filter((j: Job) => savedIds.includes(j.id)));
          setLoading(false);
        });
    }, 1000);
  }, []);

  const removeSaved = (jobId: string) => {
    const updated = savedIds.filter((id) => id !== jobId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedIds(updated);
  };

  const clearAll = () => {
    if (!savedIds.length) return;
    const confirmed = confirm("Clear all saved jobs?");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    setSavedIds([]);
  };

  const handleView = (job: Job) => {
    // navigate to job details and pass job in state
    navigate(`/career/job/${job.id}`, { state: { job } });
  };

  const handleApply = (job: Job) => {
    if (job.applicationMethod === "external" && job.applicationLink) {
      window.open(job.applicationLink, "_blank");
    } else {
      // internal: go to job details (where modal/apply flow lives)
      navigate(`/career/job/${job.id}`, { state: { job } });
    }
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Saved Jobs</h1>
            <p className="text-gray-400 text-sm mt-1">
              Jobs you've saved for later — manage or apply from here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-md bg-[#232323] border border-gray-700 text-sm hover:border-[var(--color-brand-orange)] transition"
            >
              Clear all
            </button>
            <span className="text-sm text-gray-400">
              {savedIds.length} saved
            </span>
          </div>
        </header>

        {jobs.length === 0 ? (
          <div className="bg-[#232323] p-8 rounded-xl border border-gray-700 text-center">
            <FaRegBookmark className="mx-auto text-4xl text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No saved jobs yet</h2>
            <p className="text-gray-400 mb-4">
              Save jobs to find them quickly later. Browse the Job Hub to get started.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/career/jobs")}
                className="px-6 py-2 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="bg-[#232323] p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <div className="text-sm text-gray-400 mt-1">
                        <span className="font-medium text-[var(--color-brand-orange)]">
                          {job.company}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{ job.employmentType}</span>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end text-right">
                      <div className="text-sm text-gray-300 font-medium">
                        {job.salary ?? "—"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {job.schedule ?? "—"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skillsRequired.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 text-xs rounded-full bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleView(job)}
                    className="px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 text-sm hover:border-[var(--color-brand-orange)] transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleApply(job)}
                    className="px-4 py-2 rounded-md bg-[var(--color-brand-orange)] text-black font-semibold text-sm flex items-center gap-2"
                    title={job.applicationMethod === "external" ? "Apply externally" : "Apply"}
                  >
                    {job.applicationMethod === "external" ? (
                      <>
                        Apply <FaExternalLinkAlt className="text-xs" />
                      </>
                    ) : (
                      "Apply"
                    )}
                  </button>

                  <button
                    onClick={() => removeSaved(job.id)}
                    className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 text-sm hover:bg-red-700/5 hover:border-red-700 transition"
                    title="Remove saved"
                  >
                    <FaBookmark className="text-orange-400" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SavedJobs;
