import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // vite config
    plugins: [
      react(),
      eslintPlugin({
        cache: false,
        // include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
        include: ['./src/**/*.js', './src/**/*.jsx'],
        exclude: []
      })
    ],
    resolve: {
      alias: {
        '@': './src'
      }
    },
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
      'process.env': env
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      port: 5173, // you can replace this port with any port
    }
  };
});
