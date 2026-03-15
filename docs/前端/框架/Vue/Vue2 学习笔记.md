---
title: Vue2 学习笔记
createTime: 2022-06-06
---
> ****
>
> **Vue实例和容器一一对应**
>



提示❗❗❗❗❗

---

## 数据绑定


+ `v-bind:/:`单向绑定
+ `v-model:value/v-model:`双向绑定;默认绑定value值



> 他有3个修饰符  
`lazy` 懒加载，失焦再...--  
`number` 控制传入`data`的值是数字型--  
`trim` 清除两边空格--
>



> `checkbox`如果没有配置`value`值，那收集的就是`checked`值--  
`checkbox`如果配置`value`值，初始值为数组就收集`value`组成的数组，不是数组收集`checked`值
>



> `v-model`不要绑定传递过来的`prop`，不推荐
>
> 绑定多个属性 v-bind="obj", obj 是一个对象 如：{id:"container", class:"box"}
>

> 动态绑定属性：<font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);"><</font><font style="color:rgb(240, 113, 120);background-color:rgb(36, 36, 36);">a </font><font style="color:rgb(199, 146, 234);background-color:rgb(36, 36, 36);">:</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);">[</font><font style="color:rgb(199, 146, 234);background-color:rgb(36, 36, 36);">attributeName</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);">]="</font><font style="color:rgb(195, 232, 141);background-color:rgb(36, 36, 36);">url</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);">"></font><font style="color:rgb(166, 172, 205);background-color:rgb(36, 36, 36);"> ... </font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);"></</font><font style="color:rgb(240, 113, 120);background-color:rgb(36, 36, 36);">a</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);">></font>
>
> 动态绑定事件 <font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);"><</font><font style="color:rgb(240, 113, 120);background-color:rgb(36, 36, 36);">a</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);"> @[</font><font style="color:rgb(199, 146, 234);background-color:rgb(36, 36, 36);">eventName</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);">]="</font><font style="color:rgb(195, 232, 141);background-color:rgb(36, 36, 36);">doSomething</font><font style="color:rgb(137, 221, 255);background-color:rgb(36, 36, 36);">"></font>   （<font style="color:#DF2A3F;">改变evevtName值后之前绑定的事件也被移除了，这里的 eventName 会被解析为 eventname，从而取得实例身上的 evenname值</font>）
>
> 其他详情 [https://cn.vuejs.org/guide/essentials/template-syntax.html#raw-html](https://cn.vuejs.org/guide/essentials/template-syntax.html#raw-html)
>

---

## $mount('#id')


+ `vue实例.$mount('#id')`指定为`vue`实例指定容器
+ 还可以`el`和`$el`都不要，写配置`template:{ '<div>...</div>' }`



> 如果要换行需要用模板语法
>

---

> 由Vue所管理的函数不要用箭头函数，不然`this`会指向`window`
>

---

## 数据代理


+ 数据代理原理 为对象添加属性



```javascript
Object.defineProperty(person,'age',{
value:,
enumerable:, 属性是否可枚举，默认false
writable:, 属性是否可修改，默认false
configurabl:, 属性是否可删除，默认false
get(){return} 读取age属性时，函数被调用，返回值为age的值
set(newalue){return} 修改age属性时，函数被调用，会收到修改的具体值
})
```

---

## 事件绑定


+ `v-on:/@` 定义事件默认传递参数`event`鼠标事件 
    - `event.target`是触发此事件的元素；
    - 如果要传递参数并保留`event`，则`@click=function(参数1,$event)`
+ 事件： 
    - `click` 点击；
    - `scroll` 滚动条滚动；
    - `wheel` 滚轮滚动；
    - `keydown` 键盘按下；
    - `keyup` 键盘起来



### 修饰符：（修饰符可连写）


+ `prevent` 阻止默认事件
+ `stop` 阻止时间冒泡
+ `once` 事件只触发一次
+ `capture` 执行捕获模式
+ `self` 只有`event.target`是当前操作元素才触发
+ `passive` 事件默认行为立即执行，无需等待回调函数
+ `native` 执行vue定义的原生事件



### 按键别名：


+ `enter` 回车
+ `delete` 删除
+ `esc` 退出
+ `space` 空格
+ `tab` 制表符
+ `up` 上
+ `down` 下
+ `left` 左
+ `right` 右
+ `caps-lock` 大小写转换（两个单词转换为短横线命名）

---

> `data`中的数据会做数据代理所以不需要数据代理的放在其他配置项里面，如`methods...`
>

---

## 计算属性computed


+ 原理：数据代理
+ 完整写法：



```javascript
number:{
  get(){},
  set(val){}
}
```



+ 简写：



```javascript
number(){
  return
}
```



> 如果计算属性只读，那就用简写方式
>

---

## 监视配置


监视完整写法：



```javascript
xxx:{
  deep:true//深度监视
  immediate:true//先执行一次
  ...
  handler(){}
}
```



> handler其实就是监视的简写，接收两个参数新值与旧值
>

---

## 计算属性和监视：


+ 监视可以完成异步操作
+ 配置里的函数不能写箭头函数，不然`this`指向是`window`，配置里的属性里的函数用箭头函数，`this`指向`vm`



## 绑定class样式：


+ `:class="1 2 3"`字符串绑定 适用确定且少
+ `:class="[1,2,3]"`数组绑定 适用数量类名不确定
+ `:class="{1:true,2:false,3:true}"`数量类名确定
+ `:class="{1:true,{2:true,3:false}}"`数量类名确定



## 绑定style样式：


+ `:style="{fontSize:'10px'}"`对象绑定
+ `:style="[{},{}]"`数组绑定

---

## 条件渲染


+ `v-show`隐藏节点，节点还在
+ `v-if`隐藏节点，节点不在；`v-if`，`v-else-if`，`v-else`同理`js`代码中的条件判断，需要挨在一起
+ `template标签`不能和`v-show`连用

---

## 遍历：


+ `v-for="(item,index) in/of arr" :key=index`
+ `v-for="(value,key) in/of obj" :key=key`
+ `v-for="(number,index) in/of number" :key=index`
+ `v-for="(str,index) in/of str" :key=index`

---

## key原理：


+ 没有啥逆序操作的时候用`index`作为`key`是没问题的，其他最好用唯一标识

---

## Vue检测数据改变原理（待完善）


+ 构造函数中的`this`就是用构造函数创建的实例对象
+ 部分代码原理



```javascript
let data = {
    name: 'xx',
    age: 10
  }
let obs = new Observe(data)
let vm = {}
vm._data = data = obs
function Observe(obj) {
    let keys = Object.keys(obj)
    keys.forEach(k => {
        Object.defineProperty(this, k, {
                get() {
                    return obj[k]
                },
                set(newVal) {
                    console.log('便楼')
                    obj[k] = val
                }
            }
        )
    })
}
```

---

## Vue.set()方法


为实例数组/对象添加属性



### 对象


+ `Vue.set(target,key,val)`
+ `vm.$set(target,key,val)`



### 数组


+ `Vue.set(target,index,item)`
+ `vm.$set(target,index,item)`



> `target`不能是`vm`或`vm.data/vm._data`即不能是根  
他只能给`data`中的对象添加属性
>

---

## 数组的检测原理


+ `Vue`不会为数组元素添加响应式的`getter`和`setter`，所以通过下标更改数组数据是无法被`Vue`所监测到的。针对数组，只有通过调用`push`、`pop`、`shift`、`unshift`、`splice`、`reverse`、`sort`这7个改变原数组本身的`API`，才会引起`Vue`的响应
+ 直接赋值修改不行，但是`xx[index].key=xxx`这样就行;`xx[index]=xxx`这样不行

---

## 过滤器fliter


+ 管道运算符 `|` 一次把前面的值传递给后一个作为参数---
+ `dayjs(时间戳).format()`转换时间戳为时间，格式自查在`bootcdn`官网



> `dayjs`在线库链接`<https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.3/dayjs.min.js>`
>

---

## 指令


+  `v-text` 内容以文本方式呈现 
+  `v-html` 解析`html`语句（此方法不能用于用户输入区，容易引发`xss`攻击） 
+  `v-cloak` 在`Vue`接管容器的时候这个属性会被`Vue`移除，可以用来在网速慢的时候先不展示容器 
+  `v-pre`, `Vue`跳过此节点 



## 自定义指令：配置directives


```javascript
<p v-big="n"></p>
<input v-bind="n">
directives: {
//简写形式默认在与元素成功绑定时就执行完函数，然后在更新候才会再执行
big(element, binding) {
    element.innerText = binding.value * 10
},
fbind: {
    //指令与元素成功绑定时
    bind(element, binding){
        element.value=binding.value
    },
    //指令所在元素被插入页面时
    inserted(element, binding){
        element.focus()
    },
    //指令所在模板被重新解析时
    updated(element, binding) { 
    },
}
},
```



> 全局指令配置：  
`Vue.directive('指令名',{})/Vue.directive('指令名',function(){})`  
`directives`配置里的属性的`this`是`window`，`fliter`里的也是
>

---

## 生命周期


<!-- 这是一张图片，ocr 内容为： -->
![](https://img-blog.csdnimg.cn/e514a0ef575e4032a3905e4fde8a3548.png)



+ `mounted(){}`与其他配置同级，挂载完后执行（真实DOM元素放到页面后执行）
+ `debugger;`在代码里写这个就相当于在此处打了断点
+ 销毁后`Vue`给`Dom`绑定的原生事件是还存在的
+ 在`beforeDestory`时候数据方法是可以访问修改的，但是不会触发更新

---

## 创建组件


+ 定义=>注册=>使用
+ `Vue.extend({})`



```javascript
  Vue.component('global',{
     template:`<div><p>{{name}}</p></div>`,
     data(){
         return{
             name:'全局组件global'
         }
     }
  })
  let hello=Vue.extend({
     template:`<div><p>{{name}}</p></div>`,
     data(){
         return{
             name:'组件hello'
         }
     }
  })
 let vm = new Vue({
     el: '#one',
     components:{
        'hello':hello,//
     },
  })
```



> 若是组件标签名和组件名一样可以直接简写即`'hello':hello`直接写成`hello`
>
>  
>
> 一个单词命名：首字母大小写都可；多个单词命名：用-连接或者每个单词首字母大写（首字母大写这个方法需要脚手架）
>
>  
>
> 创建组件时可以不写`Vue.extend()`直接`组件名={...}`,这样写在注册组件时，`Vue`自动执行`extend()`
>
>  
>
> 还可以给组件配置`name`属性让他在开发者工具中展示其他名字
>

---

## 组件的嵌套：组件中也有`template`配置


组件的原理：比如创建一个组件叫`hello`



+ 组件本质是一个`VueComponent`构造函数，在调用`Vue.extend()`时生成并赋值给`hello`
+ `Vue`在解析组件时，会创建一个`hello`实例对象（也就是执行 `new VueComponent(option)`）
+ 每次调用`Vue.extend()`都会返回一个全新的`VueComponent`
+ 其实此时`hello`就相当于`Vue`，`hello`的实例对象`vc`就相当于`vm`，所以`this`的指向也就不言自知了

---

## 组件与Vue的内置关系


<!-- 这是一张图片，ocr 内容为： -->
![](https://img-blog.csdnimg.cn/7301fa0d156247ea811d22eaffa074c5.png)



> <font style="color:#F5222D;">黄色线Vue改的，本来是指向Object.prototype</font>
>

---

## render函数


+ 因为默认引用的`vue`文件是精简版的，不包含模板解析器，所以不能写`template:{},components:{};`要用`render函数`代替
+ `render`函数的完整写法为



```javascript
render:function(createElement){
    return createElement(App)
  }
//精简为render:h=>h(App)
>
createElement是函数
>
```



> 带runtime的是运行版本vue（没有模板解析器）  
带common的是略（不知道）  
带esm的意思是es6模块化语法用的
>

---

## vue.config.js


+ 在这个里面可以配置`vue`的个性化，具体在`vue-cli`文档配置中现查现用即可
+ 比如我在`vue.config.js`中加`lintOnSave:false`那当我定义一个变量没有使用也不会报错了

---

## ref属性


+ 用来替代`id`，具体引用如下



```html
<p ref="p" style="opacity:0;">我出现啦</p>
<button @click="showDom">点我</button>
showDom(){
     this.$refs.p.style.opacity='1'
    }
```



+ 给元素添加`ref`属性，会出现在实例的`$refs`属性上`key`是`ref`值，`val`是真实`Dom`元素



> <font style="color:#F5222D;">如果给组件添加ref属性，会获取到组件实例对象</font>
>

---

## props配置（子组件配置，父组件赋值）


props的三种写法：



```javascript
1. props:['属性1','属性2']
2. props:{
    属性1:Number,
    属性2:String
}
3. props:{
    属性1:{
        type:,
        default:,
        required:,//是否必要
    }，
    属性2:{}
}
```



> `<font style="color:#F5222D;">vue</font>`<font style="color:#F5222D;">不允许改</font>`<font style="color:#F5222D;">prop</font>`<font style="color:#F5222D;">值（</font>`<font style="color:#F5222D;">prop</font>`<font style="color:#F5222D;">值是只读的），有效果但不允许改，如果要在子组件改，在data中新配置一个参数接受传进来的</font>`<font style="color:#F5222D;">prop</font>`<font style="color:#F5222D;">值，改</font>`<font style="color:#F5222D;">data</font>`<font style="color:#F5222D;">中的数据</font>
>



> `<font style="color:#F5222D;">prop</font>`<font style="color:#F5222D;">也可以实现子组件传递数据给父组件  
</font><font style="color:#F5222D;">先在父组件定义一个带参函数  
</font><font style="color:#F5222D;">然后把这个函数用</font>`<font style="color:#F5222D;">prop</font>`<font style="color:#F5222D;">传递给子组件</font>
>
> <font style="color:#F5222D;"> </font>
>
> <font style="color:#F5222D;">然后子组件调用这个函数的时候就可以用传参的方式让父组件得到子组件来的数据</font>
>

---

## mixin配置


+ 组件之间复用配置
+ 另外创建一个js文件，里面写`export default {data(){return{}}}`,在组件中配置`mixin:[mixin]`



```javascript
<p>mixin混入{{num2}}</p>
import mixin from '../mixin'
mixins:[mixin]
mixin.js中写：
export default {
data() {
	return {
		num2:100
	}
},
}
```



> 如果组件中有的东西，则采用组件中的；  
钩子函数都会采用  
`Vue.mixin({})`全局混入
>

---

## 插件创建与使用


+ 插件是一个对象，写在一个js文件中并导出



```javascript
import Vue from "vue"
export default {
	install(){
		console.log('用插件啦')
		Vue.filter('guo',function(val){
			return val.slice(0,1)
		})
	}
}
```



+ 在main.js中使用插件`import plugin from './plugins'；Vue.use(plugin)`
+ 这样Vue就使用了这个插件，在其他组件中就可以使用插件中定义的过滤器，自定义事件...



```javascript
<p>{{msg | guo}}</p>
```

---

## scoped


`css`只控制自己

---

## 本地存储localStorage


+ `setItem('key','value')` 添加一个键值对
+ `getItem('key')` 获取一个键的值
+ `removeItem('key')` 删除一个键值对
+ `clear()` 清除所有



> 这里面存储对象得是`json`对象
>
>  
>
> 当对对象增删改查时，可以用监视来向本地存储更新数据，而且最好写完整写法进行深度监视
>

---

## 自定义事件


+ 适用于子传父



### 绑定


+ 第一种写法：用`@`绑定事件再用`this.$emit('事件名',参数1,参数2...)`



```plain
父组件中：
<组件标签 @事件名='触发函数'/>...
触发函数(参数){}...
子组件中：
函数(){
  this.$emit('事件名',参数)
}
```



+ 第二种写法：在`mounted`钩子中写`this.$refs.hello.$on('sendMsg',this.showMsg)`绑定事件再用`this.$emit('事件名',参数)`



```javascript
//父组件中：
<Hello ref='hello'/>...
  showMsg(msg){
     console.log('Hello的参数来喽',msg)
  }...
mounted() {
    this.$refs.hello.$on('sendMsg',this.showMsg)
  }...

//子组件中：
<button @click="sendMsg">点我把数据传给App</button>
msg:'我来自子组件Hello'
sendMsg(){
      this.$emit('sendMsg',this.msg)
    }
```



> 如果`mounted`中的`this.showMsg`直接写成了匿名函数，那这个函数的`this`指向`vc`
>
>  
>
> 如果写成箭头函数，`this`指向`vm`
>
>  
>
> ！！！不建议这样写，建议如上图代码中这样写，先在`methods`中配置好
>
>  
>
> 当在组件标签中写`vue`本来就有的事件的时候他会默认为是自定义事件，从而触发失败
>
>  
>
> 这个时候就要用修饰符`native`来修饰
>



> 第二种写法更好，更灵活，因为可以进行延迟，不用一开始就绑定事件导致函数还没准备好而触发失败
>
>  
>
> 一个函数需要接收多个参数，`函数(参数1,...params){}`;//意思是拿第一个参数，其他参数打包在`params`数组中
>
>  
>
> 也可以用`$once`绑定一次性事件，也可以用 `$on` 绑定然后用  `once`  修饰符绑定一次性事件
>

---

### 解绑$off()


+ `$off('')`解绑一个自定义事件
+ `$off(['',''])` 解绑多个自定义事件
+ `$off()`解绑所有自定义事件



> 要写在定义自定义事件的组件里，即写`$emit`的那个组件
>

---

## 全局事件总线$bus


+ `$bus`是自己命名的，并不是封装好的`Api`
+ 原理 
    - 在两个组件之间找到一个可以用`vm`各种方法的中间者
    - 一个组件给中间者绑定事件，规定回调
    - 另一个触发事件
+ 代码实现



```javascript
//main.js中
beforeCreate(){
    // this.__proto__.$bus=this
     Vue.prototype.$bus=this//定义全局事件总线
    
  }
//触发组件中
this.$bus.$emit('bus', this.msg)
//绑定组件中
this.$bus.$on('bus',this.fun)
```

---

## 消息订阅与发布pubsub.js


+ 所有框架适用
+ 使用 
    - 安装`pubsub.js`库：`npm i pubsub-js`
    - 在接受组件中订阅消息`let subId = pubsub.subscribe('消息名',回调函数)`
    - 在发送数据组件中发布消息`pubsub.publish('消息名',数据)`
+ 取消订阅`punsub.unsubscribe(subId)`;

---

> 在用了全局事件总线和`pubsub`后最好在`beforedestory`钩子里取消事件绑定和订阅
>

---

## $nextTick


+ 改变代码执行顺序，在一个函数中用它，会让之前的操作做完并重新渲染`Dom`后再执行它的回调
+ `this.$nextTick(回调)`



> 这是一个钩子函数
>

---

## Vue实现动画


### 动画写法


```css
<button @click="isShow=!isShow">点我执行动画</button>
<transition appear="true" name="hello">
    <div class="_css" v-show="isShow"></div>
</transition>...

._css{
	background-color: blueviolet;
	height: 50px;
}
.hello-enter-active{
	animation: move 1s linear;
}
.hello-leave-active{
	animation: move 1s linear reverse;
}
@keyframes move {
	from{
		transform: translate(-100%);
	}
	to{
		transform: translate(0px);
	}
}...
```



+ 如果要给全部的`transition`标签包裹的元素执行动画则`css`中`hello`换成v
+ `appear`默认执行一次



### 过度写法


```css
<button @click="isShow=!isShow">点我执行动画</button>
<transition appear="true" name="hello2">
    <div class="_css2" v-show="isShow"></div>
</transition>

._css2{
	background-color: blueviolet;
	height: 50px;
	transition: .5s linear;
}
.hello2-enter{
	transform: translate(-100%);
}
.hello2-enter-to{
	transform: translate(0);
}
.hello2-leave{
	transform: translate(0);
}
.hello2-leave-to{
	transform: translate(-100%);
}
```



### 多个过度


+ 包裹在一个`transition-group`标签中



> 这样写必须给每个子元素一个唯一的`key`值
>

---

## animate.css库


+ 安装 `npm i animate.css`
+ 导入`import 'animate.css'`
+ 给`transition`标签配置 
    - `name="animate__animated animate__bounce"`
    - `enter-active-class="进入类名"`
    - `leave-active-class="离开类名"`



> 类名到官网或者css库复制
>

---

## 配置代理


+ `vue-cli`会自动启动一个代理服务器`localhost:8080` 
    - 这个代理服务器的根文件就是`public`文件夹
+ 在`vue.config.js`文件中开启代理服务器



```javascript
devServer:{
  proxy:'http://127.0.0.1:8000'
}
```



+ 开启一个服务器。用express举例



```javascript
const express = require("express");
  const app = express();
  app.get("/one", (request, response) => {
  response.getHeaders('Access-Control-Allow-Origin','*')
  response.send(student);
  });
  app.listen(8000,()=>{
  console.log('服务器启动')
  })
```



+ 在`vue`组件中用`axios`请求数据



```javascript
import axios from 'axios'
  axios.get('http://localhost:8080/one').then(
    response => {
    console.log(response.data)
    },
    error => {
    console.log('请求失败', error.message)
    }
  )
```



> 安装`axios: npm i axios`  
`express`框架使用见`ajax`或`node`基础  
❗开启代理服务器后需要重启`vue`
>



### 配置代理完整写法


```javascript
devServer: {
    proxy: {
      '/msg': {//头标识
        target: 'http://127.0.0.1:8000',//请求路径
        pathRewrite:{'^/msg':''},//把/msg变为空，这样向8000请求的时候就不会是http://127.0.0.1:8000/msg/one了
        ws: true,//略
        changeOrigin: true//服务器是否撒谎，默认撒谎
      },
      '':{}...
    }
```



+ vue中这样请求 `axios.get('http://localhost:8080/msg/one').then()`



> 完整写法可以控制他是否走代理，如果不走代理，就默认给根文件的同名文件
>

---

## v-resource


+ 了解即可
+ 安装 `npm i v-resource`
+ 引入 `import xxx from 'v-resource'`
+ 使用 `Vue.use(xxx)`
+ 然后`this.$http.get()`等价与`axios.get()`
+ `resource`封装的是`xtr`，`axios`封装的`promise`

---

## 插槽


### 默认插槽


+ 子组件中写`slot`标签
+ 负组件中写插入内容



### 具名插槽


+ `slot`标签给个`name`属性并给值
+ 父组件中写给`v-slot`指令添加设置好的`name`值
+ 如果是用`template`标签包裹的可简写`v-slot为slot`



### 作用域插槽


+ 因为插槽是在父组件中解析了再插入子组件中，所以就读不到子组件的信息
+ 插槽向父组件传值 
    - `slot`标签绑定数据`:msg='data中的数据'`
    - 父组件中必须用`template`标签包裹要插入的内容，并添加属性`scope='val'` 
        * val即是子组件传来的值
    - 使用时`{{val.msg}}`

```html
<!--子-->
<div>
  <slot :a='回传数据1' :b='回传数据2'></slot>
</div>
<!--父-->
<my>
  <template slot-scop='value'>
    <p :x='value.a' :y='value.b'></p>
  </template>
</my>
```

 



> slot标签传递过去的是`{msg:data中的数据}`即val  
如果直接用msg别忘了解构赋值
>

---

## vuex


多个组件共享状态（数据）



### 原理图


<!-- 这是一张图片，ocr 内容为： -->
![](https://img-blog.csdnimg.cn/73c664b05b294840a7fe2410f9136382.png)



### 配置环境


+ 安装`vuex3`版本：`npm i vuex@3`❗
+ `src`目录下新建一个`store`文件夹，里面新建一个`index.js`



```javascript
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
let actions = {};//响应组件中的动作
let mutations = {};//操作state数据
let state = {};//存储数据
let getters = {};//对state中的数据进行加工
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters，
});
```



+ main.js中引入store再配置



```javascript
import store from './store/index'
new Vue({
  render: h => h(App),
  store,
}).$mount("#app");
```



> 为什么use不写在`main.js`里，因为`import`会先引入`store`再执行`Vue.use(Vuex)`
>



### 使用


+ 需要用数据的组件中写`this.$store.dispatch('actions中的函数名',value)` 
    - 如果不需要发送`ajax`之类的，可以直接用`this.$store.commit('',xx)`直接略过`actions`
    - `{{$store.state.sum}}`组件中获取数据
+ 配置文件`index.js`添加



```javascript
let actions = {
  add(context, value) {//这里面其实也可以调用dispatch方法来触发其他在actions里的函数
    context.commit("ADD", value);//这里的ADD是mutations中的函数名
  },
};
let mutations = {
  ADD(state, value) {
    state.sum += value;
  },
};
let state = {
	sum:0
};
let getters = {//在组件中用$store.getters.bigSum获取
  bigSum(state) {
    return state.sum*10
  }
}
```



> `mutations`中的函数最好全部大写
>



### mapState与mapGetters


当在模板中用`$store.state.数据`，写太多的时候不好



+ 方法一，配置计算属性一个一个定义计算属性
+ 法二，用mapState直接映射 
    - `mapState({sums:'sum'})`计算属性名为`sums`，值为`state`中的`sum`；返回值为`{sums(){return ...}}`
    - 所以用`...`语法`...mapState({sum:'sum',...})`返回值为`sum(){}`就可以直接写在计算属性的配置里了
    - 数组写法，需要计算属性名与`state`中的属性名相同 
        * `...mapState(['sum'])`



```javascript
<p>{{bigSum}}</p>...
import {mapState,mapGetters} from 'vuex' ...
computed:{
    ...mapGetters({bigSum:'bigSum'})
  },...
```



### mapActions与mapMutations


当用`this.$store.dispatch('',)`，写太多的时候不好



+ 用`mapState`直接映射 
    - `mapAction({adds:'add'})`-----方法名为`sum`，值为`state`中的`sum`；返回值为`{adds(){这里面会去联系dispatch并传参给它，第一个参数就是'add',第二个要在模板语法里传递}}`
    - 所以用`...`语法`...mapActions({adds:'add',...})`返回值为`adds(){}`就可以直接写在`methods`的配置里了
    - 数组写法，需要方法名与`actions`中的属性名相同 
        * `...mapActions(['add'])`



```javascript
<p>{{bigSum}}</p>...
import {mapActions,mapMutations} from 'vuex' ...
methods:{
    ...mapActions({adds:'add'})
  },...
```



> 因为`dispatch`和`commit`需要传递参数，所以在模板里传`<button @click="adds(step)"></button>`
>
>  
>
> 相当于`mapActions`联系`actions`，把`add`函数赋值给`adds`，所以给`adds`传递参数，就相当于给`actions`中的`add`传递参数
>



### vuex模块化


+ 配置的时候这样写



```javascript
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//响应组件中的动作
let one = {
  namespaced:true,
  actions: {
    add(context, value) {
      console.log(value);
      context.commit("add", value);
    },
  },
  //操作state数据
  mutations: {
    add(state, value) {
      state.sum += value;
    },
  },
  //存储数据
  state: {
    sum: 0,
  },
  //对state中的数据进行加工
  getters: {
    bigSum(state) {
      return state.sum * 10;
    },
  },
};
export default new Vuex.Store({
  modules:{
    one,
  }
});
```



> `namespaced:true`  
这个属性必须写，不然找不到
>



+ 使用 
    - 第一种写法（不推荐）



```javascript
{{bigSum}}
{{one.sum}}
computed:{
    ...mapGetters({bigSum:'one/bigSum'}),//因为控制台中看到getters中有一个one/bigSum的值是bigSum
    ...mapState({one:'one'})//这样得到的是模块化one
    ...mapState({sum:state=>state.one.sum})//这样是模块化的mapState的正确写法
  },
```



> 上述state不可以像mapGetter这样写
>



+  
    - 第二种写法（推荐）



```javascript
{{bigSum}}
{{sum}}
computed:{
    ...mapGetters('one',['bigSum']),//在getters的one中取bigsum
    ...mapState('one',['sum'])//在state的one中取sum
},
```



+  
    - 第三种写法（看着办）



```javascript
//调用方法
add(){
  this.$store.dispatch('one/add',this.step)
}
获取数据
bigSum(){
  this.$store.getters['one/bigSum']
}
```

---

## nanoid


+ 安装`npm -i nanoid`
+ 引用`import {nanoid} from 'nanoid'`
+ `nanoid()`随机生成一段字符串id

---

## 路由


### 初级使用


+ 安装`npm i router@3`
+ `<router-link to='/..' active-class=''></router-link>当<a></a>`
+ `<router-view></router-view>`
+ 新建`router`文档中的`index.js`



```javascript
import VueRouter from 'vue-router'
import School from '../components/School.vue'
import Student from '../components/Student.vue'
export default new VueRouter({
	routes:[
		{path:'/School',component:School},
		{path:'/Student',component:Student}
	]
})
```



+ main.js



```javascript
import Vue from "vue"
import VueRouter from "vue-router"
import route from "./router/inedx"
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router: route,
}).$mount("#app")
```



> 路由组件最好在`src`目录新建一个`pages`目录来存放  
每个组件的`$route`属性值都是关于自己的  
每个组件的`$router`都是一样的且是同一个东西
>



### 嵌套路由


+ 配置与使用



```javascript
routes:[
		{
			path:'/school',
			component:School,
      redirect:'/school/schoolname',//重定向
			children:[
				{path:'schoolname',component:SchoolName},
				{path:'schooladdress',component:SchoolAddress}
			]
		},
		{path:'/student',component:Student},
    {
      path:'*',//打开页面重定向到Home
      component:Home
    }
	]...
  <router-link to="/school/schoolname">SchoolName</router-link>
```



> 子路由不写/  
使用写全路径
>



### query路由传参


+ 传



```html
//法一不推荐
<router-link 
      :to="`/school/schoolname?msg=${msg}&a=1`">
</router-link>
//法二推荐
<router-link :to="{
      path:'/school/schooladdress',
      query:{
        msg:msg
        }
      }">
</router-link>
```



+ 接收



```javascript
$route.query.msg
```



### 命名路由


+ 当要写的路由路径太长才使用
+ 配置



```css
{
  name:'schoolname',
  path:'schoolname',
  component:SchoolName
}
```



+ 使用



```html
<router-link :to="{
    name:'schooladdress',
    query:{msg:msg}
    }">
</router-link>
```



### params路由传参


+ 配置



```javascript
//的用:占位符占位
{
  name:'schoolname',
  path:'schoolname/:msg?/:a',//带?是指这个参数可传可不传
  component:SchoolName
},
{
  name:'schooladdress',
  path:'schooladdress/:msg',
  component:SchoolAddress
}
```



+ 传



```html
<router-link :to="`/school/schoolname/${msg}/1`">
</router-link>
<router-link :to="{
    name:'schooladdress',
    params:{msg:msg}}">
</router-link>
```



+ 接收



```javascript
$route.params.msg
```



> ❗❗❗  
如果用`params`传递参数且用`to`的对象式写法，必须用`name`，不能用`path`
>
>  
>
> 1. params占位乐但是不传，那浏览器导航栏里的路径会出错，但是页面还是能跳转，刷新后就不能跳转了
> 2. params传递空串也会导致与1同样问题，可以在配置的时候写params:{  
data:''||undefinded  
}
>



### props传参数


+ 在配置中给组件传递固定数据,对象传递,`query`不行



```javascript
//路由配置
{
  name:'schoolname',
  path:'schoolname/:msg/:a',
  component:SchoolName,
  props:{
    msg:'prop传递参数',
  }
},
//组件中接收
props:['msg']
//使用
{{msg}}
```



+ 第二种传法



```javascript
//子路由配置
{
  name:'schoolname',
  path:'schoolname/:msg/:a',
  component:SchoolName,
  props:true
},
//父传递参数
<router-link :to="{name:'schooladdress',params:{msg:msg}}"><router-link>
//子组件中接收
props:['msg']
//子使用
{{msg}}
```



> 这样会把所有`params`参数以`props`的形式传递过去，使用时就不用`$route.params.msg`了  
但是此方法不适用与于`query`
>



+ 函数传递(推荐)



```javascript
//路由配置
{
  name:'schoolname',
  path:'schoolname/:msg/:a',
  component:SchoolName,
  props($route){
    return {msg:$route.params.msg}//params也可以是query。具体看点击时传递方式
  }
},
//组件中接收
props:['msg']
//使用
{{msg}}
```



### router-link的replace属性


替换当前浏览器纪录，默认为追加`push`



```html
<!-- 1 -->
<router-link :replace='true'></router-link>
<!-- 2 -->
<router-link replace></router-link>
```



### 编程式路由导航


+ `$router`的`api` 
    - `push({})`{}里的配置就和`:to"{}"`中的一样；追加记录
    - `replace({})`同上；替代记录
    - `back()`后退
    - `forward()`前进
    - `go(2/-2)`前进/后退2步



> `push({},()=>{},(error)={})`完整长这样
>
>  
>
> `push()`会返回东西，不写回调会有警告，可重写`push`方法来一劳永逸
>



```javascript
//./router/index.js
//重写push
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, reslove, reject) {
	if (reslove && reject) {
		originPush.call(this, location, reslove, reject)
	} else {
		originPush.call(this, location, () => { }, () => { })
	}
}
//重写replace
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, reslove, reject) {
	if (reslove && reject) {
		originReplace.call(this, location, reslove, reject)
	} else {
		originReplace.call(this, location, () => { }, () => { })
	}
}
```



```javascript
goHere(){
  this.$router.push({
    name:'schooladdress',
    params:{msg:this.msg}//如果这里msg为'',路径会出错；要写成params:{msg:''||undefine}
  })
}
```



### 缓存路由组件


+ 使路由跳转时组件不销毁 
    - 比如组件内有`input`有内容，那么切换去其他组件再切换回来`input`内容不消失
+ `include`的值为需要保留的组件`name`值；如果保留全部就不用写；如果保留多个`:include="['','','']"`



```html
<!--在父组件中-->
<keep-alive include="SchoolName">
  <router-view class="view_1"></router-view>
</keep-alive>
```



### activated与deactivated


当一个组件内有`input`且组件内有定时器等不需要缓存的东西，就可以在`deactivated`生命周期中消除,这样组件能在不被销毁的同时缓存需要的东西



+ 两个钩子函数
+ `activated`在组件激活时被触发
+ `deactivated`在组件失活时触发



### 路由守卫


#### 全局前置路由


+ 路由配置中配置



```javascript
router.beforeEach((to, from, next) => {
	to//目标路径
  from//从哪个路径离开
  next()//写了代表允许，不写代表不允许
	if(to.path==='/school/schoolname/我来自组件School/1'|| to.name==='schooladdress'){
		if(localStorage.getItem('passWord')==='666'){
			alert('没有权限')
		}
	}else{
		next()
	}
})
export default router
```



> 路径中有参数的话，编译完成的路径才是`to`或者`from`的`path`值  
❗ 也可以不用比较path或者name，可以给已经知道需要守卫的路由配置一个值来判断是否需要验证  
❗ 但是配置中不允许随便给属性，所以写在一个属性`meta`里，这个是专门给程序员自己定义数据用的，在`$route`里可以看见
>



```javascript
{
	name:'schoolname',
	path:'schoolname/:msg/:a',
	component:SchoolName,
  meta:{//路由元信息
    is:true
  }
},
```



#### 全局后置路由


+ 路由配置中配置



```javascript
router.afterEach((to, from) => {
	to//目标路径
  from//从哪个路径离开
  document.title=to.meta.title
})
export default router
```



#### 独享前置路由守卫


```javascript
{
  path:'/school',
  component:School,
  beforeEnter(to,from,next){
},
```



> 没有独享后置路由
>



#### 组件内的守卫


1. 通过路由规则进入才会调用，直接使用`<组件名/>`不会调用
2. 与`mounted`配置同级



+ `beforeRouterEnter(to,from.next){}` 
    - 进入组件后调用给❓(可能理解错了)
+ `afterRouterEnter(to,from.next){}` 
    - 从此组件跳去其他组件后调用❓(可能理解错了)
+ 使用 
    - 在组件里用，本质是钩子函数



### 路由守卫执行顺序


+ 导航被触发。
+ 在失活的组件里调用 `beforeRouteLeave` 守卫。
+ 调用全局的 `beforeEach` 守卫。
+ 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
+ 在路由配置里调用 `beforeEnter`
+ 解析异步路由组件。
+ 在被激活的组件里调用 `beforeRouteEnter`
+ 调用全局的 `beforeResolve` 守卫(2.5+)。
+ 导航被确认。
+ 调用全局的 `afterEach` 钩子。
+ 触发 `DOM` 更新。
+ 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。



> 简单来说就是：beforeRouteLeave-->beforeEach-->beforeEnter-->beforeRouteEnter-->afterEach-->DOM更新-->beforeRouteEnter的next
>
>  
>
> 全局前置-独享-组件内进入-全局后置-组件内离开
>



### 路由懒加载


1. 语法`import('url')`返回的是`promise`对象
2. 所以可以在注册组件时候让组件的值为`promise`对象,底层代码在遇到`promise`对象时会去取成功的值，具体实现源码见
3. 在用户访问组件时才会加载



```javascript
path: '/pay',
component: () => import('@/pages/Pay'),
meta: {
	isShow: false 
}
```



## vue的两种工作模式


+ `hash`带#
+ `history`不带#
+ 不是很懂



## Vue项目打包


+ `npm run build`



## element-ui入门


+ 文档自查使用



> !  
`babel.config.js`中的`presets`配置项改为
>



```javascript
presets: [
  '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
],
```



## 其他


1. v-module原理



```html
<input :value="msg" @input="msg = $event.target.value">
```



2. 自定义事件中的$event



```html
<!--子组件-->
<input :value="msg" @input="$emit('input',$event.target.value)">
<!--父组件-->
<!--在自定义事件中，$event是传递过来的数据-->
<my @input='msg = $event'></my>
```



3. 修饰符sync语法糖  
同步父子数据



```html
<!--子组件-->
<input :value="msg" @input="$emit('update:msg',$event.target.value)">
<!--父组件-->
<!--.sync就相当于为这个组件绑定了一个自定义事件叫（update:msg）
    且update:msg为固定名称写法，唯一变数是msg，它是data中的数据
-->
<home-1 :msg.sync='msg'></home-1>
```



4. $attrs与$listeners 
    1. $attrs 能获取到父组件传递来的 prop 参数
    2. $listeners 能获取到父组件传来的自定义事件
    3. 应用：比如二次封装element-ui组件，用传递prop，$attrs接收的形式改变组件样式



```html
<!--父组件-->
<home-2 a='1' b='2' c='3'></home-2>

<!--子组件-->
<p>{{a}}-{{b}}-{{c}}-{{$attrs}}</p>
<p v-bind='$attrs'>v-bind直接绑定多个属性</p>
<script>
export default {
  name: 'home-2',
  props:['a','b'],
}
</script>
<!--输出：1-2--{ "c": "3" }-->
<!--$attrs能获取到父组件传递来的prop参数
    并且在子组件prop配置接收了的prop参数，$attrs是接收不到的
    v-bind='{"name":"xz","age":"19"}这样可以一次绑定多个属性'
-->
```



5. $children与$parent
6. $children获取当前组件的所有子组件，类型为数组
7. $parent获取当前组件父组件（❓有多个父组件我没试过。。。）



## 各种报错解决集


1. 关闭组件命名规则
2. 关闭`html`中报错`clear`



```javascript
package.json中
"eslintConfig": {
  "rules": {
    "vue/comment-directive": "off",//关闭html中报错clear
    "vue/multi-word-component-names":"off"//关闭组件命名规则
  }
},
```



3. 模块化getters的形参state，是$store下的一级state
4. 给组件添加dom原生事件



```html
<!-- 这样写vue会默认click是自定义事件 -->
<my @click='fun'></my>
<!-- 这样写click是dom原生事件 -->
<my @click.native='fun'></my>
```

5. 最好创建完项目后，再用编辑器直接打开项目文件夹运行，让项目文件夹做根目录
6. 

## 常用包


1. Lodash防抖节流...
2. mockjs生成随机数据
3. swiper轮播图库
4. uuid随机生成id
5. qrcode将文本生成二维码
6. vue-lazyload图片懒加载
7. vee-validate表单验证（烂）

## 规范


+ 每个组件都放在一个各自的文件夹里与组件名相同，各自的资源也放各自文件夹里，按父子级关系创建文件夹
+ src 
    1. `src/components`非路由组件
    2. `src/pages`路由组件
    3. `src/router/index,js`配置路由
    4. `src/api/request.js`对`axios`二次封装
    5. `src/api/index.js`对`api`同一管理
    6. `src/mock/index.js`假数据文件
    7. `src/store/`vuex文件
    8. `src/icon/`svg矢量图
    9. `src/layout/`❓一些组件和minix
    10. `src/utils/`重写push，二次封装axios，token...工具类
+ 根 
    1. `build/index.js`webpack配置文件
    2. .env.development开发环境配置
    3. .env.production生产环境配置
    4. .env.staging上线环境配置



## 经验


1. 多次操作的标签优先v-show
2. 事件委托+自定义属性应用



```javascript
  //html中如果有类似结构，且要给每个li添加事件
  <ul>
  	<li></li>
  	<li></li>
  	<li></li>
  	<li></li>
  	<li></li>
  	...
  </ul>
  //可以把事件委托给父元素
  /* 
  通过event.target判断点的是哪个dom节点
  还可以通过event.target.dataset属性获取到自定义属性的值来获取对应节点对应值 
  */
```

3. 

```javascript
//app组件的mounted配置
//加载时，就将这个数据获取存在state里，
//以免后来在路由跳转时，组件频繁创建销毁而向服务器发送多次请求
this.$store.dispatch('home/home_1_msg')
```

4. 用 <fragment></fragment> 代替组件根元素

