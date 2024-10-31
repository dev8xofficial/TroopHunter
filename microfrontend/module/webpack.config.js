const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const deps = require("./package.json").dependencies;
const printCompilationMessage = require('./compilation.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSS = require('@fullhuman/postcss-purgecss');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    output: {
      publicPath: "http://localhost:5175/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 5175,
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
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
      ],
    },

    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
            }),
            new CssMinimizerPlugin(),
          ],
        }
      : {},

    plugins: [
      new ModuleFederationPlugin({
        name: "module",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          tailwindcss: {
            eager: true,
            singleton: true,
            requiredVersion: deps["tailwindcss"],
          },
          "style-loader": {
            singleton: true,
          },
          "css-loader": {
            singleton: true,
          },
          "postcss-loader": {
            singleton: true,
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv(),
    ],
  };
};
