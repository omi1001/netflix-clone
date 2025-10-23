// src/components/MovieRow.jsx

import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import axios from '../api/axios';
import './MovieRow.css';
import YouTube from 'react-youtube';
import { useList } from '../context/ListContext';
// We'll manage hover and trailer logic inside this component
const MovieRow = ({ title, fetchUrl, onPosterClick }) => {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const scrollRef = useRef(null);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const { addToList, removeFromList, isInList } = useList();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const row = scrollRef.current;
    if (row) {
      // Function for mouse wheel scrolling
      const handleWheelScroll = (e) => {
        e.preventDefault(); // Prevent page from scrolling vertically
        row.scrollLeft += e.deltaY; // Scroll horizontally instead
      };

      // Function to check scroll position for arrows
      const checkScroll = () => {
        if (row.scrollLeft > 10) {
          setShowLeftArrow(true);
        } else {
          setShowLeftArrow(false);
        }
      };

      row.addEventListener('wheel', handleWheelScroll);
      row.addEventListener('scroll', checkScroll);

      // Cleanup
      return () => {
        row.removeEventListener('wheel', handleWheelScroll);
        row.removeEventListener('scroll', checkScroll);
      };
    }
  }, [movies]); // Re-run if movies change

  // 5. Functions for arrow clicks
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.8; // Scroll by 80% of row width
      current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // Function to fetch trailer on hover
  const fetchMovieTrailer = async (movie) => {
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
    try {
      const url = `/${mediaType}/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;
      const response = await axios.get(url);
      let trailer = response.data.results.find(video => video.type === 'Trailer');
      if (!trailer) {
        trailer = response.data.results[0];
      }
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
    fetchMovieTrailer(movie); // Fetch trailer when hover starts
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
    setTrailerKey(''); // Clear trailer key when hover ends
  };

  const youtubeOpts = {
    height: '180',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      loop: 1,
      playlist: trailerKey, // Needed for loop to work
    },
  };

  return (
    // 1. FIX: Removed data-aos="fade-up" to prevent clipping
    <div className="movie-row" >
      <h2 className="row-title">{title}</h2>
      {showLeftArrow && (
        <button className="scroll-arrow left" onClick={() => scroll('left')}>
          &lt;
        </button>
      )}
      <div className="row-posters" ref={scrollRef}>
        
        {/* 2. FIX: Changed map(movie => (...)) to map(movie => { ... }) */}
        {movies.map(movie => {
          
          // This line is now valid JavaScript inside the {} block
          const isMovieInList = isInList(movie.id); 
          
          // And we explicitly return our JSX
          return ( 
            movie.poster_path && (
              <div 
                key={movie.id} 
                className="poster-container"
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
              >
                {/* This is the regular poster image */}
                <img
                  className="row-poster"
                  src={`${base_url}${movie.poster_path}`}
                  alt={movie.name || movie.title}
                />

                {/* This is the EXPANDED CARD that appears on hover */}
                {hoveredMovie && hoveredMovie.id === movie.id && (
                  <div className="expanded-card">
                    <div className="expanded-video">
                      {trailerKey ? (
                        <YouTube videoId={trailerKey} opts={youtubeOpts} />
                      ) : (
                        // Fallback: show backdrop image if no trailer
                        <img 
                          className="expanded-backdrop" 
                          src={`${base_url}${movie.backdrop_path || movie.poster_path}`} 
                          alt="" 
                        />
                      )}
                    </div>
                    <div className="expanded-details">
                      <h3 className="expanded-title">{movie.name || movie.title || movie.original_name}</h3>
                      <p className="expanded-overview">{movie.overview.substring(0, 100)}...</p>
                      <div className="expanded-controls">
                        <div className="controls-left">
                          <button className="control-btn play" onClick={() => onPosterClick(movie)}>
                            <span className="play-icon">▶</span>
                            <span className="play-text">Play</span>
                          </button>
                          {isMovieInList ? (
                            // If IN list, show checkmark and call removeFromList
                            <button 
                              className="control-btn wishlist active" 
                              onClick={() => removeFromList(movie.id)}
                            >
                              ✓
                            </button>
                          ) : (
                            // If NOT in list, show plus and call addToList
                            <button 
                              className="control-btn wishlist" 
                              onClick={() => addToList(movie)}
                            >
                              +
                            </button>
                          )}
                        </div>
                        <div className="controls-right">
                          <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          );
        })}
      </div>

      <button className="scroll-arrow right" onClick={() => scroll('right')}>&gt;</button>
    </div>
  );
};

export default MovieRow;