import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <button
            type="button"
            key={star}
            className={`transition-colors ${(hover || rating) >= star ? 'text-yellow-500' : 'text-gray-600'}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
          >
            <Star className="w-8 h-8" fill={(hover || rating) >= star ? 'currentColor' : 'none'} />
          </button>
        );
      })}
    </div>
  );
}
