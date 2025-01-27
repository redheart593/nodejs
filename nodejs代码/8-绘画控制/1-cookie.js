const express = require('express')
//1. 安装 cookie-parser	 npm i cookie-parser
//2. 引入 cookieParser 包
const cookieParser = require('cookie-parser')

const app = express()

//3. 设置 cookieParser 中间件
app.use(cookieParser())

//4-1 设置 cookie
app.get('/set-cookie', (request, response) => {
    // 不带时效性    会在浏览器关闭的时候，销毁。第一个参数是cookie名，第二个是cookie值。
    response.cookie('username', 'wangwu')
    // 带时效性，第三个参数用来设置cookie保存时间，在保存时间内即使关掉浏览器cookie仍然存在
    // 时效性通过maxAge属性设置，单位是毫秒
    response.cookie('email', '23123456@qq.com', { maxAge: 5 * 60 * 1000 })
    //响应
    response.send('Cookie的设置')
})

//4-2 读取 cookie
app.get('/get-cookie', (request, response) => {
    //读取 cookie 直接通过req内部的cookies属性就可以读出 返回一个包含所有cookie键值对的对象
    console.log(request.cookies)
    //响应体
    response.send('Cookie的读取')
})

//4-3 删除cookie
app.get('/delete-cookie', (request, response) => {
    //删除 通过res内部的clearCookie属性删除括号内的cookie
    response.clearCookie('username')
    //响应
    response.send('cookie 的清除')
})

//4. 启动服务
app.listen(3000, () => {
    console.log('服务已经启动....')
})