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

写入文件，过程是异步

> 语法：fs.writeFile(file, data, [options], callback)

参数说明：

​	1、file 要写入的文件

​	2、data 写入的内容

​	3、options 选项设置（可选）
​	4、callback 回调函数，执行写入操作后再执行的函数。成功返回null，失败返回一个失败对象。

代码演示：

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

##### （2）writeFileSync

写入文件，过程是同步。参数只有file 和 data 

##### （3）appendFile / appendFileSync

追加写入文件，即在文件已有内容后边追加内容。可以是同步或异步

> 语法：与文件写入相同 fs.writeFile(file, data, [options], callback)

代码演示：

```
const fs = require('fs')
// appendFile是同步追加写入，异步就是appendFileSync
fs.appendFile('座右铭.txt', '\r\n则其善者而从之，其不善者而改之', err => {
    if (err) {
        console.log('追加失败')
        return
    }
    console.log('追加成功')
})
```

>\r\n起到换行作用

##### （4）createWriteStream

流式写入文件，适合高频次的写入文件。

**语法**：`fs.createWriteStream(path,[options])`

**参数说明**：

- `path` 文件路径
- `options` 选项配置（ `可选` ）

**过程**：1、导入fs模块

​	   2、创建写入流对象

​	   3、通过write写入

​	   4、关闭写入流对象

代码演示：

```
// 1、导入fs模块
const fs = require('fs')
// 2、创建写入流对象
const ws = fs.createWriteStream('西安邮电大学.txt')
// 3、写入
ws.write('西安')
ws.write('邮电')
ws.write('大学')
// 4、关闭（可省略）
ws.close()
```

> 程序打开一个文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数。
>
> 流式写入方式适用于 大文件写入或者频繁写入的场景，`writeFile`适合于 写入频率较低的场景

### 三、文件读取

>文件读取顾名思义，就是通过程序从文件中取出其中的数据，我们可以使用如下几种方式：

| 方法             | 说明     |
| ---------------- | -------- |
| readFile         | 异步读取 |
| readFileSync     | 同步读取 |
| createReadStream | 流式读取 |

默认读出是buffer，通过tostring可转为字符串

##### （1）readFile 异步读取

**语法**: `fs.readFile(path, [options], callback)`

**参数说明**：

- path 文件路径
- options 选项配置
- callback 回调函数

代码演示：

```
const fs = require('fs')

fs.readFile('西安邮电大学.txt', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(data.toString())	// 西安邮电大学
})

```

##### （2）createReadStream 流式读取

与流式写入相同，读取时一部分一部分的读取文件内容。每个部分大小是64kb。

每读取64kb的内容就执行一次回调函数

通过on来绑定事件

过程：1、1、导入fs模块

​	   2、创建读取流对象

​	   3、通过on给读取流对象绑定data事件，回调函数为每部分读取完执行

​	   4、通过on给读取流对象绑定end事件，关闭写入流对象，回调函数在整体读取结束执行（可选）

代码演示：

```
const fs = require('fs')

const rs = fs.createReadStream('座右铭.txt')

// 每次取出 64k 数据后执行一次 data 回调
// 绑定一个 data 事件
rs.on('data', chunk => {
    console.log(chunk.toString())
    // 三人行，必有我师焉。
	// 则其善者而从之，其不善者而改之
    console.log(chunk.length)
    // 77
})

// 读取完毕后，执行 end 回调 (可选事件)
rs.on('end', () => {
    console.log('读取完毕')
})
```

### 四、文件复制

（1）直接读取写入

```
// 方法一，直接读取再写入
const fs = require('fs')
// 先读取
const data = fs.readFileSync('座右铭.txt')
// 再写入
fs.writeFileSync('座右铭-2.txt', data)
```

（2）流式读取写入

```
// 方法二，流式读取配合流式写入
const fs = require('fs')
// 先创建读取流和写入流对象
const rs = fs.createReadStream('座右铭.txt')
const ws = fs.createWriteStream('座右铭-3.txt')

// 给读取流绑定data事件，每读取一部分就写入一部分
rs.on('data', chunk => {
    ws.write(chunk)
})
、
// rs.pipe(ws)上边绑定data事件的简便写法
```

> 流式读取写入的好处是可以减少占用内存空间，因为理论上每次只需要64kb的空间（实际读取快于写入，会占用多于64kb的空间，但远少于直接读取写入）

### 五、文件移动与重命名

> 在 Node.js 中，我们可以使用 `rename` 或 `renameSync` 来移动或重命名 `文件或文件夹`

**语法：**

```
fs.rename(oldPath, newPath, callback)
fs.renameSync(oldPath, newPath)
```

**参数说明：**

- oldPath 文件当前的路径
- newPath 文件新的路径
- callback 操作后的回调

代码示例：

```
const fs = require('fs')

fs.rename('座右铭.txt', '座右铭-1.txt', err => {
    if (err) {
        console.log('重命名失败')
        return
    }
    console.log('重命名成功')
})

// 如果是移动 newpath参数就加上新的文件路径 如./论语/座右铭.txt 。
```

