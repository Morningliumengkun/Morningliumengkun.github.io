# 🎓 个人学术主页 / Academic Homepage

一个部署在 **GitHub Pages** 上的纯静态个人学术主页，无需任何构建工具， clone 即用。
中英文一键切换，包含学历信息、论文发表、荣誉奖项、学术服务等板块。

> A static academic homepage hosted on **GitHub Pages** — no build step required.
> Bilingual (中文 / English) with sections for education, publications, awards and academic service.

![GitHub Pages](https://img.shields.io/badge/托管-GitHub%20Pages-3b5bdb) ![静态站点](https://img.shields.io/badge/类型-纯静态HTML-8fa6ff) ![双语](https://img.shields.io/badge/语言-中文%20%7C%20English-success)

---

## ✨ 功能特性 / Features

- 🌐 **中英双语**：右上角按钮一键切换，记住偏好；支持 `?lang=en` 链接参数；首次访问按浏览器语言自动选择
- 📱 **响应式布局**：适配手机、平板、桌面；自动适配系统 **深色 / 浅色模式**
- 📚 **学术板块齐全**：关于我（简介 / 动态 / 研究方向）、教育背景（时间线）、论文发表（含 BibTeX）、荣誉奖项、学术服务、联系方式
- 🚀 **零依赖**：纯 HTML / CSS / 原生 JS，无框架、无外部字体（国内访问不受影响）
- 📄 **内置 CV 下载位**：替换 `assets/files/cv.pdf` 即可

## 📁 目录结构 / Project Structure

```text
.
├── index.html              # 主页全部内容（中英双语都在这一个文件里）
├── assets/
│   ├── css/style.css       # 样式（主题色在顶部 :root 变量中修改）
│   ├── js/main.js          # 语言切换 / 滚动动画
│   ├── img/avatar.svg      # 头像占位图（替换为你的照片）
│   ├── img/favicon.svg     # 浏览器标签页图标
│   └── files/cv.pdf        # 简历占位文件（替换为你的 CV）
├── .nojekyll               # 跳过 GitHub Pages 的 Jekyll 处理
├── .gitignore
├── LICENSE                 # MIT
└── README.md
```

## 🚀 部署到 GitHub Pages / Deploy

> 本仓库已完成 `git init` 和首次提交，从下面第 2 步开始即可。

### 第 1 步：在 GitHub 上新建仓库

登录 [GitHub](https://github.com) → 右上角 **+** → **New repository**，二选一：

| 方式 | 仓库名 | 访问地址 | 说明 |
| --- | --- | --- | --- |
| **用户主页站点（推荐）** | `你的用户名.github.io` | `https://你的用户名.github.io` | 地址最简洁；仓库必须为 **Public** |
| 项目站点 | 任意名字，如 `my-homepage` | `https://你的用户名.github.io/my-homepage/` | 需手动开启 Pages（见第 3 步） |

本站所有路径均为**相对路径**，两种方式都无需修改任何代码。

### 第 2 步：推送代码

在项目目录打开终端执行（把 `<你的用户名>` 和 `<仓库名>` 替换掉）：

```bash
cd E:/github_rep/githubio
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

> 💡 也可以用 GitHub CLI 一条命令完成建仓 + 推送：
> `gh repo create <仓库名> --public --source=. --push`

### 第 3 步：开启 GitHub Pages

- **用户主页站点**（仓库名为 `xxx.github.io`）：推送后**自动发布**，无需设置。
- **项目站点**：进入仓库 **Settings → Pages → Build and deployment**，
  Source 选 **Deploy from a branch**，Branch 选 **main**、目录 **/ (root)**，点击 **Save**。

### 第 4 步：访问

等待 1~2 分钟构建，然后打开 `https://你的用户名.github.io`（或项目地址）即可。✅

### 以后更新内容怎么发布？

编辑文件后执行：

```bash
git add -A
git commit -m "更新个人主页内容"
git push
```

推送后 Pages 会自动重新构建，约 1 分钟后线上生效（页面没变就 **Ctrl + F5** 强制刷新）。

## 🖥️ 本地预览 / Local Preview

任选其一：

- 直接双击 `index.html` 用浏览器打开（最简单）；
- 或在项目目录运行本地服务器：`python -m http.server 8000`，然后访问 <http://localhost:8000>；
- 或使用 VS Code 插件 **Live Server** 右键 "Open with Live Server"。

## ✏️ 修改内容指南 / Content Editing

所有内容都集中在 **`index.html`** 一个文件里，用编辑器打开后搜索对应的板块注释（如 `教育背景`）即可。
需要改文字的地方都标有 `✏️` 注释。

| 想改什么 | 去哪里改 |
| --- | --- |
| 姓名（导航、首屏、页脚） | `index.html` 中搜索 `张三` 全部替换为你的名字；中文在 `class="zh"` 的标签里，英文在 `class="en"` 里 |
| 身份 / 研究方向一句话 | `index.html` 的 `<!-- 首屏个人信息 -->` 区块 |
| 个人简介、近期动态、研究关键词 | `<!-- 关于我 -->` 区块 |
| 教育经历 | `<!-- 教育背景 -->` 区块，复制一个 `<li>...</li>` 即可加一条 |
| 论文 | `<!-- 论文发表 -->` 区块，复制一个 `<article class="pub">...</article>` 即可加一篇 |
| 获奖情况 | `<!-- 荣誉奖项 -->` 区块，复制一个 `<li>...</li>` 即可加一条 |
| 学术服务 | `<!-- 学术服务 -->` 区块 |
| 邮箱 / 学术主页链接 | `hero-links` 区块（`Email`、`Google Scholar`、`ORCID`）和 `联系方式` 区块 |
| 头像 | 用你的照片替换 `assets/img/avatar.svg`（改成 `avatar.jpg` 并同步修改 `index.html` 中的 `src`），推荐方形图 |
| CV 简历 | 用你的简历覆盖 `assets/files/cv.pdf`（保持文件名不变） |
| 标签页图标 | 修改 `assets/img/favicon.svg` 中的字母，或替换整个文件 |
| 浏览器标签页标题 | `<html>` 标签的 `data-title-zh` / `data-title-en` 属性 |
| 主题色 / 配色 | `assets/css/style.css` 顶部 `:root` 中的 `--accent` 等变量 |

### 添加一篇论文的模板

在论文区块复制以下结构并填写（链接可按需删除）：

```html
<article class="pub">
  <div class="pub-title"><span class="zh">中文标题</span><span class="en">English Title</span></div>
  <div class="pub-authors">Coauthor A, <strong>你的名字</strong>, Coauthor B</div>
  <div class="pub-venue">
    <span class="badge">NeurIPS 2026</span>          <!-- 会议/期刊徽章 -->
    <span class="pub-note"><span class="zh">口头报告</span><span class="en">Oral</span></span>  <!-- 可选备注 -->
  </div>
  <div class="pub-links">
    <a href="论文PDF链接">PDF</a>
    <a href="arXiv链接">arXiv</a>
    <a href="代码链接">Code</a>
  </div>
  <details>
    <summary>BibTeX</summary>
<pre>@inproceedings{your2026paper,
  title     = {Paper Title},
  author    = {Your Name and Others},
  booktitle = {NeurIPS},
  year      = {2026}
}</pre>
  </details>
</article>
```

### 上线前检查清单 ✅

- [ ] 全局替换占位姓名「张三 / Zhang San」
- [ ] 替换头像 `assets/img/avatar.svg` → 个人照片
- [ ] 替换邮箱 `your-email@example.com`（出现在两处）
- [ ] 填写 Google Scholar / ORCID / GitHub 等真实链接
- [ ] 替换论文示例条目、获奖条目、教育经历
- [ ] 覆盖 `assets/files/cv.pdf` 为自己的简历
- [ ] 修改 `favicon.svg` 中的首字母
- [ ] 部署后取消 `index.html` 中 `canonical` 注释并核对用户名

## 🌐 双语机制说明 / How Bilingual Works

- 页面里每段文字都写成一对标签：`<span class="zh">中文</span><span class="en">English</span>`，改文字时直接改标签内容即可；
- `assets/css/style.css` 根据 `<html lang="...">` 决定显示哪种语言：`html[lang="zh-CN"]` 时显示 `.zh`、隐藏 `.en`，反之亦然；
- `assets/js/main.js` 负责切换逻辑：右上角按钮点击切换 → 写入 `localStorage` 记住偏好；首次访问按浏览器语言自动选择；
- 支持 URL 参数指定语言，方便分享：`https://你的主页/?lang=en` 或 `?lang=zh`；
- 页面标题 `<title>` 会随语言一起切换（配置在 `<html>` 标签的 `data-title-zh` / `data-title-en` 属性）。

## 🎨 进阶自定义 / Advanced

### 修改主题色

编辑 `assets/css/style.css` 顶部的变量即可，深色模式变量在同文件的 `prefers-color-scheme: dark` 块中：

```css
:root {
  --accent: #3b5bdb;      /* 主题色（链接、徽章、强调元素） */
  --bg: #ffffff;          /* 页面背景 */
  --text: #20242e;        /* 正文颜色 */
}
```

### 绑定自定义域名

1. 在仓库根目录新建文件 `CNAME`，内容写你的域名（如 `www.zhangsan.dev`）；
2. 到你的域名服务商添加解析：`CNAME 记录 → 你的用户名.github.io`；
3. 仓库 **Settings → Pages → Custom domain** 填入域名并保存，勾选 **Enforce HTTPS**。

### 添加访问统计

以不蒜子为例，在 `index.html` 的 `<footer>` 中加入（替换为你的站点地址）：

```html
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<p>本站访问量：<span id="busuanzi_value_site_pv"></span> 次</p>
```

也可使用 Google Analytics：在 `<head>` 中粘贴 GA 给你的 `gtag.js` 代码即可。

### 增删板块

每个板块都是一个独立的 `<section>`。想隐藏某个板块，直接删除该 `<section>`（或给它加上 `hidden` 属性），并同步删除导航里对应的 `<a>` 链接。

## ❓常见问题 / FAQ

<details>
<summary><b>部署后打开是 404？</b></summary>

1. 确认仓库名拼写正确：用户主页站点必须是 `用户名.github.io`（区分大小写）；
2. 项目站点确认已在 Settings → Pages 中开启并选择 main 分支 / (root)；
3. 刚推送后构建需要 1~2 分钟，可在仓库 **Actions** 标签页查看构建进度。
</details>

<details>
<summary><b>页面能打开但样式/图片没有加载？</b></summary>

- Linux 服务器（GitHub Pages）**路径区分大小写**：检查 HTML 中引用的文件名与实际文件名大小写完全一致；
- 浏览器缓存：**Ctrl + F5** 强制刷新。
</details>

<details>
<summary><b>更新后线上页面没变化？</b></summary>

推送后等待约 1 分钟再刷新；若仍无变化，**Ctrl + F5** 清缓存强刷，或在仓库 Actions 页确认构建成功。
</details>

<details>
<summary><b>想让 Google 收录我的主页？</b></summary>

部署后取消 `index.html` 中 `<link rel="canonical">` 的注释并填写真实地址；再到 [Google Search Console](https://search.google.com/search-console) 提交 `https://你的主页/sitemap.xml`（需自行添加一个简单 sitemap 文件，或直接提交主页 URL）。
</details>

<details>
<summary><b>可以只保留中文（或英文）吗？</b></summary>

可以。两种做法：① 删除所有 `<span class="en">...</span>`（或 `class="zh"`）；② 保留双语结构但不想要切换按钮——删除导航里的 `<button id="lang-toggle">` 即可。
</details>

<details>
<summary><b>换一个仓库名/用户名后链接失效？</b></summary>

本站全部使用相对路径（`assets/...`、`#锚点`），换仓库名无需改代码；仅需更新 `index.html` 中 canonical、og:url 等绝对地址注释。
</details>

---

<details>
<summary><b>🇬🇧 English Documentation (click to expand)</b></summary>

### Overview

A zero-build static academic homepage for GitHub Pages. Bilingual (Chinese/English), responsive, dark-mode aware, and organized into About, Education (timeline), Publications (with BibTeX), Awards, Academic Service, and Contact sections.

### Deploy

1. Create a public repo named `<your-username>.github.io` (user site) or any name (project site).
2. Push this project:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo>.git
   git branch -M main
   git push -u origin main
   ```
3. User sites publish automatically; for project sites enable **Settings → Pages → Deploy from a branch → main / (root)**.
4. Visit `https://<your-username>.github.io` (or `.../<repo>/`) after 1–2 minutes.

All asset paths are relative, so both hosting styles work without code changes.

### Editing content

Everything lives in `index.html` — search for the section comments (marked with ✏️). Bilingual text is written as paired spans: `<span class="zh">中文</span><span class="en">English</span>`. Replace the avatar (`assets/img/avatar.svg`), CV (`assets/files/cv.pdf`), favicon letter, and page title attributes (`data-title-zh` / `data-title-en` on the `<html>` tag).

### Language switching

Toggled by the header button, persisted in `localStorage`; first visit follows the browser language; `?lang=en|zh` URL parameter is supported. The mechanism is pure CSS driven by `<html lang="...">` — see `assets/js/main.js`.

### Customization

- Theme colors: CSS variables at the top of `assets/css/style.css` (dark-mode variants in the `prefers-color-scheme: dark` block).
- Custom domain: add a `CNAME` file, configure DNS to `<username>.github.io`, then set it under Settings → Pages.
- To hide a section, remove its `<section>` and the matching nav link.

License: MIT.
</details>

---

💡 如果这个模板对你有帮助，欢迎给仓库点个 Star ⭐
