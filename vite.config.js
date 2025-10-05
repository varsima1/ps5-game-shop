import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ps5-game-shop/', // ← Add this (your repo name)
  server: {
    port: 5173,
  },
});