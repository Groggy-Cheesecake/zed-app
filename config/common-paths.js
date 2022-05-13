const path = require('path');

module.exports = {
    outputPath: path.resolve(__dirname, '../', 'dist'),
    sourcePath: path.resolve(__dirname, '../', 'src'),
    root: path.resolve(__dirname, '../'),
    template: './src/index.html',
    favicon: './src/assets/images/zed_favicon.png',
};
