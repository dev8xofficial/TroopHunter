/**
 * ROUTER.JS — Burkes Group Client Portal
 * Hash-based screen switcher (#dashboard, #documents, etc.)
 * Manages mounting/unmounting screens and updating nav state.
 * Enforces role-based access: redirects if current role lacks
 * permission for the requested screen.
 */

const Router = (() => {
  // ── Known routes ──────────────────────────────────────────

  const ROUTES = {
    dashboard: {
      title: 'Dashboard',
      module: () => window.DashboardScreen,
      default: true,
    },
    documents: {
      title: 'Documents',
      module: () => window.DocumentsScreen,
    },
    messages: {
      title: 'Messages',
      module: () => window.MessagesScreen,
    },
    insurance: {
      title: 'Insurance',
      module: () => window.InsuranceScreen,
    },
    mortgage: {
      title: 'Mortgage',
      module: () => window.MortgageScreen,
    },
    services: {
      title: 'Local Services',
      module: () => window.ServicesScreen,
    },
  };

  // ── State ─────────────────────────────────────────────────

  let _current = null; // currently mounted screen key
  let _mounted = {}; // cache of mounted screen instances

  // ── Helpers ───────────────────────────────────────────────

  function getRouteFromHash() {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    return ROUTES[hash] ? hash : _getDefaultRoute();
  }

  function _getDefaultRoute() {
    // Find first route the current role can see
    for (const [key] of Object.entries(ROUTES)) {
      if (Session.canSee(key)) return key;
    }
    return 'dashboard';
  }

  // ── Core navigation ───────────────────────────────────────

  function navigate(routeKey) {
    const route = ROUTES[routeKey];
    if (!route) {
      console.warn(`Router.navigate: unknown route "${routeKey}"`);
      return;
    }

    // Role access check
    if (!Session.canSee(routeKey)) {
      console.warn(`Router: role ${Session.role} cannot access "${routeKey}". Redirecting.`);
      navigate(_getDefaultRoute());
      return;
    }

    // Update hash without triggering hashchange handler
    const newHash = `#${routeKey}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }

    _mountScreen(routeKey, route);
  }

  function _mountScreen(key, route) {
    const outlet = document.getElementById('screen-outlet');
    if (!outlet) return;

    // Teardown previous screen
    if (_current && _current !== key) {
      const prev = ROUTES[_current];
      const prevModule = prev.module();
      if (prevModule && typeof prevModule.teardown === 'function') {
        prevModule.teardown();
      }
    }

    // Update nav highlight
    _updateNavHighlight(key);

    // Clear outlet
    outlet.innerHTML = '';

    // Mount new screen
    const ScreenModule = route.module();
    if (!ScreenModule) {
      outlet.innerHTML = `
        <div class="screen">
          <div class="empty-state">
            <div class="empty-state-title">Screen not loaded</div>
            <div class="empty-state-body">
              Module for "${key}" is not available. Check script load order.
            </div>
          </div>
        </div>
      `;
      return;
    }

    _current = key;

    // Render screen into outlet
    if (typeof ScreenModule.render === 'function') {
      ScreenModule.render(outlet);
    }

    // Update document title
    document.title = `${route.title} — Burkes Group Portal`;

    // Update page header aria
    outlet.setAttribute('aria-label', `${route.title} screen`);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Notify listeners
    window.dispatchEvent(
      new CustomEvent('router:screenChanged', {
        detail: { screen: key, title: route.title },
      }),
    );
  }

  // ── Nav highlight ─────────────────────────────────────────

  function _updateNavHighlight(activeKey) {
    document.querySelectorAll('.nav-link').forEach((el) => {
      const screen = el.dataset.screen;
      if (screen === activeKey) {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
      } else {
        el.classList.remove('active');
        el.removeAttribute('aria-current');
      }
    });

    document.querySelectorAll('.mobile-nav-item').forEach((el) => {
      const screen = el.dataset.screen;
      el.classList.toggle('active', screen === activeKey);
    });
  }

  // ── Hash change listener ──────────────────────────────────

  function _onHashChange() {
    const key = getRouteFromHash();
    navigate(key);
  }

  // ── Role change: re-validate current route ────────────────

  window.addEventListener('session:roleChanged', () => {
    // Re-render nav (hide/show items per new role)
    if (window.ShellComponent) {
      window.ShellComponent.updateForRole();
    }

    // If current screen is no longer accessible, redirect
    if (_current && !Session.canSee(_current)) {
      navigate(_getDefaultRoute());
    } else if (_current) {
      // Re-render current screen with new role context
      const route = ROUTES[_current];
      const ScreenModule = route.module();
      if (ScreenModule && typeof ScreenModule.render === 'function') {
        const outlet = document.getElementById('screen-outlet');
        if (outlet) {
          outlet.innerHTML = '';
          ScreenModule.render(outlet);
        }
      }
    }
  });

  // ── Public API ────────────────────────────────────────────

  return {
    init() {
      window.addEventListener('popstate', _onHashChange);

      // Initial route from hash or default
      const initial = getRouteFromHash();
      navigate(initial);
    },

    navigate,

    get current() {
      return _current;
    },

    get routes() {
      return Object.keys(ROUTES);
    },

    /** Re-render current screen (e.g., after data mutation) */
    refresh() {
      if (_current) {
        const route = ROUTES[_current];
        _mountScreen(_current, route);
      }
    },
  };
})();

window.Router = Router;
