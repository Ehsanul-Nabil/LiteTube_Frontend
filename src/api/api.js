const API_BASE = "http://127.0.0.1:8000";

export const getVideos = async () => {
  const res = await fetch(`${API_BASE}/videos`);
  return res.json();
};

export const registerUser = async (formData) => {
  const res = await fetch(`${API_BASE}/register`, { method: "POST", body: formData });
  const data = await res.json();
  return { ok: res.ok, data };
};

export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE}/login`,
            { method: "POST", body: formData });
  const data = await res.json();
  return { ok: res.ok, data };
};

export const uploadVideoData = async (formData) => {
  const res = await fetch(`${API_BASE}/upload`, 
    { method: "POST", body: formData });
  const data = await res.json();
  return { ok: res.ok, data };
};

export const getComments = async (videoId) => {
  const res = await fetch(`${API_BASE}/comments/${videoId}`);
  return res.json();
};

export const checkLiked = async (videoId, token) => {
  const res = await fetch(`${API_BASE}/liked/${videoId}`, {
    method: "POST",
    body: new URLSearchParams({ token }),
  });
  return res.json();
};

export const toggleLike = async (videoId, token) => {
  const formData = new FormData();
  formData.append("token", token);
  const res = await fetch(`${API_BASE}/like/${videoId}`, { method: "POST", body: formData });
  return res.json();
};

export const postComment = async (videoId, formData) => {
  const res = await fetch(`${API_BASE}/comment/${videoId}`, { method: "POST", body: formData });
  return res.json();
};

export const deleteVideoData = async (videoId, formData) => {
  const res = await fetch(`${API_BASE}/video/${videoId}`, { method: "DELETE", body: formData });
  return res.json();
};

export { API_BASE };