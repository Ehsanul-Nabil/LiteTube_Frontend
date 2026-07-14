import React from "react";

export default function Upload({ upload, setUpload, onUpload }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm max-w-lg mx-auto mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Video</h3>
      <input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Title" onChange={(e) => setUpload({ ...upload, title: e.target.value })} />
      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Description" rows="3" onChange={(e) => setUpload({ ...upload, description: e.target.value })} />
      <input type="file" accept="video/*" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 text-sm" onChange={(e) => setUpload({ ...upload, file: e.target.files[0] })} />
      <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium cursor-pointer" onClick={onUpload}>Upload</button>
    </div>
  );
}