const fs = require('fs')

// 异步获取状态
// stat  方法  status 缩写 状态
fs.stat('../nodejs学习笔记', (err, data) => {
    if (err) throw err
    console.log(data)
})