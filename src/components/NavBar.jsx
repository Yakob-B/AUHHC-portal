import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/schools", label: "Schools" },
];

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  return (
    <nav className="w-full bg-gray-900 dark:bg-gray-950 shadow-lg py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-purple-400">Ambo Portal</span>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={`ml-4 px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${location.pathname === link.to ? "bg-purple-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <button
        onClick={toggleDarkMode}
        className="ml-4 flex items-center px-3 py-1 rounded bg-gray-800 text-gray-200 hover:bg-purple-700 hover:text-white transition-colors duration-200"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <span className="text-lg">🌙</span>
        ) : (
          <span className="text-lg">☀️</span>
        )}
      </button>
    </nav>
  );
};

export default NavBar; 