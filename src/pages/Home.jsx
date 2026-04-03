import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { fetchTrendingThisWeek, getBackdropUrl } from '../utils/api';
import { Play } from 'lucide-react';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingThisWeek()
      .then((data) => {
        setTrending(data.results.slice(0, 10));
        if (data.results.length > 0) {
          setFeatured(data.results[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (query) => {
    navigate(`/movies?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center">
        {featured && (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={getBackdropUrl(featured.backdrop_path)} 
                alt={featured.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent"></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </>
        )}
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
            Discover. <span className="text-primary">Explore.</span> Review.
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-2xl px-4">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          
          <div className="w-full max-w-3xl mb-8">
            <SearchBar onSearch={handleSearch} className="scale-110" />
          </div>
          
          {featured && (
            <button 
              onClick={() => navigate(`/movies/${featured.id}`)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-6 py-3 rounded-full font-medium transition-smooth"
            >
              <Play className="w-5 h-5 text-primary" fill="currentColor" /> Watch Trailer
            </button>
          )}
        </div>
      </div>

      {/* Trending Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          Trending <span className="text-primary">Today</span>
        </h2>
        
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-4 snap-x snap-mandatory preserve-3d custom-scrollbar touch-pan-x">
          {trending.map((movie) => (
            <div key={movie.id} className="min-w-[200px] md:min-w-[250px] snap-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
