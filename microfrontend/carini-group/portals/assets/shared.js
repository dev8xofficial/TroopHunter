/**
 * CARINI GROUP — SHARED JAVASCRIPT
 * v3.0 · March 2026
 * Default theme: light
 */

/* ── APPLY THEME IMMEDIATELY (before first paint) ── */
(function () {
  var t = localStorage.getItem("cg-theme") || "light";
  document.documentElement.setAttribute("data-theme", t);
})();

(function () {
  "use strict";

  /* ── PAGE MAP ── */
  const PAGES = [
    { href: "index.html", icon: "⌂", label: "Hub", group: "public" },
    {
      href: "boutique-redesign.html",
      icon: "🌟",
      label: "Home",
      group: "public",
    },
    {
      href: "phase3_property_search.html",
      icon: "🏙",
      label: "Properties",
      group: "public",
    },
    {
      href: "neighbourhood_hub.html",
      icon: "🗺",
      label: "Areas",
      group: "public",
    },
    {
      href: "international_hub.html",
      icon: "🌍",
      label: "Intl",
      group: "public",
    },
    { href: "lead_capture.html", icon: "📝", label: "Leads", group: "public" },
    { href: "phase0_auth.html", icon: "🔐", label: "Sign In", group: "portal" },
    {
      href: "phase1_crm_pipeline.html",
      icon: "👥",
      label: "CRM",
      group: "portal",
    },
    {
      href: "phase2_deal_room.html",
      icon: "📋",
      label: "Deals",
      group: "portal",
    },
    {
      href: "phase2_admin_dashboard.html",
      icon: "⚙",
      label: "Admin",
      group: "portal",
    },
    {
      href: "phase3_dashboards.html",
      icon: "📊",
      label: "Dashboards",
      group: "portal",
    },
    {
      href: "phase3_ai_generator.html",
      icon: "✨",
      label: "AI Tools",
      group: "portal",
    },
    {
      href: "investor_portfolio.html",
      icon: "📈",
      label: "Investor",
      group: "portal",
    },
    {
      href: "outreach_engine.html",
      icon: "📡",
      label: "Outreach",
      group: "portal",
    },
  ];

  /* ── THEME ── */
  function getTheme() {
    return localStorage.getItem("cg-theme") || "light";
  }

  function setTheme(theme) {
    localStorage.setItem("cg-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("cgn-theme-toggle");
    if (btn) {
      btn.textContent = theme === "light" ? "🌙" : "☀";
      btn.title =
        theme === "light" ? "Switch to dark mode" : "Switch to light mode";
    }
  }

  function toggleTheme() {
    document.documentElement.classList.add("theme-transitioning");
    setTheme(getTheme() === "light" ? "dark" : "light");
    setTimeout(function () {
      document.documentElement.classList.remove("theme-transitioning");
    }, 280);
  }

  /* ── INJECT BOTTOM NAV ── */
  function injectNav() {
    const existing = document.getElementById("cg-nav");
    if (existing) existing.remove();

    const cur = window.location.pathname.split("/").pop() || "index.html";
    const theme = getTheme();

    let publicLinks = "";
    let portalLinks = "";

    PAGES.forEach(function (p) {
      const isActive = p.href === cur ? " cgn-active" : "";
      const link = `<a href="${p.href}" class="cgn-link${isActive}" title="${p.label}">${p.icon} ${p.label}</a>`;
      if (p.group === "public") publicLinks += link;
      else portalLinks += link;
    });

    const themeIcon = theme === "light" ? "🌙" : "☀";
    const themeTitle =
      theme === "light" ? "Switch to dark mode" : "Switch to light mode";

    const nav = document.createElement("div");
    nav.id = "cg-nav";
    nav.innerHTML =
      publicLinks +
      `<span class="cgn-sep"></span>` +
      portalLinks +
      `<span class="cgn-spacer"></span>` +
      `<button class="cgn-theme-btn" id="cgn-theme-toggle" title="${themeTitle}">${themeIcon}</button>`

    document.body.appendChild(nav);

    document
      .getElementById("cgn-theme-toggle")
      .addEventListener("click", toggleTheme);

    const activeLink = nav.querySelector(".cgn-active");
    if (activeLink) {
      setTimeout(function () {
        activeLink.scrollIntoView({
          inline: "center",
          block: "nearest",
          behavior: "smooth",
        });
      }, 200);
    }
  }

  /* ── SMOOTH PAGE TRANSITIONS ── */
  function initPageTransitions() {
    document.addEventListener("click", function (e) {
      const link = e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto")
      )
        return;
      if (!href.endsWith(".html")) return;
    });
  }

  /* ── CARD ANIMATION OBSERVER ── */
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;
    const cards = document.querySelectorAll(
      ".module-card, .card, [data-reveal]",
    );
    if (!cards.length) return;

    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    cards.forEach(function (card, i) {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
      obs.observe(card);
    });
  }

  /* ── TOAST UTILITY ── */
  window.CG = window.CG || {};
  window.CG.toast = function (msg, type) {
    type = type || "info";
    const colors = {
      success: "#1a9e5a",
      error: "#d63030",
      info: "#c49a2e",
      warn: "#c47a10",
    };
    const isLight = getTheme() === "light";
    const toast = document.createElement("div");
    toast.style.cssText = [
      "position:fixed",
      "bottom:56px",
      "right:24px",
      "z-index:10000",
      isLight ? "background:#ffffff" : "background:#141210",
      "border:1px solid " + (colors[type] || colors.info),
      isLight ? "color:#1a1510" : "color:#e8e4dc",
      'font-family:"DM Sans",sans-serif',
      "font-size:13px",
      "padding:10px 18px",
      "border-radius:4px",
      isLight
        ? "box-shadow:0 6px 24px rgba(0,0,0,.09)"
        : "box-shadow:0 8px 32px rgba(0,0,0,.6)",
      "animation:toastIn .25s ease both",
      "max-width:320px",
      "line-height:1.4",
    ].join(";");
    toast.textContent = msg;

    const style = document.createElement("style");
    style.textContent =
      "@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}";
    document.head.appendChild(style);
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.transition = "opacity .3s ease";
      toast.style.opacity = "0";
      setTimeout(function () {
        toast.remove();
        style.remove();
      }, 300);
    }, 3000);
  };

  /* ── INIT ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  function boot() {
    injectNav();
    initPageTransitions();
    initScrollReveal();
  }
})();
