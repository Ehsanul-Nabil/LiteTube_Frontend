import React, { useState, useEffect } from "react";
import { getusers } from "../api/api";
import { Users, Loader2, AlertCircle } from "lucide-react";

const AllUser = ({ user }) => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // ইউজার বা টোকেন না থাকলে রিকোয়েস্ট পাঠানোর দরকার নেই
    if (!user || !user.token) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getusers(user.token);
        setUsersList(Array.isArray(data) ? data : []);
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message || "Failed to load users.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <Users size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Platform Users</h2>
          <p className="text-sm text-gray-500">Manage and view system users</p>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200 flex items-center gap-2">
          <AlertCircle size={16} />
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12 text-indigo-500">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 text-gray-400 text-sm">
                <th className="py-3 px-4 font-semibold">Username</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {usersList.length > 0 ? (
                usersList.map((u, index) => (
                  <tr key={index} className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition">
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">{u.username}</td>
                    <td className="py-3 px-4 text-gray-500 text-sm">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        u.type === "Admin" 
                          ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400" 
                          : "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400"
                      }`}>
                        {u.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default  AllUser; 