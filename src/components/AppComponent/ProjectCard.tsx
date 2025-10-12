import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  cover?: string;
  tags: string[];
  skills: string[];
  projectLink?: string;
  visibility: "public" | "portfolio" | "private";
  createdAt: string;
};

const VisibilityBadge: React.FC<{ v: Project["visibility"] }> = ({ v }) => {
  if (v === "public") return <span className="text-xs bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] px-2 py-0.5 rounded-full">Public</span>;
  if (v === "portfolio") return <span className="text-xs bg-blue-700/20 text-blue-400 px-2 py-0.5 rounded-full">Portfolio</span>;
  return <span className="text-xs bg-gray-700/20 text-gray-300 px-2 py-0.5 rounded-full">Private</span>;
};

type Props = {
  project: Project;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (project: Project) => void;
};

const ProjectCard: React.FC<Props> = ({ project, onEdit, onDelete, onView }) => {
  return (
    <article className="bg-[#232323] rounded-xl border border-gray-700 overflow-hidden shadow">
      <div className="relative h-44 bg-gray-900">
        {project.cover ? (
          <img src={project.cover} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <button title="View" onClick={() => onView?.(project)} className="bg-black/50 p-2 rounded-md hover:bg-black/60">
            <FaEye />
          </button>
          <div className="relative">
            <button className="bg-black/50 p-2 rounded-md hover:bg-black/60">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{project.shortDescription}</p>
          </div>
          <div className="text-right">
            <VisibilityBadge v={project.visibility} />
            <div className="text-xs text-gray-500 mt-2">{new Date(project.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#1a1a1a] border border-gray-700 text-gray-300">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit?.(project.id)} className="px-3 py-1 bg-[#1a1a1a] border border-gray-700 rounded-md text-sm flex items-center gap-2">
              <FaEdit /> Edit
            </button>
            <button onClick={() => onDelete?.(project.id)} className="px-3 py-1 bg-[#1a1a1a] border border-red-700 rounded-md text-sm text-red-400 flex items-center gap-2">
              <FaTrash /> Delete
            </button>
          </div>

          <a href={project.projectLink ?? "#"} onClick={(e) => { if (!project.projectLink) e.preventDefault(); }} className={`text-sm font-semibold px-4 py-2 rounded-md ${project.projectLink ? "bg-[var(--color-brand-orange)] text-black" : "bg-gray-700 text-gray-300 cursor-not-allowed"}`}>
            {project.projectLink ? "Open" : "No link"}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
