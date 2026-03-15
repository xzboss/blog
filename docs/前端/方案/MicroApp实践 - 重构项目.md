---
title: MicroApp实践 - 重构项目
createTime: 2026-01-06
---
# 业务场景
1. 最近在重构一个管理后台项目，但是这个项目很庞大，需要一边开发一边上线，对外使用来说，不能再加一个域名，重构的页面去新的域名，还没重构的页面去老的域名。这样很不合理，于是需要采用微前端方式进行解决
2. 目前技术选型为 MicroApp，介于新项目采用的 vite，作为子应用需要用 iframe 模式，所以将新项目作为基座应用
3. 根据实际项目中我遇到的坑以及解决方法，我写了一个示例，地址：[https://github.com/xzboss/micro-app-hive](https://github.com/xzboss/micro-app-hive)

# 初始条件
1. 新项目技术栈：vite + vue3 + vue-router@4 + hash模式，演示图如下：

<!-- 这是一张图片，ocr 内容为：HTTP://LOCALHOST:5173/#/HOME /HOME /MENU-1 NEW-HOME /MENU-2 -->
![](https://cdn.nlark.com/yuque/0/2024/png/33647907/1723987582491-84babaed-8393-4336-8250-2049ac60f66f.png)

2. 老项目为技术栈：webpack + vue2 + vue-router@3 + hash模式，演示图如下：

<!-- 这是一张图片，ocr 内容为：/HOME /MENU-1 HOME /MENU-2 /MENU-3 /MENU-4 -->
![](https://cdn.nlark.com/yuque/0/2024/png/33647907/1723987511580-e7cd3a2f-8bb1-4eb4-9458-495499fed92f.png)

# 实践
## 接入微应用
路由模式采用 native 模式，基座应用与子应用共用地址栏，这样的好处就是，对于使用者而言，网站的使用方式和网站地址栏的展现完全和原来一致。再一个是美观

对于 native 的其他问题在这里：[https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/native-mode](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/native-mode)

1. 安装依赖

```powershell
npm i @micro-zoe/micro-app --save
```

2. 初始化

```javascript
// main.js
import microApp from '@micro-zoe/micro-app'
microApp.start()
```

3. 自定义 micro-app 标签防止标签未定义

```vue
// 配置文件
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-app/.test(tag),
        },
      },
    }),
  ],
});
```

> 为了不单独去控制基座应用与子应用的显隐，采用路由配置的方式
>

4. 创建一个子应用视图组件用于渲染子应用

```vue
<!-- @views/old-app.vue -->
<template>
  <micro-app name="old-app" url="http://localhost:8080/" router-mode="native"></micro-app>
</template>
```

5. 路由配置最后，我们添加一个匹配子应用的路由 

```vue
// router.js
{
  path: "/:page*",
  name: "old-app",
  component: () => import("./views/old-app.vue"),
}
```

6. 到这里项目一般会报两个错，1. micro-app 自定义标签；2. 跨域
+ 自定义标签未定义）添加配置 vite.config.js

```vue
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-app/.test(tag),
        },
      },
    }),
  ],
});
```

+ 跨域）<font style="color:#DF2A3F;">子应用</font>设置配置，添加响应头

```vue
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
}
```

7. 完成以上配置其实项目就可以跑起来了，我们将子应用无关视图部分隐藏，再调整下样式，预览图如下：

<!-- 这是一张图片，ocr 内容为：当前地址栏 基座应用已重构页面 HTTP://LOCALHOST:5173/#/MENU-3 /HOME /MENU-1 MENU-3 /MENU-2 /MENU-3 /MENU-4 基座应用未重构页面 -->
![](https://cdn.nlark.com/yuque/0/2024/png/33647907/1723993013498-a0d12fec-0a23-4731-be6a-1f236b7058f3.png)

## 子应用跳转基座应用
> 用 beforeEach 拦截就行，replace 后记录不会受影响，而且子应用之后也不会渲染
>

## 解决基座互跳应用传参问题
由于 vue-router@3 中的 params 传参和 vue-router@4 中有所区别，需要做特别处理

3版本中用 name 方式传参 params ，可以直接用 this.$route.params 获取，但是4版本中不尽然，不管是传还是接收都不起作用

既然基座-子应用共享地址栏，那么 query 参数肯定是没有问题的。

子跳子 params 是没有问题的；基座跳子可以再子应用的 afterEach 中判断一下来源，如果是基座来的 可以取到真实 window.history.state.params 添加到 子应用当前路由的 params 中；子跳基座 直接传递 ({ state: { params: {} } }) 即可；

这样就可以新项目业务中传递 params 可以继续采用新的写法 进行传参，老项目业务中任然保持原来的用法。

## 解决全局样式互相污染问题
可以采用第三方库所提供的更改前缀方式解决；

