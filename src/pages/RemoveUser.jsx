import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteSingleUser } from '../api/api';
import { Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

const RemoveUser = ({ user }) => {
    const { username: targetUsername } = useParams();
    const navigate = useNavigate();
    const [adminPassword, setAdminPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.token) return;

        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("token", user.token);
            formData.append("target_username", targetUsername);
            formData.append("admin_password", adminPassword);

            const data = await deleteSingleUser(formData);
            setMessage({ type: 'success', text: data.message || `User '${targetUsername}' deleted successfully.` });
            setAdminPassword('');
            
            setTimeout(() => {
                navigate('/allUser');
            }, 2000);
        } catch (error) {
            // Safely parse FastAPI error details (can be string, array, or object)
            const errorDetail = error.response?.data?.detail;
            let errorMessage = "Failed to delete user account.";

            if (typeof errorDetail === 'string') {
                errorMessage = errorDetail;
            } else if (Array.isArray(errorDetail)) {
                errorMessage = errorDetail.map(err => err.msg || JSON.stringify(err)).join(', ');
            } else if (errorDetail && typeof errorDetail === 'object') {
                errorMessage = JSON.stringify(errorDetail);
            }

            setMessage({ 
                type: 'error', 
                text: errorMessage 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400">
                    <Trash2 size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete User</h3>
                    <p className="text-sm text-gray-500">Target: <span className="font-semibold text-red-500">{targetUsername}</span></p>
                </div>
            </div>

            {message && (
                <div className={`mb-4 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    message.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400' 
                        : 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/50 dark:text-red-400'
                }`}>
                    {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{message.text}</span>
                </div>
            )}

            <form onSubmit={handleDeleteSubmit}>
                <div className="mb-5 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Admin Password Confirmation:
                    </label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter your admin password"
                            className="w-full px-4 py-2.5 pr-12 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition duration-200 disabled:opacity-50 text-sm shadow-lg shadow-red-600/20"
                >
                    {loading ? "Deleting Account..." : "Confirm & Delete Account"}
                </button>
            </form>
        </div>
    );
};

export default RemoveUser;