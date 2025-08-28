import React from "react";
import {  FaLock, FaUserCircle, FaBolt, FaUsers, FaBriefcase, FaTrophy, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  profilePic?: string;
  plan: "free" | "rise" | "plus" | "elite";
  points: number;
  connections: number;
  profileViews: number;
  applications: number;
};

type Feature = {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  allowedPlans: ("free" | "rise" | "plus" | "elite")[];
};

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  // Feature Grid
  const features: Feature[] = [
    { id: "posts", label: "Posts", description: "Share updates with the community.", icon: FaBolt, allowedPlans: ["free", "rise", "plus", "elite"] },
    { id: "portfolio", label: "Portfolio", description: "Showcase your best work.", icon: FaBriefcase, allowedPlans: ["rise", "plus", "elite"] },
    { id: "projects", label: "Projects", description: "Manage your creative projects.", icon: FaTrophy, allowedPlans: ["plus", "elite"] },
    { id: "creoai", label: "Creo AI", description: "AI assistant for elite users.", icon: FaRobot, allowedPlans: ["elite"] },
  ];

  // Quick Actions
  const quickActions: Feature[] = [
    { id: "update", label: "Post an Update", description: "Share your pulse with the community.", icon: FaBolt, allowedPlans: ["free", "rise", "plus", "elite"] },
    { id: "job", label: "Apply for a Job", description: "Find opportunities on VerseX.", icon: FaBriefcase, allowedPlans: ["free", "rise", "plus", "elite"] },
    { id: "challenge", label: "Join a Challenge", description: "Show your skills & compete.", icon: FaTrophy, allowedPlans: ["rise", "plus", "elite"] },
    { id: "community", label: "Community Space", description: "Exclusive access to groups.", icon: FaUsers, allowedPlans: ["plus", "elite"] },
  ];

  const handleClick = (isUnlocked: boolean) => {
    if (!isUnlocked) navigate("/upgrade");
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans px-6 py-10">
      {/* A. Welcome & Status Strip */}
      <section className="mb-10">
        <div className="flex items-center gap-4">
          {user.profilePic ? (
            <img src={user.profilePic} alt={user.name} className="w-16 h-16 rounded-full border-2 border-[var(--color-brand-orange)] object-cover" />
          ) : (
            <FaUserCircle className="w-16 h-16 text-gray-500" />
          )}
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name} 👋</h1>
            <p className="text-gray-400">Ready to create something big today?</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] font-semibold">
              {user.plan.toUpperCase()} MEMBER
            </span>
          </div>
        </div>

        {/* Quick Stat Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-[#232323] border border-gray-700 text-center">
            <p className="text-lg font-bold text-[var(--color-brand-orange)]">{user.points}</p>
            <p className="text-xs text-gray-400">Verse Points</p>
            {/* points earned through activities */}
          </div>
          <div className="p-4 rounded-xl bg-[#232323] border border-gray-700 text-center">
            <p className="text-lg font-bold text-[var(--color-brand-orange)]">{user.connections}</p>
            <p className="text-xs text-gray-400">Connections</p>
            {/* Number of people they follow and follow them back */}
          </div>
          <div className="p-4 rounded-xl bg-[#232323] border border-gray-700 text-center">
            <p className="text-lg font-bold text-[var(--color-brand-orange)]">{user.profileViews}</p>
            <p className="text-xs text-gray-400">Profile Views</p>
            {/* updates every 24hrs */}
          </div>
          <div className="p-4 rounded-xl bg-[#232323] border border-gray-700 text-center">
            <p className="text-lg font-bold text-[var(--color-brand-orange)]">{user.applications}</p>
            <p className="text-xs text-gray-400">Applications</p>
            {/* number of jobs they apply to */}
          </div>
        </div>
      </section>

      {/* B. Tier-Unlocked Feature Grid */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Your Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const isUnlocked = f.allowedPlans.includes(user.plan);
            return (
              <div
                key={f.id}
                className={`p-6 rounded-xl transition cursor-pointer ${
                  isUnlocked
                    ? "bg-[#1f1f1f] border border-[var(--color-brand-orange)]"
                    : "bg-[#232323] border border-gray-700 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => handleClick(isUnlocked)}
              >
                <div className="flex items-center gap-3 mb-3">
                  {isUnlocked ? <f.icon className="text-[var(--color-brand-orange)] text-xl" /> : <FaLock className="text-gray-500 text-xl" />}
                  <span className="font-semibold">{f.label}</span>
                </div>
                <p className="text-sm text-gray-400">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* C. Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((a) => {
            const isUnlocked = a.allowedPlans.includes(user.plan);
            return (
              <div
                key={a.id}
                className={`p-6 rounded-xl transition cursor-pointer ${
                  isUnlocked
                    ? "bg-[#1f1f1f] border border-[var(--color-brand-orange)]"
                    : "bg-[#232323] border border-gray-700 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => handleClick(isUnlocked)}
              >
                <div className="flex items-center gap-3 mb-3">
                  {isUnlocked ? <a.icon className="text-[var(--color-brand-orange)] text-xl" /> : <FaLock className="text-gray-500 text-xl" />}
                  <span className="font-semibold">{a.label}</span>
                </div>
                <p className="text-sm text-gray-400">{a.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. Personalized Recommendation Feed */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="space-y-4">
          {user.plan !== "free" && <div className="p-4 bg-[#232323] rounded-lg">🔥 Challenges You Can Join Now</div>}
          {["plus", "elite"].includes(user.plan) && <div className="p-4 bg-[#232323] rounded-lg">🎉 Events This Week</div>}
          {["plus", "elite"].includes(user.plan) && <div className="p-4 bg-[#232323] rounded-lg">🤝 Suggested Members to Connect With</div>}
          {user.plan === "elite" && <div className="p-4 bg-[#232323] rounded-lg">👑 Spotlight Stories & Interviews</div>}
          <div className="p-4 bg-[#232323] rounded-lg">💼 Jobs Matching Your Skills</div>
          <div className="p-4 bg-[#232323] rounded-lg">🛍️ Marketplace Picks for You</div>
        </div>
      </section>

      {/* E. Gamification Snapshot */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gamification</h2>
        <div className="p-6 bg-[#232323] rounded-xl border border-gray-700">
          <p className="font-bold text-lg">Verse Points: {user.points}</p>
          <p className="text-sm text-gray-400 mt-2">Complete weekly goals to earn more points!</p>
          {user.plan === "elite" && (
            <p className="mt-2 text-[var(--color-brand-orange)] font-medium">🎯 Elite Bonus Missions Available!</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
