/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primaryGray' : "#F2F3F5",
        'secondaryGray' : "#FAFBFC",
        'primaryBlack' : "#1D1D1D"
      }
    },
  },
  plugins: [],
}

