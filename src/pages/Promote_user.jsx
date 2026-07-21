import React, { useState } from "react";
import { UserPlus, Lock, User, CheckCircle, AlertCircle } from "lucide-react";
import { promoteToAdmin } from "../api/api"; // আপনার API ফাইলের পাথ অনুযায়ী ঠিক করুন

export default function PromoteUser({ user }) {
  const [targetUsername, setTargetUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("token", user.token);
      formData.append("target_username", targetUsername);
      formData.append("admin_password", adminPassword);

      const data = await promoteToAdmin(formData);

      // fetch এরর চেক করার জন্য
      if (data.detail && typeof data.message === 'undefined') {
        throw new Error(data.detail);
      }

      setMessage({ type: "success", text: data.message || "User promoted successfully!" });
      setTargetUsername("");
      setAdminPassword("");
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "An error occurred during the promotion process." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <UserPlus size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Promote User</h2>
          <p className="text-sm text-gray-500">Elevate user privileges to Admin</p>
        </div>
      </div>

      {/* Feedback Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
          message.type === "success" 
            ? "bg-green-50 text-green-600 border border-green-200" 
            : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          <AlertCircle size={16} />
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Username</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Enter username"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Admin Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {loading ? "Processing..." : (
            <>
              <CheckCircle size={18} />
              Confirm Promotion
            </>
          )}
        </button>
      </form>
    </div>
  );
}