/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'playfair': ['"Playfair Display"'],
      'jura': ['"Jura"']
    },
    extend: {
      colors: {
        'regal-pink': '#EB258E',
        'light-pink': '#EE96CA',
        'light-blue': '#93C5FD',
      },
    },
  },
  plugins: [],
}