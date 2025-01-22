# 6-http模块

### 1、创建http服务端

##### （1）导入http模块

```
const http = require('http')
```

##### （2）创建服务对象

> 语法：http.createServer((request, response) => {})

> ```
> // request 意为请求. 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
> // response 意为响应. 是对响应报文的封装对象, 通过 response 对象可以设置响应报文，具体是设置响应报文的响应体
> ```

通过createServer来创建服务对象，括号内有一个函数（普通函数和箭头函数都可以）作为参数，函数的两个参数可以处理请求和响应。

每次响应都会调用这个函数

```
const server = http.createServer((request, response) => {
    response.end('hello world')	// end是本次响应结束并设置响应体,响应体会展示在页面中
})
```

##### （3）监听端口，启动服务

通过listen来实现，第一个参数是端口号，第二个是启动后调用的回调函数

```
server.listen(9000, () => {
    console.log('server已经启动')
})
```

### 2、注意事项

1. 在终端中通过命令行 `ctrl + c` 停止服务

2. 当服务启动后，更新代码 必须重启服务才能生效

3. 响应内容如果是中文会出现乱码，解决办法如下

   ```
   // 设置响应头
   response.setHeader('content-type','text/html;charset=utf-8');
   ```

4. 端口号被占用时解决办法

   `Error: listen EADDRINUSE: address already in use :::9000`

   1）关闭当前正在运行监听端口的服务 （ 使用较多 ）

   2）修改其他端口号

5. `HTTP` 协议默认端口是 `80` 。`HTTPS` 协议的默认端口是 `443`, HTTP 服务开发常用端口有 `3000`，`8080`，`8090`，`9000` 等

> 如果端口被其他程序占用，可以使用 资源监视器 找到占用端口的程序，然后使用 任务管理器 关闭对应的程序

### 3、获取请求报文

##### （1）获取各部分方法

方法版本路径都包含在请求行里边

| 含义           | 语法                                                         | 重点掌握 |
| -------------- | ------------------------------------------------------------ | -------- |
| 请求方法       | `request.method`                                             | *****    |
| 请求版本       | request.httpVersion                                          |          |
| 请求路径       | `request.url`                                                | *****    |
| URL 路径       | `require('url').parse(request.url).pathname`                 | *****    |
| URL 查询字符串 | `require('url').parse(request.url, true).query`              | *****    |
| 请求头         | `request.headers`                                            | *****    |
| 请求体         | request.on('data', function(chunk){}) request.on('end', function(){}) |          |

##### （2）获取请求行报文代码演示

```
const http = require('http')

const server = http.createServer((request, require) => {
    // 获取请求的方法 method
    console.log(request.method)  //=>GET
    // 获取请求的 url
    console.log(request.url)  // 只包含 url 中的 路径 与查询字符串
    // 获取 http 协议的版本号 httpVersion
    console.log(request.httpVersion)  //=> 1.1
    // 获取 http 的请求头 headers
    console.log(request.headers) //=>结果是一个对象
    response.end('http') //=>设置响应体
})

server.listen(9000, () => {
    console.log('服务已经启动...')
})
```

**输出结果：**

![](C:\Users\HP\Pictures\Screenshots\屏幕截图 2025-01-18 202111.png)

**注意事项：**

1. `request.url` 只能获取路径以及查询字符串，无法获取 URL 中的域名以及协议的内容
2. `request.headers` 将请求信息转化成一个对象，并将属性名都转化成了『小写』
3. 关于路径：如果访问网站的时候，只填写了 IP 地址或者是域名信息，此时请求的路径为『 `/` 』
4. 关于 `favicon.ico`：这个请求是属于浏览器自动发送的请求。获取请求行报文会返回两次结果，就是因为除了自己发送的请求，还包括这个浏览器自动发送的请求

##### （3）获取请求体报文

> 通过on和end来实现

```
const http = require('http')

const server = http.createServer((request, response) => {
    // 设置变量存储请求体
    let reqBody = ''
    // 绑定data事件，每次读到一部分数据就调用回调函数，把数据传入reqBody存储
    request.on('data', chunk => {
        reqBody += chunk
    })
    // 3. 必须绑定 end 事件以结束
    request.on('end', () => {
        console.log(reqBody)  // 如果是GET事件不会有请求体，如果是POST事件则会有字符串或JSON
        // 响应
        response.end('Hello Http') //=>设置响应体 
    })
})

server.listen(9001, () => {
    console.log('服务已经开始')
})
```

