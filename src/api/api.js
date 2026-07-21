import axios from 'axios';
const API_BASE = "http://127.0.0.1:8000";

export const getVideos = async () => {
  const res = await fetch(`${API_BASE}/videos`);
  return res.json();
};

export const getusers = async (token) => {
  const formData = new FormData();
  formData.append("token", token);
  const res = await fetch(`${API_BASE}/users`,
    {method:"POST",body:formData}
  );
  return res.json();
};

export const updateusers = async (formData) => {
  const res = await fetch(`${API_BASE}/users/update_user`,
    {method:"PUT",body:formData}
  );
  return res.json();
};

export const updatePassword = async (formData) => {
    const response = await axios.patch(`${API_BASE}/users/update_password`, formData);
    return response.data;
};


export const registerUser = async (formData) => {
  const res = await fetch(`${API_BASE}/register`, { method: "POST", body: formData });
  const data = await res.json();
  return { ok: res.ok, data };
};

export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE}/login`,
            { method: "POST", body: formData });
    // console.log(res);
  const data = await res.json();
//   console.log(data);
  return { ok: res.ok, data };
};

export const getme = async (formData) => {
  const res = await fetch(`${API_BASE}/users/me`,
    {method:"POST",body:formData}
  );
  return res.json();
};

export const promoteToAdmin = async (formData) => {
  const res = await fetch(`${API_BASE}/users/promote`,
    {method:"PATCH",body:formData}
  );
  return res.json();
};




export const uploadVideoData = async (formData) => {
  const res = await fetch(`${API_BASE}/videos/upload`, 
    { method: "POST", body: formData });
  const data = await res.json(); // go to body of response
//   console.log(res);
  return { ok: res.ok, data };
};

export const updateProfilePic = async (formData) => {
  const res = await fetch(`${API_BASE}/users/UpdateProfilePic`, 
    { method: "PATCH", body: formData });
  const data = await res.json(); // go to body of response
  console.log(data);
  return data;
};

export const getComments = async (videoId) => {
  const res = await fetch(`${API_BASE}/comments/${videoId}`);
  return res.json();
};

export const checkLiked = async (videoId, token) => {
  const res = await fetch(`${API_BASE}/likes/check/${videoId}`, {
    method: "POST",
    body: new URLSearchParams({ token }),
  });
  return res.json();
};


export const toggleLike = async (videoId, token) => {
  const formData = new FormData();
  formData.append("token", token);
  // console.log(videoId);
  const res = await fetch(`${API_BASE}/likes/${videoId}`, { method: "POST", body: formData });
  const data = await res.json(); // go to body of response
  // console.log(data)
  return data;
};

export const postComment = async (videoId, formData) => {
  const res = await fetch(`${API_BASE}/comments/${videoId}`, { method: "POST", body: formData });
  return res.json();
};

export const deleteVideoData = async (videoId, formData) => {
  const res = await fetch(`${API_BASE}/videos/${videoId}`, { method: "DELETE", body: formData });
  return res.json();
};

export const deleteSingleComment = async (c_id,formData) => {
  const res = await fetch(`${API_BASE}/comments/${c_id}`,
    { method: "DELETE", body: formData });
  return res.json();
};

export { API_BASE };