import React, { useState } from "react";
import {
  FaHandshake,
  FaBullhorn,
  FaUsers,
  FaRocket,
  FaLink,
  FaQuestionCircle,
  FaEnvelope,
  FaUniversity,
  FaHandsHelping,
  FaCubes,
  FaCheckCircle,
} from "react-icons/fa";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-[#232323] text-left hover:bg-[#2b2b2b] transition"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold">{question}</span>
        <span className="text-[var(--color-brand-orange)]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="px-4 py-3 text-gray-300 bg-[#1a1a1a]">{answer}</p>}
    </div>
  );
};

const PartnerPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <FaHandshake className="text-[var(--color-brand-orange)] text-5xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Partnerships That Create Impact</h1>
        <p className="text-gray-300 text-lg mb-6">
          At Creativity Verse, we believe the most powerful growth happens when visionaries join forces.
        </p>
        <button className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition">
          Become a Partner
        </button>
      </section>

      {/* Who We Partner With */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaUsers className="text-[var(--color-brand-orange)]" /> Who We Partner With
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <FaRocket />, label: "Startups & Tech Platforms" },
            { icon: <FaBullhorn />, label: "Brands & Agencies" },
            { icon: <FaUniversity />, label: "Educational Institutions & EdTechs" },
            { icon: <FaHandsHelping />, label: "Organizations & NGOs" },
            { icon: <FaCubes />, label: "Product Creators & Innovators" },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#232323] p-4 rounded-lg border border-gray-700 flex items-center gap-4">
              <span className="text-[var(--color-brand-orange)] text-xl">{item.icon}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Types of Partnerships - 2 Column Layout */}
      <section className="max-w-6xl mx-auto mb-16 grid md:grid-cols-2 gap-10 items-start">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaLink className="text-[var(--color-brand-orange)]" /> Types of Partnerships
        </h2>
        <ul className="space-y-4 text-gray-300">
          {[
            "Co-Branded Campaigns",
            "Webinar & Workshop Collaborations",
            "Event & Challenge Sponsorships",
            "Content Collaborations",
            "Innovation & AI Projects",
            "Community Programs",
            "Affiliate Partnerships",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="text-[var(--color-brand-orange)]" /> {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-4">Let’s Create Something Powerful Together</h2>
        <button className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition flex items-center gap-2 mx-auto">
          <FaEnvelope /> Fill the Partnership Form
        </button>
        <p className="mt-4 text-gray-500">
          Or email us at <span className="text-[var(--color-brand-orange)]">collab@creativityverse.com</span>
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaQuestionCircle className="text-[var(--color-brand-orange)]" /> FAQ
        </h2>
        <div className="space-y-4">
          <FAQItem
            question="Who can partner with Creativity Verse?"
            answer="Brands, NGOs, educational institutions, tech platforms, and visionary individuals who share our mission."
          />
          <FAQItem
            question="Is partnership paid or free?"
            answer="Depends on the collaboration. Some are value-based, others may require investment."
          />
          <FAQItem
            question="Can I pitch a unique idea?"
            answer="Absolutely — we’re open to innovative proposals."
          />
        </div>
      </section>
    </main>
  );
};

export default PartnerPage;
