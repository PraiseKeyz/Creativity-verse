import  { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Creativity Verse?",
    answer:
      "Creativity Verse is a digital ecosystem and community empowering freelancers, entrepreneurs, content creators, and tech enthusiasts through mentorship, services, opportunities, and collaboration.",
  },
  {
    question: "Who is Creativity Verse for?",
    answer:
      "Whether you're a freelancer, entrepreneur, brand, or creator — Creativity Verse is your launchpad to grow, collaborate, and thrive in the digital space.",
  },
  {
    question: "What do I get by joining the community?",
    answer:
      "Access to a vibrant community, mentorship, weekly insights, opportunities, events, challenges, and a full support system for your creative journey.",
  },
  {
    question: "What services does Creativity Verse offer?",
    answer:
      "We offer branding, social media management, design/video production, website development, and creative strategy through CV Pro service packages.",
  },
  {
    question: "What is Creativity Verse Pro?",
    answer:
      "CV Pro is our premium offering — designed to elevate your brand, grow your presence, and connect you with tools and talent.",
  },
  {
    question: "What kind of resources are available?",
    answer:
      "Our Resource Hub includes curated toolkits, free eBooks, course recommendations, and creative templates.",
  },
  {
    question: "How do I join the community?",
    answer:
      "Join our WhatsApp community, follow us on Instagram & LinkedIn, or sign up via the website to get member-only updates.",
  },
  {
    question: "What is the 'Get Mentored' program?",
    answer:
      "Our mentorship track connects you with professionals who guide, support, and sharpen your creative career.",
  },
  {
    question: "How do I request a service or partnership?",
    answer:
      "Contact us via hello@creativityverse.com or use our Project Request form on the website.",
  },
  {
    question: "Can I collaborate with Creativity Verse?",
    answer:
      "Yes! We welcome guest contributions, event speakers, brand collabs, and community initiatives.",
  },
  {
    question: "Are there any paid features?",
    answer:
      "Yes — CV Pro, mentorship, and some services are premium. See our Pricing Page for tailored options in USD or NGN.",
  },
  {
    question: "How do you verify talent?",
    answer:
      "We assess portfolios, consistency, originality, and brand alignment to ensure trust and collaboration quality.",
  },
  {
    question: "Where can I stay updated?",
    answer:
      "Follow us on Instagram, LinkedIn, WhatsApp, or subscribe to our weekly email updates.",
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="h-screen overflow-y-scroll custom-scrollbar bg-black py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Get answers to common questions about Creativity Verse
          </p>
        </div>

        <section className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1  }}
              key={index}
              className="bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-[#262626]"
              >
                <span className="font-medium text-white text-base">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-[var(--color-brand-orange)]" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-sm text-gray-300">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </section>

        <div className="text-center pt-10">
          <p className="text-gray-500 text-sm">
            Still need help? <a href="/contact" className="text-[var(--color-brand-orange)] hover:underline">Contact our team</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default HelpCenter;