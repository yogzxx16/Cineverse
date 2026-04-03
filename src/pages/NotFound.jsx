import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Film className="w-24 h-24 text-gray-600 mb-6" />
      <h1 className="text-6xl font-black mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-300 mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        The movie you're looking for seems to have been removed, or the link is incorrect.
      </p>
      <Link to="/" className="bg-primary hover:bg-orange-600 px-8 py-3 rounded-full font-bold transition-colors">
        Return Home
      </Link>
    </div>
  );
}
