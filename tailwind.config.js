/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f7f4e8',
        teal: {
          400: '#6bc4cc',
          500: '#56afb6',
          600: '#4a9aa0',
        },
        lightgray: '#eeeeee',
        darkslate: '#1e293b',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
