const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FontAwesomeMinifyPlugin = require('font-awesome-minify-plugin');

const commonPaths = require('./common-paths');

const config = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new FontAwesomeMinifyPlugin({
            srcDir: commonPaths.sourcePath,
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            parallel: true,
        }), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            chunks: 'all',
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                abi: {
                    test: /[\\/]contracts[\\/]/,
                    priority: -30,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        },
    },
};

module.exports = config;
