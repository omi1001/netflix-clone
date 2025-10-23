// src/pages/AccountPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth'; // 1. Import signOut
import { auth } from '../firebase'; // 2. Import auth instance
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // 3. Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after sign out
      navigate('/login');
    } catch (error) {
      console.error("Failed to sign out:", error);
      alert("Failed to sign out.");
    }
  };

  if (!currentUser) {
    // Optional: Redirect if not logged in, or show a message
    navigate('/login');
    return null; // Don't render anything if redirecting
  }

  return (
    // Add padding to appear below the navbar
    <div className="account-page" style={{ paddingTop: '100px', paddingLeft: '50px', color: 'white' }}>
      <h1>Account</h1>
      <p><strong>Email:</strong> {currentUser.email}</p>
      
      {/* 4. Add the sign out button */}
      <button 
        onClick={handleSignOut}
        className="btn btn-danger" // Use Bootstrap's red button style
      >
        Sign Out
      </button>
    </div>
  );
};

export default AccountPage;
