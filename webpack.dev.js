const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './src/electron.js',
    target: 'electron-main',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'electron.js',
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  },
  {
    mode: 'development',
    entry: './src/index.jsx',
    target: 'electron-renderer',
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].min.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[hash:8].[ext]',
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
    ],
  },
];
