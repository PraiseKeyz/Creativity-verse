// src/pages/career/JobDetails.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useJobStore from "../store/job.store";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: string;
  skillsRequired: string[];
  skillLevel: string;
  applicationMethod: "internal" | "external";
  applicationLink?: string;
  postedBy: string;
  createdAt: string;
  salary?: string;
  schedule?: string;
};

const storageKey = "cv_applied_jobs";

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const passedJob = (location.state as any)?.job as Job | undefined;

  const [job, setJob] = useState<Job | null>(passedJob ?? null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Load job
  useEffect(() => {
    if (job) {
      setLoading(false);
      return;
    }
    if (id) {
      // Try API first
      const fetchJob = async () => {
        try {
          const resp = await useJobStore.getState().getJobById(id as string);
          if (resp?.status === "success" && resp.payload?.job) {
            setJob(resp.payload.job as Job);
            setLoading(false);
            return;
          }
        } catch (e) {
          // ignore and fallback to local JSON
        }

        // Fallback: try the job store (loads from API) and then check stored jobs
        try {
          await useJobStore.getState().getJobs();
          const storeJobs = useJobStore.getState().jobs as Job[];
          const found = storeJobs.find(
            j => j.id === id || (j as any)._id === id
          );
          if (found) setJob(found);
        } catch (err) {
          // ignore — we couldn't load from backend
        } finally {
          setLoading(false);
        }
      };

      fetchJob();
    }
  }, [id, job]);

  // Check applied status
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    const appliedJobs: string[] = raw ? JSON.parse(raw) : [];
    if (job) setApplied(appliedJobs.includes(job.id));
  }, [job]);

  const handleApply = () => {
    if (!job) return;

    if (job.applicationMethod === "external" && job.applicationLink) {
      window.open(job.applicationLink, "_blank");
    } else if (job.applicationMethod === "internal") {
      setShowModal(true);
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    const submit = async () => {
      try {
        // Build payload: prefer FormData to support file upload
        const form = new FormData();
        form.append("coverLetter", coverLetter || "");
        if (cvFile) form.append("cv", cvFile);

        const resp = await useJobStore.getState().applyJob(job.id, form);
        if (resp?.status === "success") {
          // mark as applied locally (persist)
          const raw = localStorage.getItem(storageKey);
          const appliedJobs: string[] = raw ? JSON.parse(raw) : [];
          if (!appliedJobs.includes(job.id)) {
            appliedJobs.push(job.id);
            localStorage.setItem(storageKey, JSON.stringify(appliedJobs));
          }
          setApplied(true);
          setShowModal(false);
          setCoverLetter("");
          setCvFile(null);
          alert("Application submitted with Cover Letter & CV ✅");
        } else {
          alert(resp?.message || "Failed to submit application");
        }
      } catch (err: any) {
        // show error
        const msg = err?.response?.data?.message || err?.message || String(err);
        alert("Failed to apply: " + msg);
      }
    };

    submit();
  };

  const handleWithdraw = () => {
    if (!job) return;
    const raw = localStorage.getItem(storageKey);
    const appliedJobs: string[] = raw ? JSON.parse(raw) : [];
    if (!appliedJobs.includes(job.id)) return;

    const confirmed = confirm(
      `Withdraw application for "${job.title}" at ${job.company}?`
    );
    if (!confirmed) return;

    const updated = appliedJobs.filter(jid => jid !== job.id);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setApplied(false);
    alert("Application withdrawn.");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
        <div className="max-w-4xl mx-auto">Loading...</div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-2">Job not found</h2>
          <p className="text-gray-400 mb-6">
            We couldn't locate that job. It may have been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md bg-[#232323] border border-gray-700"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  const postedAgo = new Date(job.createdAt).toLocaleDateString();

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-[#232323] rounded-md border border-gray-700 hover:border-[var(--color-brand-orange)] transition"
            aria-label="Back"
          >
            <FaArrowLeft />
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="text-[var(--color-brand-orange)] font-bold">
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock /> {job.schedule ?? job.employmentType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {job.salary && (
                  <div className="text-sm font-semibold text-[var(--color-brand-orange)]">
                    <FaMoneyBillWave className="inline mr-2" />
                    {job.salary}
                  </div>
                )}

                {applied ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-green-700/20 text-green-400 rounded-full flex items-center gap-2">
                      <FaCheckCircle /> Applied
                    </span>
                    <button
                      onClick={handleWithdraw}
                      className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-red-700 text-red-400 hover:bg-red-700/5 transition"
                    >
                      Withdraw
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 rounded-md bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-95 active:scale-95 transition"
                  >
                    {job.applicationMethod === "external"
                      ? "Apply Externally"
                      : "Apply Now"}
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">Posted: {postedAgo}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-[#232323] p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-gray-300 leading-relaxed">{job.description}</p>
            </section>

            <section className="bg-[#232323] p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
              <ul className="flex flex-wrap gap-2">
                {job.skillsRequired.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1 text-sm bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] rounded-full"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-[#232323] p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Skill Level</h3>
              <p className="text-gray-300 capitalize">{job.skillLevel}</p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-[#232323] p-4 rounded-xl border border-gray-700">
              <h4 className="font-semibold mb-2">Quick Info</h4>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Type</span>
                  <span className="font-medium">{job.employmentType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Schedule</span>
                  <span className="font-medium">{job.schedule ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center justify-between">
                    <span>Salary</span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#232323] p-4 rounded-xl border border-gray-700">
              <h4 className="font-semibold mb-2">About {job.company}</h4>
              <p className="text-sm text-gray-300">
                {job.company} is hiring talented people to build exceptional
                products. Check their website or job listing for more details.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal for internal apply */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            onSubmit={handleModalSubmit}
            className="bg-[#232323] p-6 rounded-xl border border-gray-700 max-w-lg w-full space-y-4"
          >
            <h2 className="text-xl font-semibold mb-2">
              Apply for {job.title}
            </h2>
            <div>
              <label className="block text-sm mb-1">Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
                required
                rows={4}
                className="w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Upload CV</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e => setCvFile(e.target.files?.[0] || null)}
                required
                className="text-sm"
              />
              {cvFile && (
                <p className="text-xs text-green-400 mt-1">
                  ✔ {cvFile.name} selected
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[var(--color-brand-orange)] text-black font-semibold"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default JobDetails;
