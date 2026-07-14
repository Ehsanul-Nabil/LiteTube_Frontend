import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";
import { useMiniTube } from "./hooks/useMiniTube";

export default function App() {
  const {
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
  } = useMiniTube();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-sans">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route 
          path="/" 
          element={<Home query={query} setQuery={setQuery} onSearch={fetchVideos} user={user} videos={videos} />} 
        />
        <Route path="/register" element={<Register form={form} setForm={setForm} onRegister={handleRegister} />} />
        <Route path="/login" element={<Login form={form} setForm={setForm} onLogin={handleLogin} />} />
        <Route path="/upload" element={<Upload upload={upload} setUpload={setUpload} onUpload={handleUpload} />} />
        <Route 
          path="/watch/:id" 
          element={<Watch user={user} likedVideos={likedVideos} handleLike={handleLike} handleDeleteVideo={handleDeleteVideo} />} 
        />
      </Routes>
    </div>
  );
}