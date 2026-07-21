import React, { useEffect, useState } from "react";
import * as api from "../api/api";
import ProfileContent from "../components/ProfileContent";

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ইউজার ডেটা ফেচ বা রিফ্রেশ করার জন্য একটি ফাংশন
  const fetchProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("token", user.token);
      const data = await api.getme(formData);
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchProfileData();
    }
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!profileData) return <div className="text-center p-10 dark:text-white">User data not found.</div>;

  // এখানে onRefresh প্রপ হিসেবে fetchProfileData ফাংশনটি পাস করে দেওয়া হলো
  return <ProfileContent profileData={profileData} onRefresh={fetchProfileData} />;
};

export default Profile;