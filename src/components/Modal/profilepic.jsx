import React from "react";

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "Do you really want to perform this action? This process cannot be undone.",
  icon = "🗑️",
  confirmText = "Yes, Delete",
  confirmButtonClass = "bg-red-600 hover:bg-red-700 shadow-red-500/25",
  loading = false,
  previewUrl = null // প্রিভিউ ইউআরএল প্রপ হিসেবে রিসিভ করা হলো
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-zinc-800 text-center">
        
        {/* যদি প্রিভিউ ইউআরএল থাকে তবে ছবির প্রিভিউ দেখাবে, না হলে ডিফল্ট আইকন দেখাবে */}
        {previewUrl ? (
          <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 border-4 border-indigo-100 dark:border-zinc-800 shadow-md">
            <img src={previewUrl} alt="Upload Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-inner">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose} 
            disabled={loading}
            className="w-1/2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 font-medium py-3 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`w-1/2 active:scale-95 text-white font-medium py-3 rounded-2xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${confirmButtonClass}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}