import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Reusable Navbar component
// Props: title (string) - page specific title displayed next to brand
const Navbar = ({ title = "", onSignOut }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { to: "/home", label: "Home" },
    { to: "/history", label: "History" },
    { to: "/analytics", label: "Analytics" }
  ];

  const isActive = (path) => location.pathname === path;
  const isLoginRoute = location.pathname === '/' || location.pathname === '/login';

  return (
    <nav className="glass sticky top-0 z-40 border-b border-gray-200/60 dark:border-gray-700/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="text-lg font-extrabold tracking-tight gradient-text">Budgety</Link>
          {title && <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 shadow-sm">{title}</span>}
        </div>
        {!isLoginRoute ? (
          <ul className="flex items-center gap-6 text-sm font-medium">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative px-1 transition-colors ${isActive(l.to) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                >
                  {l.label}
                  {isActive(l.to) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => { if (onSignOut) onSignOut(); navigate('/login'); }}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition focus:outline-none"
                type="button"
              >
                Sign Out
              </button>
            </li>
          </ul>
        ) : (
          <div className="text-sm font-medium">
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
