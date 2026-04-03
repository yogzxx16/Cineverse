import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { BookmarkX } from 'lucide-react';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(list);
  }, []);

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <BookmarkX className="w-20 h-20 text-gray-600 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Your Watchlist is Empty</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          It looks like you haven't added any movies yet. Explore trending movies or search for your favorites to save them here.
        </p>
        <a href="/movies" className="bg-primary hover:bg-orange-600 px-8 py-3 rounded-full font-bold transition-colors">
          Explore Movies
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
          {watchlist.length} {watchlist.length === 1 ? 'Movie' : 'Movies'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {watchlist.map(movie => (
          <div key={movie.id} className="relative group/wrapper">
            <MovieCard movie={movie} />
            <button 
              onClick={() => {
                const newList = watchlist.filter(m => m.id !== movie.id);
                setWatchlist(newList);
                localStorage.setItem('watchlist', JSON.stringify(newList));
              }}
              className="absolute -top-3 -right-3 z-30 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-lg opacity-0 group-hover/wrapper:opacity-100 transition-opacity"
              title="Remove from Watchlist"
            >
              <BookmarkX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
