const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const srcPath = path.join(__dirname, '/client/src/index.jsx');
const distPath = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: srcPath,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: distPath,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      favicon: false,
      showErrors: true,
      cache: true,
      template: path.join(__dirname, 'index.html'),
    }),
  ],
};
