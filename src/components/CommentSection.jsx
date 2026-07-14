import React from "react";

export default function CommentSection({ comments, user, commentText, setCommentText, onComment }) {
  return (
    <div className="mb-6">
      <h5 className="text-lg font-bold text-gray-800 mb-3">Comments</h5>
      <div className="space-y-3 mb-4">
        {comments.map((c) => (
          <p key={c.id} className="text-sm bg-gray-50 p-2.5 rounded border border-gray-100">
            <strong className="text-gray-800">{c.user}</strong> 
            <span className="text-xs text-gray-400 ml-1">({c.timestamp})</span>: {c.content}
          </p>
        ))}
      </div>

      {user && (
        <div className="flex gap-2">
          <input 
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
            placeholder="Add comment..." 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)} 
          />
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium cursor-pointer"
            onClick={onComment}
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
}