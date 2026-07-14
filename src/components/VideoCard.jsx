import React from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api/api";

export default function VideoCard({ video }) {
  return (
    <div className="w-full md:w-1/3 p-2">
      <Link 
        to={`/watch/${video.id}`}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col block"
      >
        <video 
          src={`${API_BASE}/video/${video.id}`} 
          muted 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h5 className="font-semibold text-lg text-gray-900 mb-1">{video.title}</h5>
            <p className="text-gray-600 text-sm mb-3">{video.description?.slice(0, 80)}</p>
          </div>
          <small className="text-red-500 font-medium">❤️ {video.likes}</small>
        </div>
      </Link>
    </div>
  );
}