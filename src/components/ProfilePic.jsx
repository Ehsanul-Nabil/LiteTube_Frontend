import React, { useState } from "react";
import * as api from "../api/api";
import ConfirmModal from "./Modal/profilepic";

const ProfilePic = ({ profile_pic, username, onUpdatePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // মডালের স্টেট

  // ফাইল সিলেক্ট করার পর লোকাল প্রিভিউ দেখানোর জন্য
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsModalOpen(true); // ছবি সিলেক্ট করলেই কনফার্মেশন মডাল ওপেন হবে
    }
  };

  // সার্ভারে পিকচার আপলোড হ্যান্ডেল করার ফাংশন
  const handleUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);
    const formData = new FormData();
    
    const token = localStorage.getItem("token");
    if (token) {
      formData.append("token", token);
    }
    formData.append("file", selectedImage); 

    try {
      const response = await api.updateProfilePic(formData);
      console.log("Upload Success:", response);
      
      if (response.profile_pic) {
        localStorage.setItem("profile_pic", response.profile_pic);
      }

      if (onUpdatePic) {
        await onUpdatePic();
      }

      setSelectedImage(null);
      setPreviewUrl(null);
      setUploading(false);
      setIsModalOpen(false); // আপলোড শেষে মডাল বন্ধ হবে
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      setUploading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative group">
      {/* প্রোফাইল পিকচার ডিসপ্লে বক্স */}
      <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl shadow-indigo-500/20 border-4 border-white dark:border-zinc-900">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : profile_pic ? (
          <img src={profile_pic} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          username?.charAt(0).toUpperCase()
        )}
      </div>

      {/* হভার করলে বা সহজে পিক পরিবর্তনের জন্য ক্যামেরা আইকন বা ওভারলে */}
      <label className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Change
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>

      {/* রিয়েল-টাইম অ্যাক্টিভ স্ট্যাটাস ডট */}
      <div className="absolute -bottom-1 -right-1 flex items-center justify-center pointer-events-none">
        <span className="absolute w-7 h-7 bg-green-500 rounded-full opacity-75 animate-ping"></span>
        <div className="relative w-6 h-6 bg-green-500 border-4 border-white dark:border-zinc-900 rounded-full shadow-md"></div>
      </div>

      {/* কনফার্মেশন মডাল */}
<ConfirmModal
  isOpen={isModalOpen}
  onClose={() => {
    if (!uploading) {
      setIsModalOpen(false);
      setSelectedImage(null);
      setPreviewUrl(null);
    }
  }}
  onConfirm={handleUpload}
  title="Update Profile Picture?"
  message="Do you want to save this new image as your profile picture?"
  previewUrl={previewUrl} // এখানে প্রিভিউ ইউআরএল পাস করা হলো
  confirmText="Yes, Update"
  confirmButtonClass="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25"
  loading={uploading}
/>
    </div>
  );
};

export default ProfilePic;