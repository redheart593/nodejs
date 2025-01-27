const http = require('http')

const server = http.createServer((request, response) => {
    // 获取请求的方法 method
    console.log(request.method)  //=>GET
    // 获取请求的 url
    console.log(request.url)  // 只包含 url 中的 路径 与查询字符串
    // 获取 http 协议的版本号 httpVersion
    console.log(request.httpVersion)  //=> 1.1
    // 获取 http 的请求头 headers
    console.log(request.headers) //=>结果是一个对象
    response.end('http') //=>设置响应体
})

server.listen(9000, () => {
    console.log('服务已经启动...')
})