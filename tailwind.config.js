/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e50914", // Netflix Red
        dark: {
          bg: "#0a0a0f",
          card: "#1a1a2e"
        }
      }
    },
  },
  plugins: [],
}
