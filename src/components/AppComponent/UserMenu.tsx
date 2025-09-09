import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSignOutAlt, FaCog, FaQuestionCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../../store/types/apiTypes";



type UserMenuProps = {
  user?: User | null;
  onLogout: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen(!open);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={toggleMenu}
        className="flex items-center focus:outline-none"
      >
        <img
          src={user?.info?.avatar || "https://via.placeholder.com/150"}
          alt={user?.first_name || "User Avatar"}
          className="w-9 h-9 rounded-full border-2 border-[var(--color-brand-orange)] cursor-pointer"
        />
        <FaChevronDown className="ml-1 text-gray-400 text-sm" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-20">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={user?.info?.avatar}
                alt={user?.first_name || "User Avatar"}
                className="w-10 h-10 rounded-full object-cover border border-gray-600"
              />
              <div>
                <p className="text-sm font-semibold text-white">{user?.full_name}</p>
                {user?.first_name && (
                  <p className="text-xs text-gray-400">{user.first_name}</p>
                )}
              </div>
            </div>
            <Link onClick={() => setOpen(!open)} to='dashboard' className="block text-center mt-5 w-full bg-[var(--color-brand-orange)]/80 text-white py-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer">
              Dashboard
            </Link>
          </div>

          {/* Menu Options */}
          <ul className="py-2 text-sm text-gray-300">
            <Link onClick={() => setOpen(!open)} to="user-profile">
              <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                <FaUser /> Profile
              </li>
            </Link>
            <Link to="settings" onClick={() => setOpen(!open)}>
              <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                <FaCog /> Settings & Privacy
              </li>
            </Link>
            <Link to="help-center" onClick={() => setOpen(!open)}>
              <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                <FaQuestionCircle /> Help & Support
              </li>
            </Link>
            {/* <Link >
              <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                <FaMoon /> Display & Accessibility
              </li>
            </Link> */}
            {/* This would later be updated to toggle on and off light mode and dark mode */}
            <li
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2 text-red-400"
              onClick={onLogout}
            >
              <FaSignOutAlt /> Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
