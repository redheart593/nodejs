// 1、alloc
let buf_1 = Buffer.alloc(10)
console.log(buf_1)
// 2、allocUnsafe
let buf_2 = Buffer.allocUnsafe(10)
console.log(buf_2)
// 3、from
let buf_3 = Buffer.from('hello')
let buf_4 = Buffer.from([12, 15, 18, 22])
console.log(buf_3)
console.log(buf_4)

