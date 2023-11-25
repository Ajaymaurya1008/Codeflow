/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2f57ef',
        secondary: '#b966e7',
        coral: '#E9967A'
      }
    }
  },
  plugins: [require("daisyui")],
}