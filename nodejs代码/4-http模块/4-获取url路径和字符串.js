// const http = require('http')

// const url = require('url')

// const server = http.createServer((request, response) => {
//     // request.url可获取url路径和字符串
//     console.log(request.url)   //=>/search?keyword=h5
//     // 使用 url.parse 解析出 request.url 的内容
//     // true 将 query 属性将会设置为一个 对象,方便后边获取
//     let res = url.parse(request.url, true)
//     console.log(res)  // 如下图所示，为一个对象
//     // 路径
//     let pathname = res.pathname
//     console.log(pathname) // =>/search
//     // 查询字符串
//     let keyword = res.query.keyword
//     console.log(keyword)   //=>h5
//     response.end('url')
// })

// server.listen(9001, () => {
//     console.log('服务已经开始')
// })

// 导入 http 模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response) => {
    // 实例化 url 对象
    // let url = new URL('/search?a=100&b=200','http://127.0.0.1:9000')
    let url = new URL(request.url, 'http://127.0.0.1')
    console.log(url)  //=>如图所示，为一个对象
    // 输出路径
    console.log(url.pathname)  //=>/search
    // 输出 keyword 查询字符串
    console.log(url.searchParams.get('keyword'))  //=> 100
    response.end('url new')
})

// 监听端口，启动服务
server.listen(9001, () => {
    console.log('服务已经启动...')
})