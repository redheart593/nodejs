const http = require('http')

const server = http.createServer((request, response) => {
    let reqBody = ''
    request.on('data', chunk => {
        reqBody += chunk
    })
    // 3. 绑定 end 事件
    request.on('end', () => {
        console.log(reqBody)  //=>'username=111&password=111'
        // 响应
        response.end('Hello Http') //=>设置响应体 
    })
})

server.listen(9001, () => {
    console.log('服务已经开始')
})