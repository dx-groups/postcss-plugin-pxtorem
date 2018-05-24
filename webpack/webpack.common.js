const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获得路径
const resolve = function(src) {
  return path.join(__dirname, "..", src);
};

module.exports = {
  entry: {
    app: resolve('test/index.js'),
    css: resolve('test/index.css')
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist')
  },
  plugins: [
		new CleanWebpackPlugin([resolve('dist')]),
		new HtmlWebpackPlugin({
      template: resolve('test/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
  ]
  },
  resolve: {
    // 可以忽略的文件类型
    extensions: ['.js'],
    // 别名
    alias: {

    }
  },
};
