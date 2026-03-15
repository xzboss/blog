---
title: JavaScript 手写实现
createTime: 2024-02-04
---

> 包含一些原生的重写实现
>

#### instanceof
```javascript
const myInstanceOf = (obj, constructor) => {
    let proto = Object.getPrototypeOf(obj)
    while (proto) {
        if (proto === constructor.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}
```

#### 改变 instanceof 的行为
```javascript
class Person {
  static [Symbol.hasInstance](op) {
    return op.__proto__ === this.prototype // 结果会自动转化为 boolean
  }
  constructor(name) {
    this.name = name
  }
}
const person = new Person('xz')
console.log(person instanceof Person) // true
```

#### bind call apply
```javascript
Function.prototype.myCall = function(target, ...arg){
    const symKey = Symbol()
    target[symKey] = this
    const result = target[symKey](...arg) 
    delete target[symKey]
    return result
}
// apply
Function.prototype.myApply = function(target, arg) {
    const symKey = Symbol()
    target[symKey] = this
    const result = target[symKey](...arg)
    delete target[symKey]
    return result
}
// bind
Function.prototype.myBind = function(target, ...arg) {
    const _this = this
    return function(...innerArg){
        return _this.myCall(target, ...arg, ...innerArg)
    }
}
const A = {
    name:'xz',
    say(n, m){
        console.log(`----${this.name}---${n}---${m}----`)  
    }
}
const B = {
    name:'xj'
}

A.say.myCall(B, 0, 'call')
//----xj---0---call----

A.say.myApply(B, [1, 'apply'])
//----xj---1---apply----

const bindReturn = A.say.myBind(B, 2, 'bind')
bindReturn()
//----xj---2---bind----
```



#### 深浅拷贝
```javascript
// 深浅拷贝 更多了解可以看这位的：https://segmentfault.com/a/1190000016672263
function shallowClone(value) {
  if (value === null || typeof value !== 'object') {
    return value
  }
  const obj = Array.isArray(value) ? [] : {}
  for (const key in value) {
    obj[key] = shallowClone(value[key])
  }
  return obj
}
//
function deepClone(originObj) {
  const cache = new WeakMap() // 解决循环引用
  function _deepClone(value) {
    if (value === null || typeof value !== 'object') {
      return value
    }
    if (cache.has(value)) {
      return cache.get(value)
    }
    const obj = Array.isArray(value) ? [] : {} // 此处可以考虑set，map，weak...
    cache.set(value)
    // 同理此处可以遍历set，map，（for in 遍历本身和原型上的可枚举属性，需要用hasOwnProperty判断）
    for (const key in value) {
      obj[key] = _deepClone(value[key])
    }
    const symKeys = Object.getOwnPropertySymbols(value) // 处理 symbol 键
    for (const key of symKeys) {
      obj[key] = _deepClone(value[key])
    }
    return obj
  }
  return _deepClone(originObj)
}
```

#### 防抖节流
```javascript
const throttle = (fn, delay) => {
    let pre = Date.now()
    return function (...args) {
        const current = Date.now()
        if (current - pre < delay) {
            return
        }
        pre = current
        return fn.apply(this, args)
    }
}
const debounce = (fn, delay) => {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
```

#### 手动改写类型转化流程
原理：对象身上有一个 Symbol.toPrimitive 方法，这个方法接受一个 hint 转换参数，默认情况 hint 为

string：先执行 valueOf 在执行 toString （String、模板字符串 ``

number：先执行 toString，再执行 valueOf （Number、正负号+-

default：先执行 valueOf 在执行 toString（隐式转化

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "string":
        return "obj-toPrimitive-string";
      case "number":
        return 1;
      case "default":
        return "obj-toPrimitive-default";
    }
  },
};
console.log(`${obj}`); // obj-toPrimitive-string
console.log(+obj);     // 1
console.log(obj + ""); // obj-toPrimitive-default
```
