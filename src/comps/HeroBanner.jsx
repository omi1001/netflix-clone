import React, {useState, useEffect} from 'react'
import './HeroBanner.css'
import axios from '../api/axios';
import requests from '../api/requests';
 const HeroBanner = () =>{
    const [movie, setMovie] = useState(null); //using null initially
    useEffect(()=>{
        async function fetchData(){
            try{
                const request = await axios.get(requests.fetchNetflixOriginals);
                const movies = request.data.results
                const randomMovie = movies[Math.floor(Math.random()*movies.length)];
                setMovie(randomMovie);
            }
            catch(error){
                console.log("Error fetching the movie:", error)
            }
        }
        fetchData();
    }, [])

    //truncating long decriptions
    const truncate = (str, n)=>{
        return str?.length > n? str.substr(0, n-1)+ '...': str;
        };

        //not rendering anything unless movies are loaded
        if(!movie){
            return null;
        }   
    return(
        <header className="hero-banner" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}}>
            <div className="hero-content" data-aos="fade-up">
                <h1 className="hero-title">{movie?.title || movie?.name || movie?.Original_name}</h1>
                <div className="hero-button">
                    <button className='btn btn-light me-2'>▶ Play</button>
                    <button className='btn btn-light me-2'>ⓘ More Info</button>
                </div>
                <p className="movie-decription">{truncate(movie?.Overview, 150)}</p>
            </div>
            <div className="hero-fade-bottom"></div>
        </header>
    )
 }
 export default HeroBanner