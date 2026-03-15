---
title: DOM转矢量PDF
createTime: 2026-01-06
---


> @xzboss目前大部分能搜到的解决办法都是dom转canvas转图片转pdf这样的方式；或者一些简单样式转换如svg转pdf。
>

### 方式一：浏览器原生打印
> 示例地址：[https://dom-to-vector-pdf-demo.vercel.app/](https://dom-to-vector-pdf-demo.vercel.app/)
>

#### 优点
1. 还原效果好
2. 控制灵活，通过css控制

#### 缺点
1. 无法静默打印，需要用户自行操作弹窗
2. 不同浏览器、不同版本打印效果可能有出入

> 如果用无头浏览器就可以免掉这一步，但需要后端介入；但这也是最优解了
>

#### 示例代理
```javascript
export const printPDF = (id, title = "byPrint") => {
  const reportElement = document.getElementById(id);
  if (!reportElement) {
    throw new Error("未找到报告元素，请确认元素ID是否正确");
  }

  const reportHeight = reportElement.offsetHeight;
  if (!reportHeight) {
    throw new Error("无法获取报告高度，请确认元素是否可见");
  }

  const printStyle = document.createElement("style");
  printStyle.id = "print-stylesheet";
  printStyle.innerHTML = `
@media print {
    @page {
        size: auto;
        height: ${reportHeight + 10}px;
        margin: 0;
    }
    #${id} {
        position: absolute !important;
        width: 100% !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        background-color: #fff !important;
        z-index: 100000 !important;
    }
}
`;
  document.head.appendChild(printStyle);

  window.addEventListener("afterprint", () => {
    document.head.removeChild(printStyle);
    window.removeEventListener("afterprint", () => {});
  });
  window.print();
};
```

