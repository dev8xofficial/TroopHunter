/**
 * COMPONENTS/SHELL.JS — Burkes Group Client Portal
 * Renders and manages the global navigation bar.
 * Handles role-based nav item visibility, notification bell,
 * role switcher (demo), and avatar display.
 */

const ShellComponent = (() => {
  // ── Nav item definitions ──────────────────────────────────

  const NAV_ITEMS = [
    {
      screen: 'dashboard',
      label: 'Dashboard',
      icon: `<svg class="nav-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <rect x="1" y="1" width="6" height="6" rx="1"/>
               <rect x="9" y="1" width="6" height="6" rx="1"/>
               <rect x="1" y="9" width="6" height="6" rx="1"/>
               <rect x="9" y="9" width="6" height="6" rx="1"/>
             </svg>`,
    },
    {
      screen: 'documents',
      label: 'Documents',
      icon: `<svg class="nav-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 1z"/>
               <polyline points="9,1 9,6 14,6"/>
               <line x1="4" y1="9" x2="12" y2="9"/>
               <line x1="4" y1="12" x2="9" y2="12"/>
             </svg>`,
    },
    {
      screen: 'messages',
      label: 'Messages',
      icon: `<svg class="nav-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M14 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l2 2 2-2h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
             </svg>`,
    },
    {
      screen: 'insurance',
      label: 'Insurance',
      icon: `<svg class="nav-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M8 1L2 4v4c0 3.5 2.5 6 6 7 3.5-1 6-3.5 6-7V4L8 1z"/>
             </svg>`,
    },
    {
      screen: 'mortgage',
      label: 'Mortgage',
      icon: `<svg class="nav-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <rect x="1" y="7" width="14" height="8" rx="1"/>
               <path d="M4 7V5a4 4 0 0 1 8 0v2"/>
               <line x1="8" y1="10" x2="8" y2="13"/>
             </svg>`,
    },
    {
      screen: 'services',
      label: 'Services',
      icon: `<svg class="nav-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <circle cx="8" cy="8" r="2"/>
               <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M11.54 4.46l-1.41 1.41M4.95 11.54l-1.41 1.41"/>
             </svg>`,
    },
  ];

  // ── Build nav HTML ────────────────────────────────────────

  function _buildNavLinks() {
    return NAV_ITEMS.filter((item) => Session.canSee(item.screen))
      .map(
        (item) => `
        <button
          class="nav-link"
          data-screen="${item.screen}"
          aria-label="Go to ${item.label}"
          type="button"
        >
          ${item.icon}
          <span class="nav-link-label">${item.label}</span>
        </button>
      `,
      )
      .join('');
  }

  function _buildMobileNavItems() {
    return NAV_ITEMS.filter((item) => Session.canSee(item.screen))
      .map(
        (item) => `
        <button
          class="mobile-nav-item"
          data-screen="${item.screen}"
          aria-label="${item.label}"
          type="button"
        >
          ${item.icon.replace('class="nav-link-icon"', 'class="mobile-nav-icon"')}
          <span>${item.label}</span>
        </button>
      `,
      )
      .join('');
  }

  function _buildRoleOptions() {
    return Session.allRoles
      .map((code) => {
        const labels = { CL: 'Client', AG: 'Agent', LN: 'Lender', AT: 'Attorney', CP: 'CPA', TC: 'Coordinator' };
        return `<option value="${code}" ${code === Session.role ? 'selected' : ''}>${labels[code] || code}</option>`;
      })
      .join('');
  }

  // ── Notification count (from MockData if available) ───────

  function _getNotificationCount() {
    if (window.MockData && window.MockData.notifications) {
      return window.MockData.notifications.filter((n) => !n.read).length;
    }
    return 3; // fallback demo count
  }

  // ── Render ────────────────────────────────────────────────

  function render() {
    const nav = document.getElementById('global-nav');
    const mobileNav = document.getElementById('mobile-nav');
    if (!nav) return;

    const unread = _getNotificationCount();

    nav.innerHTML = `
      <!-- Logo -->
      <a class="nav-logo" href="#dashboard" aria-label="Burkes Group Portal home">
        <div class="nav-logo-mark">BG</div>
        <div>
          <div class="nav-logo-text">Burkes Group</div>
          <div class="nav-logo-sub">Client Portal</div>
        </div>
      </a>

      <!-- Transaction pill -->
      <div class="nav-txn-pill" title="Active Transaction: ${Session.transaction_id}" aria-label="Active transaction ${Session.transaction_id}">
        ${Session.transaction_id}
      </div>

      <!-- Nav links -->
      <nav class="nav-links" role="navigation" aria-label="Main navigation">
        ${_buildNavLinks()}
      </nav>

      <!-- Right actions -->
      <div class="nav-actions">

        <!-- Demo: Role switcher -->
        <div class="nav-role-switcher">
          <select
            class="nav-role-select"
            id="role-switcher"
            aria-label="Switch demo role"
            title="Switch role (demo)"
          >
            ${_buildRoleOptions()}
          </select>
        </div>

        <!-- Notification bell -->
        <button
          class="nav-bell"
          id="nav-bell-btn"
          aria-label="${unread} unread notifications"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M8 1a4.99 4.99 0 0 1 5 5v3l1 1H2l1-1V6a4.99 4.99 0 0 1 5-5z"/>
            <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
          </svg>
          ${unread > 0 ? `<span class="nav-bell-badge" aria-hidden="true">${unread}</span>` : ''}
        </button>

        <!-- User avatar -->
        <div
          class="nav-avatar"
          role="button"
          tabindex="0"
          aria-label="${Session.displayName} — ${Session.roleData.label}"
          title="${Session.displayName} (${Session.roleData.label})"
        >
          ${Session.initials}
        </div>

      </div>
    `;

    // Mobile nav
    if (mobileNav) {
      mobileNav.innerHTML = _buildMobileNavItems();
      _bindMobileNavEvents(mobileNav);
    }

    _bindEvents(nav);
  }

  // ── Bind events ───────────────────────────────────────────

  function _bindEvents(nav) {
    // Nav link clicks
    nav.querySelectorAll('.nav-link').forEach((btn) => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        if (screen) Router.navigate(screen);
      });
    });

    // Role switcher
    const roleSwitcher = nav.querySelector('#role-switcher');
    if (roleSwitcher) {
      roleSwitcher.addEventListener('change', (e) => {
        Session.switchRole(e.target.value);
        // Bell count may change per role
        render();
      });
    }

    // Logo link
    const logo = nav.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate('dashboard');
      });
    }

    // Bell — placeholder (will wire to notifications drawer in Sprint 2)
    const bell = nav.querySelector('#nav-bell-btn');
    if (bell) {
      bell.addEventListener('click', () => {
        Toast.show('Notifications panel coming in Sprint 2', 'info');
      });
    }
  }

  function _bindMobileNavEvents(mobileNav) {
    mobileNav.querySelectorAll('.mobile-nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        if (screen) Router.navigate(screen);
      });
    });
  }

  // ── Update for role change ────────────────────────────────

  function updateForRole() {
    render(); // full re-render with new role context
  }

  // ── Sync active state when screen changes ─────────────────

  window.addEventListener('router:screenChanged', (e) => {
    const { screen } = e.detail;
    document.querySelectorAll('.nav-link').forEach((el) => {
      el.classList.toggle('active', el.dataset.screen === screen);
      if (el.dataset.screen === screen) {
        el.setAttribute('aria-current', 'page');
      } else {
        el.removeAttribute('aria-current');
      }
    });

    document.querySelectorAll('.mobile-nav-item').forEach((el) => {
      el.classList.toggle('active', el.dataset.screen === screen);
    });
  });

  return { render, updateForRole };
})();

window.ShellComponent = ShellComponent;
