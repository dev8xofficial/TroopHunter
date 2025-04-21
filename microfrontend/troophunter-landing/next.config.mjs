import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  devIndicators: {
    loading: false
  },
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    const remoteUrl = process.env.NEXT_PUBLIC_TROOPHUNTER_APP_URL;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'troophunter-landing',
        remotes: {
          remote: `remote@${remoteUrl}/remoteEntry.js`
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
