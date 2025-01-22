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