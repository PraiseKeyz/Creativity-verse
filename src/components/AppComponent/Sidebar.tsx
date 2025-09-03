import { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import {
  FaDoorOpen,
  FaShieldAlt,
  FaPlusCircle,
  FaBell,
  FaUsers,
  FaLayerGroup,
  FaGraduationCap,
  FaBriefcase,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaCompass,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const DropdownItem = ({ to, label }: { to: string; label: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "active" : ""}  pl-10 pr-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors flex items-center gap-3`
      }
    >
      <FaChevronRight /> {label}
    </NavLink>
  );

  return (
    <div className="min-w-[16rem] h-screen p-4 shadow-lg border-r border-[var(--color-brand-orange)]/20 text-white flex flex-col items-stretch md:items-stretch bg-[#1a1a1a] relative">
      {/* Toggle Button (mobile only) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-1/2 -translate-y-1/2 -right-10 md:hidden bg-[var(--color-brand-orange)] text-white p-2 rounded-full shadow-lg z-30 "
      >
        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      <div className="flex-grow flex flex-col justify-between text-sm">
        <ul className="space-y-2">

          {/* Explore */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <button
              onClick={() => toggleDropdown("explore")}
              className="flex items-center justify-between w-full shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800"
            >
              <span className="flex items-center gap-3">
                <FaCompass className="text-xl" />
                <span>Explore</span>
              </span>
              {openDropdown === "explore" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "explore" && (
              <div className="mt-2 space-y-1">
                <DropdownItem to="marketplace" label="MarketPlace" />
                <DropdownItem to="contests" label="Contest" />
                <DropdownItem to="talents" label="Talents" />
              </div>
            )}
          </motion.div>
          
          {/* Create Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <button
              onClick={() => toggleDropdown("create")}
              className="flex items-center justify-between w-full shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800"
            >
              <span className="flex items-center gap-3">
                <FaPlusCircle className="text-xl" />
                <span >Create</span>
              </span>
              {openDropdown === "create" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "create" && (
              <div className="mt-2 space-y-1">
                <DropdownItem to="create/post" label="Post Update" />
                <DropdownItem to="create/project" label="Add Project" />
              </div>
            )}
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <NavLink to="notifications" className={({ isActive }) => (isActive ? "active" : "")}>
              <li className="flex items-center gap-3 shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
                <FaBell className="text-xl" />
                <span >Notifications</span>
              </li>
            </NavLink>
          </motion.div>

          {/* Refferal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <NavLink to="referral" className={({ isActive }) => (isActive ? "active" : "")}>
              <li className="flex items-center gap-3 shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
                <FaUsers className="text-xl" />
                <span >Referral</span>
              </li>
            </NavLink>
          </motion.div>

          {/* Lounges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <NavLink to="elite-lounge" className={({ isActive }) => (isActive ? "active" : "")}>
              <li className="flex items-center gap-3 shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
                <FaLayerGroup className="text-xl" />
                <span >Elite Lounge</span>
              </li>
            </NavLink>
          </motion.div>

          {/* Learn Dropdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
            <button
              onClick={() => toggleDropdown("learn")}
              className="flex items-center justify-between w-full shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800"
            >
              <span className="flex items-center gap-3">
                <FaGraduationCap className="text-xl" />
                <span >Learn</span>
              </span>
              {openDropdown === "learn" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "learn" && (
              <div className="mt-2 space-y-1">
                <DropdownItem to="learn/webinars" label="Webinars & Workshops" />
                <DropdownItem to="learn/creo-ai" label="Creo AI" />
                <DropdownItem to="learn/resources" label="Resources" />
              </div>
            )}
          </motion.div>

          {/* My Career Dropdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
            <button
              onClick={() => toggleDropdown("career")}
              className="flex items-center justify-between w-full shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800"
            >
              <span className="flex items-center gap-3">
                <FaBriefcase className="text-xl" />
                <span >My Career</span>
              </span>
              {openDropdown === "career" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "career" && (
              <div className="mt-2 space-y-1">
                <DropdownItem to="career/applications" label="My Applications" />
                <DropdownItem to="career/saved" label="Saved Opportunities" />
                <DropdownItem to="career/submissions" label="My Submissions" />
                <DropdownItem to="career/portfolio" label="Portfolio" />
                <DropdownItem to="career/orders" label="My Orders" />
              </div>
            )}
          </motion.div>
        </ul>

        {/* Bottom Links */}
        <ul className="">

          <Link to="privacy-policy">
            <li className="flex items-center gap-3 shadow-xl rounded-2xl p-3 mb-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
              <FaShieldAlt className="text-xl" />
              <span >Privacy Policy</span>
            </li>
          </Link>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="block w-full"
          >
            <li className="flex items-center gap-3 shadow-xl rounded-2xl p-3 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
              <FaDoorOpen className="text-xl" />
              <span >Log Out</span>
            </li>
          </motion.button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


