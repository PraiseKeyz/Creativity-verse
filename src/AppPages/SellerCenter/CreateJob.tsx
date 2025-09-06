import React, { useState } from "react";

const CreateJob: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [employmentType, setEmploymentType] = useState("remote");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [applicationMethod, setApplicationMethod] = useState("external");
  const [applicationLink, setApplicationLink] = useState("");
  const [applicationMail, setApplicationMail] = useState("");
  const [salary, setSalary] = useState("");
  const [workingSchedule, setWorkingSchedule] = useState("full-time");

  const handleAddSkill = () => {
    if (skillInput.trim() && !skillsRequired.includes(skillInput)) {
      setSkillsRequired([...skillsRequired, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsRequired(skillsRequired.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      title,
      description,
      company,
      employmentType,
      salary,
      workingSchedule,
      skillsRequired,
      skillLevel,
      applicationMethod,
      applicationLink,
      createdAt: new Date().toISOString(),
    };
    console.log("Job Created:", newJob);
    alert("Job Created Successfully ✅");
    // Hook to backend API here
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#232323] p-6 rounded-xl border border-gray-700 shadow-lg max-w-3xl mx-auto"
      >
        {/* Job Title */}
        <div>
          <label className="block text-sm mb-2">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Frontend Developer"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a detailed job description..."
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm mb-2">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. TechNova"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm mb-2">Employment Type</label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
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
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g. $2000/month or Negotiable"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
          />
        </div>

        {/* Working Schedule */}
        <div>
          <label className="block text-sm mb-2">Working Schedule</label>
          <select
            value={workingSchedule}
            onChange={(e) => setWorkingSchedule(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Skills Required */}
        <div>
          <label className="block text-sm mb-2">Skills Required</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g. React"
              className="flex-1 px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-[var(--color-brand-orange)] text-black rounded-md font-semibold hover:opacity-90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsRequired.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] rounded-full text-xs flex items-center gap-2"
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
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
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
            value={applicationMethod}
            onChange={(e) => setApplicationMethod(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
          >
            <option value="external">External Link</option>
            <option value="email">Email</option>
          </select>
        </div>

        {/* Application Link */}
        {applicationMethod === "external" && (
          <div>
            <label className="block text-sm mb-2">Application Link</label>
            <input
              type="url"
              value={applicationLink}
              onChange={(e) => setApplicationLink(e.target.value)}
              placeholder="https://company.com/careers/job"
              className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
              required
            />
          </div>
        )}
        {applicationMethod === "email" && (
          <div>
            <label className="block text-sm mb-2">Application Email</label>
            <input
              type="url"
              value={applicationMail}
              onChange={(e) => setApplicationMail(e.target.value)}
              placeholder="company@mail.com"
              className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition"
        >
          Create Job
        </button>
      </form>
    </main>
  );
};

export default CreateJob;
