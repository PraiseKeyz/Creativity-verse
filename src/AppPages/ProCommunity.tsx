import React from "react";
import { FaBell, FaGift, FaCrown, FaSync, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import DiscountSlider from "../components/AppComponent/DiscountSlider";
import StatCard from "../components/AppComponent/StatCard";
import WebinarCard from "../components/AppComponent/WebinarCard";

const ProCommunity: React.FC = () => {
  return (
    <main
      className=" bg-[var(--color-text-dark)]"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 p-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
          Pro Dashboard
        </h1>
      </div>
      <div className="max-w-7xl mx-auto space-y-10 p-4">

        {/* Stats Overview */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 * 0.1  }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard accent={true} icon={<FaUsers />} label="Projects Completed" value="24" />
            <StatCard accent={false} icon={<FaCrown />} label="Community Rank" value="Top 10%" />
            <StatCard accent={false} icon={<FaGift />} label="Referral Earnings" value="$150" />
            <StatCard accent={true} icon={<FaSync />} label="Subscription Left" value="12 days" />
        </motion.section>

        {/* Notifications */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 * 0.1  }}
          className="p-6 rounded-xl shadow border border-[var(--color-brand-orange)]/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            <FaBell className="text-[var(--color-brand-orange)]" />
          </div>
          <ul className="space-y-3 text-sm text-gray-200">
            <li className="flex justify-between items-center border-b pb-2 border-[var(--color-brand-orange)]/20">
              <span>New creative workshop: Branding Masterclass.</span>
              <button className="text-[var(--color-brand-orange)] text-xs">View</button>
            </li>
            <li className="flex justify-between items-center border-b pb-2 border-[var(--color-brand-orange)]/20">
              <span>Your contest entry “UI Design Sprint” got 45 votes.</span>
              <button className="text-[var(--color-brand-orange)] text-xs">View</button>
            </li>
            <li className="flex justify-between items-center border-[var(--color-brand-orange)]/20">
              <span>Subscription renewal in 12 days.</span>
              <button className="text-[var(--color-brand-orange)] text-xs">Renew</button>
            </li>
          </ul>
        </motion.section>

        {/* Discount & Renewal */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 2 * 0.1  }}
        >
          <DiscountSlider />
        </motion.section>

        {/* Upcoming Webinars */}
        <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 3 * 0.1  }}
        className="border border-[var(--color-brand-orange)]/40 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Webinars</h2>
          <div className="space-y-4">
            <WebinarCard
              title="Building Scalable UI with React"
              date="Aug 10, 2025"
              time="5:00 PM GMT"
            />
            <WebinarCard
              title="AI & Creativity: The Future"
              date="Aug 15, 2025"
              time="7:00 PM GMT"
            />
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default ProCommunity;