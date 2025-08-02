/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',           // Include HTML if you're using Vite or CRA
    './src/**/*.{js,jsx,ts,tsx}',    // All React source files
    './components/**/*.{js,jsx,ts,tsx}', // In case you're storing components in a separate folder
    './pages/**/*.{js,jsx,ts,tsx}',      // Optional: if you use pages folder like Next.js or custom routing
  ],
  theme: {
    extend: {
      // You can add custom animations or colors here later
    },
  },
  plugins: [],
}
