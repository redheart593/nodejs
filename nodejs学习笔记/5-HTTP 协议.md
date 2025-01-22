# 5-HTTP 协议

## 概念

> HTTP（hypertext transport protocol）协议；中文叫 超文本传输协议

是一种基于TCP/IP的应用层通信协议

这个协议详细规定了 `浏览器` 和 万维网 `服务器` 之间互相通信的规则

协议中主要规定了两个方面的内容:

- 客户端：用来向服务器发送数据，可以被称之为 请求报文
- 服务端：向客户端返回数据，可以被称之为 响应报文

> 报文：可以简单理解为就是一堆字符串

## 请求报文的组成

- 请求行
- 请求头
- 空行
- 请求体

## **HTTP** 的请求行

- 请求方法（get、post、put、delete等）

- 请求 URL（统一资源定位器）

  例如：[http://www.baidu.com/index.html?a=100&b=200#logo](https://gitee.com/link?target=http%3A%2F%2Fwww.baidu.com%2Findex.html%3Fa%3D100%26b%3D200%23logo)

  - http: 协议 (https、ftp、ssh等)
  - www.baidu.com 域名
  - 80 端口号
  - /index.html 路径
  - a=100&b=200 查询字符串
  - \#logo 哈希 (锚点链接)

- HTTP协议版本号

## HTTP 请求头

格式：『头名：头值』

常见的请求头有：

| 请求头                    | 解释                                                         |
| ------------------------- | ------------------------------------------------------------ |
| Host                      | 主机名                                                       |
| Connection                | 连接的设置 keep-alive（保持连接）；close（关闭连接）         |
| Cache-Control             | 缓存控制 max-age = 0 （没有缓存）                            |
| Upgrade-Insecure-Requests | 将网页中的http请求转化为 https 请求（很少用）老网站升级      |
| User-Agent                | 用户代理，客户端字符串标识，服务器可以通过这个标识来识别这个请求来自哪个客户端 ，一般在PC端和手机端的区分 |
| Accept                    | 设置浏览器接收的数据类型                                     |
| Accept-Encoding           | 设置接收的压缩方式                                           |
| Accept-Language           | 设置接收的语言 q=0.7 为喜好系数，满分为1                     |
| Cookie                    | 后面单独讲                                                   |

## HTTP 的请求体

请求体内容的格式是非常灵活的，

（可以是空）==> GET请求，

（也可以是字符串，还可以是JSON）===> POST请求

例如：

- 字符串：keywords=手机&price=2000
- JSON：{"keywords":"手机","price":2000}

## 响应报文的组成

- 响应行: `HTTP/1.1 200 OK`

  - HTTP/1.1：HTTP协议版本号

  - 200：响应状态码 404 Not Found 500 Internal Server Error

    还有一些状态码，参考：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FStatus)

    OK：响应状态描述

> 响应状态码 和 响应字符串 关系是 一一对应 的。

- 响应头

  - `Cache-Control`: 缓存控制 private 私有的，只允许客户端缓存数据
  - `Connection`: 链接设置
  - `Content-Type:text/html;charset=utf-8`: 设置响应体的数据类型以及字符集,响应体为html，字符集utf-8
  - `Content-Length`: 响应体的长度，单位为字节

- 空行

- 响应体

  响应体内容的类型是非常灵活的，常见的类型有 HTML、CSS、JS、图片、JSON