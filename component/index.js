var postcss = require('postcss');
var postcssPluginPx2rem = require('../lib/postcss-plugin-px2rem-master/src');
module.exports = postcss.plugin('myplugin', function myplugin(options) {
  return function(root) {
    options = options || {};

    handle(root)
  }
});
const declarationExists = (decls, prop, value) => decls.some(decl =>
  decl.prop === prop && decl.value === value
);

function handle(root) {
  let rex = 'dpx';

  root.insertAfter(0, 'a{b:cs}');
  root.walkDecls(function(decl, i) {
    let _value = decl.value;
    let _decl = decl;
    let index = 1;

    // if rem unit already exists, do not add or replace 如果已经存在
    // if (declarationExists(_decl.parent, _decl.prop, _value)) return;
    if (_value.indexOf('dpx') !== -1) {
      _value = "mememem";
      _decl.parent.insertAfter(i, _decl.clone({
        value: _value,
      }));
    }
  });

}
