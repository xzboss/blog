---
title: JavaScript 散碎知识点
createTime: 2024-04-14
---

> 包含一些细碎知识点
>

#### Object.keys() 会返回有一定顺序数组，排序规则商榷
#### undefined 不是关键字
```javascript
void 0 === undefined // true
```

#### forEach 和 map 和 some，every 都会跳过空元素 empty ,但是不同的是 map 会保留这个值，请看 vcr
```javascript
const arr = [,,,,,]
console.log(arr.map(()=>{
    console.log('ok') // 跳过语句不执行
}))
// [ <5 empty items> ]
```

> for of 不会跳过，并且会处理为 undefined ; for in 会跳过
>

#### 如果 script 标签是由 JavaScript 代码创建的，标签的 async 属性会默认为 true
#### addEventLister 与 onxxx 的区别
```javascript
addEventLister('click', () => {}, { passive: true })
// addEventLister有很多配置
// passive: 提前告知回调中是否可用 e.preventDeault();true:can't;false:yes
// once: 执行一次
// ...
```

#### passive: true 优化滚动性能
```javascript
body.addEventListener('wheel',() => {
    let i = 1
    while(i<100){
        console.log(i++)
    }
},{ passive: false })
// 页面卡顿，得回调结束后渲染线程才能进行页面的滑动
// 因为 passive 为 false，说明回调可以调用 preventDeault，所以也就需要回调执行完后再给渲染线程，来看是不是渲染；

body.addEventListener('wheel',() => {
    let i = 1
    while(i<100){
        console.log(i++)
    }
},{ passive: true })
// 因为渲染线程确定了回调不会执行 preventDeault，所以尽管去渲染即可
// 当滚动时，渲染线程监听到事件，将回调传给主线程，渲染线程也执行
// 页面不卡顿，渲染线程与传给主线程的回调’同时执行‘
```

> onxxx绑定的事件就不能想 addEventListener 这样
>
> 但是手动绑定滚动事件，不传 passive，都是默认 { passive:false } 的
>
> <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2024/png/33647907/1728566917643-90f10e9e-88c4-42f9-a535-6b327dce8ab1.png)
>

> 另外这里讨论的是诸如wheel，touchmove此类。scroll不行，应为scroll本质是浏览器确定此次滚动可执行后执行的事件。e.preventDefault是在确定滚动前所执行的，e也是触发器对象
>

