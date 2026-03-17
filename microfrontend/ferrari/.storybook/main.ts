import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

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

    // Remove Storybook's implicit CSS rule(s) so we can run Tailwind/PostCSS exactly once.
    config.module.rules = (config.module.rules || []).filter((rule) => {
      if (!rule || typeof rule !== 'object' || !('test' in rule)) return true;
      const testStr = String((rule as { test?: unknown }).test);
      if (!testStr.includes('css')) return true;
      return false;
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

    // Ensure Tailwind/PostCSS runs for imported CSS (e.g. globals.css)
    config.module.rules.push({
      test: /\.css$/,
      sideEffects: true,
      include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../.storybook')],
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: { importLoaders: 1 }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.cjs')
            }
          }
        }
      ]
    });

    config.resolve = config.resolve || {};
    config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src')
    };

    return config;
  }
};

export default config;
