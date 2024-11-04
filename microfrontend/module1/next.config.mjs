import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'module1',
        remotes: {
          module: 'module@http://localhost:5175/remoteEntry.js'
        },
        filename: `static/${remoteDir}/remoteEntry.js`,
        exposes: {},
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
          'react-redux': { singleton: true, eager: true },
          // Share the process.env to remote apps
          process: { singleton: true, eager: true },
          tailwindcss: {
            eager: true,
            singleton: true,
            requiredVersion: false
          },
          'style-loader': { singleton: true, eager: true },
          'css-loader': { singleton: true, eager: true },
          'postcss-loader': { singleton: true, eager: true }
        }
      })
    );

    return config;
  }
};

export default nextConfig;
