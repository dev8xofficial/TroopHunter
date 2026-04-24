/**
 * Dev8X Spec-Kit · demo/shared/js/shell.js
 *
 * Renders the app shell (sidebar nav + topbar) from a surface manifest
 * and the current session user.
 *
 * Usage (in surface main.html):
 *   import { Shell } from '../../shared/js/shell.js';
 *   import { Session } from '../../shared/js/mock-data.js';
 *
 *   const shell = new Shell({
 *     manifest: await fetch('./manifest.json').then(r => r.json()),
 *     user: Session.current(),
 *     router,
 *   });
 *   shell.mount('#d8x-shell');
 */

import { Session } from './mock-data.js';

/* ── SVG icon registry ────────────────────────────────── */
const ICONS = {
  home: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  users: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>`,
  briefcase: `<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
  document: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
  message: `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  inbox: `<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>`,
  contact: `<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  folder: `<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>`,
  dollar: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>`,
  logout: `<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
  menu: `<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>`,
  bell: `<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>`,
  search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  pipeline: `<rect x="2" y="3" width="4" height="18" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="18" y="11" width="4" height="10" rx="1"/>`,
};

function icon(name, size = 16) {
  const path = ICONS[name] || ICONS.folder;
  return `<svg width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    ${path}</svg>`;
}

/* ── Shell class ─────────────────────────────────────── */
export class Shell {
  constructor({ manifest, user, router, accentColor = null } = {}) {
    this.manifest = manifest;
    this.user = user || Session.current();
    this.router = router;
    this.accentColor = accentColor;
    this._collapsed = localStorage.getItem('d8x-sidebar-collapsed') === 'true';
  }

  mount(selector) {
    const root = document.querySelector(selector);
    if (!root) throw new Error(`Shell.mount: selector not found → ${selector}`);

    root.innerHTML = this._buildShell();
    this._bindEvents(root);
    this._applyAccent();
    this._syncCollapsed(root);

    if (this.router) {
      this.router.onNavigate = ({ path, route }) => this._setActive(root, path, route);
    }

    return this;
  }

  // ── Templates ──────────────────────────────────────

  _buildShell() {
    const { manifest, user } = this;
    const initials = this._initials(user.name);

    return `
      <aside class="d8x-sidebar" id="d8x-sidebar" aria-label="Main navigation">
        <a class="d8x-sidebar__brand" href="#" aria-label="${manifest.title} home">
          <div class="d8x-sidebar__logo">${manifest.id?.slice(0, 2)?.toUpperCase() || 'D8'}</div>
          <div class="d8x-sidebar__brand-text">
            ${manifest.title}
            <small>Dev8X Spec-Kit</small>
          </div>
        </a>

        <nav class="d8x-sidebar__nav" id="d8x-nav" role="navigation" aria-label="Surface navigation">
          ${this._buildNav()}
        </nav>

        <div class="d8x-sidebar__footer">
          <button class="d8x-nav-item" id="d8x-logout-btn" aria-label="Log out">
            ${icon('logout')}
            <span class="d8x-nav-item__label">Log out</span>
          </button>
        </div>
      </aside>

      <div class="d8x-main">
        <header class="d8x-topbar" role="banner">
          <button class="d8x-topbar__toggle" id="d8x-sidebar-toggle" aria-label="Toggle sidebar" aria-expanded="true">
            ${icon('menu', 18)}
          </button>

          <nav class="d8x-topbar__breadcrumb" aria-label="Breadcrumb" id="d8x-breadcrumb">
            <span class="d8x-topbar__breadcrumb-item">${manifest.title}</span>
          </nav>

          <div class="d8x-topbar__actions">
            <button class="d8x-icon-btn" aria-label="Search">
              ${icon('search', 18)}
            </button>
            <button class="d8x-icon-btn" aria-label="Notifications" id="d8x-notif-btn">
              ${icon('bell', 18)}
              <span class="d8x-icon-btn__dot" aria-hidden="true"></span>
            </button>
            <div class="d8x-avatar" id="d8x-avatar" role="button" tabindex="0"
                 aria-label="User menu — ${user.name}" title="${user.name} · ${user.role}">
              ${initials}
            </div>
          </div>
        </header>

        <main class="d8x-content" id="d8x-screen-outlet" role="main" aria-live="polite">
          <!-- screens render here -->
        </main>
      </div>
    `;
  }

  _buildNav() {
    const sections = this.manifest.navSections || [{ items: this.manifest.routes || [] }];
    return sections
      .map(
        (section) => `
      ${section.label ? `<div class="d8x-sidebar__section-label">${section.label}</div>` : ''}
      ${(section.items || []).map((item) => this._buildNavItem(item)).join('')}
    `,
      )
      .join('');
  }

  _buildNavItem(item) {
    return `
      <a class="d8x-nav-item"
         href="#${item.path}"
         data-path="${item.path}"
         aria-label="${item.label}${item.badge ? ` (${item.badge})` : ''}">
        <span class="d8x-nav-item__icon">${icon(item.icon || 'folder')}</span>
        <span class="d8x-nav-item__label">${item.label}</span>
        ${item.badge ? `<span class="d8x-nav-item__badge" aria-label="${item.badge} items">${item.badge}</span>` : ''}
      </a>`;
  }

  // ── Events ─────────────────────────────────────────

  _bindEvents(root) {
    // Sidebar toggle
    root.querySelector('#d8x-sidebar-toggle')?.addEventListener('click', () => {
      this._collapsed = !this._collapsed;
      localStorage.setItem('d8x-sidebar-collapsed', this._collapsed);
      this._syncCollapsed(root);
    });

    // Logout
    root.querySelector('#d8x-logout-btn')?.addEventListener('click', () => {
      Session.clear();
      window.location.href = '../../auth/main.html';
    });

    // Avatar menu (simple toggle for demo)
    root.querySelector('#d8x-avatar')?.addEventListener('click', () => {
      const user = Session.current();
      alert(`Signed in as:\n${user.name}\n${user.email}\nRole: ${user.role}`);
    });
  }

  _setActive(root, path, route) {
    root.querySelectorAll('.d8x-nav-item[data-path]').forEach((el) => {
      const isActive = el.dataset.path === path || path.startsWith(el.dataset.path + '/');
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Update breadcrumb
    const crumb = root.querySelector('#d8x-breadcrumb');
    if (crumb && route?.label) {
      crumb.innerHTML = `
        <span class="d8x-topbar__breadcrumb-item">${this.manifest.title}</span>
        <span class="d8x-topbar__breadcrumb-sep">›</span>
        <span class="d8x-topbar__breadcrumb-item current">${route.label}</span>`;
    }
  }

  _syncCollapsed(root) {
    const sidebar = root.querySelector('#d8x-sidebar');
    const toggle = root.querySelector('#d8x-sidebar-toggle');
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed', this._collapsed);
    toggle?.setAttribute('aria-expanded', String(!this._collapsed));
  }

  _applyAccent() {
    if (this.accentColor) {
      document.documentElement.style.setProperty('--color-primary', this.accentColor);
    }
  }

  _initials(name = '') {
    return (
      name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase() || '?'
    );
  }
}

export { icon };
export default Shell;
