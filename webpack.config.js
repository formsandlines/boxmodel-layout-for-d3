const path = require('path');

module.exports = {
    // mode: 'development',
    // devtool: 'inline-source-map',
    mode: 'production',
    devtool: 'source-map',
    entry: './src/boxmodel.js',
    output: {
        // filename: 'boxmodel-d3.js',
        filename: 'boxmodel-d3.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'boxmodel-d3',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                    // plugins: ["add-module-exports"]
                }
            }
        }]
    },
    externals: {
        d3: 'd3'
    }
};