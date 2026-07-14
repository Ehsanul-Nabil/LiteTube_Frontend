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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token, username: token });
    fetchVideos();
  }, []);

  const fetchVideos = async (q = "") => {
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
    if (!ok) return alert(data.detail || "Login first");

    localStorage.setItem("token", data.access_token);
    setUser({ token: data.access_token, username: form.username });
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
    if (!ok) alert(data.detail || "Upload failed");
    else {
      alert("Video uploaded!");
      fetchVideos();
      navigate("/");
    }
  };

  const handleLike = async (videoId) => {
    if (!user) return alert("Login first to like!");
    const data = await api.toggleLike(videoId, user.token);
    setLikedVideos((prev) => ({ ...prev, [videoId]: data.liked }));
    setVideos((prev) => prev.map((v) => (v.id === videoId ? { ...v, likes: data.likes } : v)));
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
  };
}