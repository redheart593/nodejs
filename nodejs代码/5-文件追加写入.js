const fs = require('fs')
// appendFile是同步追加写入，异步就是appendFileSync
fs.appendFile('座右铭.txt', '\r\n则其善者而从之，其不善者而改之', err => {
    if (err) {
        console.log('追加失败')
        return
    }
    console.log('追加成功')
})