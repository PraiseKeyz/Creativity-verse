import { NavLink } from "react-router-dom"
import { FaUsers, FaBriefcase, FaBriefcaseMedical} from "react-icons/fa"


const VerseNav = () => {
  return (
    <div className="z-50 transition-all duration-300 text-white w-full h-fit shadow-lg border-b border-[var(--color-brand-orange)]/20">
        <ul id="dashboard-nav" className="flex items-center md:justify-between text-sm font-semibold">
            <NavLink to="community" className={({ isActive }) => `${isActive ? 'active' : ''} w-full`} >
                <li className="px-2 py-4 flex items-center justify-center gap-2">
                  <FaUsers className="text-xl" />
                  <span className="hidden md:block">The Verse</span>
                </li>
            </NavLink>
            <NavLink to="jobs" className={({ isActive }) => `${isActive ? 'active' : ''} w-full`}>
                <li className="px-2 py-4 flex items-center justify-center gap-2">
                  <FaBriefcase className="text-xl" />
                  <span className="hidden md:block">Job Hub</span>
                </li>
            </NavLink>
            <NavLink to="verse-x-jobs" className={({ isActive }) => `${isActive ? 'active' : ''} w-full`}>
                <li className="px-2 py-4 flex items-center justify-center gap-2">
                  <FaBriefcaseMedical className="text-xl" />
                  <span className="hidden md:block">Verse X</span>
                </li>
            </NavLink>
        </ul>
    </div>
  )
}

export default VerseNav
