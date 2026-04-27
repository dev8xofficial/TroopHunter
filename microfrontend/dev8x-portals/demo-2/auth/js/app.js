/**
 * app.js — Auth Domain Global Utilities (001–005)
 *
 * Responsibilities:
 *   - Toast notification system (non-blocking user feedback)
 *   - Keyboard accessibility helpers (focus trap, Escape handling)
 *   - Prefers-reduced-motion support
 *   - Dev audit event console panel (demo only)
 *   - Global error boundary
 *   - App-level lifecycle init
 *
 * Load order: AFTER all component scripts, BEFORE router.js
 *
 * Spec coverage:
 *   001–005 · All auth domain modules consume DevApp.showToast()
 *   Constitution G-01 · Audit events are append-only; dev panel is read-only
 *   ADR-005  · Technology-agnostic; no framework dependencies
 */

(function AppInit() {
  'use strict';

  // ── Toast Configuration ─────────────────────────────────────
  const TOAST_DURATION_MS = 4000;
  const TOAST_FADE_MS = 200;
  const TOAST_TYPES = ['success', 'error', 'warning', 'info'];

  // ── Audit Log (in-memory, demo only) ───────────────────────
  const auditLog = [];
  const MAX_AUDIT_ENTRIES = 50;

  // ═══════════════════════════════════════════════════════════
  // TOAST NOTIFICATION SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Ensure the toast region element exists in the DOM.
   * shell.css positions it at bottom-right with z-index: var(--z-toast).
   */
  function ensureToastRegion() {
    let region = document.getElementById('toast-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      region.setAttribute('role', 'log');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'false');
      region.setAttribute('aria-label', 'Notifications');
      document.body.appendChild(region);
    }
    return region;
  }

  /** SVG inner paths for each toast type. */
  const TOAST_ICON_PATHS = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  };

  /**
   * Display a non-blocking toast notification.
   *
   * @param {string}  message  - Text to display (will be HTML-escaped)
   * @param {string}  [type]   - 'success' | 'error' | 'warning' | 'info'
   * @param {number}  [duration] - Display duration in ms (default: 4000)
   * @returns {HTMLElement} The toast element
   */
  function showToast(message, type, duration) {
    type = TOAST_TYPES.includes(type) ? type : 'info';
    duration = typeof duration === 'number' && duration > 0 ? duration : TOAST_DURATION_MS;

    const region = ensureToastRegion();
    const toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    toast.innerHTML = ['<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"', ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">', TOAST_ICON_PATHS[type], '</svg>', '<span>' + escapeHtml(message) + '</span>'].join('');

    region.appendChild(toast);

    // Auto-dismiss with fade-out
    var dismissTimer = setTimeout(function () {
      dismissToast(toast);
    }, duration);

    // Allow early dismiss on click
    toast.addEventListener('click', function () {
      clearTimeout(dismissTimer);
      dismissToast(toast);
    });

    return toast;
  }

  function dismissToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(16px) scale(0.96)';
    toast.style.transition = ['opacity ' + TOAST_FADE_MS + 'ms ease-out', 'transform ' + TOAST_FADE_MS + 'ms ease-out'].join(', ');
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, TOAST_FADE_MS);
  }

  // ═══════════════════════════════════════════════════════════
  // HTML ESCAPE UTILITY
  // ═══════════════════════════════════════════════════════════

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ═══════════════════════════════════════════════════════════
  // REDUCED MOTION
  // ═══════════════════════════════════════════════════════════

  /**
   * If the user prefers reduced motion, collapse all CSS duration
   * custom properties to 0ms so transitions are instant.
   */
  function respectReducedMotion() {
    var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq) return;

    function applyMotionPreference(e) {
      var duration = e && e.matches ? '0ms' : null;
      var root = document.documentElement;
      ['--duration-fast', '--duration-base', '--duration-slow', '--duration-enter'].forEach(function (prop) {
        if (duration) {
          root.style.setProperty(prop, duration);
        } else {
          root.style.removeProperty(prop);
        }
      });
    }

    applyMotionPreference(mq);
    if (mq.addEventListener) {
      mq.addEventListener('change', applyMotionPreference);
    } else if (mq.addListener) {
      // Safari < 14 fallback
      mq.addListener(applyMotionPreference);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // KEYBOARD ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════

  /**
   * Global keyboard handling:
   *   - Focus trap inside active modal/overlay elements
   *   - Escape key dismiss for appropriate overlays
   */
  function initKeyboardNav() {
    // Focusable selector (ARIA-compatible)
    var FOCUSABLE = ['a[href]', 'button:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(', ');

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        handleTabTrap(e, FOCUSABLE);
      }
    });
  }

  /**
   * Trap Tab focus within the topmost active modal/overlay.
   * The lockout overlay is deliberately non-dismissible (security control).
   */
  function handleTabTrap(e, FOCUSABLE) {
    // Check for lockout overlay (FR-001-04)
    var lockout = document.getElementById('login-lockout-overlay');
    if (lockout && !lockout.hidden) {
      trapFocus(e, lockout, FOCUSABLE);
      return;
    }
  }

  function trapFocus(e, container, FOCUSABLE) {
    var focusable = Array.prototype.slice.call(container.querySelectorAll(FOCUSABLE));
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // AUDIT EVENT CONSOLE PANEL (Demo mode)
  // Constitution G-01: Events are append-only and read-only here
  // ═══════════════════════════════════════════════════════════

  function initAuditPanel() {
    document.addEventListener('auth:event', function (e) {
      if (!e || !e.detail) return;

      var entry = {
        time: new Date().toISOString(),
        name: e.detail.event_name || '(unnamed)',
        payload: e.detail.payload || {},
      };

      // Prepend (most-recent-first), cap at MAX_AUDIT_ENTRIES
      auditLog.unshift(entry);
      if (auditLog.length > MAX_AUDIT_ENTRIES) {
        auditLog.length = MAX_AUDIT_ENTRIES;
      }
    });

    // Expose read-only view for developer inspection
    Object.defineProperty(window, '_devAuditLog', {
      get: function () {
        return auditLog.slice();
      },
      enumerable: false,
      configurable: false,
    });
  }

  // ═══════════════════════════════════════════════════════════
  // DOCUMENT VISIBILITY
  // ═══════════════════════════════════════════════════════════

  /**
   * Broadcast a custom app:visibility event when the tab becomes
   * hidden or visible. Countdown timers (MFA, lockout) may pause.
   */
  function initVisibilityHandling() {
    document.addEventListener('visibilitychange', function () {
      document.dispatchEvent(
        new CustomEvent('app:visibility', {
          detail: { hidden: document.hidden },
          bubbles: true,
        }),
      );
    });
  }

  // ═══════════════════════════════════════════════════════════
  // GLOBAL ERROR BOUNDARY
  // ═══════════════════════════════════════════════════════════

  function initErrorBoundary() {
    window.addEventListener('error', function (e) {
      console.error('[Dev8X] Unhandled error:', e.message || '(no message)', '\n  at', (e.filename || '') + ':' + (e.lineno || 0));
    });

    window.addEventListener('unhandledrejection', function (e) {
      console.error('[Dev8X] Unhandled promise rejection:', e.reason);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // STARTUP BANNER (Demo mode)
  // ═══════════════════════════════════════════════════════════

  function logStartupBanner() {
    /* eslint-disable no-console */
    console.log('%c Dev8X %c Auth Module  v1.0.0 %c Demo ', 'background:#00c8a0;color:#080d1a;font-weight:700;padding:3px 8px;border-radius:4px 0 0 4px', 'background:#0f1729;color:#f0f4ff;padding:3px 8px', 'background:#d4a843;color:#080d1a;font-weight:700;padding:3px 8px;border-radius:0 4px 4px 0');
    console.log('%c Modules: 001-authentication · 002-portal-routing · 003-mfa · 004-password-reset · 005-sso', 'color:#6b7a99;font-size:11px');
    console.log('%c Audit log: window._devAuditLog', 'color:#6b7a99;font-size:11px');
    /* eslint-enable no-console */
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════

  window.DevApp = {
    /**
     * Show a toast notification.
     * @param {string} message
     * @param {'success'|'error'|'warning'|'info'} [type='info']
     * @param {number} [duration=4000]
     */
    showToast: showToast,

    /** HTML-escape a string for safe DOM insertion. */
    escapeHtml: escapeHtml,

    /** Return a copy of the current audit event log. */
    getAuditLog: function () {
      return auditLog.slice();
    },
  };

  // ═══════════════════════════════════════════════════════════
  // INITIALISE
  // ═══════════════════════════════════════════════════════════

  function init() {
    respectReducedMotion();
    initKeyboardNav();
    initAuditPanel();
    initVisibilityHandling();
    initErrorBoundary();
    ensureToastRegion();
    logStartupBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
