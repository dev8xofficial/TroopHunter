/**
 * router.js — Auth domain (001–005)
 *
 * Single-page application router for the auth domain.
 * Manages screen transitions, activates/deactivates screen-specific
 * components, and exposes the global App.navigate() function.
 *
 * Screen registry:
 *   portal-select   → 002-portal-routing (portal selector)
 *   login           → 001-authentication
 *   register        → 001-authentication (candidate self-registration)
 *   mfa             → 003-mfa
 *   password-reset  → 004-password-reset
 *   sso-callback    → 005-sso
 *   portal-*        → mock dashboard (navigated to after auth)
 *
 * Spec coverage:
 *   FR-002-01 · Publish portal metadata (portal-select screen)
 *   FR-002-02 · Resolve post-auth destinations
 *   FR-002-03 · Prevent unauthorized navigation
 *   EVT-002-02 · auth.route.resolved
 *   EVT-002-03 · auth.route.blocked
 *   ADR-006    · Pre-authentication portal routing
 *   ADR-010    · Portal-specific auth flows
 */

(function Router() {
  'use strict';

  // ── Known auth screens ──────────────────────────────────────
  // Ordered for visual-transition logic (later = "forward")
  const SCREEN_ORDER = ['portal-select', 'login', 'register', 'mfa', 'password-reset', 'sso-callback'];

  // ── Transition duration (must match CSS --duration-slow) ───
  const TRANSITION_MS = 340;

  // ── Current screen state ────────────────────────────────────
  let currentScreen = 'portal-select';
  let isTransitioning = false;

  // ── Audit event emitter ─────────────────────────────────────
  function emitEvent(eventName, payload) {
    document.dispatchEvent(
      new CustomEvent('auth:event', {
        detail: { event_name: eventName, payload: payload },
        bubbles: true,
      }),
    );
  }

  // ═══════════════════════════════════════════════════════════
  // SCREEN LIFECYCLE HOOKS
  // Each screen component may expose onScreenActivate /
  // onScreenDeactivate on the window object.
  // ═══════════════════════════════════════════════════════════

  /**
   * Map screen names to their component lifecycle controllers.
   * Components register themselves on window during init.
   */
  function getComponentFor(screenName) {
    const map = {
      login: null, // auth-form.js manages its own events
      register: null, // auth-form.js manages its own events
      'portal-select': window.PortalSelector,
      mfa: window.MfaChallenge,
      'password-reset': window.PasswordReset,
      'sso-callback': window.SsoHandler,
    };
    return map[screenName] || null;
  }

  function callLifecycle(screenName, method, options) {
    const component = getComponentFor(screenName);
    if (component && typeof component[method] === 'function') {
      component[method](options);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SCREEN TRANSITIONS
  // ═══════════════════════════════════════════════════════════

  /**
   * Determines the visual transition direction.
   * Returns 'forward' if toScreen is later in SCREEN_ORDER,
   * 'back' if it is earlier, or 'none' for screens outside the order.
   */
  function getTransitionDirection(fromScreen, toScreen) {
    const fromIdx = SCREEN_ORDER.indexOf(fromScreen);
    const toIdx = SCREEN_ORDER.indexOf(toScreen);
    if (fromIdx === -1 || toIdx === -1) return 'none';
    return toIdx > fromIdx ? 'forward' : 'back';
  }

  /**
   * Shows the target screen element.
   * Applies entrance animation class then removes it after the
   * transition completes to keep the DOM clean.
   */
  function showScreen(screenEl, direction) {
    screenEl.classList.add('screen--active');
    screenEl.classList.remove('screen-enter', 'screen-enter-back');

    if (direction === 'back') {
      screenEl.classList.add('screen-enter-back');
    } else if (direction === 'forward' || direction === 'none') {
      screenEl.classList.add('screen-enter');
    }

    setTimeout(function () {
      screenEl.classList.remove('screen-enter', 'screen-enter-back');
    }, TRANSITION_MS + 50);
  }

  /**
   * Hides the source screen element.
   * Applies exit animation then removes screen--active.
   */
  function hideScreen(screenEl, direction) {
    screenEl.classList.add('screen-exit');
    setTimeout(function () {
      screenEl.classList.remove('screen--active', 'screen-exit');
    }, TRANSITION_MS);
  }

  // ═══════════════════════════════════════════════════════════
  // NAVIGATION CORE
  // ═══════════════════════════════════════════════════════════

  /**
   * Navigate to a named screen.
   *
   * @param {string} screenName - data-screen attribute value
   * @param {object} [options]  - passed to onScreenActivate
   */
  function navigate(screenName, options) {
    if (isTransitioning) return;
    if (screenName === currentScreen) return;

    // Handle portal-* destinations (post-authentication redirect)
    // In the demo these are mock dashboard screens; production would
    // load the relevant microfrontend.
    if (screenName.startsWith('portal-')) {
      handlePortalRedirect(screenName, options);
      return;
    }

    const toEl = document.querySelector('[data-screen="' + screenName + '"]');
    const fromEl = document.querySelector('[data-screen="' + currentScreen + '"]');

    if (!toEl) {
      console.warn('[Router] Unknown screen:', screenName);
      return;
    }

    const direction = getTransitionDirection(currentScreen, screenName);
    isTransitioning = true;

    // Deactivate current screen's component
    callLifecycle(currentScreen, 'onScreenDeactivate');

    // Run transitions
    if (fromEl) hideScreen(fromEl, direction);
    showScreen(toEl, direction);

    const prevScreen = currentScreen;
    currentScreen = screenName;

    // Activate new screen's component after a short delay
    // (allows DOM to be visible before JS manipulates it)
    setTimeout(function () {
      callLifecycle(screenName, 'onScreenActivate', options);
      isTransitioning = false;

      // Emit route-resolved event
      emitEvent('auth.route.resolved', {
        portal_key: sessionStorage.getItem('dev8x_selected_portal') || 'candidate',
        role: '(demo)',
        decision: 'allow',
        resolved_route: '/' + screenName,
      });

      // Focus management: move focus to the main heading of the new screen
      const heading = toEl.querySelector('h1, h2, [role="heading"]');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
        setTimeout(function () {
          heading.removeAttribute('tabindex');
        }, 500);
      }
    }, TRANSITION_MS / 2);
  }

  // ═══════════════════════════════════════════════════════════
  // POST-AUTH PORTAL REDIRECT
  // FR-002-02: Resolve post-auth destinations
  // ═══════════════════════════════════════════════════════════

  /**
   * Handles post-authentication navigation to portal dashboards.
   * In the demo, this shows a transient success card on the current
   * screen rather than loading a separate microfrontend.
   * In production, this would redirect the browser to the portal URL.
   */
  function handlePortalRedirect(screenName, options) {
    const portal = screenName.replace('portal-', '');
    const session = {
      portal: portal,
      token: sessionStorage.getItem('dev8x_session_token'),
    };

    // Emit auth.route.resolved (EVT-002-02)
    emitEvent('auth.route.resolved', {
      portal_key: portal,
      role: '(demo)',
      decision: 'allow',
      resolved_route: '/' + portal + '/dashboard',
    });

    // Show auth-success toast/overlay
    showPortalSuccessOverlay(portal);
  }

  /**
   * Displays a brief success overlay indicating authentication is
   * complete and the portal is loading.
   * This simulates the transition to the portal microfrontend.
   */
  function showPortalSuccessOverlay(portal) {
    // Reuse the current visible screen to show success message
    const activeScreen = document.querySelector('.screen.screen--active');
    if (!activeScreen) return;

    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'assertive');
    overlay.style.cssText = ['position: fixed', 'inset: 0', 'background: var(--bg-overlay)', 'backdrop-filter: blur(12px)', '-webkit-backdrop-filter: blur(12px)', 'z-index: var(--z-modal)', 'display: flex', 'align-items: center', 'justify-content: center', 'flex-direction: column', 'gap: var(--space-6)', 'animation: fade-in var(--duration-base) var(--ease-out) both'].join(';');

    const PORTAL_COLORS = {
      candidate: 'var(--portal-candidate)',
      client: 'var(--portal-client)',
      admin: 'var(--portal-admin)',
      crm: 'var(--portal-crm)',
    };
    const PORTAL_LABELS = {
      candidate: 'Candidate Portal',
      client: 'Client Portal',
      admin: 'Admin Panel',
      crm: 'CRM Platform',
    };

    const color = PORTAL_COLORS[portal] || 'var(--accent)';
    const label = PORTAL_LABELS[portal] || portal;

    overlay.innerHTML = [
      '<div style="',
      'width:72px;height:72px;border-radius:50%;',
      'background:' + color + ';',
      'display:flex;align-items:center;justify-content:center;',
      'box-shadow:0 0 32px ' + color + ';',
      'animation: icon-pop var(--duration-slow) var(--ease-spring) both',
      '">',
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"',
      ' stroke="var(--bg-base)" stroke-width="2.5"',
      ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '<polyline points="20 6 9 17 4 12"/>',
      '</svg>',
      '</div>',
      '<div style="text-align:center">',
      '<div style="',
      'font-family:var(--font-display);',
      'font-size:var(--text-xl);',
      'color:var(--text-primary);',
      'margin-bottom:var(--space-2)',
      '">Signed in successfully</div>',
      '<div style="font-size:var(--text-sm);color:var(--text-muted)">',
      'Loading ' + label + '…',
      '</div>',
      '</div>',
      '<div style="',
      'font-family:var(--font-mono);',
      'font-size:var(--text-xs);',
      'color:var(--text-disabled);',
      'margin-top:var(--space-4)',
      '">',
      '(Demo mode — portal redirect would occur here)',
      '</div>',
    ].join('');

    document.body.appendChild(overlay);

    // Auto-dismiss after 3 seconds and return to portal select
    setTimeout(function () {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity var(--duration-base) var(--ease-out)';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        // Clear session and return to portal select for demo purposes
        sessionStorage.clear();
        navigate('portal-select');
      }, TRANSITION_MS);
    }, 3000);
  }

  // ═══════════════════════════════════════════════════════════
  // AUDIT EVENT LOG (console only in demo)
  // ═══════════════════════════════════════════════════════════

  function initAuditLogger() {
    document.addEventListener('auth:event', function (e) {
      if (!e.detail) return;
      console.log('[Auth Audit] ' + e.detail.event_name, e.detail.payload || {});
    });
  }

  // ═══════════════════════════════════════════════════════════
  // BROWSER HISTORY (shallow — no real URL changes in demo)
  // ═══════════════════════════════════════════════════════════

  function initHistoryHandling() {
    window.addEventListener('popstate', function (e) {
      if (e.state && e.state.screen) {
        navigate(e.state.screen);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INITIAL SCREEN SETUP
  // ═══════════════════════════════════════════════════════════

  /**
   * Ensures exactly one screen is visible on load.
   * Defaults to portal-select unless sessionStorage indicates
   * an interrupted auth flow.
   */
  function initInitialScreen() {
    // Recover mid-flow if the page was refreshed during auth
    const mfaPending = sessionStorage.getItem('dev8x_mfa_required') === 'true';
    const hasToken = !!sessionStorage.getItem('dev8x_session_token');

    let initialScreen = 'portal-select';

    if (mfaPending && hasToken) {
      initialScreen = 'mfa';
    }

    // Hide all screens except the initial one
    document.querySelectorAll('.screen').forEach(function (el) {
      const isActive = el.dataset.screen === initialScreen;
      el.classList.toggle('screen--active', isActive);
    });

    currentScreen = initialScreen;

    // Activate the initial screen's component
    callLifecycle(initialScreen, 'onScreenActivate');
  }

  // ═══════════════════════════════════════════════════════════
  // GLOBAL API
  // ═══════════════════════════════════════════════════════════

  /**
   * Exposed as window.App for use by all component modules.
   * Components call App.navigate() instead of manipulating the
   * DOM directly to keep routing centralised.
   */
  window.App = {
    /**
     * Navigate to a screen by name.
     * @param {string} screenName
     * @param {object} [options] - forwarded to onScreenActivate
     */
    navigate: navigate,

    /** Returns the name of the currently active screen. */
    getCurrentScreen: function () {
      return currentScreen;
    },

    /**
     * Emit an audit event through the shared event bus.
     * Components may also call this directly via document.dispatchEvent.
     */
    emitEvent: emitEvent,
  };

  // ═══════════════════════════════════════════════════════════
  // INITIALISE
  // ═══════════════════════════════════════════════════════════

  function init() {
    initAuditLogger();
    initHistoryHandling();
    initInitialScreen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
