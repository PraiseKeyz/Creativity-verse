import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/AppComponent/Sidebar";
import VerseNav from "../components/AppComponent/VerseNav";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MainApp = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/verse") {
      navigate("/verse/community");
    }
  }, [navigate]);

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen relative">
      <VerseNav />

      <div className="lg:container bg-[#1f1e1e] grid md:grid-cols-[270px_1fr] grid-cols-1 mx-auto relative">
        {/* Sidebar */}
        <div
          className={`h-screen transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 absolute md:static z-20`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="h-screen overflow-y-scroll custom-scrollbar pb-4">
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:hidden bg-[var(--color-brand-orange)] text-white p-2 rounded-full shadow-lg z-30"
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
