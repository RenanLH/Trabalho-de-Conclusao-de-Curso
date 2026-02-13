/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0f172a', // exemplo, se estiver usando dark:bg-dark
      },
    },
  },
  plugins: [],
};