##### （4）单独获取请求路径和查询字符串

方法一： 通过导入url模块实现

>路径在pathname属性中
>
>使用 url.parse 解析出 request.url 的内容，即请求报文中的请求路径
>
>查询字符串在query.keyword中，解析时加上true可以转换为对象
>
>

```
const http = require('http')
// 导入url模块
const url = require('url')

const server = http.createServer((request, response) => {
    // request.url可获取url路径和字符串
    console.log(request.url)   //=>/search?keyword=h5
    // 使用 url.parse 解析出 request.url 的内容，即请求报文中的请求路径和查询字符串等
    // true 将 query 属性将会设置为一个 对象,方便后边获取
    let res = url.parse(request.url, true)
    console.log(res)  // 如下图所示，为一个对象
    // 路径
    let pathname = res.pathname
    console.log(pathname) // =>/search
    // 查询字符串
    let keyword = res.query.keyword
    console.log(keyword)   //=>h5
    response.end('url')
})

server.listen(9001, () => {
    console.log('服务已经开始')
})
```

![](C:\Users\HP\Pictures\Screenshots\屏幕截图 2025-01-18 214002.png)

方法二：通过URL类实现

>通过实例化一个URL类的对象，可以获得url路径和查询字符串
>
>如果一个参数就是网址，两个参数则前一个是url路径和字符串，后一个是协议名
>
>路径依旧在pathname属性中
>
>查询字符串在searchParams属性中，通过get方式获取，get括号内部就是要获取的查询字符串的键

```
// 导入 http 模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response) => {
  // 实例化 url 对象
  // let url = new URL('/search?a=100&b=200','http://127.0.0.1:9000')
  let url = new URL(request.url, 'http://127.0.0.1')
  console.log(url)  //=>如图所示，为一个对象
  // 输出路径
  console.log(url.pathname)  //=>/search
  // 输出 keyword 查询字符串
  console.log(url.searchParams.get('a'))  //=> 100
  response.end('url new')
})

// 监听端口，启动服务
server.listen(9001, () => {
  console.log('服务已经启动...')
})
```

![](C:\Users\HP\Pictures\Screenshots\屏幕截图 2025-01-18 221920.png)

### 4、获取响应报文

##### （1）设置响应状态码

状态码位于200到500，对response.statusCode赋值即可

```
response.statusCode = 250
```

##### （2）设置响应状态信息

对响应状态信息（如Not Found等），几乎不用

```
response.statusMessage = 'i love you'
```

##### （3）设置响应头

与请求头相同，可以是设置好的，也可以是自定义的

```
response.setHeader('content-type', 'text/html;charset=utf-8')
response.setHeader('myHeader', 'test test')	// 自定义的
```

##### （4）设置多个同名响应头

赋值为数组即可

```
response.setHeader('test', ['a', 'b', 'c'])
```

##### （5）设置响应体

1、write()

> 可以有多个，每个相叠加得到最后的响应体

```
response.write('xx');
response.write('xx');
response.write('xx');
```

2、end()

>每个请求内部都必须由一个end，且只能由一个end。其内部可以设置响应体，可以与write叠加

```
response.write('xx');
response.write('xx');
response.write('xx');
response.end(); //每一个请求，在处理的时候必须要执行 end 方法的
```

### 5、静态资源服务

`静态资源` 是指 内容长时间不发生改变的资源 ，例如图片，视频，CSS 文件，JS文件，HTML文件，字体文件等

`动态资源` 是指 内容经常更新的资源 ，例如百度首页，网易首页，京东搜索列表页面等

以下代码演示根据不同路径名选择不同资源并设置响应体

```
require('http').createServer((request,response)=>{
	//获取请求的方法已经路径
	let {url,method} = request;
	//判断请求方式以及请求路径
	if(method == "GET" && url == "/index.html"){
		//需要响应文件中的内容
		let data = require('fs').readFileSync( dirname + '/index.html');
         response.end(data);
	}else if(method == "GET" && url == "/css/app.css"){
		//需要响应文件中的内容
		let data = require('fs').readFileSync( dirname + '/public/css/app.css');
		response.end(data);
	}else if(method == "GET" && url == "/js/app.js"){
		//需要响应文件中的内容
		let data = require('fs').readFileSync( dirname + '/public/js/app.js');
         response.end(data);
	}else{
		//404响应
         response.statusCode = 404;
		response.end("<h1>404 Not Found</h1>");
	}
}).listen(80,()=>{

console.log('80端口正在启动中....');

})
```

