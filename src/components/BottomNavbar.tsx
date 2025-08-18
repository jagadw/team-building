import React from "react";
import { logout } from '../services/authService';


import { Link, useParams, useNavigate } from "react-router-dom";

const navItems = [
  { to: (slug: string | undefined) => `/event/${slug}/progress`, label: "Progress", icon: "📈" },
  { to: (slug: string | undefined) => `/event/${slug}/missions`, label: "Missions", icon: "🗂️" },
  { to: (slug: string | undefined) => `/event/${slug}/scan`, label: "Scan", icon: "🔍", center: true },
  { to: (slug: string | undefined) => `/event/${slug}/upload`, label: "Upload", icon: "📤" },
];

const BottomNavbar: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, etc.)
    navigate("/login");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl rounded-t-2xl
      md:hidden flex items-center justify-between px-2 py-2"
      style={{ minHeight: "70px" }}
    >
      <Link
        to={navItems[0].to(slug)}
        className="flex flex-col items-center flex-1 mx-1 py-2 rounded-xl hover:bg-yellow-300 hover:text-gray-900 transition-colors duration-150"
      >
        <span className="text-2xl mb-1">{navItems[0].icon}</span>
        <span className="text-xs font-semibold">{navItems[0].label}</span>
      </Link>
      <Link
        to={navItems[1].to(slug)}
        className="flex flex-col items-center flex-1 mx-1 py-2 rounded-xl hover:bg-yellow-300 hover:text-gray-900 transition-colors duration-150"
      >
        <span className="text-2xl mb-1">{navItems[1].icon}</span>
        <span className="text-xs font-semibold">{navItems[1].label}</span>
      </Link>
      <Link
        to={navItems[2].to(slug)}
        className="flex flex-col items-center flex-1 mx-1 py-2 rounded-full bg-yellow-400 text-gray-900 shadow-lg border-4 border-white scale-110"
        style={{ marginTop: "-20px", minWidth: "70px", minHeight: "70px", justifyContent: "center" }}
      >
        <span className="text-3xl mb-1">{navItems[2].icon}</span>
        <span className="text-xs font-bold">{navItems[2].label}</span>
      </Link>
      <Link
        to={navItems[3].to(slug)}
        className="flex flex-col items-center flex-1 mx-1 py-2 rounded-xl hover:bg-yellow-300 hover:text-gray-900 transition-colors duration-150"
      >
        <span className="text-2xl mb-1">{navItems[3].icon}</span>
        <span className="text-xs font-semibold">{navItems[3].label}</span>
      </Link>
      <button
        onClick={logout}
        className="flex flex-col items-center flex-1 mx-1 py-2 rounded-xl hover:bg-red-400 hover:text-white transition-colors duration-150"
      >
        <span className="text-2xl mb-1">🚪</span>
        <span className="text-xs font-semibold">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNavbar;
