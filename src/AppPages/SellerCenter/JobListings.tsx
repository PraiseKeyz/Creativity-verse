import React, { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  employmentType: string;
  impressions: number;
  clicks: number;
  applied: number;
  status: "active" | "disabled";
};

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova",
      employmentType: "Remote",
      impressions: 1200,
      clicks: 180,
      applied: 40,
      status: "active",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Designify",
      employmentType: "Hybrid",
      impressions: 800,
      clicks: 100,
      applied: 22,
      status: "active",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Innova",
      employmentType: "On-site",
      impressions: 600,
      clicks: 75,
      applied: 15,
      status: "disabled",
    },
  ]);

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setJobs(
      jobs.map((job) =>
        job.id === id
          ? { ...job, status: job.status === "active" ? "disabled" : "active" }
          : job
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <button className="px-6 py-2 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition">
          + Add Job
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-[#232323] rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Job Info */}
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-400">{job.company} • {job.employmentType}</p>
              <p
                className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                  job.status === "active"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {job.status.toUpperCase()}
              </p>
            </div>

            {/* Job Stats */}
            <div className="flex gap-6 text-sm text-gray-400">
              <p>👁 {job.impressions} impressions</p>
              <p>🖱 {job.clicks} clicks</p>
              <p>📩 {job.applied} applied</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30">
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleStatus(job.id)}
                className="px-3 py-1 rounded-md bg-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/30"
              >
                {job.status === "active" ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default JobListings;