很明显上面的代码，需要一个一个的进行判断，显然这种方式不够完美，那么我们需要封装好根路径和对应的相对路径。

因为文件路径就是根路径和相对路径拼接，相对路径就是显示在网页中的路径，所以可以结合根路径和根路径拼接出文件路径

```
require('http').createServer((request,response)=>{
	//获取请求的方法已经路径
	let {method} = request;
	let {pathname} = new URL(request.url, 'http://127.0.0.1')
	//文件夹路径  根路径
	let rootDir = dirname + '/public';
	//拼接文件路径
	let filePath = rootDir + url;
	//读取文件内容
    fs.readFile(filePath,(err,data)=>{
		//判断
        if(err){
			//如果出现错误，响应404状态码
            response.statusCode = 404; 
            response.end('<h1>404 Not Found</h1>');
		}else{
			//响应文件内容
            response.end(data);
		}
	})
}).listen(80,()=>{
	console.log('80端口正在启动中....');
})
```



### 6、网站根目录或静态资源目录

HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 静态资源目录 ，也称之为 网站根目录

> 思考：vscode 中使用 live-server 访问 HTML 时， 它启动的服务中网站根目录是谁？
>
> - 改文件的所处的文件夹

### 7、网页中的 **URL**

网页中的 URL 主要分为两大类：`相对路径` 与 `绝对路径`

##### 绝对路径

绝对路径可靠性强，而且相对容易理解，在项目中运用较多

| 形式                                                         | 特点                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [http://atguigu.com/w eb](https://gitee.com/link?target=http%3A%2F%2Fatguigu.com%2Fweb) | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式     |
| [//atguigu.com/web](https://gitee.com/link?target=%2F%2Fatguigu.com%2Fweb) | 与页面 URL 的协议拼接形成完整 URL 再发送请求。大型网站用的比较多 |
| /web                                                         | 与页面 URL 的协议、主机名、端口拼接形成完整 URL 再发送请求。中小型网站 |

##### 相对路径

相对路径在发送请求时，需要与当前页面 URL 路径进行 `计算` ，得到完整 URL 后，再发送请求，学习阶段用的较多

例如当前网页 url 为 [http://www.atguigu.com/course/h5.html](https://gitee.com/link?target=http%3A%2F%2Fwww.atguigu.com%2Fcourse%2Fh5.html)

| 形式               | 最终的 **URL**                                               |
| ------------------ | ------------------------------------------------------------ |
| ./css/app.css      | [http://www.atguigu.com/course/css/app.css](https://gitee.com/link?target=http%3A%2F%2Fwww.atguigu.com%2Fcourse%2Fcss%2Fapp.css) |
| js/app.js          | [http://www.atguigu.com/course/js/app.js](https://gitee.com/link?target=http%3A%2F%2Fwww.atguigu.com%2Fcourse%2Fjs%2Fapp.js) |
| ../img/logo.png    | [http://www.atguigu.com/img/logo.png](https://gitee.com/link?target=http%3A%2F%2Fwww.atguigu.com%2Fimg%2Flogo.png) |
| ../../mp4/show.mp4 | [http://www.atguigu.com/mp4/show.mp4](https://gitee.com/link?target=http%3A%2F%2Fwww.atguigu.com%2Fmp4%2Fshow.mp4) |

##### 网页中使用 **URL** 的场景小结

包括但不限于如下场景：

- a 标签 href
- link 标签 href
- script 标签 src
- img 标签 src
- video audio 标签 src
- form 中的 action
- AJAX 请求中的 URL

### 8、设置资源类型（**mime**类型）

`媒体类型`（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

```
mime 类型结构： [type]/[subType]

例如： text/html text/css image/jpeg image/png application/json
```

HTTP 服务可以设置响应头 Content-Type 来表明响应体的 MIME 类型，浏览器会根据该类型决定如何处理资源

下面是常见文件对应的 mime 类型

```
html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg', 
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
```

> 对于未知的资源类型，可以选择 `application/octet-stream` 类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的 `下载` 效果
