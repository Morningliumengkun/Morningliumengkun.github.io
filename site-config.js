/* ============================================================
 * 站点配置：个人链接、导航、GitHub 信息、统计开关都在这里改
 * （改动后建议同步更新各页面里 style.css / site.js 的 ?v= 版本号以强刷缓存）
 * ============================================================ */
window.SITE_CONFIG = {
    // 资源版本号：更新 CSS/JS 后改一下，可让访客浏览器强制刷新缓存
    assetsVersion: "20260919-1",

    profile: {
        // 首页大标题：中文模式显示 nameZh，英文模式显示 nameEn
        nameZh: "张三",
        nameEn: "Zhang San",
        links: [
            { label: "GitHub", href: "https://github.com/Morningliumengkun", iconClass: "fab fa-github" },
            { label: "Google Scholar", href: "https://scholar.google.com/citations?user=YOUR_ID", iconClass: "fab fa-google" },
            { label: "ORCID", href: "https://orcid.org/YOUR_ORCID", iconClass: "fab fa-orcid" },
            // ✏️ 需要在导航展示简历时，取消注释（并先替换 assets/files/cv.pdf）
            // { label: "CV", href: "assets/files/cv.pdf", iconClass: "fas fa-file-pdf" },
        ]
    },

    // 用于页脚“最后更新”时间：自动读取本仓库最后一次提交时间
    github: {
        user: "Morningliumengkun",
        repo: "Morningliumengkun.github.io",
        branch: "main"
    },

    // Google Analytics（GA4）：填入 "G-XXXXXXXXXX" 即启用
    analytics: {
        googleAnalyticsId: ""
    },

    // 首页访客地图（MapMyVisitors 小地球），默认关闭
    visits: {
        enabled: false,
        // 在 https://mapmyvisitors.com 生成属于本站的脚本地址后再填入
        mapMyVisitorsWidgetUrl: "",
        mapMyVisitorsStatsUrl: ""
    },

    // 顶部导航：新增页面时在这里加一行即可出现在导航里
    pages: [
        { id: "home", labelZh: "首页", labelEn: "Home", href: "index.html" },
        { id: "news", labelZh: "动态", labelEn: "News", href: "news.html" },
        { id: "publications", labelZh: "论文", labelEn: "Publications", href: "publications.html" }
    ]
};
