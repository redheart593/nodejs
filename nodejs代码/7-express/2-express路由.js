const express = require('express')

const app = express()

//1、创建 get 路由，当网页是get方法时才调用回调函数
app.get('/home', (req, res) => {
    res.end('hello express server')
})
// post方法
app.post('/login', (req, res) => {
    res.end('login')
})
// 所有方法都可以
app.all('/abc', (req, res) => {
    res.end('hello express server')
})
// 相当于default 当路径与所有路由都对不上时，来到这个路由
app.all('*', (req, res) => {
    res.end('hello express server')
})


app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})