### 方式二：服务端 puppeteer
> 示例：[https://00l.xyz/wyg95](https://00l.xyz/wyg95)
>
> 例如我们可以导入填写指定网址和选择器可即可转换指定DOM，这里以掘金首页的列表做演示
>

<!-- 这是一张图片，ocr 内容为：会员 稀士掘金 首页 探示科土概金 招件 AL CODING / CNAY RALE-"NAVIGATION" CLASS"TAG-NAY TAG-NAVIGATOR HIDE-TAG-AAY 15062D87 DAT8-Q-6DC27796 DATA-4-4-53996304>:)://NAV> REDIV CLASS-NTINELINE-CONTENT' DATA-V-539963BA DATA-V-6DC27796> 最新 推荐 园 关注 下午好! 去每到 "SDIV CLA5S-"ENTRY-LIST-RONTAINEF" DATA-U-EFOSEABE DATA-V-LDC27796 DATA 点亮在社区的每一天 539963B43X 前端性能优化实录:把5秒白屏降到1.2秒,只做7件事 综合 WED 5秒白屏?1.2秒加吗?VITE项目性能优化实战!从代码分角,图片懒加越到骨梨屏,预演船... --DIV CLASS- GNTRY-LIST-URAP- DOTA-V-7133910F DATA-V-81926ABE> -ZDIV DETA-Y-Y-21339FOF DATA-43581128 DATA-V-OF9-OF9A6E NANC-UO 后端 404星球的带 JEVASO... C快一扶 文章榜 TAG-"DIV" CLASS-"ENTRY-LIST LIST" AD-LIST> --- 58 I CLI DATA-V-43501LCE DATA-GROWING-CONTAINER-"TRUE DATA-GROWING-T 西前端 最快实现的前端灰度方案 "ENTRYLIST" CLASS "ITEN*@>@LI2 ELI DATA-V-435011C8 DATA-GROWING-CONTAINERSLTRUE DATA-GROWING-TI 小白基状学公的别做仪度方莱一,引点:尖什么解要死变成命?11直超数调;全量发争的风险后为一次上结,导致. "ENTRYLIST" CLASS- ITEN>@S/LIS ANDROID TRACE SGL:打造全链路日志品 T LI DATA-Y-435811C8 DATA-GROWING-CONTAINERS'TRUE" 东坡白幕73K)85 DATAGRAWING-TI "ENTRYLIST' CLASS"ITEN">@>@2/TI, I IOS DATA-GROWING-TI LI DATA-V-435011CA DATA-QROWING-CONTAINER:"TRUE 转头发现,为啥"面试文章"几乎都消失了 "ENTRYLIST" CTASSE"ITEN">E://TI> DATA-GROWING-TI 以的看技术社区,热门多半是面试文章当通,作为技术文章创作者来说他是同样的体验,与其... 老乡鸿也开课?我用TRAE SOL-- LETI DALA-V-435011C& DATA-GROWING-CONTAINER:"TRUE 人工智能 "ESTRYLIST" CLASS"ITEN,ES/UY 据金安东尼80K10439 西试 GIRHUB人工智新 T-TI DATA-V-435021CE DATA-GROWING-O DATA-GROWING-TI ONTAINERATRU XCODE26-IOS26运配 开发工具 T-TI DATA-V-435011C8 DATA-GROWING-CONTAINEN DATA-GROWING-T 苹果官网前端技术解析:极简设计背后的技术精粹 查看更多> "ENTRYLIST" CLASS"ITEN"SE</LI> 苹果公司官网(UPPLE.COIM以其代准的板筒设计,直转输的交互体验和卓越的性能表现过各于世.本文港深入解折苹果. 国 代码人生 1<TL DATA-V-435011CD DATA-GROWING-CONTAINERSTRUE DATA-GROWING-TI "ENTRYLIST CTASSE"ITEN"EN"(LI> 一只卡比善2.3K心31 朝猫   LL DATA-435A11C& DATA-GRAWING-CANTAINER:"TRUE" DATA-GROWING-TI 阅读 作者榜 前端性能优化的几个大招(理论+实践,看完就是LEADER水平) DIVENTRY-LIST.LI DIV.TIMELINE-ENTRY-LIST 排行榜 前言性能优化,一个月用户体验的义管模块,它没有豆走的标准定义成唯一的解决方案.但是我们从整个项目的开 +关注 ACCESSIBILITY DOM BREAKPOINTS STYLES LAYOUT STANERS ALEECEX & 27K 27K A64 HOR AS + * * * * * * HOR Y FITEL OLENENT.STYLE I 油猴+手势识别:我实现了任意网页隔空控制! 油报旺能能将任意的湖IS注入到当前网万中,是否能结合手始识别实现任意网页照空控制,变. -->
![](https://cdn.nlark.com/yuque/0/2025/png/33647907/1759053279192-201759b9-b9c2-41d3-ad92-8700480e2f85.png)

<!-- 这是一张图片，ocr 内容为：稀土掘金 67% 同志们,我去外包了 同志们,我去外包了同志们.经历了漫长的思想斗争.我决定同老家发展.然后税是罚历石顶大海.还好一 后端 JETBRAINS正式宣布免费,有点猛啊! 提制JETBRAINS,这项公司,相他航开发的同字质该却不随牛,该公司房产备种蚂程IDE 和开发工具,虽然. 的能后燃轻序易 31岁,写了8年代码的我,终于懂了啥叫成功 31岁.写了8年代玛的我,终于懂了除肌成功现在每天下午六点,我淮时天了IDEA.开年穿过4公里的... 天天换鱼的JAVA工程师 给大龄(35岁+)程序员的绝地求生计划书 不要侥幸,35岁以上的程序员不好找工作,这是一个即定事买首无论悬什么果道,对于普通人来说35... 晴小第74K心78 前端后端面试 面试官问我,后端一次性返回十万条数据,前端应该怎么处理? 问题接述面试官:后堵一次性返回10万条数控给你,你如何处理?我:整镇一笑.马上绘后燃发生一百万, ZAYYO 41K 41K 325 为什么我坚持用GIT命令行,而不是GUI工具? 上周,我们组里来了个断同事,看我哪里帕位地在黑窗口里敲G计命令,他很好奇地问我:"哥,现在VS..... GIT  前诸 心 200 ERPANOMER  20K 我天,JAVA 已沦为老四.. 路想了一下才发现,自己好像有大半年都没有关注过TTIOBE社区了.TIOBE 红区相信大家超昕过. 前珊厉端程序员 CODOSHOOP22K 22K  69 我让AL一把撞了个算命网站,结果它比我还懂玄学 深夜突发母想:临让AU把新2000年的的玄军管基肉?于是我开始了这个"用息现代技术发现最古者钧感"的...... 芋圆AI K 心84 前站AIGCAI编程 7000块帮朋友做了2个小程序加一个后台管理系统,值不值? 5.6.7月份副业共收入近15000块吧.这个数字我低洪惠,其中主要包括3个话:帮助里友亲或做24小时 -->
![](https://cdn.nlark.com/yuque/0/2025/png/33647907/1759053314844-a344e251-d8a8-4c32-9a5a-bf102c0a21c5.png)

方式一有一个痛点就是无法静默导出，但是用无头浏览器就可以完美的解决这个问题，而且服务端也不存在用户浏览器不同的兼容性问题。这里介绍一个 node 端的无头浏览器 puppeteer

> 无头浏览器就是没有GUI界面的浏览器
>

#### 优点
1. 还原效果好
2. 兼容性好、稳定、快速
3. 控制灵活，通过css控制

#### 缺点
比较繁琐，需要前端将样式写好，后端把puppeteer所需要的库文件，文字包安装好。

#### 使用示例
```javascript
npm i puppeteer
```

安装会比较慢，因为要下载200MB左右的浏览器

```javascript
import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import { API_PORT } from './config.js';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// PDF 导出接口
app.post('/api/export-pdf', async (req, res) => {
  console.log("有人动了")
  try {
    const { url, elementId } = req.body;
    
    if (!url || !elementId) {
      return res.status(400).json({ error: '缺少 url 或 elementId 参数' });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 元素检查
    const elementExists = await page.evaluate((id) => {
      return !!document.querySelector(id);
    }, elementId);

    if (!elementExists) {
      throw new Error('未找到报告元素，请确认元素ID是否正确');
    }

    // 获取元素高度
    const elementHeight = await page.evaluate((id) => {
      const element = document.querySelector(id);
      return element.offsetHeight;
    }, elementId);

    if (!elementHeight) {
      throw new Error('无法获取报告高度，请确认元素是否可见');
    }

    // 添加打印样式 - 需要根据项目完善
    await page.addStyleTag({
      content: `
        @page {
          size: auto;
          height: ${elementHeight}px;
          margin: 0;
        }
        
        /* 隐藏所有元素 */
        body * {
          visibility: hidden !important;
        }
        
        /* 显示目标元素及其所有子元素 */
        ${elementId},
        ${elementId} * {
          visibility: visible !important;
          z-index: 100000 !important;
        }
        
        /* 重置目标元素样式但保持原有布局 */
        ${elementId} {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
        }
      `
    });

    // 生成PDF Buffer
    const pdfBuffer = await page.pdf({
      printBackground: true,
      height: `${elementHeight + 20}px`,
      width: '210mm', // A4宽度，可根据需要调整
      pageRanges: '1',
      preferCSSPageSize: true
    });

    await browser.close();

    // 返回PDF文件流
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=export.pdf`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('导出失败:', error);
    res.status(500).json({ error: error.message });
  }
});

