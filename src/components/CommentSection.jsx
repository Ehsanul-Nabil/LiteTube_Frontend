import React from "react";
import { deleteSingleComment } from "../api/api";

export default function CommentSection({ comments,setComments, user, commentText, setCommentText, onComment }) {

  const onDeleteComment = async (c_id) => {
      const formdata = new FormData();
      formdata.append("token",user.token); // অথবা আপনার টোকেন যেখানে স্টোর করা আছে
      try {
          const msg = await deleteSingleComment(c_id, formdata);
          setComments((prevComments) => prevComments.filter((c) => c.id !== c_id));
          console.log(msg);

      } catch (error) {
          console.error("Failed to delete comment:", error);
      }
  }

  return (
    <div className="w-full space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
        <h5 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span>💬</span> Comments 
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 font-semibold">
            {comments?.length || 0}
          </span>
        </h5>
      </div>

      {/* Comments List */}
      <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-1">
        {comments && comments.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic py-4 text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments?.map((c) => (
            <div 
              key={c.id} 
              className="p-4 bg-gray-50/80 dark:bg-zinc-950/60 border border-gray-200/60 dark:border-zinc-800/80 rounded-2xl transition hover:border-gray-300 dark:hover:border-zinc-700 flex items-start justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {c.user?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      @{c.user}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
                    {c.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 pl-9 leading-relaxed break-words">
                  {c.content}
                </p>
              </div>

              {/* Delete Comment Button (Only visible if the logged-in user wrote this comment) */}
              {user && c.user === user.username && (
                <button
                  onClick={() => onDeleteComment(c.id)}
                  className="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 p-1.5 rounded-xl hover:bg-rose-500/10 transition cursor-pointer"
                  title="Delete comment"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Comment Input Form */}
      {user ? (
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <input 
            className="flex-grow px-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm transition" 
            placeholder="Add a public comment..." 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && onComment()}
          />
          <button 
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl shadow-lg shadow-indigo-500/25 transition text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
            onClick={onComment}
          >
            <span>Comment</span>
            <span>📤</span>
          </button>
        </div>
      ) : (
        <div className="p-4 bg-indigo-50/50 dark:bg-zinc-950/40 border border-indigo-100 dark:border-zinc-800 rounded-2xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Please <span className="text-indigo-600 dark:text-indigo-400 font-bold">Login</span> to join the conversation and leave a comment.
          </p>
        </div>
      )}

    </div>
  );
}