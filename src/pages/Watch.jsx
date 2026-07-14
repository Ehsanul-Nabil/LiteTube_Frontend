import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../api/api";
import CommentSection from "../components/CommentSection";
import * as api from "../api/api";

export default function Watch({ user, likedVideos, handleLike, handleDeleteVideo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function loadWatchData() {
      const allVideos = await api.getVideos();
      const found = allVideos.find((v) => String(v.id) === String(id));
      setVideo(found || null);

      const commentData = await api.getComments(id);
      setComments(commentData);
    }
    loadWatchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    const formData = new FormData();
    formData.append("content", commentText);
    formData.append("token", user.token);

    const data = await api.postComment(id, formData);
    setComments((prev) => [...prev, data]);
    setCommentText("");
  };

  const onDeleteClick = async () => {
    await handleDeleteVideo(id);
    navigate("/");
  };

  if (!video) return <div className="text-center py-10 text-gray-500">Loading video...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-block px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition mb-4 text-sm">Back</Link>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h3>
      <video src={`${API_BASE}/video/${video.id}`} controls className="w-full max-h-[500px] bg-black rounded-lg mb-4" />
      <p className="text-gray-700 mb-4">{video.description}</p>

      <div className="flex items-center mb-4">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md mr-3 transition font-medium flex items-center gap-1.5 cursor-pointer"
          style={{ backgroundColor: likedVideos[video.id] ? "#fbcfe8" : "#ffffff" }}
          onClick={() => handleLike(video.id)}
        >
          ❤️ Like
        </button>
        <span className="text-gray-600 font-medium">{video.likes} likes</span>
      </div>

      {user && video.uploader_id === user.username && (
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition mb-6 font-medium text-sm cursor-pointer" onClick={onDeleteClick}>Delete Video</button>
      )}

      <CommentSection 
        comments={comments} 
        user={user} 
        commentText={commentText} 
        setCommentText={setCommentText} 
        onComment={handleCommentSubmit} 
      />
    </div>
  );
}