// import React from "react";

// export default function Login({ form, setForm, onLogin }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin();
//   };

//   return (
//     <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm max-w-md mx-auto mt-10">
//       <form onSubmit={handleSubmit}>
//         <h3 className="text-xl font-bold text-gray-800 mb-4">Login</h3>
//         <input 
//           className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
//           placeholder="Username" 
//           value={form.username || ""}
//           onChange={(e) => setForm({ ...form, username: e.target.value })} 
//         />
//         <input 
//           className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
//           placeholder="Password" 
//           type="password" 
//           value={form.password || ""}
//           onChange={(e) => setForm({ ...form, password: e.target.value })} 
//         />
//         <button 
//           type="submit" 
//           className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium cursor-pointer"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }




import React, { useState } from "react";

export default function Login({ form, setForm, onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 pt-16">
      {/* মডার্ন ডার্ক-সাপোর্টেড কার্ড */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl transition-all">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Welcome Back
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input 
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition" 
              placeholder="Enter your username" 
              value={form.username || ""}
              onChange={(e) => setForm({ ...form, username: e.target.value })} 
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input 
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition" 
              placeholder="••••••••" 
              type="password" 
              value={form.password || ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

      </div>
    </div>
  );
}