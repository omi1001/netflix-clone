// src/App.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import axios from './api/axios';

// Import all your main comps
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';
import VideoModal from './comps/VideoModal';

// Import bootstrap CSS/JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  // 2. All shared state now lives here, in the parent component
  const [searchQuery, setSearchQuery] = useState("");
  const [trailerId, setTrailerId] = useState(null);

  // 3. All shared functions also live here
  const handlePosterClick = async (movie) => {
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
    try {
      const url = `/${mediaType}/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;
      const response = await axios.get(url);
      let trailer = response.data.results.find(video => video.type === 'Trailer');
      if (!trailer) trailer = response.data.results[0];
      if (trailer) {
        setTrailerId(trailer.key);
      } else {
        alert("Sorry, no video is available.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeModal = () => {
    setTrailerId(null);
  };

  return (
    
    <div className="homepage" style={{ backgroundColor: "#111" }}>
      
      
      <Navbar onSearchChange={setSearchQuery} />

      
      <Outlet context={{ handlePosterClick, searchQuery }} />
      
      <Footer />
      
      
      {trailerId && <VideoModal trailerId={trailerId} closeModal={closeModal} />}
    </div>
  );
}

export default App;