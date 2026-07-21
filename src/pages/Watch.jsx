// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { API_BASE } from "../api/api";
// import CommentSection from "../components/CommentSection";
// import * as api from "../api/api";
// import Loading from "../components/Loading";
// import ErrorModal from "../components/Modal/ErrorModal";
// import ConfirmModal from "../components/Modal/ConfirmModal";

// export default function Watch({ user, likedVideos, handleLike, handleDeleteVideo, videos,handlecheckLiked,checkLiked,video, setVideo }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [modalConfig, setModalConfig] = useState({
//       isOpen: false,
//       title: "",
//       message: ""
//     });
//   useEffect(() => {
//     async function loadWatchData() {
//       const allVideos = await api.getVideos();
//         // const allVideos = videos
//         // console.log(videos);
//       const found = allVideos.find((v) => String(v.id) === String(id));
//       setVideo(found || null);
//       const commentData = await api.getComments(id);
//       setComments(commentData);
//     }
//     loadWatchData();
//   }, [id,user]);
  

//   const handleCommentSubmit = async () => {
//   if (!commentText.trim()) {
//       setModalConfig({
//         isOpen: true,
//         title: "Empty Comment",
//         message: "Please write something before submitting your comment."
//       });
//       return;
//     }
//     const formData = new FormData();
//     formData.append("content", commentText);
//     formData.append("token", user.token);
    
//     const data = await api.postComment(id, formData);
//     setComments((prev) => [...prev, data]);
//     setCommentText("");
//   };
  
//   const onDeleteClick = async () => {
//     await handleDeleteVideo(id);
//     navigate("/");
//   };
  
//   useEffect(() => {
//     const onCheckedLiked = async()=>{
//       await handlecheckLiked(id);
//     }
//     onCheckedLiked();
//   },[user]);

//   if (!video) {
//   return (
//       <Loading/>
//   );
// }
//   return (
//     <div className="max-w-4xl mx-auto">

// <Link 
//   to="/" 
//   onClick={(e) => {
//     e.preventDefault();
//     window.location.href = "/";
//   }} 
//   className="inline-block px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition mb-4 text-sm"
// >
//   Back
// </Link>

//       <h3 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h3>
//       {/* <video src={`${API_BASE}/videos/${video.id}`} controls className="w-full max-h-[500px] bg-black rounded-lg mb-4" /> */}
//       <video src={video.filename} controls className="w-full max-h-[500px] bg-black rounded-lg mb-4" />
//       <p className="text-gray-700 mb-4">{video.description}</p>

//       <div className="flex items-center mb-4">
//         <button
//           className="px-4 py-2 border border-gray-300 rounded-md mr-3 transition font-medium flex items-center gap-1.5 cursor-pointer"
//           style={{backgroundColor: ( likedVideos[video.id] || checkLiked) ? "#fbcfe8" : "#ffffff" }}
//           onClick={() => handleLike(video.id)}
//         >
//           ❤️ Like
//         </button>
//       {/* {console.log(videos)} */}
//         <span className="text-gray-600 font-medium">{video.likes} likes</span>
//       </div>

//       {user && video.uploader_id === user.username && (
//         <button 
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition mb-6 font-medium text-sm cursor-pointer" 
//           onClick={() => setShowConfirmModal(true)}
//         >
//           Delete Video
//         </button>
//       )}

//       <CommentSection 
//         comments={comments} 
//         user={user} 
//         commentText={commentText} 
//         setCommentText={setCommentText} 
//         onComment={handleCommentSubmit} 
//       />

//       {/* Confirmation Modal */}
//       <ConfirmModal 
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={onDeleteClick}
//         title="Delete Video?"
//         message="Are you sure you want to remove this video permanently?"
//         icon="⚠️"
//         confirmText="Confirm Delete"
//         confirmButtonClass="bg-rose-600 hover:bg-rose-700 shadow-rose-500/25"
//       />

//       {/* Reusable Error Modal Component */}
//       <ErrorModal 
//         isOpen={modalConfig.isOpen}
//         title={modalConfig.title}
//         message={modalConfig.message}
//         onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
//       />

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../api/api";
import CommentSection from "../components/CommentSection";
import * as api from "../api/api";
import Loading from "../components/Loading";
import ErrorModal from "../components/Modal/ErrorModal";
import ConfirmModal from "../components/Modal/ConfirmModal";

