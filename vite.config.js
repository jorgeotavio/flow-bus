import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/flow-bus/',
  build: {
    minify: true,
    sourcemap: false,
    target: 'modules',
  },
})
