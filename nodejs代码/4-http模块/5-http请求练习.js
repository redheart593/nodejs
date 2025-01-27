const http = require('http')

const server = http.createServer((request, response) => {
    // 获取请求方法和路径
    let { method } = request
    let { pathname } = new URL(request.url, 'http://127.0.0.1')
    // 设置请求头为汉字
    response.setHeader("Content-Type", "text/html;charset=utf-8")
    // 根据不同方法和路径显示不同页面
    if (method === 'GET' && pathname === '/login') {
        response.end('登录页面')
    } else if (method === 'GET' && pathname === '/register') {
        response.end('注册页面')
    } else {
        response.end('NotFound')
    }
})

server.listen(8000, () => {
    console.log('服务已经启动')
})
