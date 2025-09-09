import React, { JSX, useState } from "react";
import { FaBell, FaHeart, FaReply, FaBriefcase, FaTrophy, FaAt } from "react-icons/fa";

type Notification = {
  id: number;
  type: "like" | "reply" | "job" | "contest" | "mention";
  message: string;
  time: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  { id: 1, type: "like", message: "Alex liked your post.", time: "2m ago", read: false },
  { id: 2, type: "reply", message: "Jane replied to your comment.", time: "10m ago", read: false },
  { id: 3, type: "job", message: "New job alert: Frontend Developer at TechNova.", time: "1h ago", read: false },
  { id: 4, type: "contest", message: "⚡ UI Design Contest starts tomorrow!", time: "3h ago", read: true },
  { id: 5, type: "mention", message: "Chris mentioned you in a post.", time: "5h ago", read: false },
];

const iconMap: Record<Notification["type"], JSX.Element> = {
  like: <FaHeart className="text-pink-500" />,
  reply: <FaReply className="text-blue-400" />,
  job: <FaBriefcase className="text-green-500" />,
  contest: <FaTrophy className="text-yellow-500" />,
  mention: <FaAt className="text-purple-400" />,
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Mark single notification as read
  const handleClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans px-6 py-12">
      <section className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaBell className="text-[var(--color-brand-orange)]" /> Notifications
          </h1>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm px-4 py-2 bg-[#232323] border border-gray-700 rounded-lg hover:border-[var(--color-brand-orange)] transition"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleClick(notif.id)}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${
                notif.read
                  ? "bg-[#232323] border-gray-700 text-gray-400"
                  : "bg-[#2a2a2a] border-[var(--color-brand-orange)] shadow-md"
              }`}
            >
              {/* Icon */}
              <div className="text-xl">{iconMap[notif.type]}</div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-medium">{notif.message}</p>
                <span className="text-sm text-gray-500">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Notifications;
