import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaRocket, FaUsers, FaLaptopCode } from "react-icons/fa";

const SkillLensInfo: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-[#1f1f1f] to-[#181818]">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          See Your Skills Through the <span className="text-[var(--color-brand-orange)]">AI Lens</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          SkillLens lets you test your abilities with adaptive AI assessments. Choose a skill, set your
          level, answer smart questions — and receive an accurate score of where you truly stand.
        </p>
        <Link
          to="onboarding"
          className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold text-lg hover:opacity-90 transition active:scale-95"
        >
          🔍 Test My Skills Now
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "Choose a Skill", desc: "Select the area you want to validate." },
            { step: "Pick Your Level", desc: "Beginner, Intermediate, or Advanced." },
            { step: "AI Challenges You", desc: "Get tailored, scenario-based questions." },
            { step: "Receive Your Score", desc: "See strengths, gaps & insights instantly." },
          ].map((item, i) => (
            <div key={i} className="bg-[#232323] p-6 rounded-xl border border-gray-700 shadow hover:border-[var(--color-brand-orange)] transition">
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-brand-orange)]">{item.step}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why SkillLens */}
      <section className="py-16 px-6 bg-[#1f1f1f]">
        <h2 className="text-2xl font-bold mb-8 text-center">Why SkillLens?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { icon: <FaCheckCircle className="text-[var(--color-brand-orange)] text-2xl" />, title: "Precise Evaluation", desc: "AI adapts to your chosen level." },
            { icon: <FaLaptopCode className="text-[var(--color-brand-orange)] text-2xl" />, title: "Tailored Experience", desc: "No generic testing, fully personalized." },
            { icon: <FaRocket className="text-[var(--color-brand-orange)] text-2xl" />, title: "Actionable Insights", desc: "Know exactly what to improve." },
            { icon: <FaUsers className="text-[var(--color-brand-orange)] text-2xl" />, title: "Connected Growth", desc: "Use results to guide your next steps." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-[#232323] p-6 rounded-xl border border-gray-700">
              {item.icon}
              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Skill Categories */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Sample Skill Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Social Media Strategy",
            "Graphic Design",
            "UI/UX Design",
            "Copywriting",
            "Front-End Web Development",
            "Branding & Identity",
          ].map((cat, i) => (
            <div key={i} className="bg-[#232323] p-4 rounded-lg text-center border border-gray-700 hover:border-[var(--color-brand-orange)] cursor-pointer">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center py-16 px-6 bg-gradient-to-t from-[#1f1f1f] to-[#181818]">
        <h2 className="text-3xl font-bold mb-4">Your skills deserve clarity.</h2>
        <p className="text-gray-300 mb-8">Don’t just say you know it - prove it, measure it, and grow with purpose.</p>
        <Link
          to="onboarding"
          className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold text-lg hover:opacity-90 transition active:scale-95"
        >
          ✨ Put My Skills to the Test
        </Link>
      </section>
    </main>
  );
};

export default SkillLensInfo;