const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.NODE_ENV || 'development';

module.exports = {
  mode: MODE,
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MODE === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
