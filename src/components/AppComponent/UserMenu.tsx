import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSignOutAlt, FaCog, FaQuestionCircle, FaMoon } from "react-icons/fa";

type User = {
  name: string;
  avatar: string;
  secondaryProfile?: string;
};

type UserMenuProps = {
  user: User;
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
          src={user.avatar}
          alt={user.name}
          className="w-9 h-9 rounded-full border-2 border-[var(--color-brand-orange)] cursor-pointer"
        />
        <FaChevronDown className="ml-1 text-gray-400 text-sm" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-20">
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-600"
            />
            <div>
              <p className="text-sm font-semibold text-white">{user.name}</p>
              {user.secondaryProfile && (
                <p className="text-xs text-gray-400">{user.secondaryProfile}</p>
              )}
            </div>
          </div>

          {/* Menu Options */}
          <ul className="py-2 text-sm text-gray-300">
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
              <FaCog /> Settings & Privacy
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
              <FaQuestionCircle /> Help & Support
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-2">
              <FaMoon /> Display & Accessibility
            </li>
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
