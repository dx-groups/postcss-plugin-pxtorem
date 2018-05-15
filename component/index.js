var postcss = require('postcss');
module.exports = postcss.plugin('myplugin', function myplugin(options) {
  return function(css) {
    options = options || {};

    handle(css)
  }
});

function handle(css) {
  css.walkRules(function(rule) {
    rule.walkDecls(function(decl, i) {
      decl.value = '我是对的'
    });
  });
}
