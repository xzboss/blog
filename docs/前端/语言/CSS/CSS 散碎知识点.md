---
title: CSS 散碎知识点
createTime: 2023-12-01
---
#### p 标签默认会占用100%父元素，但是父元素给了display:flex; p标签便不会在自动占100%宽度了
#### mix-blend-mode:multiply; 让半透明图片与背景色混合：比如背景色和半透明图片颜色相同，那他们混合后就加深了
#### cssText
```javascript
element.style.cssText = "color: red; background-color: yellow;";
```

#### zoom 与 transforms: scal();
zoom 改变布局 （触发重排）（缩放点在左上角）

scal 不改变布局 （触发重绘）（默认缩放点在中心）

#### 关于 chrome 字体如何小于 12px (我此时测试是11px)
zoom

scal

-webkit-text-size-adjust: none (2013年-chrome27后已经弃用)

#### *zoom 加*不被ie以外浏览器识别 （了解，vscode直接报错）
#### grid 布局
##### minmax
minmax(100px, 2fr) : 理想中的效果

minmax(1fr, 100px) : 只会有一列且占全宽

##### grid-template-areas 与 grid-area
```javascript
<style>
    .container-2 {
        width: fit-content;
        display: grid;
        border: 2px solid rgb(95, 65, 65);
        grid-template-columns: repeat(3, 100px);
        grid-auto-rows: 100px;
        grid-template-areas:
            ". .  header"
            "sidebar . content";
        grid-gap: 10px;
    }
    .container-2>div{
        background-color: #197;
    }
    .header{
        grid-area: header;
    }
    .content{
        grid-area: content;
    }
    .sidebar{
        grid-area: sidebar;
    }
</style>
<body>
    <div class="container-2">
        <div class="header">header</div>
        <div class="content">content</div>
        <div class="sidebar">sidebar</div>
    </div>
</body>
```

<!-- 这是一张图片，ocr 内容为：HEADER SIDEBAR CONTENT -->
![](https://cdn.nlark.com/yuque/0/2023/png/33647907/1697619246530-d4ace42c-3bad-4e5c-81c8-6538b8c6b6e0.png)

容器中添加子元素会自动从左到右从上到下填充

```html
<div class="container-2">
    <div class="header">header</div>
    <div class="content">content</div>
    <div class="sidebar">sidebar</div>
    <div>fill-1</div>
    <div>fill-2</div>
</div>
```

<!-- 这是一张图片，ocr 内容为：FILL-1 FILL-2 HEADER SIDEBAR CONTENT -->
![](https://cdn.nlark.com/yuque/0/2023/png/33647907/1697619222683-33d757f6-878e-4075-a2b0-3199781a4456.png)

##### grid 布局中父用 justify-content/items 与 align-content/items
整体对于容器对齐方式/单元格内对齐方式 

##### grid-row-start
```javascript
.container-4 {
    width: fit-content;
    border: 2px solid #e66;
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-gap: 10px;
    grid-template-rows: repeat(4, 50px);
}
.item-4-2 {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: #197;
    font-size: 40px; 
    z-index: 1;
}
.item-4-3 {
    grid-column-start: 2;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: rgb(152, 201, 18);
    font-size: 40px; 
}
<div class="container-4">
    <div class="item-4">1</div>
    <div class="item-4-2">2</div>
    <div class="item-4-3">3</div>
</div>
```

<!-- 这是一张图片，ocr 内容为：2 -->
![](https://cdn.nlark.com/yuque/0/2023/png/33647907/1697626367408-085d2aed-1b24-4328-aa1a-7e64c967ce6a.png)

#### display: table-cell; 
可以用 vertical-align 了

```javascript
.item {
    width: 100px;
    height: 100px;
    background-color: #e66;
    vertical-align: middle;
    /* display: table-cell; */
}
```

#### background简写规则
```css
background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [background-size] [background-origin] [background-clip]
```

