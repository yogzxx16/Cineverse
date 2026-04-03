import { Link, useLocation } from 'react-router-dom';
import { Film, Search, Bookmark, Info, User, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Film className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
            CineVerse
          </span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-gray-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
          <Link to="/movies" className="hover:text-primary transition-smooth flex items-center gap-1">
            <Search className="w-4 h-4" /> Movies
          </Link>
          <Link to="/watchlist" className="hover:text-primary transition-smooth flex items-center gap-1">
            <Bookmark className="w-4 h-4" /> Watchlist
          </Link>
          <Link to="/profile" className="hover:text-primary transition-smooth flex items-center gap-1">
            <User className="w-4 h-4" /> Profile
          </Link>
          <Link to="/contact" className="hover:text-primary transition-smooth flex items-center gap-1">
            <Mail className="w-4 h-4" /> Contact
          </Link>
          <Link to="/about" className="hover:text-primary transition-smooth flex items-center gap-1">
            <Info className="w-4 h-4" /> About
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          <Link to="/" className="hover:text-primary transition-smooth py-2 block border-b border-white/5">Home</Link>
          <Link to="/movies" className="hover:text-primary transition-smooth py-2 flex items-center gap-2 border-b border-white/5">
            <Search className="w-5 h-5" /> Movies
          </Link>
          <Link to="/watchlist" className="hover:text-primary transition-smooth py-2 flex items-center gap-2 border-b border-white/5">
            <Bookmark className="w-5 h-5" /> Watchlist
          </Link>
          <Link to="/profile" className="hover:text-primary transition-smooth py-2 flex items-center gap-2 border-b border-white/5">
            <User className="w-5 h-5" /> Profile
          </Link>
          <Link to="/contact" className="hover:text-primary transition-smooth py-2 flex items-center gap-2 border-b border-white/5">
            <Mail className="w-5 h-5" /> Contact
          </Link>
          <Link to="/about" className="hover:text-primary transition-smooth py-2 flex items-center gap-2">
            <Info className="w-5 h-5" /> About
          </Link>
        </div>
      )}
    </nav>
  );
}