// 启动服务
app.listen(API_PORT, () => {
  console.log(`PDF导出服务已启动，端口: ${API_PORT}`);
});
```

### 方式三：DOM转SVG转PDF
> 示例地址[https://dom-to-vector-pdf-demo.vercel.app/](https://dom-to-vector-pdf-demo.vercel.app/)
>

#### 优点
1. 可以静默导出
2. 纯前端环境

#### 缺点
1. 坑太多
2. 使用复杂
3. 与业务耦合性太强
4. 对原页面可能会有影响
5. 兼容性不好，很多特殊样式需要单独处理，比如字体

#### 原理
这里借助3个开源库进行处理，分别是

1. jspdf用于创建pdf
2. dom-to-svg用于将dom转换为svg
3. svg2pdf.js用于将svg渲染到pdf

#### 使用
##### 公共代码
```javascript
import { jsPDF } from 'jspdf'
import { elementToSVG } from 'dom-to-svg'
import { svg2pdf } from 'svg2pdf.js'
```

##### 基础使用（精简代码）
```javascript
// 1. 获取DOM
const element = document.querySelector(id)

// 2. DOM转SVG
const svgDocument = elementToSVG(element)
const svgElement = svgDocument.documentElement

// 3. 创建pdf文档
const pdf = new jsPDF({
    unit: 'px',
    format: [
        svgElement.getBoundingClientRect().width,
        svgElement.getBoundingClientRect().height
    ]
})

