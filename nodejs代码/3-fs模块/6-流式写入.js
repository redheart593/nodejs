// 1、导入fs模块
const fs = require('fs')
// 2、创建写入流对象
const ws = fs.createWriteStream('西安邮电大学.txt')
// 3、写入
ws.write('西安')
ws.write('邮电')
ws.write('大学')
// 4、关闭（可省略）
ws.close()
