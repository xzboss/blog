---
title: 第12章 BOM
createTime: 2023-10-04
---

## 第十二章，BOM
### 散碎
#### 属性
```javascript
window {
  self 								自己窗口
  parent 							父窗口
  top 								顶层窗口
  devicePixelRatio		通过这个判断是否高分辨率屏幕
  ...// MDN
}
```

#### 方法
```javascript
window {
  moveTo(x, y)		移动到指定位置（单位px（只对 window.open打开窗口有效
  moveBy(x, y)		移动指定距离（单位px（只对 window.open打开窗口有效
  ... // MDN
}
```

### 定时器（setInterval、setTimeOut、clearInterval、clearTimeOut
第一个参数可以传 js 代码字符串

```javascript
setTimeOut('alert()', 1000)
```

### 模态框
#### 同步对话框（alert、confirm、prompt
1. 无法通过 css 修改，
2. 显示时阻塞 js 运行

```javascript
alert(tip)						// 单纯只警告
confirm(tip):boolean	// 按钮返回布尔值
prompt(tip, inputDefault)	// 返回输入框内容
```

#### 异步对话框（find、print
1. 无法通过 css 修改，
2. 显示时不会阻塞 js 运行

```javascript
find(msg)	// 返回布尔值，等价于 ctrl + F
print()	// 打印窗口
```

### location
#### 属性
<!-- 这是一张图片，ocr 内容为：URL散列值(井号后跟零或多个字符),如果没有则 LOCATION.HAGH FCONTENTS 为空字符串 服务器名及端口号 LOCATION.HOST 'WWW.WROX.COM:80 服务器名 LOCATION.HOSTNAME WWW.WTOX.COM 当前加载页面的完整URL.LOCATION的TOSTRING() HTTP://WWW.WROX.COM:80/WILEYCDA/ LOCATION.HREF ?QJAVASCRIPTTCONTENTS 方法返回这个值 LOCATION.PATHNAME /WILEYCDA/ URL中的路径和(或)文件名 请求的端口.如果URL中没有端口,则返回空字符串 '80" LOCATION.PORT LOCATION.PROTOCOL THTTP: 页面使用的协议.通常是"HTTP:"或"HTTPS:" "?QEJAVASERIPT" LOCATION.SEARCH URL的查询字符串.这个字符串以问号开头 "FGOUGER 域名前指定的用户名 LOCATION.UGERNAME 域名前指定的密码 LOCATION.PASGWORD "BARPASSWORD" HTTP://WWW.WROX.COM LOCATION.ORIGIN URL的源地址.只读 -->
![](https://cdn.nlark.com/yuque/0/2024/png/33647907/1718267686116-7612fdfb-7216-4845-ac2c-724223eb59a9.png)

#### 原生的解析方法 window.URLSearchParams
简单重写

```javascript
class URLSearchParams {
  params = {}
  constructor(qs) {
    if (typeof qs !== 'string') throw new TypeError('option must be a string')
    qs = qs.substring(1)
    qs.split('&').forEach(item => {
      const [key, value] = item.split('=')
      this.params[encodeURIComponent(key)] = encodeURIComponent(value)
    })
  }
  has(key) {
    return this.params[key] !== undefined
  }
  get(key) {
    return this.params[key]
  }
  delete(key) {
    delete this.params[key]
  }
  [Symbol.iterator] = () => {
    return Object.entries(this.params)[Symbol.iterator]()
  }
}
```

#### 操作
1. window.location & location.href

```javascript
window.location = 'http://www.baidu.com'
location.href = 'http://www.baidu.com'
location.assign('http://www.baidu.com')
```

> 因为前两句改变后会触发 location.assign
>
> 同样的，改变其他属性也是如此；都是 push 模式
>

2. replace（替换，无法后退
3. reload（刷新，接受一个 boolean 参数，是否强制刷新，不用缓存

### navigator
> 主要是一些浏览器信息，比如版本号，所在环境，GPU...
>

### screen
> 显示器信息，什么位深，色深...
>

### history
1. 前进后退

```javascript
.go(step: number) // 前进 or 回退 step 步
.back() // 回退
.forward() // 前进
```

2. 历史状态管理

由于以前地址栏变化，一定会引起重新请求，后来推出了 <font style="color:#DF2A3F;">历史状态管理 </font>概念，也就是通过 history 的 pushState，replaceState 来改变地址栏而不发起请求。

```javascript
.pushState(
  state: {data: 'data'}, // 序列化对象
  title: string,	// 页面标题，目前大部分浏览器忽略此参数，任然需要但不起效
  href: string	// 必须与源地址同源的地址，可以之间传文档路径
)
.replaceState // 同上，但不添加而是覆盖当前记录
```

> 既然这种方式替换路径不会引起请求，那么就适合用作单页应用的路由管理
>
> 但刷新后会真实请求当前路径，需要后端做重定向处理。
>

3. 其他

```javascript
.length // 会话历史长度
.state	// 当前会话状态对象
```

