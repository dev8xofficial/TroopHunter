(function () {
  document.documentElement.setAttribute("data-theme", "light");
})();

(function () {
  "use strict";

  const PAGES = [
    { href: "index.html", icon: "&#8962;", label: "Hub", group: "public" },
    {
      href: "boutique-redesign.html",
      icon: "&#10022;",
      label: "Home",
      group: "public",
    },
    {
      href: "phase3_property_search.html",
      icon: "&#127970;",
      label: "Properties",
      group: "public",
    },
    {
      href: "neighbourhood_hub.html",
      icon: "&#128506;",
      label: "Areas",
      group: "public",
    },
    {
      href: "international_hub.html",
      icon: "&#127757;",
      label: "Intl",
      group: "public",
    },
    {
      href: "lead_capture.html",
      icon: "&#128221;",
      label: "Leads",
      group: "public",
    },
    {
      href: "phase0_auth.html",
      icon: "&#128274;",
      label: "Sign In",
      group: "portal",
    },
    {
      href: "phase1_crm_pipeline.html",
      icon: "&#128101;",
      label: "CRM",
      group: "portal",
    },
    {
      href: "phase2_deal_room.html",
      icon: "&#128203;",
      label: "Deals",
      group: "portal",
    },
    {
      href: "phase2_admin_dashboard.html",
      icon: "&#9881;",
      label: "Admin",
      group: "portal",
    },
    {
      href: "phase3_dashboards.html",
      icon: "&#128202;",
      label: "Dashboards",
      group: "portal",
    },
    {
      href: "phase3_ai_generator.html",
      icon: "&#10024;",
      label: "AI Tools",
      group: "portal",
    },
    {
      href: "investor_portfolio.html",
      icon: "&#128200;",
      label: "Investor",
      group: "portal",
    },
    {
      href: "outreach_engine.html",
      icon: "&#128226;",
      label: "Outreach",
      group: "portal",
    },
  ];

  const REVEAL_SELECTOR = [
    ".module-card",
    ".panel",
    ".s-card",
    ".listing-card",
    ".tool-panel",
    ".qopt",
    ".role-opt",
    ".card",
    "[data-reveal]",
  ].join(", ");

  function getCurrentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function getPageMeta(currentPage) {
    return (
      PAGES.find(function (page) {
        return page.href === currentPage;
      }) || null
    );
  }

  function applyPageMeta() {
    const body = document.body;
    if (!body) return;

    const currentPage = getCurrentPage();
    const meta = getPageMeta(currentPage);
    const pageName = currentPage.replace(/\.html$/i, "");

    body.dataset.page = pageName;
    body.dataset.pageGroup = meta ? meta.group : "misc";
  }

  function injectNav() {
    const body = document.body;
    if (!body) return;

    const existing = document.getElementById("cg-nav");
    if (existing) existing.remove();

    const currentPage = getCurrentPage();
    let publicLinks = "";
    let portalLinks = "";

    PAGES.forEach(function (page) {
      const isActive = page.href === currentPage ? " cgn-active" : "";
      const link =
        '<a href="' +
        page.href +
        '" class="cgn-link' +
        isActive +
        '" title="' +
        page.label +
        '">' +
        "<span>" +
        page.icon +
        "</span>" +
        "<span>" +
        page.label +
        "</span>" +
        "</a>";

      if (page.group === "public") {
        publicLinks += link;
      } else {
        portalLinks += link;
      }
    });

    const nav = document.createElement("div");
    nav.id = "cg-nav";
    nav.setAttribute("aria-label", "Carini Group page navigation");
    nav.innerHTML =
      publicLinks +
      '<span class="cgn-sep" aria-hidden="true"></span>' +
      portalLinks +
      '<span class="cgn-spacer" aria-hidden="true"></span>';

    body.appendChild(nav);

    const activeLink = nav.querySelector(".cgn-active");
    if (activeLink) {
      window.setTimeout(function () {
        activeLink.scrollIntoView({
          inline: "center",
          block: "nearest",
          behavior: "smooth",
        });
      }, 120);
    }
  }

  function initPageTransitions() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("#") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:")
      ) {
        return;
      }

      const target = href.split("#")[0];
      if (!target || !target.endsWith(".html")) return;

      event.preventDefault();
      document.body.classList.add("page-exit");
      window.setTimeout(function () {
        window.location.href = href;
      }, 200);
    });
  }

  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;

    const revealTargets = Array.prototype.slice.call(
      document.querySelectorAll(REVEAL_SELECTOR),
    ).filter(function (node) {
      return !node.dataset.cgRevealReady;
    });

    if (!revealTargets.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    revealTargets.forEach(function (target, index) {
      target.dataset.cgRevealReady = "true";
      target.style.opacity = "0";
      target.style.transform = "translateY(18px)";
      target.style.transition =
        "opacity 0.38s ease " +
        index * 0.035 +
        "s, transform 0.38s ease " +
        index * 0.035 +
        "s";
      observer.observe(target);
    });
  }

  function ensureToastKeyframes() {
    if (document.getElementById("cg-toast-style")) return;

    const style = document.createElement("style");
    style.id = "cg-toast-style";
    style.textContent =
      "@keyframes cgToastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}";
    document.head.appendChild(style);
  }

  function createToast(message, type) {
    ensureToastKeyframes();

    const tone = type || "info";
    const colors = {
      success: "#1a9e5a",
      error: "#d63030",
      info: "#c49a2e",
      warn: "#c47a10",
    };

    const toast = document.createElement("div");
    toast.style.cssText = [
      "position:fixed",
      "right:20px",
      "bottom:78px",
      "z-index:10001",
      "max-width:340px",
      "padding:12px 16px",
      "border-radius:8px",
      "background:rgba(255,255,255,0.96)",
      "color:#1a1510",
      "font-family:\"DM Sans\",sans-serif",
      "font-size:13px",
      "line-height:1.45",
      "border:1px solid " + (colors[tone] || colors.info),
      "box-shadow:0 18px 40px rgba(17,12,4,0.16)",
      "backdrop-filter:blur(16px) saturate(1.15)",
      "animation:cgToastIn .22s ease both",
    ].join(";");
    toast.textContent = message;
    document.body.appendChild(toast);

    window.setTimeout(function () {
      toast.style.transition = "opacity .22s ease, transform .22s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      window.setTimeout(function () {
        toast.remove();
      }, 240);
    }, 2800);
  }

  function initToastApi() {
    window.CG = window.CG || {};
    window.CG.toast = createToast;

    if (typeof window.showToast !== "function") {
      window.showToast = function (message, type) {
        createToast(message, type);
      };
    }
  }

  function boot() {
    applyPageMeta();
    injectNav();
    initPageTransitions();
    initScrollReveal();
    initToastApi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
