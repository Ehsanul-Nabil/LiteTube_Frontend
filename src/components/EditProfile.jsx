import React from 'react';
import ChangePassword from './Passwordchange';

const EditProfile = ({ 
    formDataState, 
    handleChange, 
    handleSubmit, 
    updating, 
    message, 
    passwordState, 
    handlePasswordChange, 
    handlePasswordSubmit, 
    passwordUpdating, 
    passwordMessage, 
    isPasswordOpen,
    setIsPasswordOpen,
    user 
}) => {
    return (
        <div>
            {/* Main Profile Edit Segment */}
            <div style={{ maxWidth: '500px', margin: '40px auto 20px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#1e1e1e', color: '#f1f1f1' }}>
                <h2>Edit Profile</h2>

                {message && <p style={{ color: message.includes('success') ? '#28a745' : '#ff4d4d' }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img 
                            src={user?.profile_pic} 
                            alt="Profile" 
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #555' }}
                        />
                        <p><b>Role:</b> {user?.role}</p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Username:</label><br />
                        <input 
                            type="text" 
                            name="username"
                            value={formDataState.username} 
                            onChange={handleChange} 
                            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Email:</label><br />
                        <input 
                            type="email" 
                            name="email"
                            value={formDataState.email} 
                            onChange={handleChange} 
                            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Phone:</label><br />
                        <input 
                            type="text" 
                            name="phone"
                            value={formDataState.phone} 
                            onChange={handleChange} 
                            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>Address:</label><br />
                        <input 
                            type="text" 
                            name="address"
                            value={formDataState.address} 
                            onChange={handleChange} 
                            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={updating}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {updating ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>

            {/* Separate Segment for Password Change */}
            <ChangePassword 
                passwordState={passwordState}
                handlePasswordChange={handlePasswordChange}
                handlePasswordSubmit={handlePasswordSubmit}
                passwordUpdating={passwordUpdating}
                passwordMessage={passwordMessage}
                isPasswordOpen={isPasswordOpen}
                setIsPasswordOpen={setIsPasswordOpen}
            />
        </div>
    );
};

export default EditProfile;