// src/pages/LoginPage.jsx

import React, { useState } from 'react'; // 1. Added useState
import { Link, useNavigate } from 'react-router-dom'; // 2. Added useNavigate
import './LoginPage.css';
// 3. Added logo import
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      // --- START: Replace this block ---
      console.error("Firebase Login Error:", err.code, err.message); // Log the specific code for debugging
      
      // Set a user-friendly error message based on the code
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          setError('No account found with that email.');
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential': // Catches both wrong password and sometimes user not found
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
           setError('Access temporarily disabled due to too many failed login attempts. Please reset your password or try again later.');
           break;
        default:
          setError('Login failed. Please check your credentials.');
      }
      // --- END: Replace this block ---
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        {/* 4. Added the logo and link back */}
        
      </div>
      
      <div className="login-body">
        <div className="login-form-container">
          <h1>Sign In</h1>
          
          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email or phone number" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Sign In</button>
            <div className="login-help">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Need help?</a>
            </div>
          </form>
          <div className="login-signup-now">
            New to Netflix? <Link to="/signup">Sign up now</Link>.
          </div>
          <small className="login-recaptcha">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <a href="#">Learn more.</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;