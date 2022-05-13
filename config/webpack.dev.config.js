const webpack = require('webpack');
const commonPaths = require('./common-paths');

const config = {
    devServer: {
        contentBase: commonPaths.outputPath,
        compress: true,
        historyApiFallback: true,
        hot: false,
        port: parseInt(process.env.PORT, 10) || 9000,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false,
        }),
        new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(process.env.API_URL) })
    ],
    optimization: {
        minimize: false
    },
};

module.exports = config;
