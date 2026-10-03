/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#092C23', 
          800: '#0F3F33', 
          100: '#E6F0ED', 
        },
        gold: {
          500: '#E29B38', 
          600: '#C77D0D', 
        }
      }
    },
  },
  plugins: [],
}