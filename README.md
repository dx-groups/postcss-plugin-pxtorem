## 功能

一个postcss插件，用来将css中的dpx 换算成px

### 输入输出

```css
// 输入
h1 {
  font-size: 16dpx
}

// 输出
[data-dpr="1"] h1 {
  font-size: 16px
}
[data-dpr="2"] h1 {
  font-size: 32px
}
[data-dpr="3"] h1 {
  font-size: 48px
}
```


### webpack配置
webpack rules添加 postcss-loader
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

在根目录新增 `postcss.config.js` 文件:

```js
module.exports = {
  plugins: [
    require('postcss-plugin-dpxtopx')({
      // prevName: 'test-data'
      // maxDpr: 5,
      // delete: false
    })
  ]
}
```

## 配置

Default:
```js
{
  prevName: 'data-dpr',
  maxDpr: 3,
  delete: true
}
```
`prevName` 生成的前缀  
`maxDpr`   生成的dpr的最大值  
`delete`   是否删除匹配到的声明  

## 测试
控制台输入 npm test