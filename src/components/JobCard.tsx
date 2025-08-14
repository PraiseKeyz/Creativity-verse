import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Job = {
  id: string;
  title: string;
  company: string;
  logoColor: string; // a color for the dot icon
  postedAt: string;
  description: string;
  tags: string[];
  salary: string;
  benefits?: string[];
  isRemote: boolean;
  type: string;
  saved?: boolean;
};

type JobCardProps = {
  job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(job.saved || false);

  const toggleExpanded = () => setExpanded(!expanded);
  const toggleSave = () => setIsSaved(!isSaved);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3}}

      className="border border-[var(--color-brand-orange)]/20 rounded-lg p-4 mb-6 text-white shadow-lg"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: job.logoColor }}
          ></div>
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

      {/* Tags */}
      <div className="flex gap-2 mt-3">
        {job.isRemote && (
          <span className="px-2 py-1 text-xs rounded bg-[var(--color-brand-orange)]/30 text-white/90">
            Remote
          </span>
        )}
        <span className="px-2 py-1 text-xs rounded bg-[var(--color-brand-orange)]/30 text-white/90">
          {job.type}
        </span>
      </div>

      {/* Salary */}
      <div className="text-sm font-semibold mt-4">
        {job.salary}
        <span className="text-xs font-normal text-white/50 ml-2">/hr</span>
      </div>

      {/* Expand Button */}
      <button
        onClick={toggleExpanded}
        className="text-xs text-[var(--color-brand-orange)] mt-2 underline"
      >
        {expanded ? "Hide details" : "View more"}
      </button>

      {/* Expanded Section */}
      {expanded && job.benefits && (
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-1">Benefits:</h4>
          <ul className="list-disc pl-5 text-sm text-white/80">
            {job.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <button className="mt-5 w-full bg-[var(--color-brand-orange)] text-white py-2 rounded-md hover:bg-black hover:border hover:border-[var(--color-brand-orange)] transition-colors">
        Apply now
      </button>
    </motion.div>
  );
};

export default JobCard;
