/* ============================================================
 * 共享页面行为：侧边栏目录、顶部标题与导航、语言切换、页脚
 * 页面结构参考并改编自 NahidaNahida.github.io（MIT License）
 *
 * 页面只需提供三个占位节点 + 两个脚本：
 *   <div data-site-sidebar></div> <div data-site-header></div>
 *   <div data-site-footer></div>
 *   <script src="site-config.js"></script><script src="site.js"></script>
 * ============================================================ */
(function () {
    "use strict";

    const config = window.SITE_CONFIG || {};
    const html = document.documentElement;
    html.classList.add("js");

    const STORE_KEY = "preferred-lang";
    const currentLang = () => (html.getAttribute("lang") === "en" ? "en" : "zh-CN");
    const pageId = () => document.body.dataset.page || "home";

    /* ---------------- 中英双语切换 ---------------- */

    function applyLang(lang) {
        lang = lang === "en" ? "en" : "zh-CN";
        html.setAttribute("lang", lang);
        const title = lang === "en" ? html.dataset.titleEn : html.dataset.titleZh;
        if (title) document.title = title;
        const btn = document.getElementById("lang-toggle");
        if (btn) btn.textContent = lang === "en" ? "中文" : "EN";
        renderToc(); // 目录文字随语言重新生成（锚点 id 保持不变）
    }

    function initLang() {
        let url = null;
        let saved = null;
        try { url = new URLSearchParams(window.location.search).get("lang"); } catch (e) { /* 忽略 */ }
        try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* 隐私模式下忽略 */ }
        const browser = (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh-CN" : "en";
        applyLang(url || saved || browser || "zh-CN");
    }

    function bindLangToggle() {
        const btn = document.getElementById("lang-toggle");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const next = currentLang() === "en" ? "zh-CN" : "en";
            applyLang(next);
            try { localStorage.setItem(STORE_KEY, next); } catch (e) { /* 忽略 */ }
        });
    }

    /* ---------------- 侧边栏 + 目录 ---------------- */

    function renderSidebar() {
        const sidebar = document.querySelector("[data-site-sidebar]");
        if (!sidebar) return;
        sidebar.id = "sidebar";
        sidebar.innerHTML = `
            <button id="toggle-sidebar" type="button" aria-label="折叠目录 / Toggle contents">☰</button>
            <nav id="toc" aria-label="Table of contents">
                <b><span class="zh">目录</span><span class="en">Contents</span></b>
                <ul id="toc-list"></ul>
            </nav>
        `;
    }

    // 取标题在指定语言下的文字：优先取对应 span，否则取整体文本
    function headingText(heading, lang) {
        const span = heading.querySelector(lang === "en" ? ".en" : ".zh");
        return (span ? span.textContent : heading.textContent).trim();
    }

    function renderToc() {
        const list = document.getElementById("toc-list");
        if (!list) return;
        const lang = currentLang();
        const headings = Array.from(
            document.querySelectorAll("#main-content h2, #main-content h3, #main-content h4")
        );
        list.innerHTML = "";
        headings.forEach((heading) => {
            if (!heading.id) {
                // 锚点 id 以中文标题为基准，保证切换语言后目录链接不失效
                heading.id = headingText(heading, "zh-CN").replace(/\s+/g, "_");
            }
            const li = document.createElement("li");
            li.style.marginLeft =
                heading.tagName === "H2" ? "0px" :
                heading.tagName === "H3" ? "10px" : "20px";
            const a = document.createElement("a");
            a.href = "#" + heading.id;
            a.textContent = headingText(heading, lang);
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    // 滚动时高亮当前所在章节对应的目录项
    function setupTocSpy() {
        const list = document.getElementById("toc-list");
        if (!list) return;
        let clickedId = null;
        let clickedTimer = null;

        const activeId = () => {
            const links = Array.from(list.querySelectorAll("a"));
            let id = links.length ? links[0].getAttribute("href").slice(1) : null;
            links.forEach((link) => {
                const el = document.getElementById(link.getAttribute("href").slice(1));
                if (el && el.getBoundingClientRect().top <= 120) id = el.id;
            });
            return id;
        };
        const setActive = () => {
            const target = clickedId || activeId();
            list.querySelectorAll("a").forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === "#" + target);
            });
        };

        list.addEventListener("click", (event) => {
            const a = event.target.closest("a");
            if (!a) return;
            clickedId = a.getAttribute("href").slice(1);
            setActive();
            clearTimeout(clickedTimer);
            clickedTimer = setTimeout(() => { clickedId = null; }, 700);
        });
        window.addEventListener("scroll", setActive, { passive: true });
        setActive();
    }

    function setupSidebarToggle() {
        const sidebar = document.getElementById("sidebar");
        const toggle = document.getElementById("toggle-sidebar");
        if (!sidebar || !toggle) return;
        toggle.addEventListener("click", () => sidebar.classList.toggle("hidden"));
        // 窄屏默认收起目录，节省阅读空间
        if (window.matchMedia("(max-width: 900px)").matches) {
            sidebar.classList.add("hidden");
        }
    }

    /* ---------------- 顶部标题、链接与导航 ---------------- */

    function renderHeader() {
        const header = document.querySelector("[data-site-header]");
        const profile = config.profile;
        if (!header || !profile) return;
        header.classList.add("header");

        const h1 = document.createElement("h1");
        const nameZh = document.createElement("span");
        nameZh.className = "zh";
        nameZh.textContent = profile.nameZh || "";
        const nameEn = document.createElement("span");
        nameEn.className = "en";
        nameEn.textContent = profile.nameEn || "";
        h1.append(nameZh, nameEn);
        header.appendChild(h1);

        const links = document.createElement("p");
        links.className = "icon-links";
        (profile.links || []).forEach((profileLink, index) => {
            if (index > 0) links.appendChild(document.createTextNode(" | "));
            const a = document.createElement("a");
            a.href = profileLink.href;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            const icon = document.createElement("i");
            icon.className = profileLink.iconClass;
            icon.setAttribute("aria-hidden", "true");
            a.append(icon, document.createTextNode(" " + (profileLink.label || "")));
            links.appendChild(a);
        });
        header.appendChild(links);

        const nav = document.createElement("nav");
        nav.className = "page-nav";
        nav.dataset.siteNav = "";
        header.appendChild(nav);
    }

    function renderNav() {
        const nav = document.querySelector("[data-site-nav]");
        if (!nav || !Array.isArray(config.pages)) return;
        nav.setAttribute("aria-label", "Primary");
        nav.innerHTML = "";
        config.pages.forEach((page) => {
            const a = document.createElement("a");
            a.href = page.href;
            const zh = document.createElement("span");
            zh.className = "zh";
            zh.textContent = page.labelZh || page.label || "";
            const en = document.createElement("span");
            en.className = "en";
            en.textContent = page.labelEn || page.label || "";
            a.append(zh, en);
            if (page.id === pageId()) a.classList.add("active");
            nav.appendChild(a);
        });
        // 语言切换按钮（样式与导航胶囊一致）
        const langBtn = document.createElement("button");
        langBtn.id = "lang-toggle";
        langBtn.type = "button";
        langBtn.className = "lang-toggle";
        langBtn.setAttribute("aria-label", "切换语言 / Switch language");
        nav.appendChild(langBtn);
    }

    /* ---------------- 页脚 ---------------- */

    function renderFooter() {
        const footer = document.querySelector("[data-site-footer]");
        if (!footer || !config.profile) return;
        footer.innerHTML = "";

        const updated = document.createElement("div");
        updated.className = "last-updated";
        const uz = document.createElement("span"); uz.className = "zh"; uz.textContent = "最后更新：";
        const ue = document.createElement("span"); ue.className = "en"; ue.textContent = "Last updated: ";
        const time = document.createElement("span"); time.id = "updated-time"; time.textContent = "…";
        updated.append(uz, ue, time);
        footer.appendChild(updated);

        const visits = config.visits || {};
        if (pageId() === "home" && visits.enabled) {
            const stats = document.createElement("div");
            stats.className = "visitor-stats";
            const vz = document.createElement("span"); vz.className = "zh"; vz.textContent = "访问量：";
            const ve = document.createElement("span"); ve.className = "en"; ve.textContent = "Visits: ";
            stats.append(vz, ve);
            const map = document.createElement("div");
            map.className = "visitor-map";
            footer.append(stats, map);
        }

        const credit = document.createElement("div");
        credit.className = "footer-credit";
        const cz = document.createElement("span"); cz.className = "zh";
        cz.textContent = "© 2026 " + (config.profile.nameZh || "") + " · 由 GitHub Pages 驱动 · 布局参考 ";
        const ce = document.createElement("span"); ce.className = "en";
        ce.textContent = "© 2026 " + (config.profile.nameEn || "") + " · Powered by GitHub Pages · Layout adapted from ";
        const refLink = document.createElement("a");
        refLink.href = "https://github.com/NahidaNahida/NahidaNahida.github.io";
        refLink.target = "_blank";
        refLink.rel = "noopener noreferrer";
        refLink.textContent = "NahidaNahida.github.io (MIT)";
        credit.append(cz, ce, refLink);
        footer.appendChild(credit);
    }

    /* ---------------- 页脚“最后更新”时间 ---------------- */

    function loadLastUpdated() {
        const el = document.getElementById("updated-time");
        const github = config.github;
        if (!el || !github) return;
        fetch(`https://api.github.com/repos/${github.user}/${github.repo}/commits/${github.branch}`)
            .then((response) => response.json())
            .then((commit) => {
                if (commit && commit.commit && commit.commit.author) {
                    const locale = currentLang() === "en" ? "en-US" : "zh-CN";
                    el.textContent = new Date(commit.commit.author.date).toLocaleString(locale);
                } else {
                    el.textContent = "—";
                }
            })
            .catch(() => {
                el.textContent = "—";
            });
    }

    /* ---------------- Google Analytics（可选） ---------------- */

    function loadAnalytics() {
        const analyticsId = config.analytics && config.analytics.googleAnalyticsId;
        if (!analyticsId) return;
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = window.gtag || gtag;
        gtag("js", new Date());
        gtag("config", analyticsId);
    }

    /* ---------------- 首页访客地图（可选，默认关闭） ---------------- */

    function loadVisitorMap() {
        const visits = config.visits || {};
        const mapEl = document.getElementById("visitor-map");
        if (!visits.enabled || !mapEl || mapEl.dataset.initialized === "true") return;
        if (!visits.mapMyVisitorsWidgetUrl) {
            mapEl.textContent = currentLang() === "en"
                ? "Visitor map is temporarily unavailable."
                : "访客地图暂时不可用。";
            return;
        }
        mapEl.dataset.initialized = "true";
        const status = document.createElement("p");
        status.setAttribute("role", "status");
        status.textContent = currentLang() === "en" ? "Loading visitor map..." : "访客地图加载中…";
        mapEl.appendChild(status);
        const script = document.createElement("script");
        script.async = true;
        script.src = visits.mapMyVisitorsWidgetUrl;
        // 提供方按该 id 定位并插入地图组件
        script.id = /map\.js(\?|$)/.test(script.src) ? "mapmyvisitors" : "mmvst_globe";
        script.onload = () => status.remove();
        script.onerror = () => {
            status.textContent = currentLang() === "en"
                ? "Visitor map is temporarily unavailable."
                : "访客地图暂时不可用。";
        };
        mapEl.appendChild(script);
    }

    /* ---------------- 启动 ---------------- */

    const initSite = () => {
        renderSidebar();
        renderHeader();
        renderNav();
        renderFooter();
        initLang();          // 设置语言 → 标题、语言按钮文字、目录
        setupTocSpy();
        setupSidebarToggle();
        bindLangToggle();
        loadLastUpdated();
        loadAnalytics();
        loadVisitorMap();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSite);
    } else {
        initSite();
    }
})();
