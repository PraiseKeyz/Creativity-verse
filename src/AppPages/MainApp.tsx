import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/AppComponent/Sidebar";
import VerseNav from "../components/AppComponent/VerseNav";
import { useEffect, useState } from "react";
import ChatBot from "../components/AppComponent/ChatBot";
import { useAuthStore } from "../store/authStore";
import { CookieStorage } from "../store/cookie/cookieStorage";
import { FaComments, FaRobot } from "react-icons/fa";

// Migrate token from localStorage to cookie (if an auth flow wrote it to localStorage)
function migrateTokenFromLocalStorage() {
  try {
    const possible =
      localStorage.getItem("access_token") ||
      localStorage.getItem("auth_token");
    if (possible) {
      try {
        // try parse in case it's JSON
        const parsed = JSON.parse(possible);
        if (typeof parsed === "string") {
          CookieStorage.setItem("auth_token", parsed);
          if (import.meta.env.DEV)
            console.debug("[migrate] moved token from localStorage to cookie");
        } else {
          // if it's an object, leave as-is (not a token)
        }
      } catch (e) {
        // not JSON, assume raw string token
        CookieStorage.setItem("auth_token", possible);
        if (import.meta.env.DEV)
          console.debug(
            "[migrate] moved raw token from localStorage to cookie"
          );
      }
    }
  } catch (e) {
    // ignore
  }
}

const MainApp = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (window.location.pathname === "/verse") {
      navigate("/verse/community");
    }

    // Migrate idiosyncratic tokens saved to localStorage by other flows into cookie
    migrateTokenFromLocalStorage();

    const fetchCurrentUser = async () => {
      await currentUser();
    };

    fetchCurrentUser();
  }, [navigate, currentUser]);

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen relative">
      <div className="fixed bottom-26 right-6 z-50">
        <button
          onClick={() => navigate("/verse/creo-ai")}
          className="p-4 rounded-full bg-[var(--color-brand-orange)] text-black shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <FaRobot size={22} />
        </button>
      </div>
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
