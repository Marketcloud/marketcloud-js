/* eslint-disable no-var */
const   webpack = require('webpack'),
        path = require('path');

module.exports = {
    entry: {
        marketcloud: './src/index.js',
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            include : [
                path.resolve(__dirname,"src")
            ],
            test: /\.js$/,
            query : {
                presets : ['es2015']
            }
        }],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
    ],
    output: {
        path: './dist',
        filename: 'marketcloud.min.js'
    },
};