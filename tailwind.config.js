/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'sans-serif'],
        lato: ['Lato', 'ui-sans-serif', 'sans-serif'],
        manrope: ['Manrope', 'ui-sans-serif', 'sans-serif'],
        dmsans: ['DM Sans', 'ui-sans-serif', 'sans-serif'],
        nunito: ['Nunito', 'ui-sans-serif', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'sans-serif'],
        sans: ['Inter', 'Lato', 'ui-sans-serif', 'sans-serif'],
        josefin: ['"Josefin Sans"', 'ui-sans-serif'],
        heading: ['Manrope', 'Inter', 'ui-sans-serif', 'sans-serif'],
        body:  ['"Josefin Sans"', 'ui-sans-serif'],
      },
      animation: {
        shimmer: "shimmer 1.25s linear infinite"
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        }
      },
      backgroundImage: {
        'shimmer-gradient': "linear-gradient(90deg, rgba(251,146,60,0.15) 0%, rgba(255,255,255,0.75) 50%, rgba(251,146,60,0.15) 100%)"
      }
    },
  },
  plugins: [],
};
