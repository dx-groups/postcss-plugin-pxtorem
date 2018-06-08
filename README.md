## 功能

基于postcss-plugin-px2rem 实现的一个postcss插件，用来将css中的dpx 换算成px以及将px转换成rem.
保留了postcss-plugin-px2rem的所有配置。

### 输入输出

```css
// 输入
h1 {
  font-size: 16dpx
}

// 输出
h1 {
  font-size: 16px
}
[data-dpr="1"] h1 {
  font-size: 16px
}
[data-dpr="2"] h1 {
  font-size: 32px
}
[data-dpr="3"] h1 {
  font-size: 48px
}
// 输入
h1 {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px;
}

// 输出
h1 {
  margin: 0 0 0.2rem;
  font-size: 0.32rem;
  line-height: 1.2;
  letter-spacing: 0.01rem;
}
```


### webpack配置
webpack rules添加 postcss-loader配置
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
    }]
  }
}
```

在根目录新增 `postcss.config.js` postcss配置文件:

```js
// 默认的配置
const pxtoremOpts = {
  ......
};
module.exports = {
  plugins: [
    require('postcss-plugin-pxtorem')(pxtoremOpts)
  ]
}
```

## 配置

默认配置:
```js
{
  rootValue: 100,
  unitPrecision: 5,
  propWhiteList: [],
  propBlackList: [],
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
  prefix: 'data-dpr',
  maxDpr: 3,
  delete: true,
  pxtorem: true
}
```
`prefix` 生成的前缀  默认值 data-dpr  
`maxDpr`   生成的dpr的最大值  默认值 3  
`delete`   是否删除匹配到的声明  默认值 true  
`pxtorem`  是否需要讲px转化成rem 默认值 true
- `rootValue` (Number|Object) The root element font size. Default is 100.
    - If rootValue is an object, for example `{ px: 50, rpx: 100 }`, it will
    replace rpx to 1/100 rem , and px to 1/50 rem.
- `unitPrecision` (Number) The decimal numbers to allow the REM units to grow to.
- `propWhiteList` (Array) The properties that can change from px to rem.
    - Default is an empty array that means disable the white list and enable all properties.
    - Values need to be exact matches.
- `propBlackList` (Array) The properties that should not change from px to rem.
    - Values need to be exact matches.
- `selectorBlackList` (Array) The selectors to ignore and leave as px.
    - If value is string, it checks to see if selector contains the string.
        - `['body']` will match `.body-class`
    - If value is regexp, it checks to see if the selector matches the regexp.
        - `[/^body$/]` will match `body` but not `.body`
- `ignoreIdentifier` (Boolean/String)  a way to have a single property ignored, when ignoreIdentifier enabled, then `replace` would be set to `true` automatically.
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `minPixelValue` (Number) Set the minimum pixel value to replace.
## 测试
控制台输入 npm run test 测试dpx转px  
控制台输入 npm run test-rem 测试px转rem