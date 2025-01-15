const fs = require('fs')

let files = fs.readdirSync('./nodejs代码')

files.forEach((item, index) => {
    let [num, name] = item.split('-')
    while (Number(num) !== index) {
        num--
    }
    let newname = num + '-' + name
    fs.renameSync(`./nodejs代码/${item}`, `./nodejs代码/${newname}`)
})