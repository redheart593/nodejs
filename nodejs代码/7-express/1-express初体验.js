//1. 导入 express
const express = require('express')
//2. 创建应用对象
const app = express()
//3. 通过get方法创建路由 只有路由为第一个参数时，才会调用回调函数
app.get('/home', (req, res) => {
    res.end('hello express server')
})
//4. 监听端口 启动服务
app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})