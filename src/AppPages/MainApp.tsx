import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/AppComponent/Sidebar";
import VerseNav from "../components/AppComponent/VerseNav";
import { useEffect, useState } from "react";
import ChatBot from "../components/AppComponent/ChatBot";
import { useAuthStore } from "../store/authStore";

const MainApp = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (window.location.pathname === "/verse") {
      navigate("/verse/community");
    }

    const fetchCurrentUser = async () => {
      await currentUser();
    };

    fetchCurrentUser();
  }, [navigate, currentUser]);

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen relative">
      <ChatBot />
      <VerseNav />

      <div className="lg:container h-[calc(100vh-73px)] bg-[#1f1e1e] grid md:grid-cols-[270px_1fr] grid-cols-1 mx-auto relative">
        {/* Sidebar */}
        <div
          className={`h-[calc(100vh-73px)] transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 absolute md:static z-20`}
        >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Main content */}
        <div className=" overflow-y-scroll custom-scrollbar pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
