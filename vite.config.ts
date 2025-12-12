/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  /**
   * Vite base path:
   * - Local dev (ionic serve / npm run dev): '/'
   * - GitHub Pages build: '/arcana-code-forges/'
   */
  base: command === 'serve' ? '/' : '/arcana-code-forges/',

  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
}));
