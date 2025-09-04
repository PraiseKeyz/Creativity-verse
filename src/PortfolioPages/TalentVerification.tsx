import React from "react";
import { FaStar, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const TalentVerification: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#181818] text-white ">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-8 md:py-12 lg:py-16 overflow-hidden text-center">
        <div className="mx-auto">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <FaStar className="text-[var(--color-brand-orange)]" /> Talent Showcase – Creativity Verse
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Get Seen. Get Discovered. Get Opportunities. <br />
            Your creative stage inside the Creativity Verse ecosystem.
          </p>
          <button className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition flex items-center gap-2 mx-auto">
            Secure Your Spot Today <FiArrowRight />
          </button>
        </div>
      </section>

      {/* Why Join */}
      <section className="mb-12 container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Why Join Talent Showcase?</h2>
        <p className="text-gray-400 mb-6">
          In today’s crowded digital space, visibility is everything. Whether
          you’re a freelancer, creative, remote worker, or emerging professional,
          the Talent Showcase puts you in front of the right eyes — brands,
          collaborators, and clients who are actively looking for talent like you.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            "A Featured Spot on the Creativity Verse Talent Page",
            "Direct Link to Your Profile for Easy Contact",
            "Higher Visibility to Brands & Collaborators",
            "Eligible for Spotlights & Sponsored Features",
            "Access to Pre-Launch Beta Tools & Features",
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#232323] rounded-lg border border-gray-700 shadow flex items-start gap-3"
            >
              <FaCheckCircle className="text-[var(--color-brand-orange)] mt-1" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12 container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
          <li>Complete your profile setup</li>
          <li>Apply for Verification</li>
          <li>Pay ₦2,500 / $3 Securely – Via card, transfer, crypto, or USSD.</li>
          <li>We Review Your Profile Within 48 Hours</li>
          <li>You Go Live – Your profile appears on the Talent Page</li>
        </ol>
      </section>

      {/* Why It Matters */}
      <section className="mb-12 container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Why It Matters</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>You’re Discoverable — brands and collaborators can find you directly.</li>
          <li>Your Work Speaks for You — showcase your best projects and skills.</li>
          <li>Digital Networking on Autopilot — even while you sleep.</li>
          <li>More Opportunities — visibility increases chances of gigs & recognition.</li>
        </ul>
      </section>

      {/* Requirements */}
      <section className="mb-12 container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">What’s Required?</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>A complete CV profile</li>
          <li>Links to portfolio, LinkedIn, Instagram/Threads, GitHub, or website</li>
          <li>Evidence of one or more works or projects done</li>
          <li>Short bio + your niche or industry</li>
          <li>Processing time: 24–48 hours</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="mb-12 container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
        <blockquote className="p-6 bg-[#232323] rounded-xl border border-gray-700 italic text-gray-300 relative">
          <FaQuoteLeft className="absolute top-4 left-4 text-[var(--color-brand-orange)] text-xl" />
          <p className="pl-8">
            "After my profile went live on the Talent Page, I got 3 DMs from potential
            collaborators in just one week!"
          </p>
          <footer className="mt-3 text-right font-semibold">
            — Deborah A., Brand Strategist
          </footer>
        </blockquote>
      </section>

      {/* Pricing */}
      <section className="mb-12 container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
        <p className="text-gray-300 mb-4">
          One-time Fee: <span className="font-bold">₦2,500 / $3</span> <br />
          Includes profile review, talent page listing, and lifetime feature. No
          renewal needed.
        </p>
        <button className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition flex items-center gap-2 mx-auto">
          Get Verified Now <FiArrowRight />
        </button>
      </section>

      {/* Footer CTA */}
      <section className="text-center container mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Put your talent where the world can see it.
        </h2>
        <p className="text-gray-400 mb-6">
          Important: Only verified users are eligible for sponsorship access, beta
          programs, and digital spotlight features.
        </p>
        <a
          href="mailto:connect@mycreativityverse.com"
          className="text-[var(--color-brand-orange)] underline"
        >
          Need help? Contact the CV Team
        </a>
      </section>
    </main>
  );
};

export default TalentVerification;
