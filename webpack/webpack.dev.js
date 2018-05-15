const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

process.env.NODE_ENV = "development";

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  mode: 'development'
});
