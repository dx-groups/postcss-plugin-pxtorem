const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获得路径
const resolve = function(src) {
  return path.join(__dirname, "..", src);
};

module.exports = {
  entry: {
    app: resolve('src/index.js'),
    // precss: ['precss'],

  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist')
  },
  plugins: [
		new CleanWebpackPlugin([resolve('dist')]),
		new HtmlWebpackPlugin({
      template: resolve('src/index.html')
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: resolve('postcss.config.js')
            }
          }
        }
    ]
    }]
  },
  resolve: {
    // 可以忽略的文件类型
    extensions: ['.js'],
    // 别名
    alias: {

    }
  },
};
