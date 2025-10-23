// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react'; // 1. Make sure useState is imported
import './Navbar.css';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
// 2. Accept the 'onSearchChange' prop here
const Navbar = ({ onSearchChange }) => { 
  const [isScrolled, setIsScrolled] = useState(false);
  // 3. Add the missing state for the search bar
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen); // This will now work
  };
  const getEmailPrefix = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after sign out
    } catch (error) {
      console.error("Failed to sign out from navbar:", error);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Netflix Logo" width="90" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"  
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Nav links... */}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">TV Shows</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mylist">Facourites Basket</Link>
            </li>
          </ul>
          <div className="navbar-nav align-items-center">
            <div className="search-box">
              <button className="btn-search" onClick={handleSearchClick}>Find ?</button>
              <input 
                type="text" 
                // This 'isSearchOpen' will now work
                className={`search-input ${isSearchOpen ? 'open' : ''}`} 
                placeholder="Titles, genres, people" 
                // This 'onSearchChange' will now work
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            {currentUser ? (
              // If user is logged in, show Bootstrap dropdown
              <div className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle text-white" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  {getEmailPrefix(currentUser.email)}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/account">Account</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                 <li>
                  {/* 6. Attach handleSignOut here */}
                  <button className="dropdown-item" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
                  
                </ul>
              </div>
            ) : (
              // If no user, show the link to the login page
              <Link className="nav-link" to="/login">Profile</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;