const postcss = require('postcss');
const expect = require('expect');
const dpxtopx = require('../index.js');

const basicCSS = '.rule { font-size: 10dpx }';
describe('dpxtopx', () => {

  it('测试基础转化dpx为px', () => {
    const expected = 
  `.rule { }
[data-dpr="1"] .rule {
    font-size: 10px
}
[data-dpr="2"] .rule {
    font-size: 20px
}
[data-dpr="3"] .rule {
    font-size: 30px
}`;
    const processed = postcss(dpxtopx()).process(basicCSS).css;
    
    expect(processed).toBe(expected);
  });
});

describe('prevName', () => {

  it('测试prevName', () => {
    const options = {
      prevName: "test"
    };
    const expected = 
  `.rule { }
[test="1"] .rule {
    font-size: 10px
}
[test="2"] .rule {
    font-size: 20px
}
[test="3"] .rule {
    font-size: 30px
}`;
    const processed = postcss(dpxtopx(options)).process(basicCSS).css;
    
    expect(processed).toBe(expected);
  });
});

describe('maxDpr', () => {

  it('测试最大dpr', () => {
    const options = {
      maxDpr: 4
    };
    const expected = 
  `.rule { }
[data-dpr="1"] .rule {
    font-size: 10px
}
[data-dpr="2"] .rule {
    font-size: 20px
}
[data-dpr="3"] .rule {
    font-size: 30px
}
[data-dpr="4"] .rule {
    font-size: 40px
}`;
    const processed = postcss(dpxtopx(options)).process(basicCSS).css;
    expect(processed).toBe(expected);
  });
});

describe('delete', () => {
  const options = {
    delete: false
  };

  it('测试delete', () => {
    const expected = 
  `.rule { font-size: 10dpx }
[data-dpr="1"] .rule { font-size: 10px }
[data-dpr="2"] .rule { font-size: 20px }
[data-dpr="3"] .rule { font-size: 30px }`;
    const processed = postcss(dpxtopx(options)).process(basicCSS).css;
    expect(processed).toBe(expected);
  });
});