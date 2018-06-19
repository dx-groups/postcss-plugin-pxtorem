let postcss = require('postcss');
let pxtorem = require('./pxtorem');
let dpxtopx = require('./dpxtopx');
module.exports = postcss.plugin('postcss-plugin-pxtorem', options => {
  const opts = { ...options };
  return css => {
    dpxtopx(opts, css);
    pxtorem(opts, css);
  };
});
