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