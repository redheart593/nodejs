# 4-path模块

> `path` 模块提供了 `操作路径` 的功能，我们将介绍如下几个较为常用的几个 API：

| **API**       | **说明**                  |
| ------------- | ------------------------- |
| path.resolve  | 拼接规范的绝对路径 `常用` |
| path.sep      | 获取操作系统的路径分隔符  |
| path.parse    | 解析路径并返回对象        |
| path.basename | 获取路径的基础名称        |
| path.dirname  | 获取路径的目录名          |
| path.extname  | 获得路径的扩展名          |

代码示例：

```
// 导入 fs 模块
const fs = require('fs')
// 导入 path 模块
const path = require('path')

// 写入文件 这里的路径最好使用绝对路径，而通过__dirname+相对路径会导致斜线方向不一致的问题
// fs.writeFileSync(__dirname + '/index.html', 'love')
console.log(__dirname + '/index.html') //=>D:\Desktop\Node\code\04-path/index.html

// resolve 解决问题  拼接绝对路径
console.log(path.resolve(__dirname, './index.html')) //=>D:\Desktop\Node\code\04-path\index.html
console.log(path.resolve(__dirname, 'index.html')) //=>D:\Desktop\Node\code\04-path\index.html
// 拼接的相对路径可以是 ./ 也可以不加，但不能是 / ，否则会导致路径直接在D盘下
console.log(path.resolve(__dirname, '/index.html', './test')) //=>D:\index.html\test

// sep 获取路径分隔符
console.log(path.sep) //=> window \  linux /

// parse 方法 对绝对路径的文件进行解析，得出其根目录，文件名等
// __filename  '全局变量'
console.log(__filename) //=>文件的绝对路径 //=>D:\Desktop\Node\code\04-path\01-path.js
// 解析路径
let str = 'D:\\Desktop\\Node\\code\\04-path\\01-path.js'
console.log(path.parse(str))

// 获取路径基础名称
console.log(path.basename(pathname))

// 获取路径的目录名
console.log(path.dirname(pathname))

// 获取路径的拓展名
console.log(path.extname(pathname))
```