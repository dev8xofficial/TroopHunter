const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;
const printCompilationMessage = require('./compilation.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const PurgeCSS = require('@fullhuman/postcss-purgecss');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  const publicPath = process.env.NEXT_PUBLIC_TROOPHUNTER_APP_URL;

  return {
    output: {
      publicPath: 'auto',
      filename: '[name].js',
      chunkFilename: '[name].[contenthash].js' // Keeps cache-busting to chunks only
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    devServer: {
      port: 5175,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: true,
      watchFiles: [path.resolve(__dirname, 'src')],
      onListening: function (devServer) {
        const port = devServer.server.address().port;

        printCompilationMessage('compiling', port);

        devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
          setImmediate(() => {
            if (stats.hasErrors()) {
              printCompilationMessage('failure', port);
            } else {
              printCompilationMessage('success', port);
            }
          });
        });
      }
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        }
      ]
    },

    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true
            }),
            new CssMinimizerPlugin()
          ]
        }
      : {},

    plugins: [
      new ModuleFederationPlugin({
        name: 'troophunter',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './src/App': './src/App.tsx'
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
            eager: true
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
            eager: true
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: deps['react-router-dom'],
            eager: true
          },
          'react-redux': {
            singleton: true,
            requiredVersion: deps['react-redux'],
            eager: true
          },
          'redux-persist': {
            singleton: true,
            requiredVersion: deps['redux-persist'],
            eager: true
          }
        }
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: 'public/website.css'
      })
    ]
  };
};
