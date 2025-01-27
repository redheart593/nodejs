//1. 导入 express
const express = require('express')

//2. 创建路由器对象
const router = express.Router()

//3. 在 router 对象身上添加路由
router.get('/', (req, res) => {
    res.send('首页')
})

router.get('/cart', (req, res) => {
    res.send('购物车')
})

//4. 暴露出去
module.exports = router