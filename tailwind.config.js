/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Brand palette (tight + consistent)
      colors: {
        brand: {
          orange: '#F97316',      // orange-500
          orangeDark: '#EA580C',  // orange-600 (hover)
          ink: '#0F172A',         // slate-900 for headings/nav
          sky75: '#E6F5FE',       // mid between sky-50 & sky-100
          peach50: '#FFF7ED',     // orange-50 section bg
        },
      },
      // Fonts: Manrope for headings, Josefin Sans for body
      fontFamily: {
        heading: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Josefin Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Make Tailwind's default "sans" our body by default
        sans: ['"Josefin Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 1.25s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'shimmer-gradient':
          'linear-gradient(90deg, rgba(251,146,60,0.15) 0%, rgba(255,255,255,0.75) 50%, rgba(251,146,60,0.15) 100%)',
      },
    },
  },
  plugins: [],
};
