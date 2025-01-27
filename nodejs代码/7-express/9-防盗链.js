const express = require('express')

const app = express()

app.use((req, res, next) => {
    // 获取referer请求头
    let referer = req.get('referer')
    // 如果该请求头有值就进行判断
    if (referer) {
        // 获取hostname协议名
        let { hostname } = new URL(referer)
        // 如果协议名与规定好的不相同，防盗链发挥作用
        if (hostname !== '127.0.0.1') {
            res.status(404).send('<h1>404 NotFound<h1>')
        }
    }
    next()
})

app.get('/home', (req, res) => {
    res.end('hello express server')
})

app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})