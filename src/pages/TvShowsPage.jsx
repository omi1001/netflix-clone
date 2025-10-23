// src/pages/TvShowsPage.jsx

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieRow from '../comps/MovieRow';
import requests from '../api/requests';

const TvShowsPage = () => {
  // Get the shared poster click function from App.jsx
  const { handlePosterClick } = useOutletContext();

  return (
    // We add padding-top to ensure it appears below the fixed navbar
    <div className="tv-shows-page" style={{ paddingTop: '80px' }}>
      <h1 style={{ color: 'white', paddingLeft: '20px' }}>TV Shows</h1>
      
      {/* We re-use our MovieRow component with TV-specific requests */}
      <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} onPosterClick={handlePosterClick} />
      <MovieRow title="Top Rated TV" fetchUrl={requests.fetchTopRatedTv} onPosterClick={handlePosterClick} />
      <MovieRow title="TV Comedies" fetchUrl={requests.fetchTvComedies} onPosterClick={handlePosterClick} />
      <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} onPosterClick={handlePosterClick} />
    </div>
  );
};

export default TvShowsPage;