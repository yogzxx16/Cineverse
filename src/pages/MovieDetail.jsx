import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Globe, Bookmark, BookmarkCheck } from 'lucide-react';
import { fetchMovieDetails, fetchSimilarMovies, getPosterUrl, getBackdropUrl } from '../utils/api';
import MovieCard from '../components/MovieCard';
import StarRating from '../components/StarRating';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    Promise.all([
      fetchMovieDetails(id),
      fetchSimilarMovies(id)
    ]).then(([detailData, similarData]) => {
      setMovie(detailData);
      setSimilar(similarData.results.slice(0, 8));
      setLoading(false);
    }).catch(err => console.error(err));

    // Load Watchlist state
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsSaved(watchlist.some((m) => m.id === parseInt(id)));

    // Load stored reviews
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    setReviews(allReviews[id] || []);
  }, [id]);

  const toggleWatchlist = () => {
    if (!movie) return;
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (isSaved) {
      watchlist = watchlist.filter((m) => m.id !== movie.id);
    } else {
      watchlist.push(movie);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsSaved(!isSaved);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    const newReview = { 
      id: Date.now(), 
      text: reviewText, 
      rating, 
      date: new Date().toLocaleDateString(),
      movieTitle: movie.title,
      moviePoster: movie.poster_path 
    };
    const updatedReviews = [newReview, ...reviews];
    
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    allReviews[id] = updatedReviews;
    localStorage.setItem('reviews', JSON.stringify(allReviews));
    
    setReviews(updatedReviews);
    setReviewText('');
    setRating(0);
  };

  if (loading || !movie) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const cast = movie.credits?.cast?.slice(0, 8) || [];

  return (
    <div className="pb-12">
      {/* Hero Backbone */}
      <div className="relative h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src={getBackdropUrl(movie.backdrop_path)} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col md:flex-row items-end pb-12 gap-8">
          <div className="hidden md:block w-64 lg:w-80 flex-shrink-0 relative group">
            <img 
              src={getPosterUrl(movie.poster_path)} 
              alt={movie.title} 
              className="w-full rounded-2xl shadow-2xl border border-white/10"
            />
            <button 
              onClick={toggleWatchlist}
              className="absolute top-4 right-4 p-3 bg-black/60 rounded-full backdrop-blur-sm hover:bg-primary transition-colors border border-white/10"
            >
              {isSaved ? (
                <BookmarkCheck className="w-6 h-6 text-white" fill="currentColor" />
              ) : (
                <Bookmark className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-4xl md:text-6xl font-black mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-xl md:text-2xl text-gray-400 italic mb-4">{movie.tagline}</p>}
            
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <span className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                <Star className="w-4 h-4" fill="currentColor" /> {movie.vote_average?.toFixed(1)}
              </span>
              <span className="flex items-center gap-1 text-gray-300">
                <Calendar className="w-4 h-4" /> {movie.release_date?.split('-')[0]}
              </span>
              <span className="flex items-center gap-1 text-gray-300">
                <Clock className="w-4 h-4" /> {movie.runtime} min
              </span>
              <span className="flex items-center gap-1 text-gray-300">
                <Globe className="w-4 h-4" /> {movie.original_language?.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(g => (
                <span key={g.id} className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/5">{g.name}</span>
              ))}
            </div>

            <div className="max-w-3xl">
              <h3 className="text-xl font-bold mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed md:text-lg">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Cast Section */}
            {cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Top Cast</h2>
                <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar preserve-3d touch-pan-x snap-x">
                  {cast.map(person => (
                    <div key={person.id} className="w-28 md:w-32 flex-shrink-0 text-center snap-center">
                      <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/10 bg-gray-800">
                        {person.profile_path ? (
                          <img src={getPosterUrl(person.profile_path)} className="w-full h-full object-cover" alt={person.name}/>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-xs text-gray-500 p-2">No Image</div>
                        )}
                      </div>
                      <p className="font-bold text-sm line-clamp-1">{person.name}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{person.character}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">User Reviews</h2>
              <form onSubmit={handleReviewSubmit} className="bg-dark-card p-6 rounded-2xl mb-8 border border-white/5">
                <h3 className="font-medium mb-4">Write a review</h3>
                <div className="mb-4">
                  <StarRating rating={rating} setRating={setRating} />
                </div>
                <textarea
                  className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors min-h-[120px] mb-4"
                  placeholder="What did you think of the movie?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={!rating || !reviewText.trim()}
                  className="bg-primary hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-primary px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Submit Review
                </button>
              </form>

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
                ) : (
                  reviews.map(review => (
                    <div key={review.id} className="bg-dark-card p-5 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-300">{review.text}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-dark-card p-6 rounded-2xl border border-white/5 mb-8">
              <h3 className="font-bold text-lg mb-4">Movie Info</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Status</span>
                  <span className="font-medium">{movie.status}</span>
                </div>
                {movie.budget > 0 && (
                  <div>
                    <span className="text-gray-500 block mb-1">Budget</span>
                    <span className="font-medium">${movie.budget.toLocaleString()}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <span className="text-gray-500 block mb-1">Revenue</span>
                    <span className="font-medium">${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {similar.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Similar Movies</h3>
                <div className="space-y-4">
                  {similar.map(sim => (
                    <Link key={sim.id} to={`/movies/${sim.id}`} className="flex gap-4 group">
                      <div className="w-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={getPosterUrl(sim.poster_path)} className="w-full object-cover aspect-[2/3] group-hover:scale-105 transition-sm" alt=""/>
                      </div>
                      <div className="py-2">
                        <h4 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">{sim.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{sim.release_date?.split('-')[0]}</p>
                        <div className="flex items-center gap-1 mt-2 text-primary text-sm font-medium">
                          <Star className="w-3 h-3" fill="currentColor" /> {sim.vote_average?.toFixed(1)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
