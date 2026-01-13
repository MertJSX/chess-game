import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/chess-game/',
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})