> @xzboss目前大部分能搜到的解决办法都是dom转canvas转图片转pdf这样的方式；或者一些简单样式转换如svg转pdf。

### 方式一：浏览器原生打印

#### 优点

1.  还原效果好
2.  控制灵活，通过css控制

#### 缺点

1.  无法静默打印，需要用户自行操作弹窗
2.  不同浏览器、不同版本打印效果可能有出入

> 如果用无头浏览器就可以免掉这一步，但需要后端介入；但这也是最优解了

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

> 
>
> 例如我们可以导入填写指定网址和选择器可即可转换指定DOM，这里以掘金首页的列表做演示

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bad2bec6ee41401d917f60f7de079e8d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbG9uZ3NoaXh1:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAxNDcyMjg0MTkxODcxOCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1774191934&x-orig-sign=lBRjNLpyTt2uvUXvK7SK8KW4XRw%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/186cd3817bb3496481c1f3b66f569b8f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbG9uZ3NoaXh1:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAxNDcyMjg0MTkxODcxOCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1774191934&x-orig-sign=FoSvNaOC0i7p331XmFbeY1k%2BXJU%3D)

方式一有一个痛点就是无法静默导出，但是用无头浏览器就可以完美的解决这个问题，而且服务端也不存在用户浏览器不同的兼容性问题。这里介绍一个 node 端的无头浏览器 puppeteer

> 无头浏览器就是没有GUI界面的浏览器

#### 优点

1.  还原效果好
2.  兼容性好、稳定、快速
3.  控制灵活，通过css控制

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

> 示例地址<https://dom-to-vector-pdf-demo.vercel.app/>

#### 优点

1.  可以静默导出
2.  纯前端环境

#### 缺点

1.  坑太多
2.  使用复杂
3.  与业务耦合性太强
4.  对原页面可能会有影响
5.  兼容性不好，很多特殊样式需要单独处理，比如字体

#### 原理

这里借助3个开源库进行处理，分别是

1.  jspdf用于创建pdf
2.  dom-to-svg用于将dom转换为svg
3.  svg2pdf.js用于将svg渲染到pdf

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
> ![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/703b24c9fa0e4d6490e60c99f004c3ad~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbG9uZ3NoaXh1:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAxNDcyMjg0MTkxODcxOCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1774191934&x-orig-sign=wb9GtczRH4u%2B4qbfmhbQ%2FxFDV5k%3D)
>
> 因为jspdf默认是不支持中文的，所以需要手动注册字体。jspdf支持base64和字体链接两种方式注册
>
> 我们这里采用PingFang字体链接演示

1.  准备字体包

一个ttf字体包的大小大概在10MB左右，经过裁剪后（3500常用字）大概在700KB左右。PingFang字体大概有7、8种不同字重的字体包，都支持的话需要4、5MB左右的内存。但是大部分业务都只能用到400，500，700字重的字体，所以正常情况下2MB够用。如果多种字体，也可以采用woff2格式，然后导出时解码成ttf，大概可以缩减到300KB每个，如果在打包的时候再扫描系统用到的字，再裁剪，预计3个字体包可以缩减到300KB左右

> 这里有我测试用到的裁剪好的资源<https://github.com/xzboss/PingFangSC>

> 在裁剪字体的时候注意保留空格和回车字符，这里踩过坑。

2.  处理字体属性

这里需要字体的属性和注册的字体能够对应上，所以要处理一下 fontFamily 属性，我这里用一种字体演示

3.  处理style样式

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
> ![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9c01ff956b6e45658bc1dbc077d55ade~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbG9uZ3NoaXh1:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAxNDcyMjg0MTkxODcxOCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1774191934&x-orig-sign=gzH6RaGmu9l0nzOayptzKX7eh00%3D)

##### iconfont图标处理

1.  use 替换

项目中经常会用到 iconfont 图标，用 use 标签引用的symbol，如果不处理会显示不出来。这里就需要将 dom 中的 use 替换为相应的标签，但不能对原页面产生影响，所以考虑克隆容器元素。然后替换 use