export default function Watch({ user, likedVideos, handleLike, handleDeleteVideo, videos, handlecheckLiked, checkLiked, video, setVideo }) {
  const { id } = useParams();
  const useNavigateInstance = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: ""
  });

  useEffect(() => {
    async function loadWatchData() {
      const allVideos = await api.getVideos();
      const found = allVideos.find((v) => String(v.id) === String(id));
      setVideo(found || null);
      const commentData = await api.getComments(id);
      const sortedComments = commentData.sort((a, b) => b.id - a.id);
      setComments(commentData);
    }
    loadWatchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      setModalConfig({
        isOpen: true,
        title: "Empty Comment",
        message: "Please write something before submitting your comment."
      });
      return;
    }
    const formData = new FormData();
    formData.append("content", commentText);
    formData.append("token", user.token);
    
    const data = await api.postComment(id, formData);
    setComments((prev) => [...prev, data]);
    setCommentText("");
  };
  
  const onDeleteClick = async () => {
    await handleDeleteVideo(id);
    useNavigateInstance("/");
  };
  
  useEffect(() => {
    const onCheckedLiked = async () => {
      await handlecheckLiked(id);
    }
    onCheckedLiked();
  }, [user]);

  if (!video) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center pt-28">
        <Loading />
      </div>
    );
  }

  return (
    // ফুল স্ক্রিন উইথ নেওয়ার জন্য max-w কনস্ট্রেইন্ট সরিয়ে w-full করা হয়েছে
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-16 space-y-6">

      {/* Back Button */}
      <Link 
        to="/" 
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }} 
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-xl transition text-sm font-medium shadow-sm w-fit"
      >
        ← Back to Home
      </Link>

      {/* Main Watch Layout Grid (Larger Player + Comments) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Video Player & Info (Takes 2 Columns on Large Screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 rounded-3xl shadow-xl transition-all">
            
            {/* Video Element */}
            <div className="w-full overflow-hidden rounded-2xl bg-black mb-4 shadow-md aspect-video">
              <video 
                src={video.filename} 
                controls 
                className="w-full h-full object-cover" 
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
              {video.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              {video.description}
            </p>

         {/* Interaction Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-zinc-800/80 pt-5">

                {/* Like Section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(video.id)}
                    className={`group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-300 cursor-pointer active:scale-95 border shadow-sm ${
                      (likedVideos[video.id] || checkLiked)
                        ? "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-400 shadow-rose-500/10"
                        : "bg-gray-50/80 dark:bg-zinc-800/60 border-gray-200/80 dark:border-zinc-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-gray-300"
                    }`}
                  >
                    <span className={`text-base transition-transform duration-300 group-hover:scale-125 ${(likedVideos[video.id] || checkLiked) ? "scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" : ""}`}>
                      ❤️
                    </span>
                    <span className="font-semibold tracking-wide">Like</span>
                  </button>

                  <div className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-zinc-700/40 text-gray-600 dark:text-gray-400 font-semibold text-xs tracking-wide">
                    {video.likes} <span className="font-normal opacity-80">likes</span>
                  </div>
                </div>

                {/* Delete Button (If Uploader) */}
{/* Delete Button (If Uploader) */}
                  {user && video.uploader_id === user.username && (
                    <button 
                      className="group inline-flex items-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white rounded-2xl transition-all duration-300 font-medium text-sm cursor-pointer border border-rose-500/20 hover:border-transparent active:scale-95 shadow-sm shadow-rose-500/5" 
                      onClick={() => setShowConfirmModal(true)}
                    >
                      {/* Clean Modern Trash SVG Icon */}
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <span className="font-semibold tracking-wide">Delete Video</span>
                    </button>
                  )}
              </div>



          </div>
        </div>

        {/* Right Side: Comment Section (Takes 1 Column on Large Screens) */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xl h-full">
            <CommentSection 
              comments={comments} 
              setComments={setComments}
              user={user} 
              commentText={commentText} 
              setCommentText={setCommentText} 
              onComment={handleCommentSubmit} 
            />
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <ConfirmModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onDeleteClick}
        title="Delete Video?"
        message="Are you sure you want to remove this video permanently?"
        icon="⚠️"
        confirmText="Confirm Delete"
        confirmButtonClass="bg-rose-600 hover:bg-rose-700 shadow-rose-500/25"
      />

      {/* Reusable Error Modal Component */}
      <ErrorModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

    </div>
  );
}