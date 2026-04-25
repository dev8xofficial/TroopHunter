/**
 * Dev8X Spec-Kit · demo/shared/js/router.js
 *
 * Lightweight hash-based router.
 * Surfaces register their route tables; the router renders
 * the matching screen into `<div id="d8x-screen-outlet">`.
 *
 * Usage:
 *   import Router from '../../shared/js/router.js';
 *   const router = new Router({ routes, outlet: '#d8x-screen-outlet' });
 *   router.start();
 */

export class Router {
  /**
   * @param {object} opts
   * @param {RouteDefinition[]} opts.routes
   * @param {string}            opts.outlet  CSS selector for the render target
   * @param {function}          [opts.onNavigate]  Called after every navigation
   */
  constructor({ routes = [], outlet = '#d8x-screen-outlet', onNavigate = null } = {}) {
    this.routes = routes;
    this.outlet = outlet;
    this.onNavigate = onNavigate;
    this._cache = {}; // screen HTML cache (path → html string)
    this._current = null;
  }

  /** Register additional routes at runtime */
  register(routes) {
    this.routes = [...this.routes, ...routes];
    return this;
  }

  /** Start the router — listen for hash changes */
  start() {
    const syncRoute = () => this._handleChange();

    window.addEventListener('hashchange', syncRoute);

    if (document.readyState !== 'loading') {
      syncRoute();
    } else {
      window.addEventListener('load', syncRoute, { once: true });
    }

    return this;
  }

  /** Programmatic navigation */
  navigate(path) {
    const current = this._parsePath(window.location.hash);
    if (current === path) return;
    window.location.hash = path;
  }

  /** Navigate back (no history → go to default route) */
  back() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      const def = this.routes.find((r) => r.default);
      if (def) this.navigate(def.path);
    }
  }

  /** Current resolved path */
  get current() {
    return this._current;
  }

  // ── Private ────────────────────────────────────────────

  _parsePath(hash) {
    return hash.replace(/^#\/?/, '') || '';
  }

  async _handleChange() {
    const path = this._parsePath(window.location.hash);
    const route = this._match(path);

    if (!route) {
      this._render404(path);
      return;
    }

    this._current = path;
    await this._renderRoute(route, path);

    if (this.onNavigate) this.onNavigate({ path, route });
  }

  _match(path) {
    // Exact match first
    let found = this.routes.find((r) => r.path === path);
    if (found) return found;

    // Pattern match (e.g. "admin/applicants/:id")
    for (const route of this.routes) {
      const params = this._matchPattern(route.path, path);
      if (params !== null) {
        return { ...route, params };
      }
    }

    // Default fallback
    return this.routes.find((r) => r.default) || null;
  }

  _matchPattern(pattern, path) {
    const pParts = pattern.split('/');
    const rParts = path.split('/');
    if (pParts.length !== rParts.length) return null;

    const params = {};
    for (let i = 0; i < pParts.length; i++) {
      if (pParts[i].startsWith(':')) {
        params[pParts[i].slice(1)] = decodeURIComponent(rParts[i]);
      } else if (pParts[i] !== rParts[i]) {
        return null;
      }
    }
    return params;
  }

  async _renderRoute(route, path) {
    const outlet = document.querySelector(this.outlet);
    if (!outlet) {
      console.error(`[Router] Outlet not found: ${this.outlet}`);
      return;
    }

    // Show loading state
    outlet.setAttribute('aria-busy', 'true');

    try {
      let html;

      if (route.component) {
        // Inline component function
        html = await route.component(route.params || {});
      } else if (route.src) {
        // Fetch external screen HTML
        html = await this._fetchScreen(route.src);
      } else {
        html = `<div class="empty-state"><p>No content for route: ${path}</p></div>`;
      }

      outlet.innerHTML = html;

      // Fire route-level init hook
      if (route.init) await route.init(outlet, route.params || {});

      // Dispatch custom event so screens can self-initialise
      outlet.dispatchEvent(
        new CustomEvent('d8x:screen-ready', {
          bubbles: true,
          detail: { path, route },
        }),
      );
    } catch (err) {
      console.error('[Router] Failed to render route', path, err);
      outlet.innerHTML = this._errorTemplate(path, err);
    } finally {
      outlet.removeAttribute('aria-busy');
    }
  }

  async _fetchScreen(src) {
    if (this._cache[src]) return this._cache[src];

    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status} loading ${src}`);

    // Extract only the body of the screen partial (between <!-- SCREEN --> markers if present)
    const raw = await res.text();
    const match = raw.match(/<!--\s*SCREEN_START\s*-->([\s\S]*?)<!--\s*SCREEN_END\s*-->/i);
    const html = match ? match[1].trim() : raw;

    this._cache[src] = html;
    return html;
  }

  _render404(path) {
    const outlet = document.querySelector(this.outlet);
    if (outlet) outlet.innerHTML = this._notFoundTemplate(path);
  }

  _notFoundTemplate(path) {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 class="empty-state__title">Screen not found</h2>
        <p class="empty-state__desc">No route matched <code>${path}</code>. Check manifest routes.</p>
      </div>`;
  }

  _errorTemplate(path, err) {
    return `
      <div class="alert alert--danger" style="margin:2rem">
        <strong>Render error</strong>: ${err.message}
        <br><small>Route: ${path}</small>
      </div>`;
  }
}

export default Router;
