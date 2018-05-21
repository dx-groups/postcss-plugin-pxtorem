var webpack = require('webpack');

var config = require('./webpack.dev.js');

module.exports = function(app) {
  var compiler = webpack(config);

  var watching = compiler.watch({}, (err, stats) => {
    console.log(stats.toString({
      chunks: true, // 使构建过程更静默无输出
      colors: true // 在控制台展示颜色
    }));
    console.log("watch 修改成功");
  });
  watching.invalidate();
  return compiler;
};
