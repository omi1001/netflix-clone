// src/pages/MoviesPage.jsx

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieRow from '../comps/MovieRow'; // Corrected path
import requests from '../api/requests';
import HeroBanner from '../comps/HeroBanner';

const MoviesPage = () => {
  // 1. Fix: Must match the context from App.jsx: 'handlePosterClick'
  const { handlePosterClick } = useOutletContext();

  return (
    <div className="movies-page" >
        <HeroBanner/>
      <h1 style={{ color: 'white', paddingLeft: '20px' }}>Movies</h1>
      
      {/* 2. Fix: Now this variable is correctly defined */}
      <MovieRow title="Top Rated Movies" fetchUrl={requests.fetchTopRated} onPosterClick={handlePosterClick} />
      <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} onPosterClick={handlePosterClick} />
      <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onPosterClick={handlePosterClick} />
      <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onPosterClick={handlePosterClick} />
    </div>
  );
};

export default MoviesPage;