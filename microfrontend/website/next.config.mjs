import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'website',
          remotes: {
            crm: 'crm@http://localhost:5173/dist/assets/remoteEntry.js'
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {}
        })
      );
    } else {
      config.resolve.alias['remote'] = false;
    }

    return config;
  }
};

export default nextConfig;
