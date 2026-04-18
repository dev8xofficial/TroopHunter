const roleProfiles = {
  OW: {
    code: "OW",
    label: "Department Owner",
    departmentLabel: "Insurance",
    write: ["insurance", "shared"],
    description: "Reads all departments, writes the owned department, limited admin.",
  },
  IA: {
    code: "IA",
    label: "Insurance Agent",
    departmentLabel: "Insurance",
    write: ["insurance", "shared"],
    description: "Insurance-scoped edits with cross-department read visibility.",
  },
  ML: {
    code: "ML",
    label: "Mortgage Liaison",
    departmentLabel: "Mortgage",
    write: ["mortgage", "shared"],
    description: "Mortgage-scoped editing with Arive-linked exception review.",
  },
  RA: {
    code: "RA",
    label: "Real Estate Agent",
    departmentLabel: "Real Estate",
    write: ["real_estate", "shared"],
    description: "Real-estate-scoped edits with transaction and closing focus.",
  },
  PA: {
    code: "PA",
    label: "Platform Administrator",
    departmentLabel: "Shared",
    write: ["insurance", "mortgage", "real_estate", "admin", "shared"],
    description: "Full cross-department write access, governance, and connector management.",
  },
};

const routeFallback = "dashboard";
const storageKey = "burkes-crm-template-role";

const body = document.body;
const backdrop = document.querySelector("[data-interface-backdrop]");
const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const roleSelect = document.querySelector("[data-role-select]");
const navLinks = [...document.querySelectorAll("[data-route-link]")];
const screens = [...document.querySelectorAll("[data-screen-route]")];
const overlays = [...document.querySelectorAll("[data-overlay-id]")];
const tabButtons = [...document.querySelectorAll("[data-tab-group][data-tab-target]")];

let activeOverlayId = null;

