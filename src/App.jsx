import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";
import { useMiniTube } from "./hooks/useMiniTube";
import Profile from "./pages/Profile";
import Become_uploader from "./pages/Become_uploader";
import Promote_user from "./pages/Promote_user";
import AllUser from "./pages/AllUser";
import UpdateProfile from "./pages/UpdateProfile";
import RemoveUser from "./pages/RemoveUser";

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
    handlecheckLiked,
    checkLiked,
    video, 
    setVideo,
  } = useMiniTube();

  return (
    // min-h-screen এবং w-full দিয়ে পুরো স্ক্রিন কভার করা হয়েছে
    <div className="min-h-screen w-full bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 font-sans transition-colors flex flex-col">
      
      {/* ফিক্সড গ্লাসমরফিজম নেভবার */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* মেইন কন্টেইনার: সব ডিভাইসে রেসপন্সিভ রাখার জন্য প্যাডিং ও উইথ সেট করা হয়েছে */}
      <main className="flex-1 w-full  mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
            element={<Watch user={user} likedVideos={likedVideos} handleLike={handleLike} handleDeleteVideo={handleDeleteVideo} videos={videos} handlecheckLiked={handlecheckLiked} checkLiked={checkLiked} video={video} setVideo={setVideo}/>} 
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/become_uploader" element={<Become_uploader user={user}/>} />
          <Route path="/promote" element={<Promote_user user={user}/>} />
          <Route path="/allUser" element={<AllUser user={user}/>} />
          <Route path="/update_profile" element={<UpdateProfile user={user}/>} />
          <Route path="/remove_user/:username" element={<RemoveUser user={user} />} />        </Routes>
      </main>

    </div>
  );
}