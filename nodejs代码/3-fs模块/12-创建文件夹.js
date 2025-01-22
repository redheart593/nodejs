const fs = require('fs')
// // 异步创建文件夹  mk  make  制作   dir  directory  文件夹
// fs.mkdir('./page', err => {
//     if (err) throw err
//     console.log('创建成功')
// })

// // 递归异步创建，即创建文件夹和其内部的文件夹
// fs.mkdir('./1/2/3', { recursive: true }, err => {
//     if (err) throw err
//     console.log('递归创建成功')
// })

// 异步读取

// fs.readdir('./1/2/3', (err, data) => {
//     if (err) throw err
//     console.log(data)
// })

// 异步删除文件夹  rm  remove 移除
// fs.rmdir('./page', err => {
//     if (err) throw err
//     console.log('删除成功')
// })

// 递归删除文件夹，即删除文件夹中的文件夹，建议使用rm，同样要加上{ recursive: true }
fs.rm('./1', { recursive: true }, err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('删除成功')
})