// 4. 绘制pdf
await svg2pdf(svgElement, pdf, {
    x: 0,
    y: 0,
    width: pdf.internal.pageSize.getWidth(),
    height: pdf.internal.pageSize.getHeight()
})

// 5. 导出PDF
pdf.save(`${title}.pdf`)
```

##### 渲染svg
> 经过上面步骤我们会得到一张白纸pdf，主要原因是转好svg需要渲染，才能有必要样式属性，比如宽高；但是渲染需要对当前页面不产生影响，于是这里采用样式覆盖的形式消除影响；
>

```javascript
svgElement.style.cssText = `
    all: unset;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999999;
`
// 添加utf-8声明
const utf8Declaration = document.createTextNode('<?xml version="1.0" encoding="utf-8"?>')
svgElement.insertBefore(utf8Declaration, svgElement.firstChild)
```

##### 中文乱码处理
> 经过上面步骤我们会得到一张样式稍微混乱的中文乱码的pdf，如下
>
> <!-- 这是一张图片，ocr 内容为：HEADING 1-LARGE TITLE HEADING 1 - LARGE TITLE HEADING 2 SUBTITLE HEADING 3 - SECTION TITLE HEADING 4 - SUBSECTION HEADING 5 - MINOR TITLE 1 N-FE-4 0 O L N-SE - 5 0 O O O N-TE-700W'I FONT STYLES SERIF FONT STYLE SANS-SERIF FONT STYLE -->
![](https://cdn.nlark.com/yuque/0/2025/png/33647907/1748427507148-91ad25fb-f29b-44a0-8219-7b551cb4598e.png)
>
> 因为jspdf默认是不支持中文的，所以需要手动注册字体。jspdf支持base64和字体链接两种方式注册
>
> 我们这里采用PingFang字体链接演示
>

1. 准备字体包

一个ttf字体包的大小大概在10MB左右，经过裁剪后（3500常用字）大概在700KB左右。PingFang字体大概有7、8种不同字重的字体包，都支持的话需要4、5MB左右的内存。但是大部分业务都只能用到400，500，700字重的字体，所以正常情况下2MB够用。如果多种字体，也可以采用woff2格式，然后导出时解码成ttf，大概可以缩减到300KB每个，如果在打包的时候再扫描系统用到的字，再裁剪，预计3个字体包可以缩减到300KB左右

> 这里有我测试用到的裁剪好的资源[https://github.com/xzboss/PingFangSC](https://github.com/xzboss/PingFangSC)
>

> 在裁剪字体的时候注意保留空格和回车字符，这里踩过坑。
>

2. 处理字体属性

这里需要字体的属性和注册的字体能够对应上，所以要处理一下 fontFamily 属性，我这里用一种字体演示

3. 处理style样式

有些 DOM 中本来就带有 svg，且有些 svg是用 style 内联去控制字体的。这个时候需要将 style 处理为标签属性

```javascript
import PingFangRegular from '@/assets/PingFang Regular_0.subset.ttf'
import PingFangMedium from '@/assets/PingFang Medium_0.subset.ttf'
import PingFangHeavy from '@/assets/PingFang Heavy_0.subset.ttf'
// 替换所有svg的字体属性
const replaceFont = (element) => {
  if (element.tagName === "text" || element.tagName === "tspan") {
    // 解析style字符串
    const style = element.getAttribute("style");
    if (style) {
      style.split(";").forEach((css) => {
        const [key, value] = css.split(":");
        if (!key) {
          return;
        }
        element.setAttribute(key.trim(), value?.trim());
      });
    }
    element.removeAttribute("style");
    const fontFamily = element.getAttribute("font-family");
    const fontWeight = element.getAttribute("font-weight");
    if (fontFamily) {
      element.setAttribute("font-family", "PingFang");
      element.setAttribute("font-weight", transWeight(fontWeight));
    }
  }
  for (const child of element.children) {
    replaceFont(child);
  }
};
replaceFont(svgElement);

