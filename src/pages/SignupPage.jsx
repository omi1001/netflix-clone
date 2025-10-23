// src/pages/SignupPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We still re-use the same CSS
import logo from '../assets/logo.svg'; 
import { auth } from '../firebase'; // 1. Import our auth object
import { createUserWithEmailAndPassword } from 'firebase/auth'; // 2. Import the signup function

const SignupPage = () => {
  // 3. Add state for our inputs and any errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // 4. This hook lets us redirect the user

  // 5. This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    setError(''); // Clear any previous errors

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return; // Stop the function
    }

    // Try to create the user in Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // If successful, Firebase automatically logs the user in
      // and we redirect them to the homepage
      navigate('/');
    } catch (err) {
      // If Firebase fails (e.g., email already in use, weak password)
      console.error(err);
      // We'll clean up the error message from Firebase
      const friendlyError = err.message
        .replace('Firebase: ', '')
        .replace('Error ', '')
        .replace(/\(auth\/.*\)\.?/, '');
      setError(friendlyError);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <Link to="/">
          <img src={logo} alt="Netflix Logo" className="login-logo" />
        </Link>
      </div>
      
      <div className="login-body">
        <div className="login-form-container">
          <h1>Sign Up</h1>
          
          {/* 6. Display any errors here */}
          {error && <p className="login-error">{error}</p>}

          {/* 7. Connect the form and inputs to our state */}
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password (at least 6 characters)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Sign Up</button>
          </form>
          <div className="login-signup-now">
            Already have an account? <Link to="/login">Sign in now</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;