const fs = require('fs')

const rs = fs.createReadStream('座右铭.txt')

// 每次取出 64k 数据后执行一次 data 回调
// 绑定一个 data 事件
rs.on('data', chunk => {
    console.log(chunk.toString())
    console.log(chunk.length)
})

// 读取完毕后，执行 end 回调 (可选事件)
rs.on('end', () => {
    console.log('读取完毕')
})