// 注册 字体
const registerFont = () => {
    const fontMap = {
        // '100': 'PingFangExtraLight',
        // '300': 'PingFangLight',
        '400': PingFangRegular,
        '500': PingFangMedium,
        // '600': 'PingFangBold',
        '700': PingFangHeavy
        // '900': 'PingFangHeavy'
    }
    for (const [weight, font] of Object.entries(fontMap)) {
        pdf.addFont(font, 'PingFang', 'normal', weight)
        // pdf.addFont(font, 'PingFang', 'italic', weight)
    }
}
registerFont()

pdf.setFont('PingFang')

// ------
/**
 * 转换字体字重
 * @param weight
 * @returns
 */
const transWeight = (weight) => {
  if (!weight) {
    return "400";
  }
  const weightMap = {
    normal: "400",
    bold: "700",
  };
  weight = Number(weightMap[weight] || weight);
  if (weight <= 400) {
    return "400";
  }
  if (weight < 700) {
    return "500";
  }
  if (weight >= 700) {
    return "700";
  }
  return "400";
};
```

> 这个时候我们可以成功处理中文乱码的问题，如下
>
> <!-- 这是一张图片，ocr 内容为：BYEXPORT(13).PDF 1 1 34% HEADING 1-LARGE TITLE HEADING 1 - LARGE TITLE HEADING 2 SUBTITLE HEADING 3 - SECTION TITLE HEADING 4 - SUBSECTION HEADING 5 MINOR TITLE 中简-400字重 中简-500字重 中简-700字重 FONT STYLES SERIF FONT STYLE SANS-SERIF FONT STYLE -->
![](https://cdn.nlark.com/yuque/0/2025/png/33647907/1748484239651-5ab6eab1-c5d6-4958-a83a-82930e93716c.png)
>

##### iconfont图标处理
1. use 替换

项目中经常会用到 iconfont 图标，用 use 标签引用的symbol，如果不处理会显示不出来。这里就需要将 dom 中的 use 替换为相应的标签，但不能对原页面产生影响，所以考虑克隆容器元素。然后替换 use

2. 保持 use 原始样式

如果直接替换 use ，其实是将注入的symbol直接替换，最后运用的大小是由 symbol 的 viewBox 决定的，所以可以采用缩放的方式调整大小，可以用 g 标签容器来存放 use 本身的属性

```javascript
const originElement = document.querySelector(id);
const parentElement = originElement?.parentElement;
const element = originElement?.cloneNode(true);

if (element) {
  element.style.zIndex = "-999999";
  element.style.position = "absolute";
  element.style.top = "0";
  element.style.left = "0";
  parentElement?.appendChild(element);
}

