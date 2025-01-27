const express = require('express')

const app = express()
// 1、定义全局中间件
let recordMiddleware = function (req, res, next) {
    //功能代码
    let { url, ip } = req
    //执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
    console.log(url)
    console.log(ip)
    next()
}

let checkMiddleware = function (req, res, next) {
    if (req.ruery.code === '521') {
        next()
    } else {
        app.send('错误')
    }
}

app.use(recordMiddleware)

app.get('/home', checkMiddleware, (req, res) => {
    res.end('hello express server')
})

app.get('/abc', (req, res) => {
    res.end('abc')
})



app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})