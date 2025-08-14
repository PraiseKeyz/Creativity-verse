import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserTie, FaBullhorn, FaUsers, FaUserCheck, FaStar, FaChalkboardTeacher, FaFileAlt } from "react-icons/fa";

// Icon mapping for service titles
const iconMap: { [key: string]: React.ReactNode } = {
  "Talent Matchmaking & Hiring": <FaUserTie className="text-3xl text-[var(--color-brand-orange)]" />,
  "Brand Promotion & Sponsorship": <FaBullhorn className="text-3xl text-[var(--color-brand-orange)]" />,
  "Creative Studio Services": <FaUsers className="text-3xl text-[var(--color-brand-orange)]" />,
  "Verified Talent Program": <FaUserCheck className="text-3xl text-[var(--color-brand-orange)]" />,
  "Creativity Verse Pro": <FaStar className="text-3xl text-[var(--color-brand-orange)]" />,
  "Direct Mentorship": <FaChalkboardTeacher className="text-3xl text-[var(--color-brand-orange)]" />,
  "Resume & Portfolio Services": <FaFileAlt className="text-3xl text-[var(--color-brand-orange)]" />,
};

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'brand' | 'individual'>('all');

  // Fetch services data from JSON file to reduce file size and improve code readability
  useEffect(() => {
    fetch('Data/services.json')
      .then((res) => res.json())
      .then((data) => setServices(data.services || []));
  }, []);
  

  const filtered = services.filter((s) =>
    activeTab === 'all' ? true : s.type === activeTab
  );

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center min-h-[60vh] py-30 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute w-[150%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-bl from-[var(--color-brand-orange)]/10 via-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6"
            >
              Tools, Support, and Opportunities All in One Creative Ecosystem.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-[var(--color-surface-light)]/80"
            >
              Unlock premium tools, join exclusive programs, and elevate your creative journey.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'brand', 'individual'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'all' | 'brand' | 'individual')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${activeTab === tab
                ? 'bg-[var(--color-brand-orange)] text-[var(--color-text-dark)]'
                : 'bg-[var(--color-brand-orange)]/10 text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/20'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filtered.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-[var(--color-brand-orange)]/10 flex flex-col"
            >
              <div className=" mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-brand-orange)]/10 flex items-center justify-center group-hover:bg-[var(--color-brand-orange)]/20 transition-all duration-300">
                  {iconMap[service.title] || <FaStar className="text-3xl text-[var(--color-brand-orange)]" />}
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-surface-light)]">
                  {service.title}
                </h3>
              </div>
              <p className="text-[var(--color-surface-light)]/70 mb-6 flex-1">{service.overview}</p>
              <Link to={`/services/service/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`} className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--color-brand-orange)] text-[var(--color-text-dark)] rounded-lg font-semibold hover:bg-[var(--color-brand-orange)]/90 transition-colors w-full cursor-pointer"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;