import { Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-card py-8 mt-12 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Film className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">CineVerse</span>
        </div>
        <p className="text-gray-400 text-sm text-center md:text-left">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
        <p className="text-xs text-gray-500 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
