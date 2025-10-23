// src/components/Footer.jsx

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        {/* Social Icons would go here */}
        <div className="footer-social-links mb-4">
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Twitter">TW</a>
          <a href="#" aria-label="YouTube">YT</a>
        </div>
        
        <div className="row footer-links">
          <div className="col-6 col-md-3">
            <a href="#">Audio Description</a>
            <a href="#">Investor Relations</a>
            <a href="#">Legal Notices</a>
          </div>
          <div className="col-6 col-md-3">
            <a href="#">Help Center</a>
            <a href="#">Jobs</a>
            <a href="#">Cookie Preferences</a>
          </div>
          <div className="col-6 col-md-3">
            <a href="#">Gift Cards</a>
            <a href="#">Terms of Use</a>
            <a href="#">Corporate Information</a>
          </div>
          <div className="col-6 col-md-3">
            <a href="#">Media Center</a>
            <a href="#">Privacy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <button className="service-code-button my-4">Service Code</button>

        <div className="copyright-text">
          © 1997-2025 Netflix, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;