2.  保持 use 原始样式

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

1.  导出不包含某些特定元素
2.  字体整体向下偏移
3.  布局问题
4.  pdf宽高

#### 完整代码

```javascript
import { jsPDF } from 'jspdf'
import { elementToSVG } from 'dom-to-svg'
import { svg2pdf } from 'svg2pdf.js'
import PingFangRegular from '@/assets/font/PingFang Regular_0.subset.ttf'
import PingFangMedium from '@/assets/font/PingFang Medium_0.subset.ttf'
import PingFangHeavy from '@/assets/font/PingFang Heavy_0.subset.ttf'
/**
 * 将指定DOM元素导出为PDF文件
 * @param {string} selector - 要导出的元素选择器
 * @param {string} filename - 导出的PDF文件名
 * @returns {Promise<void>}
 */
export const ExportToPDF = async (selector: string, filename: string) => {
    try {
        // 1. 获取并准备DOM元素
        const originalElement = document.querySelector(selector)
        if (!originalElement) {
            throw new Error(`Element with selector "${selector}" not found`)
        }
        
        const parentElement = originalElement.parentElement as HTMLElement
        if (!parentElement) {
            throw new Error(`Parent element with selector "${selector}" not found`)
        }
        const clonedElement = originalElement.cloneNode(true) as HTMLElement
        
        // 设置克隆元素的样式
        Object.assign(clonedElement.style, {
            zIndex: '-999999',
            position: 'absolute',
            top: '0',
            left: '0'
        })
        
        parentElement.appendChild(clonedElement)
        
        // 资源加载阻塞列表
        const resourceLoaded: Promise<void>[] = []
        
        // 2. 特殊处理DOM
        const inlineSVGSymbols = (element: HTMLElement) => {
            // 处理图片资源加载
            const imgs = element.querySelectorAll('img')
            imgs.forEach((img: HTMLImageElement) => {
                resourceLoaded.push(
                    new Promise((resolve) => {
                        img.onload = () => resolve(void 0)
                    })
                )
            })
            // 处理内联符号
            const uses = element.querySelectorAll('use')
            uses.forEach((use: SVGUseElement) => {
                const href = use.getAttribute('xlink:href') || use.getAttribute('href')
                if (!href) {
                    return
                }
                
                const symbol = document.querySelector(href)
                if (!symbol) {
                    return
                }
                
                // 创建 <g> 容器保留所有属性
                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
                Array.from(use.attributes).forEach((attr) => {
                    if (attr.name !== 'xlink:href' && attr.name !== 'href') {
                        g.setAttribute(attr.name, attr.value)
                    }
                })
                
                // 插入缩放后的路径
                g.innerHTML = `<g transform="scale(${getScaleFactor(symbol as SVGElement)})">${symbol.innerHTML
                    }</g>`
                use.replaceWith(g)
            })
        }
        inlineSVGSymbols(clonedElement)
        
        // 等待所有资源加载完成
        await Promise.allSettled(resourceLoaded)
        
        // 3. 转换为SVG文档
        const svgDocument = elementToSVG(clonedElement)
        parentElement.removeChild(clonedElement)
        const svgElement = svgDocument.documentElement
        
        // 设置SVG样式
        svgElement.style.cssText = `
              all: unset;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: -999999;
            `
            
        // 添加UTF-8声明
        const utf8Declaration = document.createTextNode(
            '<?xml version="1.0" encoding="utf-8"?>'
        )
        svgElement.insertBefore(utf8Declaration, svgElement.firstChild)
        
        // 4. 处理SVG中的字体
        const processSVGFonts = (element: SVGElement) => {
            if (element.classList.contains('no-print')) {
                element.remove()
                return
            }
            
            if (element.tagName === 'text' || element.tagName === 'tspan') {
                // 解析style字符串
                const style = element.getAttribute('style')
                if (style) {
                    style.split(';').forEach((css) => {
                        const [key, value] = css.split(':')
                        if (key) {
                            element.setAttribute(key.trim(), value?.trim())
                        }
                    })
                }
                
                element.removeAttribute('style')
                const fontFamily = element.getAttribute('font-family')
                const fontWeight = element.getAttribute('font-weight')
                
                if (fontFamily) {
                    element.setAttribute('font-family', 'PingFang')
                    element.setAttribute('font-weight', transWeight(fontWeight))
                }
                
                // 调整Y坐标
                element.setAttribute('y', String(Number(element.getAttribute('y')) - 3))
            }
            
            Array.from(element.children).forEach((child) => {
                processSVGFonts(child as SVGElement)
            })
        }
        
        processSVGFonts(svgElement as unknown as SVGElement)
        document.body.appendChild(svgElement)
        
        // 5. 创建PDF文档
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [
                svgElement.getBoundingClientRect().width,
                svgElement.getBoundingClientRect().height
            ]
        })
        
        // 6. 注册PingFang字体
        const registerPingFangFonts = (pdf: jsPDF) => {
            const fontMap = {
                400: PingFangRegular,
                500: PingFangMedium,
                700: PingFangHeavy
            }
            
            Object.entries(fontMap).forEach(([weight, font]) => {
                pdf.addFont(font, 'PingFang', 'normal', weight)
                pdf.addFont(font, 'PingFang', 'italic', weight)
            })
        }
        
        registerPingFangFonts(pdf)
        pdf.setFont('PingFang')


        // 7. 绘制SVG内容到PDF
        await svg2pdf(svgElement, pdf, {
            x: 0,
            y: 0,
            width: pdf.internal.pageSize.getWidth(),
            height: pdf.internal.pageSize.getHeight()
        })
        
        // 8. 保存PDF
        pdf.save(`${filename}.pdf`)
        
        // 9. 清理临时元素
        svgElement.remove()
    } catch (error) {
        console.error('PDF导出失败:', error)
        throw error
    }
}
/**
 * 转换字体字重
 * @param {string} weight - 原始字重
 * @returns {string} 转换后的字重
 */
const transWeight = (weight: string | number | null) => {
    if (!weight) {
        return '400'
    }
    
    const weightMap = {
        normal: '400',
        bold: '700'
    }
    
    weight = Number(weightMap[weight as keyof typeof weightMap] || weight)
    
    if (weight <= 400) {
        return '400'
    }
    if (weight < 700) {
        return '500'
    }
    if (weight >= 700) {
        return '700'
    }
    return '400'
}

/**
 * 计算SVG符号的缩放比例
 * @param {SVGElement} symbol - SVG符号元素
 * @returns {number} 缩放比例
 */
const getScaleFactor = (symbol: SVGElement) => {
    const viewBox = symbol.getAttribute('viewBox')
    if (!viewBox) {
        return 1
    }
    
    const [, , width] = viewBox.split(' ').map(Number)
    // 1em 通常计算的像素值
    const expectedSize = 16
    return expectedSize / width
}
```

### 方式四：封装好的库
> [github地址](https://github.com/xzboss/dom-to-vector-pdf) /
> [在线演示](https://dom-to-vector-pdf.xzboss.cn/vue-example) /
> [详细文档](https://dom-to-vector-pdf.xzboss.cn/docs)

如果页面不复杂不太需要额外处理，可以用这个库 dom-to-vector-pdf

目前各种样式支持还在缓慢推进中

使用示例

```javascript
import vectorInstance from "dom-to-vector-pdf";
import PingFangRegular from '@/assets/font/PingFang Regular_0.subset.ttf'
import PingFangHeavy from '@/assets/font/PingFang Heavy_0.subset.ttf'

export const ExportToPDF = (selector, title) => {
  vectorInstance.registerFont([
    {
      font: PingFangRegular,
      fontWeight: "400",
      fontStyle: "normal",
    },
    {
      font: PingFangHeavy,
      fontWeight: "700",
      fontStyle: "normal",
    },
  ]);
  vectorInstance.exportPDF({
    selector,
    filename: title,
  });
};
```
