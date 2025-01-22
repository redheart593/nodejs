function aaa() {
    console.log('aaa')
}

const bbb = 'bbb'

// // 通过module.exports导出，直接将函数名或变量名导出。多个导出数据可以放在对象内
// module.exports = {
//     aaa,
//     bbb
// }

// 通过exports导出 需要先命名再导出数据
exports.a = aaa
exports.b = bbb