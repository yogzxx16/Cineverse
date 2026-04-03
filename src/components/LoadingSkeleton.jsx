export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-dark-card rounded-xl overflow-hidden shadow-lg h-full">
          <div className="aspect-[2/3] bg-gray-800" />
          <div className="p-4">
            <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
