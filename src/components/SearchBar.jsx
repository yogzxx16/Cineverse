import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ initialQuery = '', onSearch, className = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Sync initial query
  useEffect(() => {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search on debounce
  useEffect(() => {
    // Only search if it's different to prevent loops, but wait - when user types and it debounces, we should call onSearch.
    // However, we only want to call onSearch if it actually changed by user typing.
    // We'll rely on the parent updating initialQuery which will re-trigger the above.
    if (debouncedQuery !== initialQuery) {
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== initialQuery) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <Search className="absolute left-4 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="w-full bg-dark-card border border-white/10 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-colors"
      />
      <button 
        type="submit" 
        className="absolute right-2 px-4 py-1.5 bg-primary rounded-full hover:bg-orange-600 transition-colors font-medium text-sm"
      >
        Search
      </button>
    </form>
  );
}
