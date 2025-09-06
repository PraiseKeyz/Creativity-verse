import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("beginner");
  const [name, setName] = useState("");

  const handleStartTest = (e: React.FormEvent) => {
  e.preventDefault();
  if (!skill || !name) {
    alert("Please fill out all fields.");
    return;
  }

  // Generate fake test ID for now
  const testId = `${skill}-${Date.now()}`;

  // Save data into localStorage
  localStorage.setItem(
    "skillLensData",
    JSON.stringify({ skill, level, name })
  );

  // Navigate to test route
  navigate(`/verse/skill-lens/test/${testId}`);
};


  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">SkillLens Onboarding</h1>
      <p className="text-gray-300 mb-8">
        Please follow the instructions below before starting your assessment.
      </p>

      {/* Instructions */}
      <section className="bg-[#232323] p-6 rounded-xl border border-gray-700 shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Instructions</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
          <li>The test is timed and must be completed in one sitting.</li>
          <li>Switching tabs or minimizing the window will end the test immediately.</li>
          <li>Each question is tailored to your chosen skill and level.</li>
          <li>Ensure you have a stable internet connection.</li>
        </ul>
      </section>

      {/* Form */}
      <form
        onSubmit={handleStartTest}
        className="space-y-6 bg-[#232323] p-6 rounded-xl border border-gray-700 shadow max-w-2xl mx-auto"
      >
        {/* Name */}
        <div>
          <label className="block text-sm mb-2">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          />
        </div>

        {/* Skill */}
        <div>
          <label className="block text-sm mb-2">Select Skill</label>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[var(--color-brand-orange)] outline-none"
            required
          >
            <option value="">-- Choose a Skill --</option>
            <option value="social-media">Social Media Strategy</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="copywriting">Copywriting</option>
            <option value="frontend">Front-End Web Development</option>
            <option value="branding">Branding & Identity</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm mb-2">Select Level</label>
          <div className="flex gap-4">
            {["beginner", "intermediate", "advanced"].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={`px-4 py-2 rounded-md capitalize ${
                  level === lvl
                    ? "bg-[var(--color-brand-orange)] text-black font-semibold"
                    : "bg-[#1a1a1a] border border-gray-600 text-gray-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition"
        >
          🚀 Start Test
        </button>
      </form>
    </main>
  );
};

export default Onboarding;
