import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import federation from '@originjs/vite-plugin-federation';
// import mkcert from 'vite-plugin-mkcert';
// import fs from 'fs';
// import path from 'path';

// const privateKey = fs.readFileSync(path.resolve(__dirname, './cert/crm-key.pem'));
// const certificate = fs.readFileSync(path.resolve(__dirname, './cert/crm-cert.pem'));

// // // Load the CA certificate to verify client certificates
// const caCertificate = fs.readFileSync(path.resolve(__dirname, './cert/ca-cert.pem'));

// const httpsAgent = {
//   key: privateKey,
//   cert: certificate,
//   ca: caCertificate
// };

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
      }),
      federation({
        name: 'crm',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx'
        },
        shared: ['react', 'react-dom'] // share dependencies between website and react
      }),
      pluginRewriteAll()
      // mkcert()
    ],
    build: {
      target: 'esnext',
      minify: true // for debugging
    },
    resolve: {
      alias: {
        '@': './src'
      }
    },
    define: {
      __APP_ENV__: env.APP_ENV,
      'process.env': env
    },
    server: {
      // https: httpsAgent,
      // https: true,
      watch: {
        usePolling: true
      },
      // proxy: {
      //   '/api': {
      //     target: 'https://localhost', // NGINX server URL
      //     changeOrigin: true,
      //     secure: true // Enforce HTTPS
      //   }
      // },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      port: 5173 // you can replace this port with any port
    }
  };
});
