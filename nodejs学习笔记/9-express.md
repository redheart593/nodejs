# 9-express

### （1）express 介绍

> express 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架，官方网址： [https://www.expressjs.com.cn/](https://gitee.com/link?target=https%3A%2F%2Fwww.expressjs.com.cn%2F)

简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用(HTTP 服务)

### （2）express初体验

以下为基本代码

```
//1. 导入 express
const express = require('express')
//2. 创建应用对象
const app = express()
//3. 通过get方法创建路由 只有路由为第一个参数时，才会调用回调函数
app.get('/home', (req, res) => {
    res.end('hello express server')
})
//4. 监听端口 启动服务
app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})
```

### （3）express路由

> express框架中，路由包括请求方法，路径和回调函数

> 语法：app.请求方法('路径', 回调函数)
>
> 通过路由可以简化实现哪个路径对应哪个页面的过程

```
const express = require('express')

const app = express()

//1、创建 get 路由，当网页是get方法时才调用回调函数
app.get('/home', (req, res) => {
    res.end('hello express server')
})
// post方法
app.post('/login', (req, res) => {
    res.end('login')
})
// 所有方法都可以
app.all('/abc', (req, res) => {
    res.end('hello express server')
})
// 相当于default 当路径与所有路由都对不上时，来到这个路由
app.all('*', (req, res) => {
    res.end('hello express server')
})


//4. 监听端口 启动服务
app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})
```

### （4）获取请求报文

> express中提供了一些更方便获取请求报文参数的方法

```
//导入 express
const express = require('express')

//创建应用对象
const app = express()

//获取请求的路由规则
app.get('/request', (req, res) => {
    // 1. 获取报文的方式与原生 HTTP 获取方式是兼容的
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)

    // 2. express 独有的获取报文的方式
    // 获取路径 相当于url中的pathname
    console.log(req.path)
    //获取查询字符串
    console.log(req.query) // 『相对重要』对象形式返回所有的查询字符串
    // 获取指定的请求头
    console.log(req.get('host'))
    res.send('请求报文的获取')
})
//启动服务
app.listen(3000, () => {
    console.log('启动成功....')
})
```

### （5）获取路由参数

路由参数指的是URL路径中的参数，通过参数判断当前位于什么路径，应该显示什么内容

通过占位符 **:参数** 可实现所有路由参数都进来

通过**req.params.参数**可获得当前路由参数

```
//1. 导入 express
const express = require('express')
//2. 创建应用对象
const app = express()
//3. 通过get方法创建路由 使用占位符id。
app.get('/:id', (req, res) => {
    res.end('hello express server' + req.params.id)
})
//4. 监听端口 启动服务
app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})
```

### （6）express响应设置

>express中提供了一些更方便设置响应的方法

```
//获取请求的路由规则
app.get("/response", (req, res) => {
  	//1. express 中设置响应的方式兼容 HTTP 模块的方式
  	res.statusCode = 404;
  	res.statusMessage = 'xxx';
  	res.setHeader('abc','xyz');
  	res.write('响应体');
  	res.end('xxx');
  
    //2. express 的响应方法
  	res.status(500); //设置响应状态码
  	res.set('xxx','yyy');//设置响应头
  	res.send('中文响应不乱码');//设置响应体 有中文时也不乱码
  	//连贯操作也可以，再一个res中设置多个响应方法
  	res.status(404).set('xxx','yyy').send('你好朋友')
  	
    //3. 其他响应
  	res.redirect('http://atguigu.com')//重定向
  	res.download('./package.json');//下载响应，切换到该页面就下载括号里边的文件
  	res.json();//响应 JSON，括号里可以写JSON
  	res.sendFile(__dirname + '/home.html') //响应文件内容，可以将文件中的内容设置到res响应中
});
```

### （7）express中间件

>中间件的作用是将路由的公共代码封装起来，以此来简化代码
>
>分为全局中间件和路由中间件，前者是对所有路由的公共代码，后者是对某一路由的公共代码

##### 1、全局中间件

每一个请求 到达服务端之后 都会执行全局中间件函数。即所有路由都会调用全局中间件的函数

> 语法：函数名(req, res, next) 
>
> req是请求，res是响应，next是路由内部的回调函数
>
> 函数是哪种形式都可以

步骤：

​	1、定义全局中间件函数

```
let recordMiddleware = function (req, res, next) {
    //功能代码
    let { url, ip } = req
    //执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
    console.log(url)
    console.log(ip)
    next()
}
```

​	2、调用全局中间件函数

```
app.use(recordMiddleware)
```

代码演示：

```
const express = require('express')

const app = express()
// 1、定义全局中间件
let recordMiddleware = function (req, res, next) {
    //功能代码
    let { url, ip } = req
    //执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
    console.log(url)
    console.log(ip)
    next()
}

app.use(recordMiddleware)

app.get('/home', (req, res) => {
    res.end('hello express server')
})

app.get('/abc', (req, res) => {
    res.end('abc')
})
```

##### 2、路由中间件

> 当某几个路由需要实现某个相同的功能时，将公共代码放在路由中间件里边

步骤：

1、定义路由中间件，与全局中间件相同

2、在使用路由中间件的路由中加上路由中间件作为参数

```
app.get('/home', checkMiddleware, (req, res) => {
    res.end('hello express server')
})
```

##### 3、静态资源中间件

> express 内置处理静态资源的中间件，通过该中间件可以简化处理静态资源的代码

> 语法：app.use(express.static('./public'))
>
> 这样就可以直接获取到public文件夹下的静态资源

```
//引入express框架
const express = require('express');
//创建服务对象
const app = express();
//静态资源中间件的设置，将当前文件夹下的public目录作为网站的根目录
app.use(express.static(__dirname + '/public')); //当然这个目录中都是一些静态资源
//如果访问的内容经常变化，还是需要设置路由
//但是，在这里有一个问题，如果public目录下有index.html文件，单独也有index.html的路由
//则谁书写在前，优先执行谁
app.get('/index.html',(request,response)=>{
	respsonse.send('首页');
});
//监听端口
app.listen(3000,()=>{
	console.log('3000 端口启动....');
});
```

注意事项:

1. index.html 文件为目录中默认打开的资源
2. 如果静态资源与路由规则同时匹配，谁更先匹配谁就响应（看代码顺序，就近原则）
3. 路由响应动态资源，静态资源中间件响应静态资源

##### 4、获取请求体数据 body-parser

>通过请求报文中req.body也可以获取请求体，但这里的数据是未解析的。
>
>通常有两种数据，json和查询字符串。
>
>对这两种数据有不同的解析方式
>
>json：express.json()
>
>查询字符串：express.urlencoded({ extended: false })

express 可以使用 `body-parser` 包处理请求体

第一步：安装

```
npm i body-parser
```

第二步：导入 body-parser 包

```
const bodyParser = require('body-parser');
```

第三步：获取中间件函数

```
//处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false}));
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();
```

第四步：设置路由中间件，然后使用 `request.body` 来获取请求体数据。body是包给req设置好的属性，包含请求体中的各个查询字符串

```
app.post('/login', urlParser, (request,response)=>{
	//获取请求体数据
	//console.log(request.body);
	//用户名
	console.log(request.body.username);
 	//密码
  	console.log(request.body.userpass);
  	response.send('获取请求体数据');
});
```

获取到的请求体数据：

```
[Object: null prototype] { username: 'admin', userpass: '123456' }
```

**注意:** 现在你已经可以抛弃 body-parser 模块，因为 Express 自从 4.16.0 版本开始，内置了 body 解析

**使用方法:**

```
const express = require('express');

const app = express();
// 解析 JSON 格式的请求体的中间件
app.use(express.json())
// 解析 querystring 格式请求体的中间件
app.use(express.urlencoded({ extended: false }))
```

##### 5、防盗链

> 有些静态资源（如图片）不希望被其他网站使用，可以使用防盗链阻止这一过程

> 原理：每个请求都有referer属性，属性值是当前请求的路径。
>
> 可以通过referer判断当前请求的路径是不是允许访问静态资源的路径
>
> 通过声明一个全局中间件实现该过程

代码演示：

```
const express = require('express')

const app = express()

// 防盗链全局中间件
app.use((req, res, next) => {
    // 获取referer请求头
    let referer = req.get('referer')
    // 如果该请求头有值就进行判断
    if (referer) {
        // 获取hostname协议名
        let { hostname } = new URL(referer)
        // 如果协议名与规定好的不相同，就返回404
        if (hostname !== '127.0.0.1') {
            res.status(404).send('<h1>404 NotFound<h1>')
        }
    }
    next()
})

app.get('/home', (req, res) => {
    res.end('hello express server')
})

app.listen(3000, () => {
    console.log('服务已经启动, 端口监听为 3000...')
})
```

### （8）路由模块化

与react相同，路由可以单独存放到某几个文件中，方便对其进行操作。

借助express内置的router实现



##### Router 使用

创建独立的 JS 文件（homeRouter.js）

```
//1. 导入 express
const express = require('express');

//2. 创建路由器对象
const router = express.Router();

//3. 在 router 对象身上添加路由
router.get('/', (req, res) => {
	res.send('首页');
})

router.get('/cart', (req, res) => {
	res.send('购物车');
});

//4. 暴露出去
module.exports = router;
```

主文件

```
const express = require('express');

const app = express();
//5.引入子路由文件
const homeRouter = require('./routes/homeRouter');
//6.设置和使用中间件，需要app.use(router)
app.use(homeRouter);

app.listen(3000,()=>{
	console.log('3000 端口启动....');
})
```

（9）express-generator工具

通过这一工具可以快速生成express框架的基本代码，方便后续操作

```
express -e 文件夹名
```

就可以以文件夹名创建一个后端项目

创建后首先安装依赖 npm i

然后再 npm start

然后在bin文件夹的www文件中编写代码即可
