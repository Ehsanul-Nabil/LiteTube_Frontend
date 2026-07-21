import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/api";

export function useMiniTube() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [upload, setUpload] = useState({ title: "", description: "", file: null });
  const [query, setQuery] = useState("");
  const [likedVideos, setLikedVideos] = useState({});
  const [checkLiked,setcheckLiked] = useState(false);
  const [video, setVideo] = useState(null); // For single Video
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const profile_pic = localStorage.getItem("profile_pic");
    if (token) setUser({ token, username: token,role,profile_pic });
    console.log("user ",user)
    fetchVideos();
  }, []);

  const fetchVideos = async (q="") => {
    const data = await api.getVideos();
    if (!q.trim()) {
      setVideos(data);
    } else {
      const filtered = data.filter(
        (v) =>
          v.title.toLowerCase().includes(q.toLowerCase()) ||
          (v.description && v.description.toLowerCase().includes(q.toLowerCase()))
      );
      setVideos(filtered);
    }
  };


  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);

    const { ok, data } = await api.registerUser(formData);
    if (!ok) alert(data.detail || "Registration failed");
    else {
      alert(data.message);
      navigate("/login");
    }
  };

const handleLogin = async () => {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);

    const { ok, data } = await api.loginUser(formData);
    if (!ok) {
      const errorMessage = Array.isArray(data?.detail)
        ? data.detail.map((err) => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join("\n")
        : data?.detail || "Login first";
      return alert(errorMessage);
    }
    console.log("data ",data)
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.user_role);
    localStorage.setItem("profile_pic", data.profile_pic);
    setUser({ token: data.access_token, username: form.username,role:data.user_role,profile_pic:data.profile_pic });
    navigate("/");
  };

  
const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // window.location.reload(); 
  };

  const handleUpload = async () => {
    if (!upload.title.trim() || !upload.description.trim()) return alert("Title and description are mandatory!");
    if (!upload.file) return alert("Select a video file!");
    
    const formData = new FormData();
    formData.append("title", upload.title);
    formData.append("description", upload.description);
    formData.append("file", upload.file);
    formData.append("token", user.token);

    const { ok, data } = await api.uploadVideoData(formData);
    // if (!ok) alert(data.detail || "Upload failed");
    if (!ok) {
      const errorMessage = Array.isArray(data?.detail)
        ? data.detail.map((err) => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join("\n")
        : data?.detail || "Upload failed";
      return alert(errorMessage);
    }
    else {
      alert("Video uploaded!");
      fetchVideos();
      navigate("/");
    }
  };

  const handleLike = async (videoId) => {
    if (!user) return alert("Login first to like!");
    const data = await api.toggleLike(videoId, user.token);
    console.log(data);
    setcheckLiked(data.liked);

    if(data.liked){
      setVideo((prevVideo) => ({
    ...prevVideo,
    likes: prevVideo.likes + 1
}));
    }
    else{
      setVideo((prevVideo) => ({
    ...prevVideo,
    likes: prevVideo.likes - 1
}));
    }
    // console.log(video);
    // setLikedVideos((prev) => ({ ...prev, [videoId]: data.liked }));
    // setVideos((prev) => prev.map((v) => (v.id === videoId ? { ...v, likes: data.likes } : v)));
  };


const handlecheckLiked = async (videoId) => {
    // 1. Guard clause: properly stop execution if user is missing
    if (!user) {
        console.log("User not found");
        return;
    }
    const data = await api.checkLiked(videoId, user.token);
    // console.log("data",data);
    setcheckLiked(data.liked);
    
};

  
  const handleDeleteVideo = async (videoId) => {
    const formData = new FormData();
    formData.append("token", user.token);
    const data = await api.deleteVideoData(videoId, formData);
    alert(data.message);
    fetchVideos();
  };

  return {
    user,
    videos,
    form,
    setForm,
    upload,
    setUpload,
    query,
    setQuery,
    likedVideos,
    fetchVideos,
    handleRegister,
    handleLogin,
    handleLogout,
    handleUpload,
    handleLike,
    handleDeleteVideo,
    handlecheckLiked,
    checkLiked,
    video, 
    setVideo,
  };
}