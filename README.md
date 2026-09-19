# 🎓 个人学术主页 / Academic Homepage

部署在 **GitHub Pages** 上的纯静态个人学术主页，布局与交互仿照 [NahidaNahida.github.io](https://github.com/NahidaNahida/NahidaNahida.github.io)（MIT License），并在此基础上增加了**中英双语切换**。

> A static academic homepage on **GitHub Pages**. The layout and interactions are modeled after
> [NahidaNahida.github.io](https://github.com/NahidaNahida/NahidaNahida.github.io) (MIT License),
> with a bilingual (中文 / English) layer added on top.

![GitHub Pages](https://img.shields.io/badge/托管-GitHub%20Pages-2a5db0) ![静态站点](https://img.shields.io/badge/类型-纯静态HTML-33a6b8) ![双语](https://img.shields.io/badge/语言-中文%20%7C%20English-success)

线上地址：**https://morningliumengkun.github.io/**

## ✨ 功能特性 / Features

- 📄 **多页面结构**：`index.html`（简介 / 教育 / 学术服务 / 报告 / 资助 / 获奖 / 联系）、`news.html`（近期动态）、`publications.html`（论文发表）
- 🌐 **中英双语**：导航栏"EN / 中文"按钮一键切换；记住偏好；支持 `?lang=en` 链接参数；首次访问按浏览器语言自动选择；页面标题、导航、目录文字随语言一起切换
- 🧭 **侧边栏目录**：自动抓取页面 `h2/h3/h4` 生成目录，滚动时高亮当前章节，可点击 ☰ 折叠（窄屏默认折叠）
- ⚙️ **配置驱动**：个人信息、导航、GitHub 仓库、统计开关集中在 `site-config.js`
- 🏷️ **学术排版**：Palatino 衬线字体、论文 venue / CCF 等级 / 标签三色徽章、共同一作与通讯作者角标、GB/T 7714 风格引用
- 🕒 **页脚自动更新时间**：自动读取仓库最后一次提交时间显示"最后更新"
- 📊 **统计（可选）**：Google Analytics（GA4）与首页访客地球组件，默认关闭
- 🚀 **零构建**：纯 HTML / CSS / 原生 JS，克隆即用

## 📁 目录结构 / Project Structure

```text
.
├── index.html            # 首页：简介、教育背景、学术服务、报告、资助、获奖、联系方式
├── news.html             # 近期动态（按时间倒序）
├── publications.html     # 论文发表（按年份分组 + 徽章 + 引用格式）
├── style.css             # 共享样式：布局、排版、侧边栏、导航、徽章、页脚
├── site-config.js        # 共享配置：个人链接、导航、GitHub 信息、统计开关
├── site.js               # 共享行为：侧边栏目录、顶部标题与导航、语言切换、页脚
├── assets/
│   ├── img/favicon.svg   # 浏览器标签页图标
│   └── files/cv.pdf      # 简历占位文件（在 site-config.js 中开启 CV 链接后使用）
├── .nojekyll             # 跳过 GitHub Pages 的 Jekyll 处理
├── LICENSE               # MIT
└── README.md
```

## 🚀 更新与发布 / Deploy

本仓库 `Morningliumengkun.github.io` 已创建并完成首次部署（用户主页站点，推送后自动发布）。

### 修改内容后发布

```bash
git add -A
git commit -m "更新个人主页内容"
git push
```

推送后 Pages 自动重新构建，约 1 分钟生效（没变化就 **Ctrl + F5** 强刷）。

> ⚠️ 注意：如果改了 `style.css` / `site.js` / `site-config.js`，请同步把三个 HTML 页面里引用处的 `?v=20260919-1` 版本号改掉（任意新值即可），避免访客浏览器使用旧缓存。

### 从零部署到另一个仓库（备查）

1. 在 GitHub 新建仓库，推荐命名为 `<你的用户名>.github.io`（用户主页站点，访问地址最简洁），或任意名字（项目站点，需在 Settings → Pages → Deploy from a branch → main / (root) 手动开启）；
2. 推送代码：
   ```bash
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git branch -M main
   git push -u origin main
   ```
3. 等待 1~2 分钟后访问 `https://<你的用户名>.github.io/`。

本站全部使用相对路径，两种站点类型都无需修改代码。

## 🖥️ 本地预览 / Local Preview

任选其一：

- 直接双击 `index.html`（最简单）；
- 或在项目目录运行 `python -m http.server 8000`，访问 <http://localhost:8000>；
- 或使用 VS Code 插件 **Live Server**。

> 推荐用本地服务器预览：语言偏好、页脚更新时间等功能依赖 `localStorage` / API，`file://` 直开时部分浏览器行为略有差异。

## ✏️ 修改内容指南 / Content Editing

所有正文内容都在三个 HTML 页面里，需要修改的地方都标有 `✏️` 注释；个人信息类配置集中在 `site-config.js`。

| 想改什么 | 去哪里改 |
| --- | --- |
| 姓名（顶部大标题、页脚） | `site-config.js` 的 `profile.nameZh` / `profile.nameEn` |
| GitHub / Google Scholar / ORCID / CV 链接 | `site-config.js` 的 `profile.links`（每个链接用 Font Awesome 图标类） |
| 导航页面名称与顺序 | `site-config.js` 的 `pages` 数组 |
| 个人简介 | `index.html` 顶部 `✏️ 修改这里：个人简介` 处 |
| 教育背景 | `index.html` 的 `教育背景` 区块，复制 `<li>` 增加一条 |
| 审稿经历 / 学术报告 / 资助 / 获奖 | `index.html` 对应区块 |
| 联系邮箱 | `index.html` 的 `联系方式` 区块（两处） |
| 近期动态 | `news.html`，复制 `<h3> + <ul>` 增加一组 |
| 论文列表 | `publications.html`，复制 `<li>` 增加一篇（见下方模板） |
| 页脚"最后更新" | 自动读取 `site-config.js` 中 `github` 仓库的提交时间，无需手动维护 |
| 标签页图标 | 修改 `assets/img/favicon.svg` 中的首字母 |
| 主题色 | `style.css`：链接 `#2a5db0`、venue 徽章 `#33a6b8`、等级徽章 `#a83232`、标签徽章 `#7e4db3` |
| 字体 | `style.css` 顶部 `body` 与 `html[lang="zh-CN"] body` 的 font-family |

### 添加一篇论文的模板

在 `publications.html` 对应年份的 `<ul>` 中复制以下结构（按时间倒序）：

```html
<li>
    <!-- 徽章：venue=会议/期刊(青色)，rank=分区等级(红色)，tag=备注(紫色)，均可按需增删 -->
    <span class="pub-badges"><span class="venue">CVPR</span><span class="rank">CCF-A</span><span class="tag">Oral</span></span>
    <!-- 作者：加粗自己；<sup> 角标可选：note-cofirst=共同一作，note-corresponding=通讯作者 -->
    Alice Chen<sup class="author-note note-cofirst"></sup>,
    <b>Zhang San</b><sup class="author-note note-cofirst"></sup>,
    Carol Wang<sup class="author-note note-corresponding"></sup>.
    <!-- 标题：中文在 class="zh"，英文在 class="en"；[C]=会议，[J]=期刊 -->
    <i><span class="zh">中文标题</span><span class="en">English Title</span></i>[C]
    //Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR). 2026.
    <a href="论文链接">[Paper]</a>
    <a href="代码链接">[Code]</a>
</li>
```

### 添加一个新页面

1. 复制 `news.html` 作为模板，改文件名（如 `projects.html`）；
2. 把 `<body data-page="news">` 改为唯一 id，如 `<body data-page="projects">`；
3. 保留页面中的共享占位节点：`<div data-site-sidebar></div>`、`<div data-site-header></div>`、`<div data-site-footer></div>`，以及末尾的 `site-config.js`、`site.js` 两个 `<script>`；
4. 在 `site-config.js` 的 `pages` 数组中加一行，即可出现在顶部导航：
   ```js
   { id: "projects", labelZh: "项目", labelEn: "Projects", href: "projects.html" },
   ```

## 🌐 双语机制说明 / How Bilingual Works

- 页面里每段文字都是一对标签：`<span class="zh">中文</span><span class="en">English</span>`，修改时直接改标签内容；
- `style.css` 根据 `<html lang="...">` 决定显示哪种语言（`html[lang="zh-CN"]` 时显示 `.zh`、隐藏 `.en`，反之亦然），整页无刷新切换；
- `site.js` 负责切换逻辑：点击导航栏"EN / 中文"按钮 → 更新 `html[lang]` → 写入 `localStorage` 记住偏好；首次访问按浏览器语言自动选择；支持 `?lang=en|zh` 链接参数（跨页面跳转时按 `config.pages` 的 `href` 传参也可以）；
- 切换语言时同步更新：页面标题 `<title>`（来自 `<html>` 的 `data-title-zh` / `data-title-en`）、导航胶囊文字、侧边栏目录文字。目录锚点 id 以中文标题为基准生成，切换语言后链接不失效。

## 📊 访问统计（可选）/ Analytics (Optional)

- **Google Analytics**：在 `site-config.js` 的 `analytics.googleAnalyticsId` 填入 GA4 衡量 ID（形如 `G-XXXXXXXXXX`）即启用；
- **首页访客地球**：在 [MapMyVisitors](https://mapmyvisitors.com) 生成属于本站的脚本地址，填入 `visits.mapMyVisitorsWidgetUrl` 并把 `visits.enabled` 改为 `true`；只在首页页脚显示。

## ❓常见问题 / FAQ

<details>
<summary><b>改了 CSS/JS 后访客看到的还是旧样式？</b></summary>

把三个 HTML 页面引用处的 `?v=20260919-1` 统一改成新值（如 `?v=20260920-1`），并 Ctrl + F5 验证。
</details>

<details>
<summary><b>页面能打开但图标（GitHub 小猫等）不显示？</b></summary>

图标来自 cdnjs 与 jsDelivr 的 Font Awesome / Academicons。检查网络是否可访问这两个 CDN；也可把 CSS 下载到 `assets/` 本地引用。
</details>

<details>
<summary><b>页脚"最后更新"一直显示省略号？</b></summary>

该功能通过 GitHub REST API 读取提交时间，匿名请求有限流（60 次/小时/IP），稍后刷新即可；本地 `file://` 打开时也可能被浏览器拦截，用本地服务器预览。
</details>

<details>
<summary><b>想只保留中文（或英文）？</b></summary>

删除所有 `<span class="en">...</span>`（或 `class="zh"`）即可；并可在 `site.js` 的 `initLang` 中把默认语言固定。
</details>

<details>
<summary><b>部署后打开是 404 / 更新没生效？</b></summary>

确认仓库名是 `用户名.github.io` 且为 Public；项目站点需在 Settings → Pages 选择 main 分支 / (root) 开启；构建需 1~2 分钟，可在仓库 Actions 页查看进度；强刷 Ctrl + F5。
</details>

## 🙏 致谢与许可 / Credits & License

- 布局、交互与视觉风格参考并改编自 [NahidaNahida.github.io](https://github.com/NahidaNahida/NahidaNahida.github.io)（© Yuechen Li，MIT License），感谢原作者的开源分享；
- 本仓库代码同样以 [MIT](LICENSE) 协议开源；页面内容（姓名、论文、获奖等）归站点所有者所有。

---

💡 参考仓库还有一套基于 Cloudflare Worker + KV 的自托管访问计数方案（`workers/` 目录），需要单独部署 Cloudflare，暂未包含；如需要可以后续补上。
