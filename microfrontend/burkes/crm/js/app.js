/**
 * Burkes Group CRM — App Initialization
 * Source: 000-foundation/spec.md
 * Batch: 1 of 7 — Foundation (Phase 1)
 * Status: COMPLETE
 */

(function () {
  'use strict';

  function boot() {
    // Kick off the router (renders sidebar, top nav, VOIP bar, initial screen)
    Router.init();

    // Dismiss loading splash after first render tick
    requestAnimationFrame(() => {
      const splash = document.getElementById('app-loading');
      if (splash) {
        splash.classList.add('fade-out');
        setTimeout(() => splash.remove(), 350);
      }
    });

    // Register service worker for PWA (silently skip if unsupported)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {
        // SW optional — don't break the app
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();