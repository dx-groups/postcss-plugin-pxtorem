var postcss = require('postcss');

const defaultOpts = {
  prefix: 'data-dpr',
  maxDpr: 3,
  delete: true
};


module.exports = function(opts, root) {
  let options = { ...defaultOpts, ...opts };
  let insertRule = insertDpx(options.prefix, options.maxDpr);
  root.walkRules((rule) => {
    let declList = [];
    rule.walkDecls((decl) => {
      let data = getDpx(decl);
      if (data) {
        declList.push(data);
        if (options.delete) {
          decl.remove();
        } else {
          decl.value = data.value + 'px';
        }
      }
    })
    insertRule(rule, declList);
  })
};


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

const insertDpx = (prefix, maxDpr) => (rule, declList) => {
  if (!declList || declList.length === 0) {
    return;
  }
  let unit = 'px';
  for (let i = maxDpr; i > 0; i--) {
    let ruleName = `[${prefix}="${i}"] ${rule.selector}`;
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
