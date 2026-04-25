const SESSION_KEY = 'd8x-demo-session';
const PENDING_SESSION_KEY = 'd8x-demo-pending-session';
const SELECTED_PORTAL_KEY = 'd8x-demo-selected-portal';
const LAST_ROUTE_PREFIX = 'd8x-demo-last-route:';

const cache = new Map();

function normalizeSource(src) {
  return src instanceof URL ? src.href : String(src);
}

export const MockData = {
  async load(src) {
    const key = normalizeSource(src);
    if (cache.has(key)) return cache.get(key);

    const response = await fetch(key);
    if (!response.ok) {
      throw new Error(`MockData.load: HTTP ${response.status} -> ${key}`);
    }

    const data = await response.json();
    cache.set(key, data);
    return data;
  },

  async loadAll(sources = []) {
    const entries = await Promise.all(
      sources.map(async (source) => [source, await this.load(source)]),
    );
    return Object.fromEntries(entries);
  },

  clearCache(src) {
    if (src) {
      cache.delete(normalizeSource(src));
      return;
    }

    cache.clear();
  },
};

export async function loadRoleRegistry() {
  return MockData.load(new URL('../data/roles.json', import.meta.url));
}

export async function loadPortalRegistry() {
  return MockData.load(new URL('../data/portals.json', import.meta.url));
}

export async function getRole(roleId) {
  const registry = await loadRoleRegistry();
  return registry.roles?.[roleId] ?? null;
}

export async function getPortal(portalKey) {
  const registry = await loadPortalRegistry();
  return registry.portals?.[portalKey] ?? null;
}

export const Session = {
  set(user) {
    const payload = {
      ...user,
      loginAt: new Date().toISOString(),
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    this.clearPending();

    if (payload.portal) {
      this.selectPortal(payload.portal);
    }

    return payload;
  },

  current() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!this.current();
  },

  setPending(user) {
    sessionStorage.setItem(PENDING_SESSION_KEY, JSON.stringify(user));
  },

  pending() {
    try {
      return JSON.parse(sessionStorage.getItem(PENDING_SESSION_KEY)) || null;
    } catch {
      return null;
    }
  },

  commitPending(extra = {}) {
    const pending = this.pending();
    if (!pending) return null;
    this.clearPending();
    return this.set({ ...pending, ...extra });
  },

  clearPending() {
    sessionStorage.removeItem(PENDING_SESSION_KEY);
  },

  selectPortal(portalKey) {
    sessionStorage.setItem(SELECTED_PORTAL_KEY, portalKey);
  },

  selectedPortal() {
    return sessionStorage.getItem(SELECTED_PORTAL_KEY) || null;
  },

  rememberRoute(portalKey, routePath) {
    if (!portalKey || !routePath) return;
    localStorage.setItem(`${LAST_ROUTE_PREFIX}${portalKey}`, routePath);
  },

  lastRoute(portalKey) {
    if (!portalKey) return null;
    return localStorage.getItem(`${LAST_ROUTE_PREFIX}${portalKey}`);
  },

  hasRole(role) {
    return this.current()?.role === role;
  },

  require(redirectTo = '../auth/main.html') {
    if (this.isAuthenticated()) return this.current();
    window.location.href = new URL(redirectTo, window.location.href).href;
    return null;
  },

  clear() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PENDING_SESSION_KEY);
    sessionStorage.removeItem(SELECTED_PORTAL_KEY);
  },
};

export function fmtDate(iso, opts = {}) {
  if (!iso) return '-';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...opts,
  }).format(new Date(iso));
}

export function fmtCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function fmtNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function fmtRelative(iso) {
  if (!iso) return '-';

  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return fmtDate(iso);
}

export function debounce(fn, ms = 200) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), ms);
  };
}
