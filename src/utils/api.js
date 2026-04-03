const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchConfig = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
};

const getFetchUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  
  return url.toString();
};

export const fetchTrendingThisWeek = async () => {
  // Using week as fallback if day not requested, though requirements asked for /trending/movie/day
  const res = await fetch(getFetchUrl('/trending/movie/day'), fetchConfig);
  if (!res.ok) throw new Error("Failed to fetch trending daily movies.");
  return res.json();
};

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(getFetchUrl('/movie/popular', { page }), fetchConfig);
  if (!res.ok) throw new Error("Failed to fetch popular movies.");
  return res.json();
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(getFetchUrl('/search/movie', { query, page }), fetchConfig);
  if (!res.ok) throw new Error("Failed to search movies.");
  return res.json();
};

export const fetchMovieDetails = async (id) => {
  // Append response to also get credits within same request? User asked for 2 separated or together.
  // /movie/{id}?append_to_response=credits
  const res = await fetch(getFetchUrl(`/movie/${id}`, { append_to_response: 'credits' }), fetchConfig);
  if (!res.ok) throw new Error("Failed to fetch movie details.");
  return res.json();
};

export const fetchSimilarMovies = async (id) => {
  const res = await fetch(getFetchUrl(`/movie/${id}/similar`), fetchConfig);
  if (!res.ok) throw new Error("Failed to fetch similar movies.");
  return res.json();
};

export const fetchGenres = async () => {
  const res = await fetch(getFetchUrl('/genre/movie/list'), fetchConfig);
  if (!res.ok) throw new Error("Failed to fetch genres.");
  return res.json();
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const res = await fetch(getFetchUrl('/discover/movie', { with_genres: genreId, page }), fetchConfig);
  if (!res.ok) throw new Error("Failed to fetch movies by genre.");
  return res.json();
};

export const getPosterUrl = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const getBackdropUrl = (path) => path ? `https://image.tmdb.org/t/p/original${path}` : null;
