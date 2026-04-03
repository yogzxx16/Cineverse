import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchPopularMovies, searchMovies, fetchGenres, fetchMoviesByGenre } from '../utils/api';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGenres()
      .then((data) => setGenres(data.genres || []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  const loadData = async (pageNum = 1) => {
    setLoading(pageNum === 1);
    try {
      let data;
      if (initialQuery) {
        data = await searchMovies(initialQuery, pageNum);
      } else if (activeGenre) {
        data = await fetchMoviesByGenre(activeGenre, pageNum);
      } else {
        data = await fetchPopularMovies(pageNum);
      }
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('An error occurred while fetching movies. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadData(1);
  }, [initialQuery, activeGenre]);

  const handleSearch = (query) => {
    setSearchParams(query ? { search: query } : {});
    setActiveGenre(''); // Clear genre when searching
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-10 mt-6">
        <SearchBar initialQuery={initialQuery} onSearch={handleSearch} />
      </div>

      {!initialQuery && (
        <div className="mb-8 overflow-x-auto pb-4 custom-scrollbar touch-pan-x">
          <div className="flex gap-3 px-1">
            <button
              onClick={() => setActiveGenre('')}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors border ${
                activeGenre === '' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-dark-card border-white/10 hover:border-primary/50 text-gray-300'
              }`}
            >
              All Popular
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(genre.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors border ${
                  activeGenre === genre.id 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-dark-card border-white/10 hover:border-primary/50 text-gray-300'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {error ? (
        <div className="text-center py-20 text-red-400">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <LoadingSkeleton />
      ) : movies.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-400">No movies found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>
          
          {page < totalPages && (
            <div className="flex justify-center mt-12 mb-6">
              <button 
                onClick={loadMore}
                className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-8 py-3 rounded-full font-bold transition-smooth tracking-wide"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