[EventTarget.addEventListener() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#usecapture)

#### requestAnimationFrame()
1. 简述：在下一次渲染之前执行回调（这可不管什么微任务宏任务，但是回调时间本身需要运行时间超过一次事件循环的时间也会卡顿，但是一个回调你要执行多少？难道 10000000 次循环？）
2. 为什么定时器就会卡，因为其他宏任务或者微任务的存在，导致定时器的回调并不是指定时间执行一次；
3. 因为定时器是隔指定时间将回调放到宏任务队列中，但是这个时候万一还有微任务或者其他宏任务排在前面，所以执行时间就不是指定的时间了
4. 定时器时间不固定，而帧渲染间隔相等，就会产生抖动的效果。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <style>
    div{
      width: 100px;
      height: 50px;
      border-radius: 10px;
      margin-top: 20px;
    }
    .box3{
      background-color: brown;
    }
    .box2{
      background-color: chocolate;
    }
    .box1{
      background-color: aliceblue;
      text-align: center;
      box-shadow: 5px 5px 10px -5px;
      cursor: pointer;
      transition: .2s;
    }
    .box1:hover{
      transform: scale(1.1);
    }
  </style>
  <body>
    <div class="box1">click me</div>
    <div class="box2"></div>
    <div class="box3"></div>
    <script>
      const [ box1, box2, box3 ] = document.querySelectorAll("div")
      setInterval
      function box2Move(){
        let left = 0
        const timer = setInterval(()=>{
          box2.style.transform = `translateX(${left++}px)`
          if(left >= 700){
            clearInterval(timer);
          }
        }, 8)

      }
      function box3Move(){
        let left = 0
        const func = () => {
          // for (let i = 0; i <100000000;i++ ) {  // 这里执行时间超过一次时间循环的时间片段，也会卡顿
          // }
          if(left++ < 700){
            box3.style.transform = `translateX(${left++}px)`
            window.requestAnimationFrame(func)
          }
        }
        func()
      }
      box1.addEventListener('click',()=>{
        box2Move()
        window.requestAnimationFrame(box3Move)
      })
    </script>
  </body>
</html>
```

#### function 会提升的同时赋值
#### new 关键字的优先级问题
```javascript
// 1
new Foo.func()
// 等价于
new (Foo.func())

// 2
new Foo().func()
// 等价于
(new Foo()).func()
```

<!-- 这是一张图片，ocr 内容为：关联性 运算类型 运算符 优先级 (...) 圆括号 20 N/A 从左到右 成员访问 19 从左到右 需计算的成员访问 19 NEW(带参数列表) 19 NEW.......) N/A 从左到右 函数调用 19 ........) 从左到右 18 (无参数列表) NEW... NEW 17 后置递增(运算符在后) N/A +++... 后置递减(运算符在后) 17 N/A -->
![](https://cdn.nlark.com/yuque/0/2023/png/33647907/1697537153563-738d675f-cfcd-4db9-97bc-56a47edab8a0.png)

> 带参就是带括号
>

#### getPrototypeOf
```javascript
console.log(
  Person.prototype === Object.getPrototypeOf(Person), // false
  Person.__proto__ === Object.getPrototypeOf(Person), // true
  person.prototype === Object.getPrototypeOf(person), // false
  person.__proto__ === Object.getPrototypeOf(person), // true
  person.__proto__ === Person.prototype, 							// true
    person.__proto__ === Person.__proto__, 						// false
  person.__proto__ === Object.getPrototypeOf(Person), // false
  (() => {}).__proto__ === Object.getPrototypeOf(Object), // true
)
```

> #### getPrototypeOf 获取的是隐式原型对象

#### 闭包实现变量私有化
```javascript
闭包实现变量私有化
let Person
;(function () {
  const gl = 'global'
  class PersonPri {
    constructor(name) {
      this.name = gl + name
    }
  }
  Person = PersonPri
})()
const person = new Person('-xz')
console.log(person)  // global-xz
```

#### new.target
如果函数是通过 new 关键字调用的，返回此函数，否则就是 undefined

```javascript
function Func(){
  console.log(new.target)
}
Func() // undefined
new Func() // Func
```

#### isNaN(undefined) // true
> 用 Number.isNaN 可以准确判断
>

#### [] == [] // false  '==' 比较对象比较的是引用，基础类型是隐式转化
#### 各种宽度及位置属性
1.  **offsetWidth 和 offsetHeight:** 
    - 区别：`offsetWidth` 和 `offsetHeight` 分别表示元素的整体宽度和高度，包括元素的边框、内边距和滚动条（如果有的话）。
    - 计算方式：`offsetWidth = width + padding + border`，`offsetHeight = height + padding + border`。
2.  **scrollWidth 和 scrollHeight:** 
    - 区别：`scrollWidth` 和 `scrollHeight` 表示元素的内容区域的总宽度和高度，包括不可见的部分（即滚动条不可见时的全部内容）。
    - 计算方式：`scrollWidth` 包含整个内容区域的宽度，而 `scrollHeight` 包含整个内容区域的高度。
3.  **clientWidth 和 clientHeight:** 
    - 区别：`clientWidth` 和 `clientHeight` 表示元素的可见内容区域的宽度和高度，不包括滚动条和边框。
    - 计算方式：`clientWidth` 包括元素内部可见区域的宽度，而 `clientHeight` 包括元素内部可见区域的高度。
4.  **scrollTop 和 scrollLeft:** 
    - 区别：`scrollTop` 和 `scrollLeft` 表示元素滚动条滚动的垂直和水平方向上的距离。
    - 设置方式：可以通过设置这两个属性来控制元素的滚动位置，例如，`element.scrollTop = 100;` 将元素的滚动条垂直方向上滚动到距离顶部 100px 的位置。
5.  **offsetTop 和 offsetLeft:** 
    - 区别：`offsetTop` 和 `offsetLeft` 表示元素的顶部和左侧边缘相对于其包含元素的顶部和左侧边缘的距离。
    - 计算方式：这两个属性提供了相对于包含元素的定位信息。
6.  **event.clientX 和 event.clientY:** 
    - 区别：`event.clientX` 和 `event.clientY` 表示事件发生时鼠标指针相对于浏览器窗口客户区域的坐标。
    - 使用场景：通常用于处理鼠标事件，提供了鼠标指针在可见区域内的坐标。

#### <font style="color:rgb(77, 77, 77);">新窗口与老窗口通信</font>
当你使用 target="_blank" 打开一个新的标签页时，新页面的 window 对象上有一个属性 opener ,它指向的是前一个页面的 window 对象，因此，后一个新打开的页面就可以控制前一个页面了，事情就是这么的可怕。而且不管它是否跨域了，都是可以的。

<font style="color:rgb(77, 77, 77);">加入了 rel="noopener noreferrer" 属性，就会 window.opener 会为 null</font>

#### 扩展运算符可以拷贝symbol键
#### 尾调用
函数A最后的操作是调用函数B，那么函数A的指针在栈中就可以被释放掉，从而避免栈溢出

```javascript
// 不是
fun(n){
  return 2 * fun(n)
}

// 是
fun(n){
  return fun(2 * n)
}
```

#### 各种遍历触及区域
##### 循环
1. for...in 循环
    - 触及：<font style="color:#DF2A3F;">自身和原型链</font>中的所有<font style="color:#DF2A3F;">可枚举字符串</font>键属性。
    - 不触及：Symbol 属性，不可枚举属性。
2. Object.keys(obj)
    - 触及：<font style="color:#DF2A3F;">自身</font>的<font style="color:#DF2A3F;">所有可枚举字符串</font>键。
    - 不触及：原型链，不可枚举属性，Symbol 属性。
3. Object.getOwnPropertyNames(obj)
    - 触及：<font style="color:#DF2A3F;">自身</font>的<font style="color:#DF2A3F;">所有字符串键</font>属性（包括不可枚举的属性）。
    - 不触及：原型链，Symbol 属性。
4. Object.getOwnPropertySymbols(obj)
    - 触及：<font style="color:#DF2A3F;">自身所有 Symbol </font>属性。
    - 不触及：原型链，字符串键属性（无论是否可枚举）。
5. Object.entries(obj) 和 Object.values(obj)
    - 触及：<font style="color:#DF2A3F;">自身所有可枚举字符串键</font>属性。
    - 不触及：原型链，不可枚举属性，Symbol 属性。
6. Reflect.ownKeys(obj)
    - 触及：对象自身的所有属性（包括字符串键、Symbol 属性，无论是否可枚举）。
    - 不触及：原型链。

##### 拷贝
1. Object.assign(target, ...sources)
    - 触及：源对象中的<font style="color:#DF2A3F;">所有可枚举属性</font>（包括字符串键和 <font style="color:#DF2A3F;">Symbol </font>键）被复制到目标对象。
    - 不触及：不可枚举属性，原型链中的属性。
2. 扩展运算符 ...
    - 触及：对象<font style="color:#DF2A3F;">自身的所有可枚举字符串键</font>属性。
    - 不触及：Symbol 属性，不可枚举属性，原型链中的属性。

#### 原型链查找机制是 隐式原型，所以产生以下结果
1. 例1

```javascript
function Person {}
Person.prototype = { name: 0 }
Person.name // undefined
```

2. 例2

```javascript
Object.prototype.foo = function(){
	console.log('obj')
}
Function.prototype.foo = function(){
	console.log('fun')
}
Object.foo() // fun
```

<!-- 这是一张图片，ocr 内容为：PROTOTYPES FUNCTIONS (INSTANCES) PROTO T. NEW FOO() PROTOTYPE F2 FUNCTION FOO. F1 FOO() PROTOTYPE CONSTRUCTOR PROTO OBJEW OBJECT() PROTO 01 PROTO PROTOTYPE 02 FUNCTION OBJECT. BBJECT() PROTOTYPE CONSTRUCTOR (OBJECT CREATED BY FUNCTION) PROTO (FOO CREATED PROTOTYPE FUNCTION FUNCTION. BY FUNCTION) PROTOTYPE FUNCTION() CONSTRUCTOR PROTO PROTO -->
![](https://cdn.nlark.com/yuque/0/2024/png/33647907/1709573804932-9e5bdacb-785d-4a07-a7f1-449c5bffc873.png)

#### 函数的 length 与 arguments 的 length 不是一个东西
```javascript
function fun(a, b, ...args) {
  console.log(fun.length, args.length) // 2 3
}
fun(1,1,1,1,1)
```

#### 关键字 void 
后接表达式，不管表达式返回什么，始终返回 undefined，多用于立即执行函数对全局的影响

```javascript
void (() => true)(); // undefined
(() => true)(); // true
```

#### 
