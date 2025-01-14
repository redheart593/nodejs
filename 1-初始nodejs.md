### 1、初识nodejs

​	（1）nodejs是一个运行js的环境

​	（1）终端中输出要加上node

```
代码：console.log('hello world');
终端：node hello.js
	 hello world
```

### 2、nodejs注意事项

​	（1） nodejs和web的api大多数不同，如DOM和BOM就不能使用。但console和计时器还可以使用

​	（2） nodejs中的顶级对象时globle，对应web中的window。通过globle或globleThis来进行访问
