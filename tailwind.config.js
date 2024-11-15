/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chess-black': '#44403c',
        'chess-black-blue': '#0b5b5c',
        'chess-black-blue-2': '#3d7f80',
        'chess-white': '#6b7280',
        'chess-white-blue': '#5c6b80',
        'chess-white-blue-2': '#7c8da0',
        'chess-point-color': '#3b6e55'
      }
    },
  },
  plugins: [],
}

