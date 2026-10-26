(() => {
  const stylesheet = `
    cv-site-header, cv-site-footer { display: block; }
    cv-site-header { position: sticky; top: 0; z-index: 1000; }
    .site-header { border-bottom: 1px solid #dce5e0; background: rgba(250,252,250,.96); box-shadow: 0 3px 14px rgba(27,54,45,.04); backdrop-filter: blur(12px); }
    .site-header-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; max-width: 1320px; min-height: 68px; margin: 0 auto; padding: 10px 28px; }
    .site-brand { display: inline-flex; align-items: center; gap: 10px; color: #203b34; font: 800 1.2rem/1.2 "DM Sans", "Noto Sans Arabic", sans-serif; text-decoration: none; white-space: nowrap; }
    .site-brand-mark { display: inline-grid; width: 38px; height: 38px; place-items: center; border-radius: 8px; background: #176b5b; color: #fff; font-size: 1.1rem; }
    .site-brand-light { color: #176b5b; }
    .site-nav { display: flex; flex: 1; align-items: center; justify-content: center; gap: 6px; }
    .site-nav a { padding: 8px 12px; border-radius: 6px; color: #52645c; font: 600 .9rem/1.4 "DM Sans", "Noto Sans Arabic", sans-serif; text-decoration: none; }
    .site-nav a:hover, .site-nav a.active { background: #e5f1ec; color: #145d50; }
    .site-actions { display: flex; align-items: center; gap: 8px; }
    .site-action { display: inline-grid; width: 38px; height: 38px; place-items: center; padding: 0; border: 1px solid #dce5e0; border-radius: 7px; background: #fff; color: #52645c; font: 700 .9rem "DM Sans", "Noto Sans Arabic", sans-serif; cursor: pointer; }
    .site-action:hover { border-color: #9fc6b8; background: #e9f3ee; color: #145d50; }
    .site-footer { border-top: 1px solid #dce5e0; background: #edf3ef; color: #65736e; }
    .site-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; max-width: 1320px; margin: 0 auto; padding: 20px 28px; }
    .site-footer .site-brand { font-size: 1rem; }
    .site-footer .site-brand-mark { width: 30px; height: 30px; font-size: .9rem; }
    .site-footer-nav { display: flex; flex-wrap: wrap; gap: 18px; }
    .site-footer-nav a { color: #52645c; font-size: .86rem; text-decoration: none; }
    .site-footer-nav a:hover { color: #176b5b; }
    .site-copyright { color: #65736e; font-size: .8rem; }
    body.dark .site-header { border-color: rgba(220,237,228,.1); background: rgba(21,29,26,.96); }
    body.dark .site-brand { color: #eef5f1; }
    body.dark .site-brand-light { color: #81c7b2; }
    body.dark .site-nav a { color: #c4d3cc; }
    body.dark .site-nav a:hover, body.dark .site-nav a.active { background: rgba(91,174,148,.16); color: #a3d8c6; }
    body.dark .site-action { border-color: rgba(220,237,228,.16); background: #202b26; color: #d4e3dc; }
    body.dark .site-action:hover { background: #294237; color: #fff; }
    body.dark .site-footer { border-color: rgba(220,237,228,.1); background: #111815; }
    body.dark .site-footer-nav a, body.dark .site-copyright { color: #adbbb4; }
    body.dark .site-footer-nav a:hover { color: #a3d8c6; }
    [dir="rtl"] .site-nav, [dir="rtl"] .site-footer-nav { direction: rtl; }
    @media (max-width: 680px) {
      .site-header-inner { flex-wrap: wrap; gap: 8px; padding: 10px 14px; }
      .site-brand { font-size: 1.08rem; }
      .site-brand-mark { width: 34px; height: 34px; }
      .site-actions { margin-inline-start: auto; }
      .site-nav { order: 3; flex: 0 0 100%; justify-content: space-between; gap: 3px; }
      .site-nav a { padding: 8px 10px; font-size: .82rem; }
      .site-footer-inner { flex-direction: column; align-items: flex-start; gap: 13px; padding: 20px 16px; }
      .site-footer-nav { gap: 14px; }
    }
  `;

  if (!document.getElementById("site-chrome-styles")) {
    const style = document.createElement("style");
    style.id = "site-chrome-styles";
    style.textContent = stylesheet;
    document.head.append(style);
  }

  function translate(key, _lang) {
    if (typeof window.cvSiteTranslate === "function")
      return window.cvSiteTranslate(key);
    if (typeof window.t === "function") return window.t(key);
    return key;
  }

  function linksFor(element) {
    const base = element.getAttribute("base") || "/";
    const app = base.endsWith(".html") ? base : `${base}index.html`;
    return {
      home: base.endsWith(".html") ? `${app}#/` : `${base}#/`,
      builder: base.endsWith(".html") ? `${app}#/builder` : `${base}#/builder`,
      templates: base.endsWith(".html")
        ? `${app}#/templates`
        : `${base}#/templates`,
      account: base.endsWith(".html")
        ? `${app}#/account`
        : `${base}#/account`,
    };
  }

  class CvSiteHeader extends HTMLElement {
    static get observedAttributes() {
      return ["lang", "theme", "base"];
    }

    connectedCallback() {
      if (!this.hasAttribute("lang"))
        this.setAttribute(
          "lang",
          localStorage.getItem("lang") || document.documentElement.lang || "en",
        );
      if (!this.hasAttribute("theme"))
        this.setAttribute("theme", localStorage.getItem("theme") || "light");
      this._languageChange = (event) =>
        this.setAttribute("lang", event.detail.lang);
      window.addEventListener("languagechange", this._languageChange);
      this.render();
    }

    disconnectedCallback() {
      window.removeEventListener("languagechange", this._languageChange);
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const lang = this.getAttribute("lang") === "ar" ? "ar" : "en";
      const theme = this.getAttribute("theme") || "light";
      const links = linksFor(this);
      const standaloneTemplates = location.pathname.includes("/templates/");
      const activeBuilder = location.hash.includes("/builder");
      const activeTemplates =
        standaloneTemplates || location.hash.includes("/templates");
      const activeAccount = location.hash.includes("/account");
      const t = (key) => translate(key, lang);
      const icon = theme === "dark" ? "bi-sun" : "bi-moon-stars";

      this.innerHTML = `
        <header class="site-header">
          <div class="site-header-inner">
            <a class="site-brand" href="${links.home}" aria-label="${t("homeBrand")}">
              <span class="site-brand-mark"><i class="bi bi-file-earmark-person"></i></span>
              <span>CV<span class="site-brand-light">Master</span></span>
            </a>
            <nav class="site-nav" aria-label="${t("mainNavigation")}">
              <a href="${links.home}" class="${!activeBuilder && !activeTemplates && !activeAccount ? "active" : ""}">${t("home")}</a>
              <a href="${links.builder}" class="${activeBuilder ? "active" : ""}">${t("buildCv")}</a>
              <a href="${links.templates}" class="${activeTemplates ? "active" : ""}">${t("templates")}</a>
              <a href="${links.account}" class="${activeAccount ? "active" : ""}">${t("account")}</a>
            </nav>
            <div class="site-actions">
              <button class="site-action" type="button" data-action="language" aria-label="${t("changeLanguage")}" title="${t("changeLanguage")}">${lang === "ar" ? "EN" : "ع"}</button>
              <button class="site-action" type="button" data-action="theme" aria-label="${t("toggleTheme")}" title="${t("toggleTheme")}"><i class="bi ${icon}"></i></button>
            </div>
          </div>
        </header>
      `;

      this.querySelector('[data-action="language"]').addEventListener(
        "click",
        () => {
          const nextLang = lang === "ar" ? "en" : "ar";
          if (typeof window.cvSiteSetLanguage === "function")
            window.cvSiteSetLanguage(nextLang);
          else if (typeof window.setLanguage === "function")
            window.setLanguage(nextLang);
          else localStorage.setItem("lang", nextLang);
          this.setAttribute("lang", nextLang);
        },
      );

      this.querySelector('[data-action="theme"]').addEventListener(
        "click",
        () => {
          const nextTheme = theme === "dark" ? "light" : "dark";
          if (typeof window.cvSiteSetTheme === "function") {
            window.cvSiteSetTheme(nextTheme);
          } else {
            localStorage.setItem("theme", nextTheme);
            document.body.classList.toggle("dark", nextTheme === "dark");
          }
          this.setAttribute("theme", nextTheme);
        },
      );
    }
  }

  class CvSiteFooter extends HTMLElement {
    static get observedAttributes() {
      return ["lang", "base"];
    }

    connectedCallback() {
      if (!this.hasAttribute("lang"))
        this.setAttribute(
          "lang",
          localStorage.getItem("lang") || document.documentElement.lang || "en",
        );
      this._languageChange = (event) =>
        this.setAttribute("lang", event.detail.lang);
      window.addEventListener("languagechange", this._languageChange);
      this.render();
    }

    disconnectedCallback() {
      window.removeEventListener("languagechange", this._languageChange);
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const lang = this.getAttribute("lang") === "ar" ? "ar" : "en";
      const links = linksFor(this);
      const t = (key) => translate(key, lang);

      this.innerHTML = `
        <footer class="site-footer">
          <div class="site-footer-inner">
            <a class="site-brand" href="${links.home}" aria-label="${t("homeBrand")}">
              <span class="site-brand-mark"><i class="bi bi-file-earmark-person"></i></span>
              <span>CV<span class="site-brand-light">Master</span></span>
            </a>
            <nav class="site-footer-nav" aria-label="${t("mainNavigation")}">
              <a href="${links.home}">${t("home")}</a>
              <a href="${links.builder}">${t("buildCv")}</a>
              <a href="${links.templates}">${t("templates")}</a>
              <a href="${links.account}">${t("account")}</a>
            </nav>
            <span class="site-copyright">&copy; ${new Date().getFullYear()} CV Master. ${t("footerRights")}</span>
          </div>
        </footer>
      `;
    }
  }

  if (!customElements.get("cv-site-header"))
    customElements.define("cv-site-header", CvSiteHeader);
  if (!customElements.get("cv-site-footer"))
    customElements.define("cv-site-footer", CvSiteFooter);
})();
