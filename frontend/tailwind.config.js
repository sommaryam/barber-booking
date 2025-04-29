/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#ff6347',
        secondary:'#4CAF50',
      },
      animation: {
        fadeDown: 'fadeDown 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
