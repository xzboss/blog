# AGENTS.md

## 项目概述

xzboss 的个人博客 & 知识库，基于 [Rspress](https://rspress.dev) v2 构建的静态文档站点。内容以中文为主，涵盖前端技术笔记、读书摘录和个人博客。

## 技术栈

- **框架**: Rspress 2 (`@rspress/core ^2.0.5`)
- **语言**: TypeScript 5, Markdown
- **包管理**: pnpm 10
- **许可证**: AGPL-3.0-only

## 常用命令

```bash
pnpm dev      # 本地开发服务器
pnpm build    # 生产构建
pnpm preview  # 预览构建产物
```

## 目录结构

```
blog/
├── docs/                  # 所有文档内容（Rspress root）
│   ├── index.md           # 首页（pageType: home）
│   ├── _nav.json          # 顶部导航配置（自动生成 nav）
│   ├── blog/              # 博客随笔（独立于「前端」）
│   │   └── _meta.json
│   └── 前端/              # 前端相关全部内容
│       ├── _meta.json
│       ├── 语言/
│       │   ├── _meta.json
│       │   ├── JavaScript/
│       │   │   ├── _meta.json
│       │   │   ├── 基础/          # 文件名即文章 title
│       │   │   └── JavaScript高级程序设计v4/
│       │   └── CSS/
│       ├── 框架/
│       │   ├── React/
│       │   └── Vue/
│       └── 工程化/
│           ├── 设计模式/
│           ├── 项目方案/
│           └── 浏览器/
├── rspress.config.ts      # Rspress 配置（不含 nav/sidebar，由 _meta.json 自动生成）
├── tsconfig.json
└── package.json
```

- 除 blog 外，所有文章均在 `docs/前端/` 下，按「语言 / 框架 / 工程化」分类。
- 文档文件名使用文章 frontmatter 中的 `title`，便于与侧边栏标题一致。

## 导航与侧边栏（自动生成）

导航和侧边栏通过 `_meta.json` / `_nav.json` 自动生成，**不在 `rspress.config.ts` 中手动维护**。

- `docs/_nav.json`：定义顶部导航栏。
- 各目录下的 `_meta.json`：定义该层级的侧边栏结构和顺序。

### 新增文档流程

1. 在 `docs/前端/` 下对应分类目录创建 `.md` 文件，**文件名使用该文章的 title**。
2. 在该目录的 `_meta.json` 中添加一条 `{ "type": "file", "name": "文件名（不含.md）" }`。
3. 如需自定义显示名称，加 `"label"` 字段。
4. 新建目录时，在父级 `_meta.json` 中添加 `{ "type": "dir", "name": "目录名" }`，并在新目录中创建 `_meta.json`。

### _meta.json 常用格式

```json
// 文件条目
{ "type": "file", "name": "文件名", "label": "可选显示名" }
// 目录条目
{ "type": "dir", "name": "目录名", "label": "显示名", "collapsible": true, "collapsed": false }
```

## 更新时间

- 已开启 `lastUpdated: true`，基于 git commit 时间自动显示。
- 文件必须已 commit 到 git 才会显示更新时间。

## 内容编写规范

### 文件格式

- 所有文档均为 `.md` 文件，放在 `docs/` 下对应分类目录中。
- 首页 `docs/index.md` 使用 YAML frontmatter 配置 `pageType: home`。
- 普通文档无需特殊 frontmatter，Rspress 会自动处理。

### 写作语言

- 文档内容以**中文**为主。
- 代码注释可中英混用。
- 技术术语保留英文原文（如 Proxy、Promise、BOM、DOM）。

## 注意事项

- 项目无自定义 `theme/` 目录，使用 Rspress 默认主题。
- 项目无 `.mdx` 文件，当前全部使用纯 Markdown。
- `tsconfig.json` 的 `include` 覆盖了 `rspress.config.ts`、`docs/**/*.ts(x)` 和 `theme/**/*.ts(x)`，如果未来添加自定义主题组件需放在 `theme/` 目录下。
- 修改 `_meta.json` / `_nav.json` 支持 HMR，dev 模式下会自动刷新。
- 修改 `rspress.config.ts` 后需重启 dev server。
