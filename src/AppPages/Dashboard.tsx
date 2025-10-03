import React from "react";
import { FaCheck, FaRobot, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";
import DashboardStatCard from "../components/AppComponent/DashboardStatCard";

// type User = {
//   name: string;
//   profilePic?: string;
//   plan: "free" | "rise" | "plus" | "elite";
//   points: number;
//   connections: number;
//   profileViews: number;
//   applications: number;
// };

import { User } from "../store/types/apiTypes";
import { useAuthStore } from "../store/authStore";
import useJobStore from "../store/job.store";
import useContestStore from "../store/contest.store";

const Dashboard: React.FC<{ user: User | null }> = ({ user }) => {
  // Protect this route: only allow authenticated users
  const { isLoggedIn, token } = useAuthStore();
  const isAuth = !!isLoggedIn || !!token;
  if (!isAuth) return <Navigate to="/signin" replace />;
  // use job store instead of local mock data
  const jobs = useJobStore(s => s.jobs);
  const getJobs = useJobStore(s => s.getJobs);
  const contests = useContestStore(s => s.contests);
  const getContests = useContestStore(s => s.getContests);

  React.useEffect(() => {
    getJobs().catch(e => console.error("Dashboard getJobs error:", e));
    getContests().catch(e => console.error("Dashboard getContests error:", e));
  }, [getJobs]);
  // const navigate = useNavigate();

  const challenges = [
    { id: 2, title: "Connect with 5 people", isCompleted: true },
    { id: 2, title: "Like 10 posts", isCompleted: true },
    { id: 3, title: "Post an update", isCompleted: true },
    { id: 4, title: "Participate in a challenge", isCompleted: false },
    { id: 5, title: "Apply to a job", isCompleted: false },
  ];

  const mockEvents = [
    {
      id: 1,
      title: "Tech Innovators Meetup",
      desc: "Connect with industry leaders and showcase your ideas.",
    },
    {
      id: 2,
      title: "AI in Careers Webinar",
      desc: "Learn how AI is transforming job opportunities.",
    },
    {
      id: 3,
      title: "Portfolio Masterclass",
      desc: "Build a portfolio that stands out to recruiters.",
    },
    {
      id: 4,
      title: "Virtual Hackathon",
      desc: "Team up to solve real-world problems in 48 hours.",
    },
  ];

  // contests are loaded from the contest store

  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/Data/products.json")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // const handleClick = (isUnlocked: boolean) => {
  //   if (!isUnlocked) navigate("/upgrade");
  // };

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans px-6 py-10">
      <div className="flex justify-between items-center gap-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="bg-[var(--color-brand-orange)] p-3 rounded-full">
          <FaRobot
            size={29}
            className="text-xl cursor-pointer hover:text-[var(--color-brand-orange)] transition"
          />
        </div>
      </div>
      {/* A. Welcome & Status Strip */}
      <section className="mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.full_name} 👋
            </h1>
            <p className="text-gray-400">
              Ready to create something big today?
            </p>
          </div>
        </div>

        {/* Quick Stat Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <DashboardStatCard
            value={49}
            label="Verse Points"
            color="bg-[var(--color-brand-orange)] text-white"
            subLabel="Activity up by 12% this month"
          />
          <DashboardStatCard
            value={user?.following?.length || 0}
            label="Connections"
            color="bg-white text-black"
            subLabel="+5 new connections"
            textColor="text-black"
          />
          <DashboardStatCard
            value={9}
            label="Profile Views"
            color="bg-white text-black"
            subLabel="Trending this week"
            textColor="text-black"
          />
          <DashboardStatCard
            value={10}
            label="Applications"
            color="bg-white text-black"
            subLabel="2 new jobs applied"
            textColor="text-black"
          />
        </div>
      </section>

      {/* B. Gamification */}
      <section className="mb-10 grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Weekly Mission</h2>
          <div className="p-6 rounded-xl bg-[#232323] border border-gray-700 min-h-[280px]">
            <div className="flex  items-center gap-2">
              <div className="flex-shrink-0">
                <FaTrophy
                  size={28}
                  className="text-[var(--color-brand-orange)]"
                />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-bold mb-1">
                  Complete 5 Challenges
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  Earn 50VP by participating in community.
                </p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-[var(--color-brand-orange)] h-4 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <ul className="mt-4 space-y-3">
                {challenges.map(challenge => (
                  <li key={challenge.id} className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-full border transition ${
                        challenge.isCompleted
                          ? "bg-green-500 border-green-500"
                          : "border-gray-500 bg-transparent"
                      }`}
                    >
                      {challenge.isCompleted && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </div>
                    {/* Title */}
                    <span
                      className={`text-sm ${
                        challenge.isCompleted
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {challenge.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Jobs For You</h2>
          <div className="p-6 bg-[#232323] rounded-xl border border-gray-700 min-h-[280px]">
            {jobs.slice(0, 3).map(job => (
              <div
                key={job.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1a1a1a] mb-3"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-xs text-gray-400">
                    {job.skillsRequired[0]} · {job.employmentType} ·{" "}
                    {job.skillLevel}
                  </p>
                </div>
                <button className="px-4 py-1 text-xs rounded-md bg-[var(--color-brand-orange)] text-black font-semibold">
                  Apply
                </button>
              </div>
            ))}
            <Link
              to="jobs"
              className="block text-center w-full bg-[var(--color-brand-orange)]/80 text-white py-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* A. Products You'll Love */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1} // full-width slide
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          {products.slice(0, 4).map(p => (
            <SwiperSlide key={p.id} className="!w-full">
              <div className="w-full bg-[#232323] border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-lg transition flex items-start gap-4 cursor-pointer">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 object-cover rounded-xl mb-4"
                />
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {p.name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      {p.description}
                    </p>
                  </div>
                  <Link
                    to={`product/${p.id}`}
                    className="px-4 py-2 bg-[var(--color-brand-orange)] text-black font-semibold rounded-lg hover:opacity-90 transition active:scale-95 block"
                  >
                    View
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* C. Quick Actions */}
      <section className="space-y-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="p-6 rounded-xl border border-gray-700 min-h-[280px] bg-transparent">
          {mockEvents.map(event => (
            <div
              key={event.id}
              className="px-3 py-3 mb-3 border-b border-gray-700 last:border-none flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-xs text-gray-400">{event.desc}</p>
              </div>
              <button className="px-4 py-1 text-xs rounded-md bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 transition active:scale-95">
                View Details
              </button>
            </div>
          ))}
          <Link
            to="events"
            className="block text-center w-full bg-[var(--color-brand-orange)]/80 text-white py-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer mt-3"
          >
            See All
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Hot Contest</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1} // full-width slide
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          {(contests || []).slice(0, 4).map((contest: any) => (
            <SwiperSlide key={contest.id} className="!w-full">
              <div className="w-full bg-[#232323] border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-lg transition flex items-start gap-4 cursor-pointer">
                <img
                  src={contest.cover}
                  alt={contest.title}
                  className="w-14 h-14 object-cover rounded-xl mb-4"
                />
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {contest.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      {contest.description}
                    </p>
                  </div>
                  <Link
                    to={`product/${contest.id}`}
                    className="px-4 py-2 bg-[var(--color-brand-orange)] text-black font-semibold rounded-lg hover:opacity-90 transition active:scale-95 block"
                  >
                    Join
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default Dashboard;
