// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
// entry: { main: './src/index.js' },
//   output: {
//   path: path.resolve(__dirname, 'dist'),
//   filename: 'main.js',
//       publicPath: ''
// },
//     mode: 'development',
// devServer: {
//   static: path.resolve(__dirname, './dist'),
//   compress: true,
//   port: 8080,
//   open: true
// },
//     module: {
//     rules: [ // rules — это массив правил
//       // добавим в него объект правил для бабеля
//       {
//         // регулярное выражение, которое ищет все js файлы
//         test: /\.js$/,
//         // при обработке этих файлов нужно использовать babel-loader
//         use: 'babel-loader',
//         // исключает папку node_modules, файлы в ней обрабатывать не нужно
//         exclude: '/node_modules/'
//       }
//       ]
//   },
//   plugins: [
// new HtmlWebpackPlugin({
//   template: './src/index.html'
// }),
//     new CleanWebpackPlugin(), // использовали плагин
//   ] 
// }; 

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: { main: './src/index.js' },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'bundle.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[contenthash].js',
    publicPath: '',
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|png|webp|gif|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        // include: path.resolve(__dirname, './src/images'),
      },
      // {
      //   test: /\.(woff|woff2)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'vendor/fonts/[name][ext]',
      //   },
      //   // include: path.resolve(__dirname, './src/vendor/fonts'),
      // }
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'vendor/fonts/[name][ext]',
        },
      }
    ]
  }
};

module.exports = config;

/\.(png|jpe?g|gif)$/i