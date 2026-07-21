import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // বাংলাদেশের সময় অনুযায়ী Relative Time (ago) ক্যালকুলেট করার ফাংশন
  const timeAgo = (dateString) => {
    if (!dateString) return "Recently";
    
    // SQLite বা ব্যাকএন্ড থেকে আসা ডেট স্ট্রিং-এ অনেক সময় 'Z' (UTC) থাকে না। 
    // তাই সঠিক লোকাল টাইমের জন্য 'Z' যুক্ত করে নেওয়া হলো যাতে বাংলাদেশ টাইমজোনে সঠিক হিসাব হয়।
    let formattedDateString = dateString;
    if (!dateString.endsWith("Z") && !dateString.includes("+")) {
      formattedDateString = dateString + "Z";
    }

    const date = new Date(formattedDateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return `1 year ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return `1 month ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return `1 day ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return `1 hour ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return `1 minute ago`;

    return `Just now`;
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
      <Link 
        to={`/watch/${video.id}`}
        className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3"
      >
        {/* Thumbnail / Video Preview Box */}
        <div 
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-950 shadow-inner"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video 
            ref={videoRef}
            src={video.filename} 
            muted 
            loop
            preload="metadata"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Subtle Dark Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-white text-xs font-medium px-2 py-1 rounded-md bg-black/40 backdrop-blur-md">
              ▶ Preview
            </span>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="flex pt-4 gap-3.5">
          {/* Uploader Avatar with Gradient */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white dark:ring-zinc-900">
              {video.uploader_id?.[0]?.toUpperCase() || "U"}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col flex-grow overflow-hidden">
            <h5 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2 leading-snug mb-1 transition-colors">
              {video.title}
            </h5>
            
            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-2 hover:underline">
              @{video.uploader_id || "creator"}
            </span>

            {/* Stats & Time */}
            <div className="flex items-center justify-between text-xs font-medium text-gray-400 dark:text-gray-500 mt-auto pt-1 border-t border-gray-50 dark:border-zinc-800/60">
              <span className="inline-flex items-center gap-1 text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-full">
                ❤️ {video.likes}
              </span>
              
              <span>{timeAgo(video.created_at)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}