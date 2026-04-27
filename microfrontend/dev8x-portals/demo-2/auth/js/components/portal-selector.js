/**
 * portal-selector.js — 002-portal-routing
 *
 * Handles portal card selection on the portal-select screen.
 * Stores the chosen portal, configures the login screen for that
 * portal context, then navigates to screen-login.
 *
 * Spec coverage:
 *   FR-002-01 · Publish portal metadata (card grid)
 *   FR-002-02 · Resolve post-auth destinations (portal config map)
 *   FR-002-03 · Prevent unauthorized navigation (portal claim stored)
 *   EVT-002-01 · auth.portal.selected (emitted on selection)
 *   ADR-010    · Admin/CRM cannot use SSO; admin requires MFA notice
 *   ADR-006    · Pre-authentication portal routing
 */

(function PortalSelector() {
  'use strict';

  // ── Portal configuration registry ──────────────────────────
  // Each entry mirrors contracts/access-control.yaml and ADR-010
  const PORTAL_CONFIG = {
    candidate: {
      label: 'Candidate',
      subtitle: 'Sign in to your Candidate account to continue.',
      accentVar: 'var(--portal-candidate)',
      sessionLabel: '24 h',
      sso: true,
      register: true,
      mfaRequired: false,
      rememberMe: true,
      maxAttempts: 5,
      lockoutMins: 30,
    },
    client: {
      label: 'Client',
      subtitle: 'Sign in to your Client account to continue.',
      accentVar: 'var(--portal-client)',
      sessionLabel: '24 h',
      sso: true,
      register: false,
      mfaRequired: false,
      rememberMe: true,
      maxAttempts: 5,
      lockoutMins: 30,
    },
    admin: {
      label: 'HR Admin',
      subtitle: 'Sign in to your Admin account. Two-factor authentication will be required.',
      accentVar: 'var(--portal-admin)',
      sessionLabel: '4 h',
      sso: false,
      register: false,
      mfaRequired: true,
      rememberMe: false,
      maxAttempts: 3,
      lockoutMins: 60,
    },
    crm: {
      label: 'CRM',
      subtitle: 'Sign in to your CRM account to continue.',
      accentVar: 'var(--portal-crm)',
      sessionLabel: '8 h',
      sso: false,
      register: false,
      mfaRequired: false,
      rememberMe: false,
      maxAttempts: 5,
      lockoutMins: 30,
    },
  };

  // ── Session storage key ─────────────────────────────────────
  const PORTAL_KEY = 'dev8x_selected_portal';

  // ── Navigation helper ───────────────────────────────────────
  // Delegates to global App.navigate if available (set by router.js),
  // otherwise falls back to direct DOM screen switching.
  function navigate(screenName) {
    if (window.App && typeof window.App.navigate === 'function') {
      window.App.navigate(screenName);
      return;
    }
    // Fallback: show/hide screens directly
    document.querySelectorAll('.screen').forEach(function (el) {
      const isTarget = el.dataset.screen === screenName;
      el.classList.toggle('screen--active', isTarget);
      if (isTarget) el.classList.add('screen-enter');
    });
  }

  // ── Retrieve current portal ─────────────────────────────────
  function getSelectedPortal() {
    return sessionStorage.getItem(PORTAL_KEY) || 'candidate';
  }

  // ── Store selected portal ───────────────────────────────────
  function setSelectedPortal(portalKey) {
    sessionStorage.setItem(PORTAL_KEY, portalKey);
  }

  // ── Update login card for the selected portal ───────────────
  // Called both on portal selection and when login screen resumes.
  function applyPortalToLoginScreen(portalKey) {
    const cfg = PORTAL_CONFIG[portalKey];
    if (!cfg) return;

    // Card data-portal (drives CSS accent line via screen.css)
    const card = document.getElementById('login-card');
    if (card) card.dataset.portal = portalKey;

    // Portal context pill
    const ctxBtn = document.getElementById('login-portal-ctx');
    if (ctxBtn) ctxBtn.dataset.portal = portalKey;

    const ctxDot = document.getElementById('login-ctx-dot');
    if (ctxDot) ctxDot.style.background = cfg.accentVar;

    const ctxLabel = document.getElementById('login-ctx-label');
    if (ctxLabel) ctxLabel.textContent = cfg.label;

    // Card title & subtitle
    const title = document.getElementById('login-title');
    if (title) title.textContent = 'Welcome back';

    const subtitle = document.getElementById('login-subtitle');
    if (subtitle) subtitle.textContent = cfg.subtitle;

    // Admin MFA notice (Constitution G-09, ADR-010)
    const mfaNotice = document.getElementById('login-mfa-notice');
    if (mfaNotice) {
      mfaNotice.hidden = !cfg.mfaRequired;
    }

    // SSO block (hidden for admin and CRM — ADR-010)
    const ssoBlock = document.getElementById('login-sso-block');
    if (ssoBlock) {
      ssoBlock.hidden = !cfg.sso;
    }

    // Remember-me row (hidden for admin — short session, no persistence)
    const rememberRow = document.getElementById('login-remember-row');
    if (rememberRow) {
      rememberRow.hidden = !cfg.rememberMe;
    }

    // Session hint label
    const sessionValue = document.getElementById('login-session-value');
    if (sessionValue) sessionValue.textContent = cfg.sessionLabel;

    // Register footer — only for candidate (FR-001-02)
    const registerFooter = document.getElementById('login-register-footer');
    if (registerFooter) {
      registerFooter.hidden = !cfg.register;
    }

    // Reset attempt dots to match portal's max attempts
    syncAttemptDots(portalKey);
  }

  // ── Sync attempt dot count to portal config ─────────────────
  function syncAttemptDots(portalKey) {
    const cfg = PORTAL_CONFIG[portalKey];
    if (!cfg) return;
    const container = document.getElementById('login-attempts');
    if (!container) return;

    // Clear existing dots
    const existing = container.querySelectorAll('.mfa-attempts__dot');
    existing.forEach(function (d) {
      d.remove();
    });

    // Re-create the correct number
    for (let i = 0; i < cfg.maxAttempts; i++) {
      const dot = document.createElement('span');
      dot.className = 'mfa-attempts__dot';
      dot.setAttribute('aria-hidden', 'true');
      container.insertBefore(dot, container.querySelector('.sr-only'));
    }

    // Reset ARIA label
    const srLabel = container.querySelector('#login-attempts-label');
    if (srLabel) srLabel.textContent = cfg.maxAttempts + ' attempts remaining';

    container.hidden = true;
  }

  // ── Emit audit event (EVT-002-01) ───────────────────────────
  function emitPortalSelected(portalKey) {
    const event = new CustomEvent('auth:event', {
      detail: {
        event_name: 'auth.portal.selected',
        payload: { portal_key: portalKey },
      },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  // ── Handle portal card click ─────────────────────────────────
  function handlePortalCardClick(e) {
    const card = e.currentTarget;
    const portalKey = card.dataset.portal;
    if (!PORTAL_CONFIG[portalKey]) return;

    // Visual feedback: brief scale animation
    card.style.transform = 'scale(0.97)';
    setTimeout(function () {
      card.style.transform = '';
    }, 150);

    // Persist selection
    setSelectedPortal(portalKey);

    // Update login screen context before navigating
    applyPortalToLoginScreen(portalKey);

    // Emit audit event
    emitPortalSelected(portalKey);

    // Navigate to login
    navigate('login');
  }

  // ── Handle "change portal" click on login screen ─────────────
  // The portal context pill on the login card routes back to select.
  function bindPortalContextButton() {
    const ctxBtn = document.getElementById('login-portal-ctx');
    if (!ctxBtn) return;
    ctxBtn.addEventListener('click', function () {
      navigate('portal-select');
    });
  }

  // ── Handle back button on login screen ──────────────────────
  function bindLoginBackButton() {
    const backBtn = document.getElementById('login-back-btn');
    if (!backBtn) return;
    backBtn.addEventListener('click', function () {
      navigate('portal-select');
    });
  }

  // ── Bind portal cards ────────────────────────────────────────
  function bindPortalCards() {
    const cards = document.querySelectorAll('.portal-card[data-portal]');
    cards.forEach(function (card) {
      card.addEventListener('click', handlePortalCardClick);

      // Keyboard: Enter and Space activate
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // ── Public API (consumed by router.js in batch 8) ───────────
  window.PortalSelector = {
    /** Re-apply the stored portal context when returning to login screen. */
    restorePortalContext: function () {
      applyPortalToLoginScreen(getSelectedPortal());
    },
    /** Retrieve current portal config object. */
    getConfig: function () {
      return PORTAL_CONFIG[getSelectedPortal()] || PORTAL_CONFIG.candidate;
    },
    /** Retrieve current portal key. */
    getPortalKey: function () {
      return getSelectedPortal();
    },
    /** All portal configs (used by auth-form.js for lockout policy). */
    PORTAL_CONFIG: PORTAL_CONFIG,
  };

  // ── Initialise ───────────────────────────────────────────────
  function init() {
    bindPortalCards();
    bindPortalContextButton();
    bindLoginBackButton();

    // Apply last-selected portal to login screen on load
    // (handles page refresh mid-flow)
    applyPortalToLoginScreen(getSelectedPortal());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
