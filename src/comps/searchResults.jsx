import React, {useState, useEffect} from 'react'
import axios from '../api/axios'

import './searchResults.css'

const SearchResults = ({ searchQuery, onPosterClick}) => {
    const [results, setResults] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/w500/";
    
    useEffect(()=>{
        if(searchQuery.trim == ""){
            SearchResults({})
            return
        }

        async function fetchSearch() {
  try {
    // Build the URL directly using the .env variable
    const url = `/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&query=${searchQuery}`;
    
    // Use the new URL in the axios request
    const request = await axios.get(url);
    
    // The rest of the function is the same
    const filteredResults = request.data.results.filter(
      (movie) => movie.poster_path
    );
    setResults(filteredResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}
    const searchTimeout = setTimeout(() => {
      fetchSearch();
    }, 500);
    return() => clearTimeout(searchTimeout)
    }, [searchQuery])
    return(
        <div className="search-results-container">
      <h2 className="search-title">Results for: "{searchQuery}"</h2>
      <div className="search-grid">
        {results.map((movie) => (
          <div 
            key={movie.id} 
            className="search-poster-card" 
            onClick={() => onPosterClick(movie)}
          >
            <img
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name || movie.title}
            />
          </div>
        ))}
      </div>
    </div>
    )
}
export default SearchResults