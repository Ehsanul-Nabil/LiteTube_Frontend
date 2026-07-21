import React from 'react';

const Loading = () => {
    return (
<div className="w-full max-w-4xl mx-auto p-4 animate-pulse">
      {/* Video Player Box Skeleton */}
      <div className="w-full aspect-video bg-gray-100 dark:bg-gray-300 rounded-2xl mb-4"></div>
      
      {/* Title & Metadata Skeleton */}
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-300 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-100 dark:bg-gray-300 rounded-md w-4/5"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-300 rounded-md w-2/5"></div>
        </div>
      </div>
    </div>
    );
};

export default Loading;