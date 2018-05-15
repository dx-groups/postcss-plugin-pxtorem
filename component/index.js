var postcss = require('postcss');
var postcssPluginPx2rem = require('../postcss-plugin-px2rem-master/src');
module.exports = postcss.plugin('myplugin', function myplugin(options) {
  return function(css) {
    options = options || {};

    handle(css)
  }
});

function handle(css) {
  css.walkRules(function(rule) {
    rule.walkDecls(function(decl, i) {
      let _value = decl.value;
      if (_value.indexOf('px') !== -1) {
        decl.parent.insertAfter(i, decl.clone({
          value: (_value + 'em'),
        }));
      }
    });
  });
}
