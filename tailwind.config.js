/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        madera: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#166534',
        },
        fuego: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#991b1b',
        },
        tierra: {
          light: '#fde047',
          DEFAULT: '#eab308',
          dark: '#a16207',
        },
        metal: {
          light: '#f5f5f5',
          DEFAULT: '#a3a3a3',
          dark: '#525252',
        },
        agua: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
      },
    },
  },
  plugins: [],
}