function normalizeRoute(hash) {
  const route = hash.replace(/^#/, "").trim();
  if (!route) return routeFallback;
  return screens.some((screen) => screen.dataset.screenRoute === route) ? route : routeFallback;
}

function setButtonDisabled(element, disabled) {
  element.classList.toggle("is-disabled", disabled);
  element.setAttribute("aria-disabled", String(disabled));
  if (disabled) {
    element.setAttribute("tabindex", "-1");
  } else {
    element.removeAttribute("tabindex");
  }
}

function setActiveRoute(route) {
  screens.forEach((screen) => {
    const active = screen.dataset.screenRoute === route;
    screen.classList.toggle("is-active", active);
    screen.setAttribute("aria-hidden", String(!active));
  });

  navLinks.forEach((link) => {
    const active = link.dataset.routeLink === route;
    link.classList.toggle("is-active", active);
  });
}

function syncBackdrop() {
  if (!backdrop) return;
  const visible = body.classList.contains("nav-open") || body.classList.contains("overlay-open");
  backdrop.classList.toggle("is-open", visible);
  backdrop.setAttribute("aria-hidden", String(!visible));
}

function closeNavigation() {
  body.classList.remove("nav-open");
  syncBackdrop();
}

function openNavigation() {
  body.classList.add("nav-open");
  syncBackdrop();
}

function closeOverlay(targetId = activeOverlayId) {
  if (!targetId) return;
  const overlay = overlays.find((item) => item.dataset.overlayId === targetId);
  if (overlay) {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
  }
  activeOverlayId = null;
  body.classList.remove("overlay-open");
  syncBackdrop();
}

function openOverlay(targetId) {
  const overlay = overlays.find((item) => item.dataset.overlayId === targetId);
  if (!overlay) return;
  closeOverlay();
  closeNavigation();
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  activeOverlayId = targetId;
  body.classList.add("overlay-open");
  syncBackdrop();
}

function handleRouteChange() {
  const route = normalizeRoute(window.location.hash);
  if (`#${route}` !== window.location.hash) {
    history.replaceState(null, "", `#${route}`);
  }
  setActiveRoute(route);
}

function handleTabChange(group, target) {
  document.querySelectorAll(`[data-tab-group="${group}"][data-tab-target]`).forEach((button) => {
    const active = button.dataset.tabTarget === target;
    button.classList.toggle("is-active", active);
  });

  document.querySelectorAll(`[data-tab-group="${group}"][data-tab-panel]`).forEach((panel) => {
    const active = panel.dataset.tabPanel === target;
    panel.classList.toggle("is-active", active);
    panel.setAttribute("aria-hidden", String(!active));
  });
}

function initializeTabs() {
  const groups = new Set(tabButtons.map((button) => button.dataset.tabGroup));
  groups.forEach((group) => {
    const first = document.querySelector(`[data-tab-group="${group}"][data-tab-target]`);
    if (first) handleTabChange(group, first.dataset.tabTarget);
  });
}

function applyRoleState(roleCode) {
  const profile = roleProfiles[roleCode] || roleProfiles.OW;

  document.querySelectorAll("[data-session-role-label]").forEach((node) => {
    node.textContent = profile.label;
  });
  document.querySelectorAll("[data-session-department]").forEach((node) => {
    node.textContent = profile.departmentLabel;
  });
  document.querySelectorAll("[data-session-description]").forEach((node) => {
    node.textContent = profile.description;
  });

  document.querySelectorAll("[data-roles]").forEach((element) => {
    const allowed = element.dataset.roles.split(",").map((value) => value.trim());
    const isAllowed = allowed.includes(roleCode);
    setButtonDisabled(element, !isAllowed);
    if (!isAllowed && element.dataset.lockMessage) {
      element.title = `${profile.label}: ${element.dataset.lockMessage}`;
    } else {
      element.removeAttribute("title");
    }
  });

  document.querySelectorAll("[data-scope-banner]").forEach((banner) => {
    const department = banner.dataset.department;
    const scopeLabel = banner.dataset.scopeLabel || "this workspace";
    const state = banner.querySelector("[data-scope-state]");
    const detail = banner.querySelector("[data-scope-detail]");
    const chip = banner.querySelector("[data-scope-chip]");

    const canWrite = profile.write.includes(department);

    if (state) {
      state.textContent = canWrite ? "Editable in current scope" : "Read-only in current scope";
    }

    if (detail) {
      detail.textContent = canWrite
        ? `${profile.label} can update ${scopeLabel} for ${profile.departmentLabel}.`
        : `${profile.label} keeps cross-department read visibility, but edits for ${scopeLabel} stay locked outside ${profile.departmentLabel}.`;
    }

    if (chip) {
      chip.dataset.tone = canWrite ? "green" : "gold";
      chip.textContent = canWrite ? "Write enabled" : "Read only";
    }
  });

  if (roleSelect) {
    roleSelect.value = profile.code;
  }

  try {
    localStorage.setItem(storageKey, profile.code);
  } catch (error) {
    // Ignore storage failures in local file previews.
  }
}

function initializeRole() {
  let savedRole = "OW";
  try {
    savedRole = localStorage.getItem(storageKey) || "OW";
  } catch (error) {
    savedRole = "OW";
  }
  applyRoleState(savedRole in roleProfiles ? savedRole : "OW");
}

window.addEventListener("hashchange", handleRouteChange);

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    if (body.classList.contains("nav-open")) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });
}

if (backdrop) {
  backdrop.addEventListener("click", () => {
    closeNavigation();
    closeOverlay();
  });
}

document.querySelectorAll("[data-open-overlay]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("is-disabled")) return;
    openOverlay(button.dataset.openOverlay);
  });
});

document.querySelectorAll("[data-close-overlay]").forEach((button) => {
  button.addEventListener("click", () => {
    closeOverlay(button.dataset.closeOverlay);
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleTabChange(button.dataset.tabGroup, button.dataset.tabTarget);
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

if (roleSelect) {
  roleSelect.addEventListener("change", (event) => {
    applyRoleState(event.target.value);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
    closeOverlay();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 991) closeNavigation();
});

initializeTabs();
initializeRole();
handleRouteChange();
