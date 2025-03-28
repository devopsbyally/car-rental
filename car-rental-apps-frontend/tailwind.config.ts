/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Include all Next.js app directory files
    './pages/**/*.{js,ts,jsx,tsx}', // (optional) If you use `/pages`
    './components/**/*.{js,ts,jsx,tsx}', 
    './src/**/*.{js,ts,jsx,tsx}',   // If you keep some components in /src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Tailwind Blue-700
        secondary: '#FBBF24', // Amber-400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}

export default config;
