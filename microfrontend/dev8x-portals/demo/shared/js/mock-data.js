/**
 * Dev8X Spec-Kit · demo/shared/js/mock-data.js
 *
 * Central mock-data registry + session management.
 * Surfaces fetch their own data files; this module provides
 * the loading utility and the shared session/RBAC helpers.
 *
 * References:
 *   - contracts/access-control.yaml
 *   - spec modules 001-005 (auth)
 */

/* ── RBAC role definitions (mirrors access-control.yaml) ── */
export const ROLES = {
  admin: { label: 'Recruiter / Admin', portal: 'admin', color: '#7c3aed', modules: ['100-108'] },
  candidate: { label: 'Candidate', portal: 'candidate', color: '#0891b2', modules: ['200-206'] },
  client: { label: 'Client', portal: 'client', color: '#0d9488', modules: ['300-307'] },
  crm: { label: 'CRM Agent', portal: 'crm', color: '#dc2626', modules: ['400-408'] },
};

/* ── Session ─────────────────────────────────────────────── */
const SESSION_KEY = 'd8x-demo-session';

export const Session = {
  /**
   * Store a user session.
   * @param {{ id, name, email, role, avatar? }} user
   */
  set(user) {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        ...user,
        loginAt: new Date().toISOString(),
      }),
    );
  },

  /** Get current session or null */
  current() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  },

  /** Check if a session exists */
  isAuthenticated() {
    return !!this.current();
  },

  /** Clear session (logout) */
  clear() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  /** Redirect to auth if no session */
  require(redirectTo = '../../auth/main.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectTo;
      return null;
    }
    return this.current();
  },

  /** Check if current user has a specific role */
  hasRole(role) {
    const user = this.current();
    return user?.role === role;
  },

  /** Portal URL for a given role */
  portalUrl(role) {
    const r = ROLES[role];
    return r ? `../${r.portal}/main.html` : '../auth/main.html';
  },
};

/* ── Mock Data Loader ────────────────────────────────────── */
const _cache = {};

export const MockData = {
  /**
   * Load a JSON mock-data file.
   * @param {string} src  Path to JSON file (relative to the caller)
   * @returns {Promise<any>}
   */
  async load(src) {
    if (_cache[src]) return _cache[src];
    const res = await fetch(src);
    if (!res.ok) throw new Error(`MockData.load: HTTP ${res.status} → ${src}`);
    const data = await res.json();
    _cache[src] = data;
    return data;
  },

  /** Load multiple files in parallel */
  async loadAll(sources) {
    return Promise.all(sources.map((src) => this.load(src)));
  },

  /** Clear the in-memory cache */
  clearCache(src) {
    if (src) delete _cache[src];
    else Object.keys(_cache).forEach((k) => delete _cache[k]);
  },
};

/* ── Helpers ─────────────────────────────────────────────── */

/** Format a date string to locale short date */
export function fmtDate(iso, opts = {}) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', ...opts }).format(new Date(iso));
}

/** Format currency */
export function fmtCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/** Format a number with commas */
export function fmtNumber(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

/** Relative time (e.g. "3 days ago") */
export function fmtRelative(iso) {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return fmtDate(iso);
}

/** Generate a simple avatar placeholder URL using initials */
export function avatarInitials(name = '', bg = '6366f1') {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bg}&color=fff&size=64`;
}

/** Debounce utility */
export function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/** Simple template interpolator */
export function interpolate(tmpl, vars) {
  return tmpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
}
