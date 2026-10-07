/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Didot', 'serif'],
      },
      colors: {
        // Bleu du logo SGM
        brand: {
          50: '#f0f5fd',
          100: '#dde8fa',
          200: '#c2d6f6',
          300: '#98bcef',
          400: '#6a9be6',
          500: '#528be0',
          600: '#3366cf',
          700: '#2a52b4',
          800: '#284593',
          900: '#253c74',
          950: '#1a2648',
        },
        // Sable / pêche du logo SGM
        sand: {
          50: '#fdf7f1',
          100: '#f9ebdd',
          200: '#f2d5ba',
          300: '#e6b48a',
          400: '#dc9763',
          500: '#d47f45',
          600: '#c5673a',
        },
      },
    },
  },
  plugins: [],
};
