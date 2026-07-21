import React from "react";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function Home({ query, setQuery, onSearch, user, videos }) {
  return (
    <div>
      {/* <div className="flex mb-6 gap-2">
            <input 
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Search" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(query);
                }
              }}
              
            />
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
              onClick={() => onSearch(query)}
            >
              Search
            </button>

        {user && (
          <Link 
            to="/upload" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium flex items-center"
          >
            Upload
          </Link>
        )}

      </div> */}

     <div className="flex flex-wrap sm:flex-nowrap items-center mb-6 gap-3">
        {/* Search Input Box */}
        <div className="relative flex-grow">
          <input 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 text-sm transition shadow-sm" 
            placeholder="Search videos, creators..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(query);
              }
            }}
          />
        </div>

        {/* Search Button (Violet Gradient & SVG Icon) */}
        <button 
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 active:scale-95 text-white rounded-2xl shadow-lg shadow-violet-500/25 transition-all font-semibold text-sm cursor-pointer flex items-center justify-center gap-2"
          onClick={() => onSearch(query)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span>Search</span>
        </button>

        {/* Upload Button (If Logged In - Amber/Orange Accent) */}
        {user && user.role=="Admin" && (
          <Link 
            to="/upload" 
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-emerald-800 active:scale-95 text-white rounded-2xl shadow-lg shadow-emerald-500/25 transition-all font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <span>Upload</span>
          </Link>
        )}
      </div>

      {/* <div className="flex flex-wrap -m-2">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div> */}

        {videos && videos.length > 0 ? (
        <div className="flex flex-wrap -m-2">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
            ) : (
              <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                  📭
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  No Videos Found
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                  We couldn't find any videos matching your search or criteria. Try searching for something else!
                </p>

                {/* Direct Page Reload Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg shadow-indigo-500/25 cursor-pointer active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Reload All Content</span>
                </button>
              </div>
            )}
      
    </div>
  );
}