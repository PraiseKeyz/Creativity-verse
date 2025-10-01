import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaUsers,
  FaClock,
  FaTrophy,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";

type ContestStatus = "live" | "upcoming" | "ended" | string;

type Contest = {
  id: string;
  title: string;
  cover: string;
  description: string;
  prizePool: number;
  entryFee: number;
  participants: number;
  maxParticipants: number;
  deadline: string; // ISO
  status: ContestStatus;
  tags: string[];
};
import useContestStore from "../store/contest.store";

type SortKey = "default" | "prize" | "deadline" | "popularity";

const ContestPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<ContestStatus | "all">(
    "all"
  );
  const [activeTag, setActiveTag] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [query, setQuery] = useState("");
  // contest store
  const {
    contests: storeContests,
    isLoading,
    error,
    getContests,
  } = useContestStore();

  // derive tags from fetched contests
  const tags = useMemo(() => {
    const all = storeContests.flatMap(c => c.tags || []);
    return ["All", ...Array.from(new Set(all))];
  }, [storeContests]);

  // filtered & sorted list
  const contests = useMemo(() => {
    let list = [...storeContests];

    if (statusFilter !== "all") {
      list = list.filter(c => c.status === statusFilter);
    }

    if (activeTag !== "All") {
      list = list.filter(c => c.tags.includes(activeTag));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "prize":
        list.sort((a, b) => b.prizePool - a.prizePool);
        break;
      case "deadline":
        list.sort(
          (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
        break;
      case "popularity":
        list.sort((a, b) => b.participants - a.participants);
        break;
      default:
        break;
    }

    return list;
  }, [storeContests, statusFilter, activeTag, sortBy, query]);

  // fetch contests once on mount (do client-side tag filtering)
  useEffect(() => {
    getContests().catch(() => {
      /* errors are handled in store */
    });
  }, []);

  return (
    <main
      className="h-screen overflow-y-scroll custom-scrollbar bg-black py-10 px-4"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title / search / sort */}
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
              Contests
            </h1>
            <p className="text-gray-300 text-sm">
              Join live challenges, win prizes, and level up your craft.
            </p>
          </div>
        </section>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search contests…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-white rounded-lg px-3 py-2 text-sm border border-gray-200"
          />

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortKey)}
            className="bg-white rounded-lg px-3 py-2 text-sm border border-gray-200"
          >
            <option value="default">Sort by</option>
            <option value="prize">Prize (High → Low)</option>
            <option value="deadline">Closest Deadline</option>
            <option value="popularity">Most Participants</option>
          </select>
        </div>

        {/* Status filter */}
        <section className="flex flex-wrap gap-2">
          {(["all", "live", "upcoming", "ended"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                statusFilter === s
                  ? "bg-[var(--color-brand-orange)] text-white border-[var(--color-brand-orange)]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </section>

        {/* Tag pills */}
        <section className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1 border ${
                activeTag === t
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <FaTag className="text-[10px]" /> {t}
            </button>
          ))}
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {contests.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-16">
              No contests match your filters.
            </div>
          )}

          {contests.map((contest, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ContestCard key={contest.id} contest={contest} />
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ContestPage;

/* ---------------------- Card ---------------------- */

const ContestCard: React.FC<{ contest: Contest }> = ({ contest }) => {
  const full = contest.participants >= contest.maxParticipants;
  const ended = contest.status === "ended";

  const timeLeft = getTimeRemainingString(contest.deadline);
  const progress = (contest.participants / contest.maxParticipants) * 100;

  const badgeStyles: Record<ContestStatus, string> = {
    live: "bg-green-100 text-green-700",
    upcoming: "bg-blue-100 text-blue-700",
    ended: "bg-gray-200 text-gray-500",
  };

  return (
    <article className="border border-[var(--color-brand-orange)]/20 bg-black p-4 mb-6 text-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={contest.cover}
          alt={contest.title}
          className="w-full h-44 object-cover"
        />
        <span
          className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium ${
            badgeStyles[contest.status]
          }`}
        >
          {contest.status.toUpperCase()}
        </span>
        {full && !ended && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            FULL
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white">{contest.title}</h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {contest.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {contest.tags.map(tag => (
            <span
              key={tag}
              className="text-xs bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Prize + Entry */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-[var(--color-brand-orange)]/20 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-white">
              <FaCrown /> Prize Pool
            </div>
            <div className="font-semibold text-gray-500">
              ${contest.prizePool.toLocaleString()}
            </div>
          </div>

          <div className="bg-[var(--color-brand-orange)]/20 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-white">
              <FaTrophy /> Entry Fee
            </div>
            <div className="font-semibold text-gray-500">
              {contest.entryFee === 0 ? "Free" : `$${contest.entryFee}`}
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaUsers /> {contest.participants}/{contest.maxParticipants}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {ended ? "Ended" : timeLeft}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-[var(--color-brand-orange)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={ended || full}
          className={`mt-5 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
            ended || full
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[var(--color-brand-orange)] text-white hover:bg-black"
          }`}
        >
          {ended ? "Contest Ended" : full ? "Contest Full" : "Join Contest"}
          {!ended && !full && <FaCheckCircle />}
        </button>
      </div>
    </article>
  );
};

/* ---------------------- utils ---------------------- */

function getTimeRemainingString(deadlineISO: string) {
  const diff = new Date(deadlineISO).getTime() - Date.now();
  if (diff <= 0) return "0h 0m";

  const minutes = Math.floor(diff / 60000);
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
