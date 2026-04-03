import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Film, Star, Trash2 } from 'lucide-react';
import MovieCard from '../components/MovieCard';

// Extracted from common TMDB genres
const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama",
  "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance",
  "Science Fiction", "TV Movie", "Thriller", "War", "Western"
];

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Movie Buff',
    bio: 'I love watching movies and discovering new stories!',
    favoriteGenre: 'Action'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const [watchlist, setWatchlist] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    // Load Profile
    const localProfile = JSON.parse(localStorage.getItem('cineverse_profile')) || {
      name: 'Movie Buff',
      bio: 'I love watching movies and discovering new stories!',
      favoriteGenre: 'Action'
    };
    setProfile(localProfile);

    // Load Watchlist
    const localWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(localWatchlist);

    // Load Reviews
    const allReviewsMap = JSON.parse(localStorage.getItem('reviews') || '{}');
    const flattenedReviews = [];
    
    Object.keys(allReviewsMap).forEach(movieId => {
      allReviewsMap[movieId].forEach(review => {
        flattenedReviews.push({
          ...review,
          movieId: movieId
        });
      });
    });
    // Sort reviews by deepest date roughly (we use ID which is Date.now() for ease)
    flattenedReviews.sort((a, b) => b.id - a.id);
    setMyReviews(flattenedReviews);

  }, []);

  const handleSave = () => {
    localStorage.setItem('cineverse_profile', JSON.stringify(profile));
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const removeReview = (movieId, reviewId) => {
    const allReviewsMap = JSON.parse(localStorage.getItem('reviews') || '{}');
    if (allReviewsMap[movieId]) {
      allReviewsMap[movieId] = allReviewsMap[movieId].filter(r => r.id !== reviewId);
      if (allReviewsMap[movieId].length === 0) {
        delete allReviewsMap[movieId];
      }
      localStorage.setItem('reviews', JSON.stringify(allReviewsMap));
    }
    setMyReviews(myReviews.filter(r => r.id !== reviewId));
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
      
      {/* Profile Header Block */}
      <div className="bg-dark-card rounded-3xl p-6 md:p-10 border border-white/5 mb-12 flex flex-col md:flex-row gap-8 items-start relative">
        {savedMessage && (
          <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-full flex items-center gap-2 text-sm border border-green-500/20 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Profile saved
          </div>
        )}
        
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-gradient-to-tr from-primary to-orange-500 rounded-full flex items-center justify-center text-4xl md:text-6xl font-black shadow-lg mx-auto md:mx-0">
          {getInitials(profile.name)}
        </div>
        
        <div className="flex-grow w-full">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div>
              {isEditing ? (
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange}
                  className="text-3xl font-bold bg-dark-bg border border-white/10 rounded-lg px-3 py-1 text-white w-full max-w-sm focus:outline-none mb-2"
                />
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">{profile.name}</h1>
              )}
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Film className="w-4 h-4" /> {watchlist.length} Watchlist</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {myReviews.length} Reviews</span>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="bg-primary hover:bg-orange-600 px-6 py-2 rounded-full font-bold transition-colors w-full md:w-auto"
                >
                  Save Changes
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-2 rounded-full font-bold transition-colors w-full md:w-auto"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-medium">Bio</label>
              {isEditing ? (
                <textarea 
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none resize-none"
                />
              ) : (
                <p className="text-gray-300 leading-relaxed bg-dark-bg/50 rounded-xl p-4 border border-white/5 min-h-[80px]">
                  {profile.bio || "No bio added yet."}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-medium">Favorite Genre</label>
              {isEditing ? (
                <select 
                  name="favoriteGenre"
                  value={profile.favoriteGenre}
                  onChange={handleChange}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none appearance-none"
                >
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              ) : (
                <div className="inline-block bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 font-medium">
                  {profile.favoriteGenre}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sections Grid */}
      <div className="space-y-12">
        {/* My Watchlist Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">My Watchlist <span className="text-sm font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{watchlist.length}</span></h2>
            <Link to="/watchlist" className="text-primary hover:text-orange-500 font-medium text-sm transition-colors">
              View All
            </Link>
          </div>
          
          {watchlist.length === 0 ? (
            <div className="bg-dark-card border border-white/5 rounded-2xl p-10 text-center">
              <p className="text-gray-500 mb-4">Your watchlist is empty.</p>
              <Link to="/movies" className="text-primary hover:underline">Explore movies to add</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {watchlist.slice(0, 4).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
        
        {/* My Reviews */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
            <h2 className="text-2xl font-bold">My Reviews</h2>
            <span className="text-sm text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{myReviews.length}</span>
          </div>
          
          {myReviews.length === 0 ? (
            <div className="bg-dark-card border border-white/5 rounded-2xl p-10 text-center">
              <p className="text-gray-500">You haven't written any reviews yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {myReviews.map(review => (
                <div key={review.id} className="bg-dark-card border border-white/5 rounded-2xl p-6 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link to={`/movies/${review.movieId}`} className="font-bold text-lg hover:text-primary transition-colors hover:underline">
                        {review.movieTitle || `Movie ID: ${review.movieId}`}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3" fill="currentColor" />)}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeReview(review.movieId, review.id)}
                      className="p-2 text-gray-500 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

    </div>
  );
}
