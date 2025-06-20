import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Initial output directory
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.pdf', '**/*.doc', '**/*.docx'],
  base: '/portfolio1/', // Match the subdirectory deployment
});