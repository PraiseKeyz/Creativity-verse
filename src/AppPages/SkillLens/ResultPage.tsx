import React from "react";
import { FaLinkedin, FaFacebook, FaCertificate } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, skill, score, total } = (location.state as any) || {};

  const percentage = total ? Math.round((score / total) * 100) : 0;

  let level = "Beginner";
  if (percentage >= 70) level = "Advanced";
  else if (percentage >= 40) level = "Intermediate";

  const shareText = `I just tested my ${skill} on SkillLens by Creativity Verse and scored ${percentage}%! 🚀 Ready to keep leveling up. #SkillLens #CreativityVerse`;

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      {/* Header */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <FaCertificate className="inline text-[var(--color-brand-orange)] text-2xl" /> Well done, {name}!
        </h1>
        <p className="text-gray-400 mb-6">
          You’ve completed your Skill Assessment.
        </p>
        <div className="text-5xl font-extrabold text-[var(--color-brand-orange)]">
          {percentage}% 
        </div>
        <p className="mt-2 text-lg font-semibold flex items-center justify-center gap-2">
          {level} Level Achiever <FaCertificate className="inline text-[var(--color-brand-orange)] text-xl" />
        </p>
      </section>

      {/* Feedback */}
      <section className="bg-[#232323] p-6 rounded-xl border border-gray-700 shadow mb-10 max-w-2xl mx-auto">
        <p className="text-gray-200">
          Based on your answers, your current skill level is{" "}
          <span className="font-bold text-[var(--color-brand-orange)]">
            {level}
          </span>
          . This reflects your strengths and areas to grow.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          👉 You’ll also see personalized suggestions on what to learn next inside Creativity Verse.
        </p>
      </section>

      {/* Social Sharing */}
      <section className="text-center mb-10">
        <p className="mb-3 font-medium">Great results are worth sharing!</p>
        <div className="flex gap-3 justify-center">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://creativityverse.com&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-2"
          >
            <FaLinkedin className="inline text-lg" /> Share on LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm flex items-center gap-2"
          >
            <FaXTwitter className="inline text-lg" /> Share on X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://creativityverse.com&quote=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-sm flex items-center gap-2"
          >
            <FaFacebook className="inline text-lg" /> Share on Facebook
          </a>
        </div>
      </section>

      {/* Certificate CTA */}
      <section className="bg-[#232323] p-6 rounded-xl border border-gray-700 shadow mb-10 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
          <FaCertificate className="inline text-[var(--color-brand-orange)] text-xl" /> Get Your Official Certificate
        </h2>
        <p className="text-gray-300 mb-4">
          Stand out with an AI-Verified Certificate from Creativity Verse.
          Showcase your achievement and prove your expertise.
        </p>
        <button
          onClick={() => alert("Redirecting to certificate purchase...")}
          className="px-6 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition flex items-center gap-2 justify-center mx-auto"
        >
          <FaCertificate className="inline text-lg" /> Get My Certificate
        </button>
        <p className="mt-3 text-xs text-gray-500">
          proof speaks louder than claims...
        </p>
      </section>

      {/* Next Steps */}
      <section className="max-w-2xl mx-auto text-center">
        <p className="text-gray-200 mb-4">Want to go further? Continue your journey with:</p>
        <ul className="space-y-2 text-gray-400 text-left inline-block">
          <li className="flex items-center gap-2"><FaCertificate className="inline text-[var(--color-brand-orange)]" /> Talent Navigator to discover new skill paths.</li>
          <li className="flex items-center gap-2"><FaCertificate className="inline text-[var(--color-brand-orange)]" /> CV Academy courses to sharpen your knowledge.</li>
          <li className="flex items-center gap-2"><FaCertificate className="inline text-[var(--color-brand-orange)]" /> Mentorship for guided growth.</li>
        </ul>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-lg bg-[#232323] border border-gray-600 hover:border-[var(--color-brand-orange)] transition block mx-auto"
        >
          Back to Home
        </button>
      </section>
    </main>
  );
};

export default ResultPage;
