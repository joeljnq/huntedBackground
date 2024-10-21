/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sixtyfour': ['SixtyFour', 'sans-serif'],
        'roboto': ['roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

