/* ============================================================
 * 个人学术主页交互脚本
 *  1) 中英文切换：右上角按钮 / ?lang=en 参数 / localStorage 记忆
 *     首次访问按浏览器语言自动选择（zh* -> 中文，其他 -> English）
 *  2) 滚动入场动画
 * ============================================================ */
(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.add("js");

  var STORE_KEY = "preferred-lang";

  function currentLang() {
    return html.getAttribute("lang") === "en" ? "en" : "zh-CN";
  }

  /* 切换语言：改 html[lang] 即可驱动 CSS 显隐所有 .zh / .en 文本 */
  function setLang(lang, remember) {
    lang = lang === "en" ? "en" : "zh-CN";
    html.setAttribute("lang", lang);
    document.title = lang === "en"
      ? (html.getAttribute("data-title-en") || document.title)
      : (html.getAttribute("data-title-zh") || document.title);
    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = lang === "en" ? "中文" : "EN";
    }
    if (remember) {
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* 隐私模式下忽略 */ }
    }
  }

  /* 初始语言优先级：URL 参数 > 本地记忆 > 浏览器语言 > 中文 */
  var urlLang = null;
  try { urlLang = new URLSearchParams(window.location.search).get("lang"); } catch (e) {}
  var savedLang = null;
  try { savedLang = localStorage.getItem(STORE_KEY); } catch (e) {}
  var browserLang = (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh-CN" : "en";
  setLang(urlLang || savedLang || browserLang || "zh-CN", false);

  var toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      setLang(currentLang() === "en" ? "zh-CN" : "en", true);
    });
  }

  /* 滚动入场动画：元素进入视口后加 .visible */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();
