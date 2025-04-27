import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000
  },
  optimizeDeps: {
    exclude: ['rust_project']
  }
}); 