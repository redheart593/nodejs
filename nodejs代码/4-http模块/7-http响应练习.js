// 导入 http 模块
const http = require('http')
const fs = require('fs')

// 创建服务对象
const server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8')
    // 读取文件内容，再放到end里边进行展示
    let html = fs.readFileSync(__dirname + '/table.html')
    // end 方法的参数可以是字符串也可以是Buffer
    response.end(html)
})

// 监听端口，启动服务器
server.listen(9000, () => {
    console.log('服务器已经启动...')
})