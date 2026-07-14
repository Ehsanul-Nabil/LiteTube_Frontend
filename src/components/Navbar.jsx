import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-100 px-6 py-4 mb-6 rounded-lg shadow-sm">
      <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
        MiniTube
      </Link>
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <span className="font-medium text-gray-700 mr-2">{user.username}</span>
            <button 
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition cursor-pointer"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}