const fs = require('fs')

// 1、将所有文件名都读到
const files = fs.readdirSync('nodejs代码')
// 2、对文件名数组进行遍历
files.forEach(item => {
    // console.log(item)
    // 将数组元素按-拆分为数字和名字
    let [num, name] = item.split('-')
    // 如果数组小于10就在前边加0
    if (Number(num) < 10) {
        num = '0' + num
    }
    // 令新文件名等于更改后的数组加上-再加上名字
    let newname = num + '-' + name
    // 对文件名进行重命名
    fs.renameSync(`./nodejs代码/${item}`, `./nodejs代码/${newname}`)
});