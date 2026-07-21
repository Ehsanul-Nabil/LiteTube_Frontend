import React from "react";

export default function ErrorModal({ isOpen, onClose, title = "Oops!", message = "Something went wrong." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-zinc-800 text-center">
        
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-inner">
          ⚠️
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>

        {/* Dynamic Message */}
        <p className="text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/25 text-base"
        >
          Got it
        </button>
      </div>
    </div>
  );
}