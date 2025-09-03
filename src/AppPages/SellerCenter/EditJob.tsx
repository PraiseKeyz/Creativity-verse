import React, { useState, useEffect } from "react";

type Job = {
  id: number;
  title: string;
  description: string;
  company: string;
  employmentType: string;
  skillsRequired: string[];
  skillLevel: string;
  applicationMethod: string;
  applicationLink: string;
  salary: string;
  schedule: string;
  createdAt: string;
};

const mockJob: Job = {
  id: 1,
  title: "Frontend Developer",
  description: "Build and maintain user interfaces for web applications.",
  company: "TechNova",
  employmentType: "remote",
  skillsRequired: ["React", "JavaScript", "CSS", "HTML"],
  skillLevel: "intermediate",
  applicationMethod: "external",
  applicationLink: "https://technova.com/careers/frontend",
  salary: "$3000 - $5000 / month",
  schedule: "Full-time",
  createdAt: "2025-08-01T10:00:00Z",
};

const EditJob: React.FC = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    // Simulate fetching job from backend
    setJob(mockJob);
  }, []);

  const handleChange = (field: keyof Job, value: string) => {
    if (!job) return;
    setJob({ ...job, [field]: value });
  };

  const handleAddSkill = () => {
    if (job && skillInput.trim() && !job.skillsRequired.includes(skillInput)) {
      setJob({ ...job, skillsRequired: [...job.skillsRequired, skillInput] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    if (job) {
      setJob({
        ...job,
        skillsRequired: job.skillsRequired.filter((s) => s !== skill),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Job:", job);
    alert("Job updated successfully ✅");
  };

  if (!job) return <p className="text-white p-6">Loading job data...</p>;

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#232323] p-6 rounded-xl border border-gray-700 shadow-lg max-w-3xl mx-auto"
      >
        {/* Title */}
        <div>
          <label className="block text-sm mb-2">Job Title</label>
          <input
            type="text"
            value={job.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea
            value={job.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm mb-2">Company</label>
          <input
            type="text"
            value={job.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm mb-2">Employment Type</label>
          <select
            value={job.employmentType}
            onChange={(e) => handleChange("employmentType", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          >
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm mb-2">Salary</label>
          <input
            type="text"
            value={job.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            placeholder="e.g. $3000 - $5000 / month"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm mb-2">Schedule</label>
          <input
            type="text"
            value={job.schedule}
            onChange={(e) => handleChange("schedule", e.target.value)}
            placeholder="e.g. Full-time, Part-time, Flexible"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm mb-2">Skills Required</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g. React"
              className="flex-1 px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-orange-500 text-black rounded-md font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skillsRequired.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-red-400 text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-sm mb-2">Skill Level</label>
          <select
            value={job.skillLevel}
            onChange={(e) => handleChange("skillLevel", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {/* Application Method */}
        <div>
          <label className="block text-sm mb-2">Application Method</label>
          <select
            value={job.applicationMethod}
            onChange={(e) => handleChange("applicationMethod", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          >
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </div>

        {/* Application Link */}
        <div>
          <label className="block text-sm mb-2">Application Link</label>
          <input
            type="url"
            value={job.applicationLink}
            onChange={(e) => handleChange("applicationLink", e.target.value)}
            placeholder="https://example.com/apply"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-orange-500 text-black font-semibold hover:opacity-90 active:scale-95 transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
};

export default EditJob;
