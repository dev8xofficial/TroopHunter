import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-links', '@storybook/addon-viewport'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: false
      }
    }
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },

  staticDirs: ['../public'],

  docs: {
    autodocs: 'tag'
  },

  webpackFinal: async (config) => {
    // Remove any existing rule that handles ts/tsx files
    config.module = config.module || { rules: [] };
    config.module.rules = (config.module.rules || []).filter((rule) => {
      if (rule && typeof rule === 'object' && 'test' in rule) {
        return !String(rule.test).includes('tsx');
      }
      return true;
    });

    // Add our own Babel rule for TypeScript and JSX
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: { node: 'current' } }], ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript']
        }
      }
    });

    config.resolve = config.resolve || {};
    config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

    return config;
  }
};

export default config;
