import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaPalette, FaPowerOff, FaTrash } from "react-icons/fa";

const Settings = () => {
  const [form, setForm] = useState({
    firstName: "Sophia",
    lastName: "Martins",
    middleName: "",
    age: "24",
    sex: "female",
    email: "user@example.com",
    phone: "",
    notifications: true,
    twoFactor: false,
    theme: "dark",
    password: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="h-screen overflow-y-scroll custom-scrollbar bg-black py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
            Settings
          </h1>

        {/* Profile Settings */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 * 0.1  }}
        className="bg-[#1a1a1a] p-6 rounded-xl shadow space-y-4 border border-[var(--color-brand-orange)]/20">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            <FaUser /> Personal Information
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Middle Name (optional)</label>
              <input
                type="text"
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Sex</label>
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Add or edit phone"
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
          </div>
        </motion.section>

        {/* Password Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 * 0.1  }}
        className="bg-[#1a1a1a] p-6 rounded-xl shadow space-y-4 border border-[var(--color-brand-orange)]/20">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            <FaLock /> Change Password
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Current Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              />
            </div>
          </div>
        </motion.section>

        {/* Preferences */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 2 * 0.1  }}
        className="bg-[#1a1a1a] p-6 rounded-xl shadow space-y-4 border border-[var(--color-brand-orange)]/20">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            <FaPalette /> Preferences
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Theme</label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-[var(--color-brand-orange)]/40 rounded text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-sm text-gray-400">Enable Notifications</label>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                name="twoFactor"
                checked={form.twoFactor}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-sm text-gray-400">Enable Two-Factor Authentication (2FA)</label>
            </div>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 3 * 0.1  }}
        className="bg-[#1a1a1a] p-6 rounded-xl shadow space-y-6 border border-[var(--color-brand-orange)]/20">
          <div className="flex items-center gap-2 text-lg font-semibold text-red-500">
            <FaPowerOff /> Log out of your account
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Log Out
          </button>

          <div className="flex items-center gap-2 text-lg font-semibold text-red-500 pt-6 border-t border-gray-700">
            <FaTrash /> Delete Account
          </div>
          <p className="text-sm text-gray-400">
            Once you delete your account, all your data will be permanently removed. This action cannot be undone.
          </p>
          <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md">
            Delete My Account
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default Settings;
