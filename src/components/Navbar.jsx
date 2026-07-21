import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarUserDrawer from "./Drawer_nav";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 sm:px-12 py-4 ${
      scrolled 
        ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-zinc-800" 
        : "bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm" 
    }`}>
      <div className="w-full mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          LiteStream
        </Link>

        {/* Action Elements */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {user ? (
            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/50 dark:border-zinc-800">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden">
                  {user.profile_pic ? (
                    <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.username?.[0]?.toUpperCase() || "U"
                  )}
                </div>
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                  {user.username}
                </span>
              </div>

            <NavbarUserDrawer user={user} handleLogoutClick={handleLogoutClick}/>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition-colors"
              >
                Login
              </Link>
              
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


