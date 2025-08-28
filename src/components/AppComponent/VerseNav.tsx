import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaBriefcase, FaBriefcaseMedical } from "react-icons/fa";
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
    <div className="z-50 transition-all duration-300 text-white w-full h-fit shadow-lg border-b border-[var(--color-brand-orange)]/20 grid md:grid-cols-[270px_3fr_1fr] grid-cols-[1fr_3fr_1fr] items-center">
      {/* Logo */}
      <Link to={logoLink} className="flex items-center px-4">
        <img
          src={logo}
          alt="Logo"
          className="w-16 md:w-[7rem] h-16 md:h-[4.5rem] object-cover transition-transform duration-300"
        />
      </Link>

      {/* NavLinks */}
      <ul
        id="dashboard-nav"
        className="flex flex-row items-center justify-center gap-6 text-sm font-semibold w-full"
      >
        <NavLink
          to="community"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} flex items-center gap-2`
          }
        >
          <FaUsers className="text-lg" />
          <span className="hidden md:inline">The Verse</span>
        </NavLink>

        <NavLink
          to="jobs"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} flex items-center gap-2`
          }
        >
          <FaBriefcase className="text-lg" />
          <span className="hidden md:inline">Job Hub</span>
        </NavLink>

        <NavLink
          to="verse-x-jobs"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} flex items-center gap-2`
          }
        >
          <FaBriefcaseMedical className="text-lg" />
          <span className="hidden md:inline">Verse X</span>
        </NavLink>
      </ul>

      {/* User Menu */}
      <div className="flex justify-end px-4">
        <UserMenu user={user} onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default VerseNav;
