import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Job = {
  id: number;
  title: string;
  description: string;
  company: string;
  employmentType: 'freelance' | 'remote' | 'full-time' | 'part-time' | 'contract';
  skillsRequired: string[];
  skillLevel: 'entry' | 'intermediate' | 'expert';
  applicationMethod: 'internal' | 'external';
  applicationLink?: string;
  postedBy: string;
  createdAt: string;
};

type JobCardProps = {
  job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);
  const toggleSave = () => setIsSaved(!isSaved);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: job.id * 0.1  }}
      className="border border-[var(--color-brand-orange)]/20 rounded-lg p-4 mb-6 text-white shadow-lg"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[var(--color-brand-orange)]"></div>
          <h4 className="text-sm text-white/50 font-semibold">{job.company}</h4>
        </div>
        <button onClick={toggleSave}>
          {isSaved ? (
            <FaBookmark className="text-black" />
          ) : (
            <FaRegBookmark className="text-gray-500 hover:text-black" />
          )}
        </button>
      </div>

      {/* Title */}
      <h2 className="mt-2 text-xl font-semibold ">{job.title}</h2>

      {/* Description */}
      <p className="text-sm text-white/80 mt-1">
        {expanded ? job.description : `${job.description.slice(0, 80)}...`}
      </p>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="px-2 py-1 text-xs rounded bg-[var(--color-brand-orange)]/30 text-white/90">
          {job.employmentType}
        </span>
        <span className="px-2 py-1 text-xs rounded bg-[var(--color-brand-orange)]/30 text-white/90">
          {job.skillLevel}
        </span>
        <span className="px-2 py-1 text-xs rounded bg-[var(--color-brand-orange)]/30 text-white/90">
          {job.applicationMethod}
        </span>
        <span className="px-2 py-1 text-xs rounded bg-[var(--color-brand-orange)]/30 text-white/90">
          Posted: {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Skills Required */}
      <div className="mt-3">
        <span className="font-semibold text-xs text-white/70">Skills Required:</span>
        <ul className="flex flex-wrap gap-2 mt-1">
          {job.skillsRequired.map((skill, idx) => (
            <li key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs">{skill}</li>
          ))}
        </ul>
      </div>

      {/* Application Link */}
      {job.applicationLink && (
        <div className="mt-3">
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-brand-orange)] underline"
          >
            Apply via external link
          </a>
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={toggleExpanded}
        className="text-xs text-[var(--color-brand-orange)] mt-2 underline"
      >
        {expanded ? "Hide details" : "View more"}
      </button>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-1">Posted By:</h4>
          <span className="text-xs text-white/80">{job.postedBy}</span>
        </div>
      )}

      {/* CTA */}
      <button className="mt-5 w-full bg-[var(--color-brand-orange)]/80 text-white py-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer">
        Apply now
      </button>
    </motion.div>
  );
};

export default JobCard;
