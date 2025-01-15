const fs = require('fs')

fs.rename('座右铭.txt', '座右铭-1.txt', err => {
    if (err) {
        console.log('重命名失败')
        return
    }
    console.log('重命名成功')
})
