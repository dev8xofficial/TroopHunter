const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.css', // Replace with your actual CSS entry point
  output: {
    path: path.resolve(__dirname, 'src/css/'), // Output to public folder
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // Add if you're using PostCSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'website.css', // The generated CSS file in the public folder
    }),
  ],
};
