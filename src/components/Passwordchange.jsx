import React from 'react';

const ChangePassword = ({ 
    passwordState, 
    handlePasswordChange, 
    handlePasswordSubmit, 
    passwordUpdating, 
    passwordMessage,
    isPasswordOpen,
    setIsPasswordOpen
}) => {
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
                        <div style={{ marginBottom: '15px' }}>
                            <label>Current Password:</label><br />
                            <input 
                                type="password" 
                                name="current_password"
                                value={passwordState.current_password} 
                                onChange={handlePasswordChange} 
                                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label>New Password:</label><br />
                            <input 
                                type="password" 
                                name="new_password"
                                value={passwordState.new_password} 
                                onChange={handlePasswordChange} 
                                style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
                                required
                            />
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