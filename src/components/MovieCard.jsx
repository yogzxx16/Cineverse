import { Link } from 'react-router-dom';
import { Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { getPosterUrl } from '../utils/api';
import { useState, useEffect } from 'react';

export default function MovieCard({ movie }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsSaved(watchlist.some((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleWatchlist = (e) => {
    e.preventDefault(); // Prevent navigating to movie details
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (isSaved) {
      watchlist = watchlist.filter((m) => m.id !== movie.id);
    } else {
      watchlist.push(movie);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsSaved(!isSaved);
  };

  const poster = getPosterUrl(movie.poster_path);
  const placeholder = 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link 
      to={`/movies/${movie.id}`} 
      className="group relative bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={poster || placeholder} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-sm"
        />
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={toggleWatchlist}
            className="p-2 bg-black/60 rounded-full backdrop-blur-sm hover:bg-primary transition-colors border border-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-white" fill="currentColor" />
            ) : (
              <Bookmark className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">{movie.title}</h2>
          <p className="text-gray-400 text-sm">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
          <span className="font-medium text-sm">{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
        </div>
      </div>
    </Link>
  );
}