**注**: 如果还是移动到当前路径，但是修改了名字，就是重命名了

### 六、文件删除

> 在 Node.js 中，我们可以使用 `unlink` 或 `rm` 来删除文件

**语法:**

```
fs.unlink(path, callback)
fs.unlinkSync(path)
```

**参数说明**：

- path 文件路径
- callback 操作后的回调
- rm方法语法相同

代码示例：

```
const fs = require('fs')

fs.unlink('座右铭-2.txt', err => {
    if (err) throw err
    console.log('删除成功')
})


// 调用 rm 方法  14.4   同步 rmSync
fs.rm('座右铭-3.txt', err => {
    if (err) {
        console.log('删除失败')
        return
    }
    console.log('删除成功')
})
```

### 七、文件夹操作

> 借助 Node.js 的能力，我们可以对文件夹进行 `创建` 、`读取` 、`删除` 等操作

| 方法                  | 说明       |
| --------------------- | ---------- |
| mkdir / mkdirSync     | 创建文件夹 |
| readdir / readdirSync | 读取文件夹 |
| rmdir / rmdirSync     | 删除文件夹 |

##### (1)mkdir 创建文件夹

> 在 Node.js 中，我们可以使用 `mkdir` 或 `mkdirSync` 来创建文件夹

**语法**:

```
fs.mkdir(path, [options], callback)
fs.mkdirSync(path, [options])
```

**参数说明**：

- path 文件夹路径
- options 选项配置（ `可选` ）
- callback 操作后的回调

示例代码：

```
// 异步创建文件夹  mk  make  制作   dir  directory  文件夹
fs.mkdir('./page', err =>{
    if(err) throw err
    console.log('创建成功')
})

// 递归异步创建，即创建文件夹和其内部的文件夹，需要加上{recursive: true}参数
fs.mkdir('./1/2/3', {recursive: true}, err =>{
    if(err) throw err
    console.log('递归创建成功')
})

```

##### (2)readdir 读取文件夹

> 在 Node.js 中，我们可以使用 `readdir` 或 `readdirSync` 来读取文件夹
>
> 在控制台打印读取内容，会输出一个元素为内部文件名或文件夹名的数组
>
> readdir返回一个包含内部所有文件名和文件夹名的数组

**语法：**

```
fs.readdir(path, [options], callback)
fs.readdirSync(path, [options])
```

**参数说明：**

- path 文件夹路径
- options 选项配置（ `可选` ）
- callback 操作后的回调

示例代码：

```
// 异步读取
fs.readdir('./1/2/3', (err, data) => {
    if (err) throw err
    console.log(data)
})
// 输出[ '4.js' ]
```

##### (3)rmdir 删除文件夹

> 在 Node.js 中，我们可以使用 `rmdir` 或 `rmdirSync` 来删除文件夹

**语法**：

```
fs.rmdir(path, [options], callback)
fs.redirSync(path, [options])
```

**参数说明**：

- path 文件夹路径
- options 选项配置（ 可选 ）
- callback 操作后的回调

示例代码：

```
// 异步删除文件夹  rm  remove 移除
fs.rmdir('./page', err => {
    if(err) throw err
    console.log('删除成功')
})
//异步递归删除文件夹  不推荐
//=>DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed. Use fs.rm(path, { recursive: true }) instead
fs.rmdirSync('./1', {recursive: true}, err => {
    if(err){ 
    	console.log(err)
        return
    }
    console.log('递归删除')
})

// 递归删除文件夹，即删除文件夹中的文件夹，建议使用rm，同样要加上{ recursive: true }
fs.rm('./a', { recursive: true }, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('删除成功')
})
```

### 八、查看资源状态

> 用stat` 或 `statSync来查看资源的详细信息，如资源的大小，创建时间，最后访问事件等

**语法**：

```
fs.stat(path[, options], callback)
fs.statSync(path[, options])
```

**参数说明**：

- path 文件夹路径
- options 选项配置（ 可选 ）
- callback 操作后的回调

代码演示：

```
const fs = require('fs')

// 异步获取状态
// stat  方法  status 缩写 状态
fs.stat('../nodejs学习笔记', (err, data) => {
    if (err) throw err
    console.log(data)
})
```

![](C:\Users\HP\Pictures\Screenshots\屏幕截图 2025-01-16 001816.png)

### 九、__dirname

相对路径由当前终端的文件为基准，不同文件的相对路径一般会不一样，所以尽量用绝对路径

`__dirname` 与 `require` 类似，都是 Node.js 环境中的 '全局' 变量

`__dirname` 保存着 当前文件夹所在目录的绝对路径，可以使用 `__dirname` 与文件名拼接成绝对路径

代码示例:

```
//=>__dirname + '/data.txt'  === 'D:\\Desktop\\Node\\code\\03-fs模块/data.txt'
let data = fs.readFileSync(__dirname + '/data.txt')
console.log(data) 
```

> 使用 fs 模块的时候，尽量使用 `__dirname` 路径转换为绝对路径，这样可以避免相对路径产生的 Bug

### 十、异步同步

使用同步sync就不需要在后边加回调函数，异步不加会报错
