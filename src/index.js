var postcss = require('postcss');

const defaultOpts = {
  prevName: 'data-dpr',
  maxDpr: 3,
  delete: true
};


module.exports = postcss.plugin('postcss-plugin-dpxtopx', function(options) {
  return function(root) {
    options = Object.assign(defaultOpts, options);
    let insertRule = insertDpx(options.prevName, options.maxDpr);
    root.walkRules((rule) => {
      let declList = [];
      rule.walkDecls((decl) => {
        let data = getDpx(decl);
        if (data) {
          declList.push(data);
          if (options.delete) {
            decl.remove();
          }
        }
      })
      insertRule(rule, declList);
    })
  }
});


const getDpx = (decl) => {
  let regDpx = /(\d+)(dpx)([\s]+|[;]|$)/;
  let value = decl.value;
  if (value.match(regDpx)) {
    let num = 0;
    value.replace(regDpx, function(a, b) {
      num = parseFloat(b);
    })
    return {
      prop: decl.prop,
      value: num
    }
  }
  return undefined;
}

const insertDpx = (prevName, maxDpr) => (rule, declList) => {
  if (!declList || declList.length === 0) {
    return;
  }
  let unit = 'px';
  for (let i = maxDpr; i > 0; i--) {
    let ruleName = `[${prevName}="${i}"] ${rule.selector}`;
    let newRule = createRule(ruleName);
    declList.forEach(decl => {
      newRule.append({ prop: decl.prop, value: (decl.value * i) + unit });
    });
    rule.parent.insertAfter(rule, newRule);
  }
}

const createRule = function(name) {
  return postcss.rule({ selector: name })
}
