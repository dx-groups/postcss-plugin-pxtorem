var postcss = require('postcss');

module.exports = postcss.plugin('myplugin', function myplugin(options) {
  return function(root) {
    options = options || {};

    root.walkRules((rule) => {
      let list = [];
      rule.walkDecls((decl) => {
        let data = getDpx(decl);
        if (data) {
          list.push(data);
          decl.remove();
        }
      })
      insertDpx(rule, list);
    })
  }
});


const getDpx = (decl) => {
  let dpxReg = /(\d+)(dpx)([\s]+|[;]|$)/;
  let value = decl.value;
  if (value.match(dpxReg)) {
    let num = 0;
    value.replace(dpxReg, function(a, b) {
      num = parseFloat(b);
    })
    return {
      prop: decl.prop,
      value: num
    }
  }
  return undefined;
}

const insertDpx = function(rule, list) {
  if (!list || list.length === 0) {
    return;
  }
  let unit = 'px';
  for (let i = 3; i > 0; i--) {
    let ruleName = `[data-dpr="${i}"] ${rule.selector}`;
    let newRule = createRule(ruleName);
    list.forEach(decl => {
      createDecl(newRule, decl.prop, (decl.value / i) + unit);
    });
    rule.parent.insertAfter(rule, newRule);
  }
}

const createRule = function(name) {
  return postcss.rule({ selector: name })
}
const createDecl = function(rule, prop, value) {
  rule.append({ prop, value });
}
