const fs = require('fs')

fs.readFile('西安邮电大学.txt', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(data.toString())
})