const inlineSVGSymbols = (element) => {
  const uses = element.querySelectorAll("use");
  uses.forEach((use) => {
    const href = use.getAttribute("xlink:href") || use.getAttribute("href");
    if (!href) {
      return;
    }

    const symbol = document.querySelector(href);
    if (!symbol) {
      return;
    }
    // 创建 <g> 容器保留所有属性
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    Array.from(use.attributes).forEach((attr) => {
      if (attr.name !== "xlink:href" && attr.name !== "href") {
        g.setAttribute(attr.name, attr.value);
      }
    });

    g.innerHTML = `
            <g transform="scale(${getScaleFactor(symbol)})">
              ${symbol.innerHTML}
            </g>
          `;

    use.replaceWith(g);
  });
};

inlineSVGSymbols(element);

const svgDocument = elementToSVG(element);

parentElement?.removeChild(element);

// -----
/**
 * 计算缩放比例（根据 symbol 的 viewBox 和原始尺寸）
 */
const getScaleFactor = (symbol) => {
  const viewBox = symbol.getAttribute("viewBox");
  if (!viewBox) {
    return 1;
  }
  const [, , width] = viewBox.split(" ").map(Number);
  const expectedSize = 16; // 1em 通常计算的像素值
  return expectedSize / width;
};
```

##### 其他
其实还有很多常见问题，处理起来比较简单，就不一一举例了

1. 导出不包含某些特定元素
2. 字体整体向下偏移
3. 布局问题
4. pdf宽高

#### 完整代码
```javascript
/**
 * 将指定DOM元素导出为PDF文件
 * @param {string} id - 要导出的元素选择器
 * @param {string} [title="byExport"] - 导出的PDF文件名
 * @returns {Promise<void>}
 */
export const ExportToPDF = async (id, title = "byExport") => {
  try {
    // 1. 获取并准备DOM元素
    const originalElement = document.querySelector(id);
    if (!originalElement) {
      throw new Error(`Element with selector "${id}" not found`);
    }

    const parentElement = originalElement.parentElement;
    const clonedElement = originalElement.cloneNode(true);

    // 设置克隆元素的样式
    Object.assign(clonedElement.style, {
      zIndex: "-999999",
      position: "absolute",
      top: "0",
      left: "0",
    });

    parentElement.appendChild(clonedElement);

    // 2. 内联SVG符号
    const inlineSVGSymbols = (element) => {
      const uses = element.querySelectorAll("use");
      uses.forEach((use) => {
        const href = use.getAttribute("xlink:href") || use.getAttribute("href");
        if (!href) return;

        const symbol = document.querySelector(href);
        if (!symbol) return;

        // 创建 <g> 容器保留所有属性
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        Array.from(use.attributes).forEach((attr) => {
          if (attr.name !== "xlink:href" && attr.name !== "href") {
            g.setAttribute(attr.name, attr.value);
          }
        });

        // 插入缩放后的路径
        g.innerHTML = `<g transform="scale(${getScaleFactor(symbol)})">${
          symbol.innerHTML
        }</g>`;
        use.replaceWith(g);
      });
    };

    inlineSVGSymbols(clonedElement);

    // 3. 转换为SVG文档
    const svgDocument = elementToSVG(clonedElement);
    parentElement.removeChild(clonedElement);
    const svgElement = svgDocument.documentElement;

    // 设置SVG样式
    svgElement.style.cssText = `
      all: unset;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -999999;
    `;

    // 添加UTF-8声明
    const utf8Declaration = document.createTextNode(
      '<?xml version="1.0" encoding="utf-8"?>'
    );
    svgElement.insertBefore(utf8Declaration, svgElement.firstChild);

    // 4. 处理SVG中的字体
    const processSVGFonts = (element) => {
      if (element.classList.contains("no-print")) {
        element.remove();
        return;
      }

      if (element.tagName === "text" || element.tagName === "tspan") {
        // 解析style字符串
        const style = element.getAttribute("style");
        if (style) {
          style.split(";").forEach((css) => {
            const [key, value] = css.split(":");
            if (key) element.setAttribute(key.trim(), value?.trim());
          });
        }

        element.removeAttribute("style");
        const fontFamily = element.getAttribute("font-family");
        const fontWeight = element.getAttribute("font-weight");

        if (fontFamily) {
          element.setAttribute("font-family", "PingFang");
          element.setAttribute("font-weight", transWeight(fontWeight));
        }

        // 调整Y坐标
        element.setAttribute(
          "y",
          String(Number(element.getAttribute("y")) - 3)
        );
      }

      Array.from(element.children).forEach(processSVGFonts);
    };

    processSVGFonts(svgElement);
    document.body.appendChild(svgElement);

    // 5. 创建PDF文档
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [
        svgElement.getBoundingClientRect().width,
        svgElement.getBoundingClientRect().height,
      ],
    });

    // 6. 注册PingFang字体
    const registerPingFangFonts = (pdf) => {
      const fontMap = {
        400: PingFangRegular,
        500: PingFangMedium,
        700: PingFangHeavy,
      };

      Object.entries(fontMap).forEach(([weight, font]) => {
        pdf.addFont(font, "PingFang", "normal", weight);
        pdf.addFont(font, "PingFang", "italic", weight);
      });
    };

    registerPingFangFonts(pdf);
    pdf.setFont("PingFang");

    // 7. 绘制SVG内容到PDF
    await svg2pdf(svgElement, pdf, {
      x: 0,
      y: 0,
      width: pdf.internal.pageSize.getWidth(),
      height: pdf.internal.pageSize.getHeight(),
    });

    // 8. 保存PDF
    pdf.save(`${title}.pdf`);

    // 9. 清理临时元素
    svgElement.remove();
  } catch (error) {
    console.error("PDF导出失败:", error);
    throw error;
  }
};

