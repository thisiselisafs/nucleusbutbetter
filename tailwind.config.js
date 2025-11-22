/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        beige: {
          50: '#fdfcf8',
          100: '#f9f7f2', // Main BG match
          200: '#f2efe6',
          300: '#e6dfcc',
          900: '#3d3a30',
        }
      }
    },
  },
  plugins: [],
}