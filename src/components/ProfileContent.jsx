import React from "react";
import ProfilePic from "./ProfilePic"; // পাথ ঠিক করে নেবেন
import { Link } from "react-router-dom";

const ProfileContent = ({ profileData, onRefresh }) => {
  const { username, email, type, id, profile_pic, phone, address, createdAt,is_active } = profileData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Welcome Popup */}
        <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-white/20 dark:border-zinc-800 p-4 rounded-2xl shadow-lg flex items-center justify-between">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            👋 Welcome back, <span className="font-bold text-indigo-600 dark:text-indigo-400 capitalize">{username}</span>. Ready to stream today?
          </p>
        </div>
        
        {/* Header Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
          
          {/* এখানে কম্পোনেন্টটি কল করা হলো */}
          <ProfilePic 
            profile_pic={profile_pic} 
            username={username} 
            onUpdatePic={onRefresh} 
          />

          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight capitalize">{username}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">{email}</p>
            <div className="mt-4 flex gap-3 justify-center md:justify-start">
              <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold uppercase tracking-widest">
                {type}
              </span>
              <span className="px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-bold">
                ID: #{id}
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid (Personal Details & Security) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Personal Details</h3>
            <div className="space-y-5">
              <DetailRow label="Phone" value={phone || "Not set"} />
              <DetailRow label="Address" value={address || "Not set"} />
              <DetailRow label="Member Since" value={createdAt || "July 2026"} />
              <DetailRow 
                label="Status" 
                value={
                  is_active ? (
                    <span className="text-green-500 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span> Inactive
                    </span>
                  )
                } 
              />

            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-500/20 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl">Account Security</h3>
              <p className="text-white/80 mt-2">Manage your account information, security settings, and personal preferences here.</p>
            </div>
            <Link to="/update_profile">
              <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold backdrop-blur-sm transition-all border border-white/10 text-center">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-50 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
    <span className="text-gray-500 text-sm font-medium">{label}</span>
    <span className="text-gray-900 dark:text-gray-200 font-semibold text-sm">{value}</span>
  </div>
);

export default ProfileContent;