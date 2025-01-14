# 3-fs模块

>fs 全称为 `file system` ，称之为 `文件系统` ，是 Node.js 中的 `内置模块` ，可以对计算机中的磁盘进行操作。

### 一、导入

> 在编写fs模块代码时需要在最开始导入模块

```
// require 是 Node.js 环境中的 '全局' 变量，用来导入模块
const fs = require('fs')	// require和括号内的fs都是固定的
```

### 二、文件写入

> 文件写入就是将 数据 保存到 文件 中，我们可以使用如下几个方法来实现该效果

| 方法                        | 说明     |
| --------------------------- | -------- |
| writeFile                   | 异步写入 |
| writeFileSync               | 同步写入 |
| appendFile / appendFileSync | 追加写入 |
| createWriteStream           | 流式写入 |

##### （1）writeFile

> 语法：、fs.writeFile(file, data, [options], callback)

参数说明：

​	1、file 要写入的文件

​	2、data 写入的内容

​	3、options 选项设置（可选）
​	4、callback 回调函数，执行写入操作后再执行的函数

代码演示

```
const fs = require('fs')

// 将 [三人行，必有我师焉。] 写入到当前文件夹下的 [座右铭.txt] 文件中
fs.writeFile('./座右铭.txt', '三人行，必有我师焉。', err => {
    // 如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
    if (err) {
        console.log(err)
        return
    }
    console.log('写入成功')
})
```

