import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/AppComponent/Sidebar";
import VerseNav from "../components/AppComponent/VerseNav";
import { useEffect, useState } from "react";
import ChatBot from "../components/AppComponent/ChatBot";

const MainApp = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/verse") {
      navigate("/verse/community");
    }
  }, [navigate]);

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen relative">
      <ChatBot />
      <VerseNav />

      <div className="lg:container bg-[#1f1e1e] grid md:grid-cols-[270px_1fr] grid-cols-1 mx-auto relative">
        {/* Sidebar */}
        <div
          className={`h-screen transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 absolute md:static z-20`}
        >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Main content */}
        <div className="h-screen overflow-y-scroll custom-scrollbar pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
