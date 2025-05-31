import NextFederationPlugin from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable server-side rendering completely
  experimental: {
    isrMemoryCacheSize: 0
  },
  // Configure static export
  output: 'export',
  // Disable image optimization since we're exporting
  images: { unoptimized: true },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'troophunter-landing',
        remotes: {
          troophunter: `troophunter@${process.env.NEXT_PUBLIC_TROOPHUNTER_APP_URL}/remoteEntry.js`
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
            strictVersion: true
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
            strictVersion: true
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: '^6.0.0',
            eager: true,
            strictVersion: true
          }
        }
      })
    );

    return config;
  },
  // Disable static page generation
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
