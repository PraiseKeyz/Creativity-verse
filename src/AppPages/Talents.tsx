// src/pages/Talents.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUserPlus, FaCrown } from "react-icons/fa";

type Plan = "free" | "rise" | "plus" | "elite";

type Talent = {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  headline?: string;
  category: string; // e.g., "UI/UX", "Frontend"
  skills: string[];
  projectsApproved: number;
  plan: Plan;
  location?: string;
};

const MOCK_TALENTS: Talent[] = [
  {
    id: "t1",
    firstname: "Sophia",
    lastname: "Martins",
    avatar:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&w=256&h=256&facepad=2",
    headline: "Senior UI/UX Designer",
    category: "UI/UX",
    skills: ["Figma", "Prototyping", "User Research"],
    projectsApproved: 42,
    plan: "elite",
    location: "Lagos, NG",
  },
  {
    id: "t2",
    firstname: "Amir",
    lastname: "Khan",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    headline: "Frontend Engineer",
    category: "Frontend",
    skills: ["React", "TypeScript", "Tailwind"],
    projectsApproved: 28,
    plan: "plus",
    location: "Remote",
  },
  {
    id: "t3",
    firstname: "Deborah",
    lastname: "A.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    headline: "Brand Strategist",
    category: "Branding",
    skills: ["Strategy", "Naming", "Workshops"],
    projectsApproved: 15,
    plan: "elite",
    location: "Accra, GH",
  },
  {
    id: "t4",
    firstname: "Kofi",
    lastname: "Mensah",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    headline: "Fullstack Developer",
    category: "Frontend",
    skills: ["Node.js", "React", "Databases"],
    projectsApproved: 6,
    plan: "rise",
    location: "Accra, GH",
  },
  {
    id: "t5",
    firstname: "Linda",
    lastname: "Okoye",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    headline: "Copywriter & Content Strategist",
    category: "Copywriting",
    skills: ["SEO", "Brand Voice", "Long-form"],
    projectsApproved: 8,
    plan: "elite",
    location: "Lagos, NG",
  },
  {
    id: "t6",
    firstname: "Rahul",
    lastname: "Sharma",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    headline: "Data Analyst",
    category: "Data",
    skills: ["SQL", "Python", "Tableau"],
    projectsApproved: 3,
    plan: "free",
    location: "Remote",
  },
  {
    id: "t7",
    firstname: "Grace",
    lastname: "Bello",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    headline: "Product Designer",
    category: "UI/UX",
    skills: ["Figma", "UX Research", "Interaction"],
    projectsApproved: 19,
    plan: "plus",
    location: "Lagos, NG",
  },
  {
    id: "t8",
    firstname: "Ethan",
    lastname: "Cole",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    headline: "Frontend Engineer",
    category: "Frontend",
    skills: ["React", "Next.js", "Performance"],
    projectsApproved: 33,
    plan: "elite",
    location: "Remote",
  },
  {
    id: "t9",
    firstname: "Maya",
    lastname: "Lopez",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    headline: "Brand & Identity Designer",
    category: "Branding",
    skills: ["Illustrator", "Logo", "Systems"],
    projectsApproved: 11,
    plan: "rise",
    location: "Nairobi, KE",
  },
  {
    id: "t10",
    firstname: "Olu",
    lastname: "Adebayo",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    headline: "Senior Frontend",
    category: "Frontend",
    skills: ["React", "Accessibility", "Testing"],
    projectsApproved: 26,
    plan: "elite",
    location: "Lagos, NG",
  },
];

const CATEGORIES = ["All", "UI/UX", "Frontend", "Copywriting", "Branding", "Data"];

const badgeClassForPlan = (plan: Plan) => {
  switch (plan) {
    case "elite":
      return "bg-gradient-to-r from-[var(--color-brand-orange)] to-yellow-400 text-black";
    case "plus":
      return "bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)]";
    case "rise":
      return "bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)]";
    default:
      return "bg-gray-800 text-gray-300";
  }
};

const Talents: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  // compute ranking for elites only
  const eliteRanking = useMemo(() => {
    const elites = MOCK_TALENTS.filter((t) => t.plan === "elite");
    elites.sort((a, b) => b.projectsApproved - a.projectsApproved);
    return elites.map((t, idx) => ({ id: t.id, rank: idx + 1 }));
  }, []);

  // filtered list based on category + search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = MOCK_TALENTS.filter((t) => {
      const catMatch = category === "All" ? true : t.category === category;
      const queryMatch =
        !q ||
        t.firstname.toLowerCase().includes(q) ||
        t.lastname.toLowerCase().includes(q) ||
        t.skills.join(" ").toLowerCase().includes(q) ||
        (t.headline || "").toLowerCase().includes(q);
      return catMatch && queryMatch;
    });

    // Among results, sort elites first by their ranking, then others by projectsApproved desc
    const elites = list.filter((l) => l.plan === "elite").sort((a, b) => b.projectsApproved - a.projectsApproved);
    const others = list.filter((l) => l.plan !== "elite").sort((a, b) => b.projectsApproved - a.projectsApproved);
    return [...elites, ...others];
  }, [category, query]);

  const rankFor = (id: string) => {
    const r = eliteRanking.find((e) => e.id === id);
    return r ? r.rank : null;
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">Top Talents</h1>
            <p className="text-gray-400 mt-1">Discover top creatives and tech talent — filtered by category and rank.</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or skill..."
                className="w-full md:w-80 px-4 py-2 rounded-lg bg-[#232323] border border-gray-700 placeholder-gray-400 outline-none focus:border-[var(--color-brand-orange)]"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-2 text-sm text-gray-400">Clear</button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
                    category === c ? "bg-[var(--color-brand-orange)] text-black" : "bg-[#232323] text-gray-300 border border-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((t) => {
            const rank = rankFor(t.id);
            const isElite = t.plan === "elite";
            return (
              <div key={t.id} className="bg-[#232323] p-4 rounded-xl border border-gray-700 shadow flex flex-col">
                <div className="relative">
                  <img
                    src={t.avatar}
                    alt={`${t.firstname} ${t.lastname}`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-800"
                  />
                  {isElite && (
                    <div className="absolute -right-1 -top-1 bg-white rounded-full p-1 shadow">
                      <FaCrown className="text-[var(--color-brand-orange)]" />
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{t.firstname} {t.lastname}</h3>
                        <p className="text-xs text-gray-400">{t.headline}</p>
                      </div>

                      <div className="text-right">
                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs ${badgeClassForPlan(t.plan)}`}>
                          <span className="font-semibold capitalize">{t.plan}</span>
                          {t.plan === "elite" && <FaCheckCircle className="ml-1 text-sm" />}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {t.location}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.skills.slice(0, 6).map((s) => (
                        <span key={s} className="px-2 py-1 text-xs rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-300">Projects approved</div>
                    <div className="text-lg font-bold text-[var(--color-brand-orange)]">{t.projectsApproved}</div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-400">Rank</div>
                    {rank ? (
                      <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-700/20 text-green-300 font-semibold">
                        #{rank}
                      </div>
                    ) : (
                      <div className="mt-1 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 text-gray-400">
                        —
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/profile/${t.id}`, { state: { talent: t } })}
                    className="flex-1 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-sm hover:border-[var(--color-brand-orange)] transition"
                  >
                    View
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-[var(--color-brand-orange)] text-black text-sm flex items-center gap-2">
                    <FaUserPlus /> Connect
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full bg-[#232323] p-6 rounded-xl border border-gray-700 text-center">
              <p className="text-gray-400">No talents found for this category or search. Try another filter.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Talents;
