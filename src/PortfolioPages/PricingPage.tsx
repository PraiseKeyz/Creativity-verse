import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  highlighted = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative flex flex-col justify-between p-8 rounded-2xl shadow-lg border transition-all ${
        highlighted
          ? "border-[var(--color-brand-orange)] bg-[#1f1f1f]"
          : "border-gray-700 bg-[#232323]"
      }`}
    >
      {highlighted && (
        <span className="absolute top-4 right-4 text-xs bg-[var(--color-brand-orange)] text-black font-semibold px-3 py-1 rounded-full">
          Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
      <div className="text-4xl font-extrabold text-[var(--color-brand-orange)] mt-4">
        {price}
      </div>
      <ul className="mt-6 space-y-3 text-gray-300">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <FaCheckCircle className="text-[var(--color-brand-orange)]" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-8 bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 text-black py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer">
        Get Started
      </button>
    </motion.div>
  );
};

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-700 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-white font-medium">{question}</span>
        <span className="text-[var(--color-brand-orange)]">
          {open ? "-" : "+"}
        </span>
      </button>
      {open && <p className="mt-2 text-gray-400">{answer}</p>}
    </div>
  );
};

const PricingPage: React.FC = () => {
  // Comparison data for CV Rise, CV Plus, CV Elite
  const comparisonRows = [
    { feature: "Unlimited Posts", rise: true, plus: true, elite: true },
    { feature: "0% Service Fee", rise: true, plus: true, elite: true },
    { feature: "Verified Profile Badge", rise: true, plus: true, elite: true },
    { feature: "Access to VerseX (Global Gig Feed)", rise: true, plus: true, elite: true },
    { feature: "Pro Resource Vault", rise: false, plus: true, elite: true },
    { feature: "Trainings & Webinars", rise: false, plus: true, elite: true},
    { feature: "Recommendations by CV Team", rise: false, plus: true, elite: true },
    { feature: "DM Access to Verified Members", rise: false, plus: true, elite: true },
    { feature: "Community Spotlight Feature", rise: false, plus: true, elite: true },
    { feature: "Discounts on Services", rise: false, plus: true, elite: true },
    { feature: "Personal AI Assistant", rise: false, plus: false, elite: true },
    { feature: "Analytics Dashboard", rise: false, plus: false, elite: true },
    { feature: "Invoice Generator", rise: false, plus: false, elite: true },
    { feature: "Elite Mastermind Lounge", rise: false, plus: false, elite: true },
    { feature: "Growth Roadmap & Priority Support", rise: false, plus: false, elite: true },
    { feature: "Physical Bonuses & Swag", rise: false, plus: false, elite: true },
  ];
  return (
    <main className="bg-[#181818] min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 bg-clip-text text-transparent"
        >
          CV Premium
        </motion.h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Unlock exclusive tools, insights, and opportunities designed for
          creatives and techies. Choose your plan and start growing today.
        </p>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        <PricingCard
          title="CV Rise"
          price="$9/mo"
          description="Best for beginners and rising talents who want visibility and essential tools."
          features={[
            "0% Service Fee",
            "Basic Verified CV Profile Badge",
            "Access to Jobs on VerseX",
            "Access to CV Rise Lounge",
          ]}
        />
        <PricingCard
          title="CV Plus"
          price="$29/mo"
          description="For serious creatives who want exposure, growth, and better opportunities."
          features={[
            "Everything in CV Rise",
            "Access to Personal Projects",
            "Premium Access to Paid Events",
            "Spotlight Feature in Community",
            "DM Access to Verified Members",
            "Access to CV Plus Lounge",
          ]}
          highlighted
        />
        <PricingCard
          title="CV Elite"
          price="$59/mo"
          description="For top-tier creators & professionals who want elite exposure, automation, and career tools."
          features={[
            "Everything in CV Plus",
            "Personal AI Chatbot Assistant",
            "Analytics Dashboard",
            "Early Bird Access to Beta Products",
            "Access to CV Elite Lounge",
          ]}
        />
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 max-w-6xl mx-auto overflow-x-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Compare Plans
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-4 text-gray-400">Features</th>
              <th className="p-4 text-center">CV Rise</th>
              <th className="p-4 text-center">CV Plus</th>
              <th className="p-4 text-center">CV Elite</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {comparisonRows.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-800 ${
                  idx % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#232323]"
                }`}
              >
                <td className="p-4">{row.feature}</td>
                <td className="p-4 text-center">
                  {typeof row.rise === "boolean"
                    ? row.rise
                      ? <FaCheckCircle className="text-[var(--color-brand-orange)] inline" />
                      : "—"
                    : row.rise}
                </td>
                <td className="p-4 text-center">
                  {typeof row.plus === "boolean"
                    ? row.plus
                      ? <FaCheckCircle className="text-[var(--color-brand-orange)] inline" />
                      : "—"
                    : row.plus}
                </td>
                <td className="p-4 text-center">
                  {typeof row.elite === "boolean"
                    ? row.elite
                      ? <FaCheckCircle className="text-[var(--color-brand-orange)] inline" />
                      : "—"
                    : row.elite}
                </td>
              </tr>
            ))}
            {/* CTA Row */}
            <tr className="bg-[#181818]">
              <td className="p-4 font-bold text-right text-gray-400">&nbsp;</td>
              <td className="p-4 text-center">
                <button className="bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 text-black py-2 px-5 rounded-lg font-semibold hover:opacity-90 transition">Join</button>
              </td>
              <td className="p-4 text-center">
                <button className="bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 text-black py-2 px-5 rounded-lg font-semibold hover:opacity-90 transition">Join</button>
              </td>
              <td className="p-4 text-center">
                <button className="bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 text-black py-2 px-5 rounded-lg font-semibold hover:opacity-90 transition">Join</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <FAQItem
          question="Can I upgrade my plan later?"
          answer="Yes! You can upgrade or downgrade your plan at any time from your dashboard."
        />
        <FAQItem
          question="Is there a free trial?"
          answer="We currently offer a 7-day free trial for new users."
        />
        <FAQItem
          question="What payment methods do you accept?"
          answer="We accept credit cards, debit cards, and PayPal."
        />
      </section>

      {/* Final CTA */}
      <section className="text-center py-16 bg-[#1f1f1f] border-t border-gray-700">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Elevate Your Creativity?
        </h2>
        <p className="text-gray-400 mb-6">
          Join CV Premium and unlock the full experience.
        </p>
        <button className="bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 text-black py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition">
          Subscribe Now
        </button>
      </section>
    </main>
  );
};

export default PricingPage;
