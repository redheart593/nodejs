### 2-buffer

（1）概念：buffer类似于数组，存储字节序列。buffer固定的不能进行修改。其中每个元素长度为1字节。按照二进制存储。

（2）buffer使用

1、alloc()

​	括号内的数字决定分配多少字节的内存，默认都是0。

2、allocUnsafe()

​	与alloc相同，区别是alloc是申请新的内存，而allocUnsafe可能会带有之前已被占用的内存，所以并不安全。但是速度更快。

3、from

​	输出一个字符串或数组的内存情况，都是十六进制，如果是字符就是转化为assic码再转换为16进制输出

​	如果是中文，一般一个汉字三字节，所以占三个元素

```
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
```

终端：

```
PS C:\Users\HP\Desktop\nodejs> node 2-buffer的使用.js
<Buffer 00 00 00 00 00 00 00 00 00 00>
<Buffer 00 00 00 00 00 00 00 00 00 00>
<Buffer 68 65 6c 6c 6f>
<Buffer 0c 0f 12 16>
```

（3）字符串转换 toString()

将数组转化为字符串，会根据元素的assic码进行转换，进制是十进制。

```
// 1、数据类型转换，数字转换为字符串
let buf_5 = Buffer.from([155, 65, 84, 94, 66])
console.log(buf_5.toString())
// 输出�AT^B
```

（4）buffer数组元素

通过数组名[index]获得，和数组相同