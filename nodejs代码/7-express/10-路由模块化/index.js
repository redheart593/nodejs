const express = require('express')

const app = express()
//5.引入子路由文件
const homeRouter = require('./routes/homeRouter')
//6.设置和使用中间件，需要app.use(router)
app.use(homeRouter)

app.listen(3000, () => {
    console.log('3000 端口启动....')
})