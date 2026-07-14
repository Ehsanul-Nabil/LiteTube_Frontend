import React from "react";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function Home({ query, setQuery, onSearch, user, videos }) {
  return (
    <div>
      <div className="flex mb-6 gap-2">
        <input 
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Search" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
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
      </div>

      <div className="flex flex-wrap -m-2">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}