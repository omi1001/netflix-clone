// src/pages/Homepage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom'; // 1. Import this hook
import HeroBanner from '../comps/HeroBanner';
import MovieRow from '../comps/MovieRow';
import SearchResults from '../comps/SearchResults';
import requests from '../api/requests';

const Homepage = () => {
  // 2. Get the shared functions and state from App.jsx's <Outlet>
  const { handlePosterClick, searchQuery } = useOutletContext();

  // 3. Notice the Navbar, Footer, and Modal are gone!
  return (
    <>
      {searchQuery ? (
        <SearchResults 
          searchQuery={searchQuery} 
          onPosterClick={handlePosterClick} 
        />
      ) : (
        <>
          <HeroBanner />
          <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} onPosterClick={handlePosterClick} />
          <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} onPosterClick={handlePosterClick} />
          <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} onPosterClick={handlePosterClick} />
          <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} onPosterClick={handlePosterClick} />
          <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onPosterClick={handlePosterClick} />
          <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onPosterClick={handlePosterClick} />
        </>
      )}
    </>
  );
};

export default Homepage;