# 🎬 CineVerse — Movie Discovery App

A modern, responsive movie discovery web application built with **React.js** and the **TMDB API**.

![CineVerse](https://img.shields.io/badge/React-18-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-teal) ![TMDB](https://img.shields.io/badge/API-TMDB-green)

## 🌐 Live Demo
🔗 [cineverse.vercel.app](https://your-vercel-url.vercel.app)

## ✨ Features
- 🔍 Search movies with debounced input
- 🎭 Filter by genre
- ⭐ User reviews with star ratings (localStorage)
- 🔖 Watchlist (localStorage)
- 👤 User profile page
- 📬 Contact page with FAQ
- 📱 Fully mobile responsive

## 🛠️ Tech Stack
- React.js + Vite
- React Router DOM
- Tailwind CSS
- TMDB API
- lucide-react (icons)

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/cineverse.git
cd cineverse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```
Get your free API key at [themoviedb.org](https://www.themoviedb.org/settings/api)

### 4. Run the app
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure
```
src/
  components/     # Navbar, Footer, MovieCard, etc.
  pages/          # Home, Movies, MovieDetail, Profile, Contact, etc.
  utils/          # api.js (TMDB API functions)
```


## 📜 API Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB.

## 📄 License
MIT
