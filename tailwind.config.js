/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chess-black': '#44403c',
        'chess-black-green': '#0b5b3c',
        'chess-white': '#6b7280',
        'chess-white-green': '#6b806e'
      }
    },
  },
  plugins: [],
}

