---
title: Html5_Css3杂烩
createTime: 2023-08-06
---

# Html
+ `img`标签有独立属性`width`,`height`,`border`
+ `<a href="test.zip"></a>`下载文件
+ `label`标签的`for`属性与`input`的`id`属性一样，点击对`label`的任何操作都相当于对`input`执行
+ `emmet`语法



```html
<--div.xz$*3{内容} + tab自动生成-->
<div class="xz1">内容</div>
<div class="xz2">内容</div>
<div class="xz3">内容</div>
```



```css
div {
	line-height:200px;//lh200px + tab
}
```



+ 行内元素直接设置宽高没效果(给了绝对或者固定定位就会生效)



# Css


+ `background-position:x y;`也可以和方位名词混合使用
+ `background-attachment:flex;`固定背景，默认是`scroll`
+ `font`的简写中的字体和行高要用`/`连接，且必须要有字体值`font: 30px/1.5 "宋体";`
+ 特异性（权重） 
    - 内联:`1000`，ID: `100`，类或伪类: `10`，标签选择器或伪元素: `1`
    - `*`以及继承 :`0`
+ `div + p`	选择所有紧随`div`元素之后的`p`元素。
+ `p ~ ul`	选择前面有`p`元素的每个`ul`元素
+ `hover`改变兄弟元素(紧随其后)的样式：（需要在`hover`之后添加“`+`”） 
    - `.a:hover + .b{}`
+ `hover`改变兄弟元素(所有后面)的样式：（需要在`hover`之后添加“`~`”） 
    - `.a:hover ~ .c{}`
+ `hover`改变子元素的样式：（需要在`hover`之后选择子/孙...元素） 
    - `.a:hover .a>div>div{}`
+ `hover`改变伪元素的样式：**（需要在**`**hover**`**之后没有空格）** 
    - `.a:hover::after {}`
+ `border-collapse:collapse;`合并相邻边框
+ 默认情况下不给宽度，`padding`不会撑开



## 元素塌陷


+ 嵌套块元素塌陷`margin-` 
    - 子元素给`margin-top/./..`值，呈现的效果如同给在了父元素；解决办法如下 
        * 给父元素设置边框`border-top/./..`
        * 给父元素设置`padding-top/./..`
        * 给父元素添加`overflow:hidden;`
        * 定位等 

> 子元素与父元素设置的方向一样，当然也可以给父元素四周都设置。  
且父元素的`border`与`padding`不能为`0`
>

 

        * 兄弟元素垂直外边距合并 **❗****水平不合并**
        * 垂直方向上面设置了下边距`20px`，下面设置了上边距`10px`。合并为二者最大外边距`20px`(二者距离是`20px`)

> 
>

+ 浮动父元素高度塌陷float 
    - 子元素为浮动，无法将父元素高度顶开，解决方法如下  
1.为父元素添加块类型伪元素，并清除两边浮动`clear:both;`,`display: block;`  
2.父元素`overflow:hidden;`  
3.定高  
4.清除最后一个子元素的浮动`clear:both` **❗****如果最后这个子元素有继承到的**`**float**`**,要添加**`**float:none;**`  
5.双伪元素清除浮动

> <font style="color:rgb(102, 102, 102);">clear属性的值有"left"、"right"、"both"和"none"，用于指定盒子的那一侧不应该紧挨着浮动盒子</font>
>



## 注意


+ <font style="background-color:#FBDE28;">绝对定位默认不会压住前面的标准流</font>，他会压住后面的标准流，包括文字和图片
+ 浮动的盒子不会影响前面的标准流，他只会影响后面的标准流**但是不会压住后面标准流的文字和图片** 
    - 例：中间有个div有浮动，不会挡住前面没有浮动的盒子，但会挡住后面没有浮动的盒子，但不会挡住文字和图片, **❗****而且垂直方向外边距也不会和前面的标准流合并**
+ `:`是`css2`的用法`::`是`css3`的用法
+ 粘性定位`sticky`必须至少设置一个`top/bottom/left/right`才能生效
+ 只有定位的盒子才有`z-index`属性，标准流没有
+ `vertical-align`只对行内及表格元素有效
+ 解决图片默认下方缝隙 
    - `vertical-align:;`//只要不是默认的基线对齐即可
    - 图片转换为块元素 
        * 原理：`vertical-align`只对行内及行内块元素有效
