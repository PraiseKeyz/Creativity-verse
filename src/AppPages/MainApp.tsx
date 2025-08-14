import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import VerseNav from "../components/VerseNav"
import { useEffect } from "react"

const MainApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/verse/community');
  }, []);

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen ">
      <div className="lg:container bg-[#1f1e1e] grid md:grid-cols-[270px_1fr] grid-cols-[1fr_6fr] mx-auto relative ">

        {/* Sidebar: left column, full height */}
        <div className="h-full">
          <Sidebar />
        </div>

        {/* Main content: right column */}
        <div className="flex flex-col h-full overflow-hidden">
          { <VerseNav />}

          {/* Outlet below VerseNav */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  )
}

export default MainApp;
