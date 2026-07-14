import React from "react";

export default function Login({ form, setForm, onLogin }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm max-w-md mx-auto mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Login</h3>
      <input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium cursor-pointer" onClick={onLogin}>Login</button>
    </div>
  );
}