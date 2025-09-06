import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaBriefcase, FaBriefcaseMedical, FaPlusCircle } from "react-icons/fa";
import logo from "../../assets/logo2.png";
import UserMenu from "./UserMenu";

const VerseNav = () => {
  const location = useLocation();
  const logoLink = location.pathname.startsWith("/verse") ? "community" : "/";
  const navigate = useNavigate();

  // sample user data
  const user = {
    name: "Edet John",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    secondaryProfile: "Cyberohn",
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <div className="lg:container mx-auto z-50 transition-all duration-300 text-white w-full h-fit shadow-lg border-b border-[var(--color-brand-orange)]/20 grid md:grid-cols-[270px_1fr] grid-cols-[1fr_6fr] items-center">
      {/* Logo */}
      <Link to={logoLink} className="flex items-center px-4">
        <img
          src={logo}
          alt="Logo"
          className="w-16 md:w-[7rem] h-16 md:h-[4.5rem] object-cover transition-transform duration-300"
        />
      </Link>

      {/* NavLinks + Actions */}
      <div className="flex items-center justify-between">
        {/* NavLinks */}
        <ul
          id="dashboard-nav"
          className="w-full flex flex-row items-center justify-center gap-6 text-sm font-semibold"
        >
          <li>
            <NavLink
              to="community"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} flex items-center gap-2 py-4 border-b-4 border-transparent rounded-sm`
              }
            >
              <FaUsers className="text-lg" />
              <span className="hidden md:inline">The Verse</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="jobs"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} flex items-center gap-2 py-4 border-b-4 border-transparent rounded-sm`
              }
            >
              <FaBriefcase className="text-lg" />
              <span className="hidden md:inline">Job Hub</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="verse-x-jobs"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} flex items-center gap-2 py-4 border-b-4 border-transparent rounded-sm`
              }
            >
              <FaBriefcaseMedical className="text-lg" />
              <span className="hidden md:inline">Verse X</span>
            </NavLink>
          </li>
        </ul>

        {/* Right-side Actions */}
        <div className="flex items-center gap-2 md:gap-4 pr-2">

          {/* Create Post */}
          <button
            title="Create Post"
            className="text-xl hover:text-[var(--color-brand-orange)] transition-colors"
            onClick={() => alert("Open Create Post Modal")}
          >
            <FaPlusCircle />
          </button>

          {/* User Menu */}
          <UserMenu user={user} onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default VerseNav;
