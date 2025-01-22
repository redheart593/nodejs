// // 方法一，直接读取再写入
// const fs = require('fs')
// // 先读取
// const data = fs.readFileSync('座右铭.txt')
// // 再写入
// fs.writeFileSync('座右铭-2.txt', data)

// 方法二，流式读取配合流式写入
const fs = require('fs')
// 先创建读取流和写入流对象
const rs = fs.createReadStream('座右铭.txt')
const ws = fs.createWriteStream('座右铭-3.txt')

// 给读取流绑定data事件，每读取一部分就写入一部分
rs.on('data', chunk => {
    ws.write(chunk)
})