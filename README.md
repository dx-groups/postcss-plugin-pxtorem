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
`rootValue` (Number\Object)根元素字体大小。默认值为100。-如果rootValue是一个对象，例如`{px：50，rpx：100}‘，它将替换RPX到1/100 rem，将px替换为1/50 rem.

`unitPrecision` (Number)十进制数，允许REM单元保留几位小数  
`propWhiteList` (Array)可以从px更改为rem的属性。-默认值是一个空数组，它意味着禁用白名单并启用所有属性。-值必须是完全匹配的。  
`propBlackList` (Array)不应从px更改为rem的属性。-值需要精确匹配.

`selectorBlackList` (Array) 如果值是字符串，则检查选择器是否包含字符串。-`[body]`将匹配`.body-class`-如果值是regexp，则检查选择器是否与regexp匹配。`[/^body$/]`将匹配`body`，但不匹配`.body`。  


`ignoreIdentifier` (Boolean/String)  一种将单个属性忽略的方法，如果启用了不命名标识符，则“replace”将自动设置为“true”。  
`replace` (Boolean) 取代包含rems的规则，而不是添加后备项。  
`mediaQuery` (Boolean) 允许在媒体查询中转换PX。  
`minPixelValue` (Number) 设置要替换的最小像素值。  
## 测试
控制台输入 npm run test 测试dpx转px  
控制台输入 npm run test-rem 测试px转rem