const http = require('http')

const server = http.createServer((request, response) => {
    response.end('hello world')
})

server.listen(9000, () => {
    console.log('server已经启动')
})