+ `translate(x,y)`中的百分比是相对与自身
+ `translate`对行内元素不起作用-》Transform对行内元素无效
+ `scale(w倍数,y倍数)`不会影响其他盒子
+ `transform-origin:x y;`设置变换中心,默认为`50% 50%`,也可以用方位名词代替
+ `transform:translate(x,y) rotate() ...;`执行顺序按书写顺序 

> 一般位移在旋转前面，不然旋转后方向会改变  
转的话，x,y轴也会旋转
>

 



## 知识点


+ 防止文本域可以拉伸



```css
resize:none;
```



+ 字超出部分省略号代替



```css
p {
	white-space:nowrap;//不换行
	overflow:hidden;//溢出隐藏
	text-overflow:ellipsis;//省略号显示
}
```



+ 字超出任意行部分省略号代替



```css
p {
	width: 300px;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;/* 弹性伸缩盒子模型显示 */
	-webkit-line-clamp: 3;/* 限制在一个块元素显示的文本行数 */
	-webkit-box-orient: vertical;/* 设置或检索伸缩盒对象的子元素的排列方式 */
}
```



> 兼容性查，只有-webkit支持
>



+ 修改`placeholder`字体颜色



```css
input::placeholder {
	color:red;
}
```



+  `nth-type-of(2n)=nth-type-of(even)`;`nth-type-of(2n+1)=nth-type-of(odd)` 
+  `nth-type-of(n+5)`选择第5个之后的 
+  使用字体图标 
    - `unicode`方法



```css
/*复制iconfont的unicode项代码*/
@font-face {}
/*设置iconfont类样式*/
.iconfont {}
/*图标代码设置为标签内内容*/
<P>&#xe711;</p>
/*如果是给伪元素content设置代码，要用特殊的，点开css链接即可查看*/
.icon-baby:before {
  content: "\e711";
}
```



+  
    - css方法



```html
<link rel="stylesheet" href="css链接">
<div class="iconfont 图标类名"></div>
```



+  
    - js方法



```plain
略
```



+ `background-size:宽 高;`



## 动画


+ 让图片变模糊`filter: blur(2px);`
+ 计算数值`width: calc(100% - 10px);` 
    - 支持`+-*/`
+ 指定属性过渡`transition: 属性名 时间 运动曲线 延迟时间；`
+ `animation:动画名称 周期时间 运动曲线 延迟时间 播放次数 是否反方向 起始或结束状态`一般顺序
+ `animation-timing-function: steps(2);`控制动画的帧数



## 3d


+ `perspective:100px;`透视视距离，写在被观察元素的父亲盒子上，有他 3d 效果才生效
+ `rotateZ(deg)`正值为坐标正向指向屏幕顺时针旋转，反之
+ `rotate3d(x,y,z,deg)`自定义旋转轴，旋转轴为点`(0,0,0)`与点`(x,y,z)`连接而成
+ `transform-style: preserve-3d;`保留子元素 3d 效果（父元素也要 3d 效果，默认会取消子元素的3d效果）
+ `perspective-origin:;`视觉直视点，默认中心



> 旋转和移动都是相对于元素本身而言，不是原来的位置
>



## flex弹性布局


+ 对行内元素和块元素都生效
+ 行内元素和块元素都可当弹性布局父盒子



### 父


+ 父设置`flex`，子元素的浮动，清除浮动，`vertical:align;`都会失效
+ `flex-direction`设置主轴
+ `flex-warp`换行
+ `flex-flow:column warp;`，`flex-direction`和`flex-warp`的复合写法
+ `justify-content`主轴排列
+ `align-item`适用于单行,默认`flex-start` 
    - 默认`flex-start`
    - `flex-end`
    - `stretch`会把元素拉伸到与父盒子等高
    - `center`
+ `align-content`适用于多行 
    - 有`space-between`，`space-around`等



### 子


+ `flex:number;`这个子元素独占`number`份 
    - 在剩余空间中划分份数



