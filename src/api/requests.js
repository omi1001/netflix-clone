const API_KEY = "7bd3214cf55853618b20d128e58f60b3";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchSearch: `/search/multi?api_key=${API_KEY}&language=en-US&include_adult=false`,
  fetchTopRatedTv: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTvComedies: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
};

export default requests;