/**
 * 转换字体字重
 * @param {string} weight - 原始字重
 * @returns {string} 转换后的字重
 */
const transWeight = (weight) => {
  if (!weight) return "400";

  const weightMap = {
    normal: "400",
    bold: "700",
  };

  weight = Number(weightMap[weight] || weight);

  if (weight <= 400) return "400";
  if (weight < 700) return "500";
  if (weight >= 700) return "700";
  return "400";
};

/**
 * 计算SVG符号的缩放比例
 * @param {SVGElement} symbol - SVG符号元素
 * @returns {number} 缩放比例
 */
const getScaleFactor = (symbol) => {
  const viewBox = symbol.getAttribute("viewBox");
  if (!viewBox) return 1;

  const [, , width] = viewBox.split(" ").map(Number);
  const expectedSize = 16; // 1em 通常计算的像素值
  return expectedSize / width;
};
```

### 方式四：封装好的库
如果页面不复杂不太需要额外处理，可以用这个库 dom-to-vector-pdf

目前各种样式支持还在缓慢推进中

使用示例

```javascript
import PingFangRegular from '@/assets/font/PingFang Regular_0.subset.ttf'
import PingFangMedium from '@/assets/font/PingFang Medium_0.subset.ttf'
import PingFangHeavy from '@/assets/font/PingFang Heavy_0.subset.ttf'
import PingFangBold from '@/assets/font/PingFang Bold_0.subset.ttf'
import vectorInstance from "dom-to-vector-pdf";

vectorInstance.registerFont([
    {
        font: PingFangRegular,
        fontId: 'PingFang',
        fontWeight: '400',
        fontStyle: 'normal'
    },
    {
        font: PingFangMedium,
        fontId: 'PingFang',
        fontWeight: '500',
        fontStyle: 'normal'
    },
    {
        font: PingFangBold,
        fontId: 'PingFang',
        fontWeight: '600',
        fontStyle: 'normal'
    },
    {
        font: PingFangHeavy,
        fontId: 'PingFang',
        fontWeight: '700',
        fontStyle: 'normal'
    },
])
vectorInstance.export({
    id,
    filename: title
})
```

