const http = require('http')

const server = http.createServer((request, response) => {
    // 1、获取响应状态码
    response.statusCode = 250
    // 2. 响应状态的描述
    response.statusMessage = 'i love you'
    // 3. 响应头
    response.setHeader('content-type', 'text/html;charset=utf-8')
    // 自定义响应头
    response.setHeader('myHeader', 'test test')
    // 设置多个同名的响应头
    response.setHeader('test', ['a', 'b', 'c'])

    response.end('hello world')
})

server.listen(9000, () => {
    console.log('server已经启动')
})