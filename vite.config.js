import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.pdf', '**/*.doc', '**/*.docx'],
  // Optional: Set base path for Render deployment
  base: process.env.NODE_ENV === 'production' ? '/portfolio1/' : '/',
});