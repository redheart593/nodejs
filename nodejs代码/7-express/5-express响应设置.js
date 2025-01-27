//1. 导入 express
const express = require('express')
//2. 创建应用对象
const app = express()
//3. 通过get方法创建路由 只有路由为第一个参数时，才会调用回调函数
//获取请求的路由规则
app.get("/response", (req, res) => {
    //1. express 中设置响应的方式兼容 HTTP 模块的方式
    res.statusCode = 404
    res.statusMessage = 'xxx'
    res.setHeader('abc', 'xyz')
    res.write('响应体')
    res.end('xxx')

    //2. express 的响应方法
    res.status(500) //设置响应状态码
    res.set('xxx', 'yyy')//设置响应头
    res.send('中文响应不乱码')//设置响应体 有中文时也不乱码
    //连贯操作也可以，再一个res中设置多个响应方法
    res.status(404).set('xxx', 'yyy').send('你好朋友')

    //3. 其他响应
    res.redirect('http://atguigu.com')//重定向
    res.download('./package.json')//下载响应，切换到该页面就下载括号里边的文件
    res.json()//响应 JSON，括号里可以写JSON
    res.sendFile(__dirname + '/home.html') //响应文件内容，可以将文件中的内容设置到res响应中
})
//4. 监听端口 启动服务
app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})