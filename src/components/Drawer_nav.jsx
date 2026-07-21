import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Sparkles, Home, User, LogOut, Upload, ShieldCheck } from "lucide-react";

export default function NavbarUserDrawer({ user, handleLogoutClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">LiteStream</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer">✕</button>
        </div>

        <div className="p-4 space-y-2">
          {/* Home */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition">
            <Home className="w-5 h-5 text-indigo-500" />
            Home / Videos
          </Link>

          {/* Admin Upload */}
          {user && user.role === "Admin" && (
            <Link to="/upload" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition">
              <Upload className="w-5 h-5 text-indigo-500" />
              Upload Video
            </Link>
          )}

          {/* User Become Uploader */}
          {user && user.role === "user" && (
            <Link to="/become_uploader" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Become an Uploader
            </Link>
          )}

          {/* Promote User */}
          {user && user.role === "Admin" && (
            <Link to="/promote" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition">
              <UserPlus className="w-5 h-5 text-indigo-500" />
              Promote User
            </Link>
          )}

          {/* Promote User */}
          {user && user.role === "Admin" && (
            <Link to="/allUser" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition">
              <UserPlus className="w-5 h-5 text-indigo-500" />
              ALL User
            </Link>
          )}

          {/* Profile */}
          <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition">
            <User className="w-5 h-5 text-indigo-500" />
            Profile
          </Link>

          {/* Logout */}
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 font-medium transition cursor-pointer"
            onClick={handleLogoutClick}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}


