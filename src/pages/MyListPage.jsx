// src/pages/MyListPage.jsx

import React from 'react';
import { useList } from '../context/ListContext';
import { useOutletContext } from 'react-router-dom';
import '../comps/SearchResults.css'; // Re-use the search grid CSS
import HeroBanner from '../comps/HeroBanner';
import '../comps/SearchResults.css';

const MyListPage = () => {
  // 1. Get the global list and the click handler
  const { myList, removeFromList } = useList();
  const { handlePosterClick } = useOutletContext();

  const base_url = "https://image.tmdb.org/t/p/w500/";

  return (
    // We re-use the 'search-results-container' class for padding
    <div className="search-results-container">
       
      <h2 style={{ color: 'white', paddingLeft: '20px' }}>Favourites</h2>
      
      {/* 2. Check if the list is empty */}
      {myList.length === 0 ? (
        <p style={{ color: 'gray', paddingLeft: '20px' }}>
          Your favourites list is empty. Add movies and shows by clicking the '+' icon.
        </p>
      ) : (
        // 3. If not empty, render the grid
        <div className="search-grid">
          {myList.map((movie) => (
            // 2. --- UPDATE THIS DIV ---
            // Use the 'search-poster-card' as the container
            <div 
              key={movie.id} 
              className="search-poster-card" 
            >
              <img
                // 3. --- REMOVE THE CLASS ---
                // className="row-poster" <-- This is no longer needed
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name || movie.title}
                onClick={() => handlePosterClick(movie)}
              />
              {/* 4. --- ADD A NEW BUTTON CLASS --- */}
              <button 
                className="btn-remove-from-list" // A new, non-conflicting class
                onClick={() => removeFromList(movie.id)}
              >
                &times; 
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListPage;