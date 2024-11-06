import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'troophunter-landing',
        remotes: {
          troophunter: 'troophunter@http://localhost:5175/remoteEntry.js'
        },
        filename: `static/${remoteDir}/remoteEntry.js`,
        exposes: {},
        shared: {
          // react: { singleton: true, requiredVersion: '^18' },
          // 'react-dom': { singleton: true, requiredVersion: '^18' }
          // Share the process.env to remote apps
          // process: { singleton: true, eager: true },
          // tailwindcss: {
          //   eager: true,
          //   singleton: true,
          //   requiredVersion: '^3.4.11'
          // },
          // 'style-loader': { singleton: true },
          // 'css-loader': { singleton: true },
          // 'postcss-loader': { singleton: true }
        }
      })
    );

    return config;
  }
};

export default nextConfig;
