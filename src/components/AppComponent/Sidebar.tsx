import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaShoppingCart, FaUserFriends, FaTrophy, FaCog, FaQuestionCircle, FaShieldAlt, FaLightbulb, FaDoorOpen, FaThLarge } from "react-icons/fa";

const navLinks = [
  { to: "community", icon: <FaLightbulb className="text-xl" />, label: "The Verse" },
  { to: "dashboard", icon: <FaThLarge className="text-xl" />, label: "Dashboard" },
  { to: "user-profile", icon: <FaUser className="text-xl" />, label: "Profile" },
  { to: "marketplace", icon: <FaShoppingCart className="text-xl" />, label: "Market Place" },
  { to: "referral", icon: <FaUserFriends className="text-xl" />, label: "Referral" },
  { to: "contests", icon: <FaTrophy className="text-xl" />, label: "Contest" },
];

const bottomLinks = [
  { to: "settings", icon: <FaCog className="text-xl" />, label: "Settings" },
  { to: "help-center", icon: <FaQuestionCircle className="text-xl" />, label: "Help Center" },
  { to: "privacy-policy", icon: <FaShieldAlt className="text-xl" />, label: "Privacy Policy" }
];

const Sidebar = () => {


  return (
    <div className="w-fit md:w-full h-screen p-4 shadow-lg border-r border-[var(--color-brand-orange)]/20 text-white flex flex-col items-start md:items-stretch">

        <div className="flex-grow flex flex-col justify-between text-sm">
            <ul>
              {navLinks.map(({ to, icon, label }, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink key={to} to={to} className={({isActive}) => isActive ? 'active' : ''}>
                    <li className="flex items-center gap-4 shadow-xl rounded-2xl p-2 mb-4 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
                      {icon}
                      <span className="hidden md:block">{label}</span>
                    </li>
                  </NavLink>
                </motion.div>
              ))}
            </ul>
            <ul>
              {bottomLinks.map(({ to, icon, label}, index) =>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link key={to} to={to}>
                      <li className="flex items-center gap-4 shadow-xl rounded-2xl p-2 mb-4 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
                        {icon}
                        <span className="hidden md:block">{label}</span>
                      </li>
                    </Link>
                  </motion.div>
              )}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 3 * 0.1 }}
              className="block w-full" >
                <li className="flex items-center gap-4 shadow-xl rounded-2xl p-2 mb-4 hover:border-[var(--color-brand-orange)]/80 border border-gray-800">
                  <FaDoorOpen className="text-xl" />
                  <span className="hidden md:block">Log Out</span>
                </li>
              </motion.button>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
