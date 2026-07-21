import React, { useState } from 'react';

const ChangePassword = ({ 
    passwordState, 
    handlePasswordChange, 
    handlePasswordSubmit, 
    passwordUpdating, 
    passwordMessage,
    isPasswordOpen,
    setIsPasswordOpen
}) => {
    // State to toggle visibility for each password field
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    // Common style for the eye icon button
    const eyeButtonStyle = {
        position: 'absolute',
        right: '10px',
        top: '36px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#aaa',
        padding: 0,
        display: 'flex',
        alignItems: 'center'
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#1e1e1e', color: '#f1f1f1' }}>
            {/* Dropdown Toggle Button */}
            <div style={{ textAlign: 'center' }}>
                <button 
                    type="button"
                    onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#339af0', 
                        cursor: 'pointer', 
                        fontSize: '16px', 
                        fontWeight: 'bold',
                        padding: '5px'
                    }}
                >
                    {isPasswordOpen ? "▲ Hide Password Change" : "▼ Change Password"}
                </button>
            </div>

            {/* Collapsible Form Section */}
            {isPasswordOpen && (
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ marginTop: '0' }}>Change Password</h3>
                    {passwordMessage && <p style={{ color: passwordMessage.includes('success') ? '#28a745' : '#ff4d4d' }}>{passwordMessage}</p>}

                    <form onSubmit={handlePasswordSubmit}>
                        {/* Current Password Field */}
                        <div style={{ marginBottom: '15px', position: 'relative' }}>
                            <label>Current Password:</label><br />
                            <input 
                                type={showCurrent ? "text" : "password"} 
                                name="current_password"
                                value={passwordState.current_password} 
                                onChange={handlePasswordChange} 
                                style={{ width: '100%', padding: '8px', paddingRight: '35px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowCurrent(!showCurrent)}
                                style={eyeButtonStyle}
                                title={showCurrent ? "Hide password" : "Show password"}
                            >
                                {showCurrent ? (
                                    // Eye Off Icon
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    // Eye On Icon
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>

                        {/* New Password Field */}
                        <div style={{ marginBottom: '20px', position: 'relative' }}>
                            <label>New Password:</label><br />
                            <input 
                                type={showNew ? "text" : "password"} 
                                name="new_password"
                                value={passwordState.new_password} 
                                onChange={handlePasswordChange} 
                                style={{ width: '100%', padding: '8px', paddingRight: '35px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowNew(!showNew)}
                                style={eyeButtonStyle}
                                title={showNew ? "Hide password" : "Show password"}
                            >
                                {showNew ? (
                                    // Eye Off Icon
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    // Eye On Icon
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>

                        <button 
                            type="submit" 
                            disabled={passwordUpdating}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {passwordUpdating ? "Changing..." : "Update Password"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;