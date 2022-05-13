const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonPaths = require('./common-paths')

const config = {
  entry: ['@babel/polyfill', './src'],
  output: {
    filename: 'bundle.[hash].js',
    path: commonPaths.outputPath,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': commonPaths.sourcePath,
      state: path.resolve(commonPaths.sourcePath, 'state'),
      components: path.resolve(commonPaths.sourcePath, 'components'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnerror: true,
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg|.png|.jpg|.webp$/,
        loader: 'file-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
      {
        test: /\.mp4|.webm/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimtetype: 'video/mp4',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id]..css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.optimize.CommonsChunkPlugin({
    //     filename: 'common.js',
    //     minChunks: 3,
    //     name: 'common'
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: commonPaths.template,
      favicon: commonPaths.favicon,
      inject: true,
    }),
  ],
}

module.exports = config
