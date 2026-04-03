import { Film } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 w-full min-h-[80vh] flex items-center justify-center py-12">
      <div className="max-w-3xl w-full bg-dark-card rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* Aesthetic background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="flex flex-col items-center text-center z-10 relative">
          <Film className="w-16 h-16 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Cine<span className="text-primary">Verse</span></h1>
          <p className="text-xl text-gray-300 font-medium mb-10 max-w-xl leading-relaxed">
            Your ultimate companion for discovering movies, tracking favorites, and reading what others think about the latest blockbusters.
          </p>

          <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
            <div className="bg-dark-bg p-6 rounded-2xl border border-white/5 shadow-inner">
              <h3 className="text-3xl font-black text-white mb-2">1M+</h3>
              <p className="text-sm text-gray-400 font-medium tracking-wide">MOVIES</p>
            </div>
            <div className="bg-dark-bg p-6 rounded-2xl border border-white/5 shadow-inner">
              <h3 className="text-3xl font-black text-white mb-2">Daily</h3>
              <p className="text-sm text-gray-400 font-medium tracking-wide">UPDATES</p>
            </div>
            <div className="bg-dark-bg p-6 rounded-2xl border border-white/5 shadow-inner">
              <h3 className="text-3xl font-black text-white mb-2">Free</h3>
              <p className="text-sm text-gray-400 font-medium tracking-wide">TO USE</p>
            </div>
          </div>

          <div className="text-left w-full space-y-8">
            <section className="bg-dark-bg p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">Data Provided By TMDB</h2>
              <p className="text-gray-400 leading-relaxed text-sm mb-4">
                This project uses the TMDB API to fetch up-to-date movie information, posters, ratings, and cast details. 
                "This product uses the TMDB API but is not endorsed or certified by TMDB."
              </p>
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                alt="TMDB Logo" 
                className="h-4"
              />
            </section>

            <section className="bg-dark-bg p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Vite', 'Tailwind CSS', 'React Router', 'Lucide Icons'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
