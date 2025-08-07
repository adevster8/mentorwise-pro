import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The resolve.alias object is now corrected to properly set up the '@' path
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
})