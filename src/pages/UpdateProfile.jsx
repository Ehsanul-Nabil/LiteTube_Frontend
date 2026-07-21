import React, { useState, useEffect } from 'react';
import * as api from "../api/api";
import EditProfile from '../components/EditProfile';

const UpdateProfileContainer = ({ user }) => {
    const [formDataState, setFormDataState] = useState({
        username: '',
        email: '',
        phone: '',
        address: ''
    });

    const [passwordState, setPasswordState] = useState({
        current_password: '',
        new_password: ''
    });
    
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [passwordUpdating, setPasswordUpdating] = useState(false);
    const [message, setMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    
    // State to control dropdown/accordion visibility
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const formData = new FormData();
                formData.append("token", user?.token);
                const data = await api.getme(formData);
                
                setFormDataState({
                    username: data.username || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    address: data.address || ''
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchProfileData();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage('');

        try {
            const dataDictionary = {
                token: user?.token,
                username: formDataState.username,
                email: formDataState.email,
                phone: formDataState.phone,
                address: formDataState.address
            };

            const formData = new FormData();
            for (const [key, value] of Object.entries(dataDictionary)) {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            }

            const response = await api.updateusers(formData);
            console.log("Update response:", response);
            
            localStorage.setItem("token", formDataState.username);
            setMessage('Profile updated successfully!');
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Update error:", error);
            setMessage('Failed to update profile.');
            setUpdating(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordUpdating(true);
        setPasswordMessage('');

        try {
            const passwordDictionary = {
                token: user?.token,
                current_password: passwordState.current_password,
                new_password: passwordState.new_password
            };

            const formData = new FormData();
            for (const [key, value] of Object.entries(passwordDictionary)) {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            }

            const response = await api.updatePassword(formData);
            console.log("Password update response:", response);
            setPasswordMessage('Password updated successfully.');
            setPasswordState({ current_password: '', new_password: '' });
        } catch (error) {
            console.error("Password update error:", error);
            const errorMsg = error.response?.data?.detail || 'Failed to update password.';
            setPasswordMessage(errorMsg);
        } finally {
            setPasswordUpdating(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                gap: '16px',
                fontFamily: 'Inter, system-ui, sans-serif'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid rgba(0, 123, 255, 0.15)',
                    borderTop: '4px solid #007bff',
                    borderRadius: '50%',
                    animation: 'modernSpin 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
                }} />
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#495057', letterSpacing: '0.5px' }}>
                    Loading Profile...
                </span>
                <style>{`
                    @keyframes modernSpin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <EditProfile
            formDataState={formDataState}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            updating={updating}
            message={message}
            passwordState={passwordState}
            handlePasswordChange=  {handlePasswordChange}
            handlePasswordSubmit={handlePasswordSubmit}
            passwordUpdating={passwordUpdating}
            passwordMessage={passwordMessage}
            isPasswordOpen={isPasswordOpen}
            setIsPasswordOpen={setIsPasswordOpen}
            user={user}
        />
    );
};

export default UpdateProfileContainer;