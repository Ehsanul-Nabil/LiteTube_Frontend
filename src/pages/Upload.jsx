import React, { useState } from "react";

export default function Upload({ upload, setUpload, onUpload }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-6">
      {/* রেসপন্সিভ এবং ডার্ক মোড ফ্রেন্ডলি কার্ড */}
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl transition-all">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Upload Video
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Share your videos with the LiteStream community.
            </p>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Video Title
            </label>
            <input 
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition" 
              placeholder="Enter video title..." 
              value={upload.title || ""}
              onChange={(e) => setUpload({ ...upload, title: e.target.value })} 
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea 
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition resize-none" 
              placeholder="Write a brief description..." 
              rows="4" 
              value={upload.description || ""}
              onChange={(e) => setUpload({ ...upload, description: e.target.value })} 
            />
          </div>

          {/* File Picker */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Video File
            </label>
            <input 
              type="file" 
              accept="video/*" 
              disabled={loading}
              className="w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 dark:file:bg-indigo-950/50 dark:file:text-indigo-400 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition" 
              onChange={(e) => setUpload({ ...upload, file: e.target.files[0] })} 
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
            {loading ? "Uploading Video..." : "Upload Video"}
          </button>
        </form>

      </div>
    </div>
  );
}