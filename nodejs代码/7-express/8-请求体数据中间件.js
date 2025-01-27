const express = require('express')

const app = express()
// 解析 JSON 格式的请求体的中间件
app.use(express.json())
// 解析 querystring 格式请求体的中间件
app.use(express.urlencoded({ extended: false }))

// 把中间件放入对应的路由中
app.post('/login', urlParser, (request, response) => {
    //获取请求体数据
    //console.log(request.body);
    //用户名
    console.log(request.body.username)
    //密码
    console.log(request.body.userpass)
    response.send('获取请求体数据')
})