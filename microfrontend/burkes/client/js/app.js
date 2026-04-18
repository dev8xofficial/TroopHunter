/**
 * APP.JS — Burkes Group Client Portal
 * Boot sequence:
 *   1. Resolve mock data into memory (MockData)
 *   2. Mount shell (nav bar)
 *   3. Render alert banners
 *   4. Start router → initial screen
 *   5. Dismiss boot screen with fade
 *
 * Dependency load order (from main.html):
 *   tokens.css / shell.css / components.css / screen.css
 *   → session.js
 *   → mock-data.js
 *   → components/badge.js
 *   → components/toast.js
 *   → components/drawer.js
 *   → components/modal.js
 *   → components/alert-banner.js
 *   → components/shell.js
 *   → screens/dashboard.js … (all screens)
 *   → router.js
 *   → app.js  ← this file runs last
 */

(function boot() {
  const BOOT_DELAY_MS = 800; // min time to show boot screen

  // ── Step 1: Validate dependencies ────────────────────────

  const REQUIRED_GLOBALS = ['Session', 'MockData', 'Router', 'ShellComponent', 'AlertBanner', 'Badge', 'Toast', 'Drawer', 'Modal'];

  const missing = REQUIRED_GLOBALS.filter((g) => !window[g]);
  if (missing.length > 0) {
    console.error('App boot failed — missing globals:', missing.join(', '));
    _showFatalError(`Missing modules: ${missing.join(', ')}`);
    return;
  }

  const bootStart = Date.now();

  // ── Step 2: Initialize mock data ─────────────────────────

  try {
    MockData.init();
  } catch (err) {
    console.error('MockData.init() failed:', err);
  }

  // ── Step 3: Mount shell (nav bar) ─────────────────────────

  ShellComponent.render();

  // ── Step 4: Render alert banners ─────────────────────────

  AlertBanner.render();

  // ── Step 5: Start router ──────────────────────────────────

  Router.init();

  // ── Step 6: Dismiss boot screen ──────────────────────────

  const elapsed = Date.now() - bootStart;
  const remaining = Math.max(0, BOOT_DELAY_MS - elapsed);

  setTimeout(() => {
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
      bootScreen.classList.add('fade-out');
      setTimeout(() => {
        if (bootScreen.parentNode) bootScreen.parentNode.removeChild(bootScreen);
      }, 450);
    }
  }, remaining);

  // ── Global error display ──────────────────────────────────

  function _showFatalError(message) {
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
      bootScreen.innerHTML = `
        <div style="text-align:center;padding:32px;color:#fff">
          <div style="font-size:2rem;margin-bottom:16px">⚠️</div>
          <div style="font-family:'Archivo',sans-serif;font-size:1.25rem;font-weight:700;margin-bottom:8px">
            Portal failed to load
          </div>
          <div style="font-size:0.875rem;opacity:0.6;max-width:360px">
            ${message}<br><br>
            Please check the browser console for details.
          </div>
        </div>
      `;
    }
  }

  // ── Dev helpers (non-production) ─────────────────────────

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.__portal = {
      session: window.Session,
      mockData: window.MockData,
      router: window.Router,
      navigate: (s) => Router.navigate(s),
      switchRole: (r) => Session.switchRole(r),
      toast: (m, t) => Toast.show(m, t),
    };
    console.info('%c🏠 Burkes Group Portal %cdev mode — window.__portal available', 'color:#fdb913;font-weight:bold', 'color:#64748b');
  }
})();