```css
.a {
	width: 100%;
	margin: 0 auto;
	height: 200px;
	background-color: rgb(199, 237, 204);
	display: flex;
}
.a>div {
	flex:1;
}
/*第二个元素的宽是其他的两倍*/
.a>div:nth-of-type(2) {
	flex: 2;
}
```



+ `align-self`自己按其他方式排列



## 媒体查询 `[@media ](/media ) mediatype and|not|only (media feature) `


+ `mediatype`媒体类型 
    - `all`用于所有设备
    - `print`用于打印机和打印预览
    - `screen`用于电脑屏幕，平板，手机
+ `and|not|only`关键词 
    - `and`将多个媒体特性连接
    - `not`排除某个**媒体类型**，可省略
    - `only`指定特定**媒体类型**，可省略
+ `(media feature)`媒体特性 
    - `max-width`
    - `min-width`
    - `width`



```css
@media screen and (max-width:800px) {
	html {
		font-size: 10px;
	}
}
```



+ rem布局 
    - 利用`rem`和媒体查询器可以动态改变布局效果 
        * 媒体查询引入资源

```html
<link rel="stylesheet" href="./1.css" media="screen and 	(max-width:200px)">
```

    - 引入`flexible`库，自动将`html`字体大小设置为屏幕对应大小



> 4种移动端布局方式  
流式布局%，`flex`布局，`rem`布局，响应式布局(媒体查询器,bootstrap)  
推荐`flex`布局，`rem`布局  
未来趋势vw/vh
>



## 单位


+ `em` 在 `font-size` 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 `width`
+ `rem` 相对于 `html` 根元素文字大小
+ `ex`	字符`“x”`的高度
+ `ch`	数字`“0”`的宽度
+ `lh`	元素的 `line-height`
+ `vw`	视窗宽度的 `1%`
+ `vh`	视窗高度的 `1%`
+ `vmin`	视窗较小尺寸的 `1%`
+ `vmax`	视图大尺寸的 `1%`



## 其他知识


### var(--property-name,otherValue)


+ 方法的第一个参数是要引用的自定义属性的名称。函数的第二个参数可选。如果第一个参数引用的自定义属性无效，则该函数将使用第二个值。
+ 自定义属性 
    - 一般用`--property`表示



### :root


+ 一般用于定义全局变量
+ `:root` 这个 `CSS` 伪类匹配文档树的根元素。对于 `HTML` 来说,`:root` 表示 `<html>` 元素，除了优先级更高之外，与 `html` 选择器相同



### filter还有更多用法


反差，饱和度，灰度，色相旋转`filter: hue-rotate(0deg);`...  
**MDN查询**



### backdrop-filter


为元素添加滤镜，覆盖后面元素的地方产生滤镜效果（也就是说添加这个属性就是把此元素变成滤镜片，去遮其他元素）



+ 毛玻璃



### radial-gradient()径向渐变


```css
{
  /* A gradient at the center of its container,
   starting red, changing to blue, and finishing green */
  background: radial-gradient(circle at center, red 0, blue, green 100%);
}
```



### -webkit-text-stroke


`-webkit-text-stroke CSS`属性为文本字符指定了宽(字体描边宽度)和颜色 . 它是`-webkit-text-stroke-width` 和`-webkit-text-stroke-color`属性的缩写



```css
div {
  -webkit-text-stroke: 5px red;
}
```



### text-transform


```css
{
  text-transform: capitalize;/*首字母大写*/
  text-transform: uppercase;/*所有字母大写*/
  text-transform: lowercase;/*所有字母小写*/
  text-transform: none;/*不转化*/
  text-transform: full-width;/*I do not know*/
}
```



### attr()


`attr()` 理论上能用于所有的 `CSS` 属性但目前支持的仅有伪元素的 `content` 属性，其他的属性和高级特性目前是实验性的



+ 语法



```css
div::before {
  content: attr(属性名 单位);
}
```



## 易错点
1. 子元素使用transform倒转回来的时候应该将skew和rotate也倒转。transform有前后顺序关系
2. 

svg，canvas



css宽度属性优先级排行 min>max>flex>width



+ [http://942875315.3vfree.cn](http://942875315.3vfree.cn)

