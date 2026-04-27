/**
 * sso-handler.js — 005-sso
 *
 * Handles the Google SSO callback screen states and the SSO
 * initiation flow from the login screen.
 *
 * Spec coverage:
 *   FR-005-01 · Start Google sign-in for supported portals
 *   FR-005-02 · Complete SSO callback safely
 *   FR-005-03 · Support account linking
 *   BR-005-01 · Portal eligibility (candidate / client only)
 *   BR-005-02 · Unique provider binding (no duplicate links)
 *   EVT-005-01 · auth.sso.started  (emitted from login screen by auth-form.js)
 *   EVT-005-02 · auth.sso.completed
 *   EVT-005-03 · auth.sso.linked
 *   INV-005-01 · Only validated handshakes may create sessions
 *   INV-005-02 · Linked provider identity is unique across accounts
 *   ADR-010    · SSO restricted to candidate and client portals
 *   ADR-006    · Pre-authentication portal routing
 */

(function SsoHandler() {
  'use strict';

  // ── Eligible portals (BR-005-01, ADR-010) ──────────────────
  const SSO_ELIGIBLE_PORTALS = ['candidate', 'client'];

  // ── Simulated callback processing times (ms) ───────────────
  const PROCESSING_DELAY = 1800; // Validate callback step
  const SUCCESS_HOLD = 1200; // Show success before redirect

  // ── State ───────────────────────────────────────────────────
  const state = {
    isLinkFlow: false, // true = account linking (FR-005-03)
    currentPortal: 'candidate',
    processingTimer: null,
  };

  // ── Navigation helper ───────────────────────────────────────
  function navigate(screenName) {
    if (window.App && typeof window.App.navigate === 'function') {
      window.App.navigate(screenName);
      return;
    }
    document.querySelectorAll('.screen').forEach(function (el) {
      const active = el.dataset.screen === screenName;
      el.classList.toggle('screen--active', active);
      if (active) el.classList.add('screen-enter');
    });
  }

  // ── Audit event emitter ─────────────────────────────────────
  function emitEvent(eventName, payload) {
    document.dispatchEvent(
      new CustomEvent('auth:event', {
        detail: { event_name: eventName, payload: payload },
        bubbles: true,
      }),
    );
  }

  // ── Mock API ────────────────────────────────────────────────
  const MockAPI = {
    /**
     * POST /api/v1/auth/sso/google/callback
     * INV-005-01: only validated handshakes may create sessions.
     */
    handleCallback: function (portal) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          // Demo: all callbacks succeed for eligible portals
          resolve({
            ok: true,
            data: {
              token: 'sso-token-' + Math.random().toString(36).slice(2),
              provider: 'google',
              linked_account: false,
            },
          });
        }, PROCESSING_DELAY);
      });
    },

    /**
     * POST /api/v1/auth/sso/google/link
     * BR-005-02: provider identity must be unique.
     */
    linkAccount: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            ok: true,
            data: {
              token: 'sso-link-token-' + Math.random().toString(36).slice(2),
              provider: 'google',
              linked_account: true,
            },
          });
        }, PROCESSING_DELAY);
      });
    },
  };

  // ═══════════════════════════════════════════════════════════
  // CALLBACK SCREEN STATE MACHINE
  // States: processing → success | error | ineligible
  // INV-005-01: only validated → linked transition creates sessions
  // ═══════════════════════════════════════════════════════════

  /** Show only the target state panel; hide all others. */
  function showCallbackState(stateName) {
    const stateIds = ['sso-state-processing', 'sso-state-linking', 'sso-state-success', 'sso-state-error', 'sso-state-ineligible'];

    stateIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.hidden = id !== stateName;
    });
  }

  /**
   * Populate and reveal the error state with a specific reason.
   * Used for: expired state, provider code failure, portal ineligibility,
   * and duplicate identity (BR-005-02).
   */
  function showError(title, body, reason, detail) {
    const titleEl = document.getElementById('sso-error-title');
    const bodyEl = document.getElementById('sso-error-body');
    const reasonEl = document.getElementById('sso-error-reason');
    const detailEl = document.getElementById('sso-error-detail');

    if (titleEl) titleEl.textContent = title || 'Sign-in failed';
    if (bodyEl) bodyEl.textContent = body || "We couldn't complete the Google sign-in.";
    if (reasonEl) reasonEl.textContent = reason || 'Unknown error';
    if (detailEl) detailEl.textContent = detail || '';

    showCallbackState('sso-state-error');
  }

  // ═══════════════════════════════════════════════════════════
  // PORTAL ELIGIBILITY CHECK (BR-005-01, ADR-010)
  // ═══════════════════════════════════════════════════════════

  function isPortalEligible(portalKey) {
    return SSO_ELIGIBLE_PORTALS.indexOf(portalKey) !== -1;
  }

  // ═══════════════════════════════════════════════════════════
  // PROCESS CALLBACK (normal SSO flow)
  // Lifecycle: initiated → validated → linked (EVT-005-02)
  // ═══════════════════════════════════════════════════════════

  function processCallback(portal) {
    state.currentPortal = portal;

    // BR-005-01: reject ineligible portals immediately
    if (!isPortalEligible(portal)) {
      showCallbackState('sso-state-ineligible');
      return;
    }

    // Show processing spinner
    showCallbackState('sso-state-processing');

    // Update processing subtitle
    const msgEl = document.getElementById('sso-state-message');
    const subEl = document.getElementById('sso-state-sub');
    if (msgEl) msgEl.textContent = 'Completing sign-in…';
    if (subEl) subEl.textContent = 'Verifying with Google';

    // INV-005-01: validate_callback() — initiated → validated
    MockAPI.handleCallback(portal)
      .then(function (response) {
        if (response.ok) {
          // validated → linked — session created (link_or_create())
          sessionStorage.setItem('dev8x_session_token', response.data.token);
          sessionStorage.setItem('dev8x_session_portal', portal);
          sessionStorage.setItem('dev8x_mfa_required', 'false');

          // Emit EVT-005-02
          emitEvent('auth.sso.completed', {
            provider: 'google',
            linked_account: response.data.linked_account,
          });

          // Show success state briefly before redirect
          showCallbackState('sso-state-success');

          state.processingTimer = setTimeout(function () {
            navigate('portal-' + portal);
          }, SUCCESS_HOLD);
        } else {
          // initiated → failed
          showError('Sign-in failed', "We couldn't complete the Google sign-in. The link may have expired or been used already.", 'Provider validation failed', 'Please return to the sign-in page and try again.');
        }
      })
      .catch(function () {
        showError('Connection error', "We couldn't reach the authentication service. Please try again.", 'Network error', 'Please check your connection and try again.');
      });
  }

  // ═══════════════════════════════════════════════════════════
  // PROCESS LINK FLOW (FR-005-03, EVT-005-03)
  // Lifecycle: initiated → validated → linked (link_or_create())
  // ═══════════════════════════════════════════════════════════

  function processLinkFlow(portal) {
    state.currentPortal = portal;

    if (!isPortalEligible(portal)) {
      showCallbackState('sso-state-ineligible');
      return;
    }

    // Show linking spinner
    showCallbackState('sso-state-linking');

    MockAPI.linkAccount()
      .then(function (response) {
        if (response.ok) {
          // INV-005-02: provider identity is now bound to this account
          // EVT-005-03
          emitEvent('auth.sso.linked', {
            provider: 'google',
          });

          showCallbackState('sso-state-success');

          state.processingTimer = setTimeout(function () {
            navigate('portal-' + portal);
          }, SUCCESS_HOLD);
        } else {
          // BR-005-02: provider identity already linked to another account
          showError('Account already linked', 'This Google account is already connected to a different Dev8X account.', 'Duplicate provider identity (INV-005-02)', 'Each Google account can only be linked to one Dev8X account. Try signing in with a different Google account.');
        }
      })
      .catch(function () {
        showError('Connection error', "We couldn't complete the account link. Please try again.", 'Network error', 'Please check your connection and try again.');
      });
  }

  // ═══════════════════════════════════════════════════════════
  // RETRY / RECOVERY BUTTON HANDLERS
  // ═══════════════════════════════════════════════════════════

  function bindRetryButtons() {
    // Error state: "Try again" — re-initiates the SSO flow
    const retryBtn = document.getElementById('sso-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', function () {
        clearTimeout(state.processingTimer);
        const portal = sessionStorage.getItem('dev8x_selected_portal') || 'candidate';

        // Emit EVT-005-01 for the fresh attempt
        emitEvent('auth.sso.started', { provider: 'google', portal: portal });

        if (state.isLinkFlow) {
          processLinkFlow(portal);
        } else {
          processCallback(portal);
        }
      });
    }

    // Error state: "Sign in with password" — back to login
    const usePasswordBtn = document.getElementById('sso-use-password-btn');
    if (usePasswordBtn) {
      usePasswordBtn.addEventListener('click', function () {
        clearTimeout(state.processingTimer);
        navigate('login');
      });
    }

    // Ineligible state: "Sign in with password"
    const ineligibleBackBtn = document.getElementById('sso-ineligible-back-btn');
    if (ineligibleBackBtn) {
      ineligibleBackBtn.addEventListener('click', function () {
        navigate('login');
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SCREEN LIFECYCLE
  // ═══════════════════════════════════════════════════════════

  /**
   * Called by router.js when the SSO callback screen becomes active.
   * Reads the selected portal and determines whether this is a
   * normal callback or an account-linking flow.
   *
   * @param {object} options
   * @param {boolean} [options.isLinkFlow] - true if linking an existing account
   */
  function onScreenActivate(options) {
    options = options || {};
    clearTimeout(state.processingTimer);

    state.isLinkFlow = !!options.isLinkFlow;
    const portal = sessionStorage.getItem('dev8x_selected_portal') || 'candidate';

    if (state.isLinkFlow) {
      processLinkFlow(portal);
    } else {
      processCallback(portal);
    }
  }

  function onScreenDeactivate() {
    clearTimeout(state.processingTimer);
  }

  // ═══════════════════════════════════════════════════════════
  // LISTEN FOR SSO INIT EVENTS FROM LOGIN SCREEN
  // auth-form.js emits 'auth:event' with event_name 'auth.sso.started'
  // ═══════════════════════════════════════════════════════════

  function bindAuthEventListener() {
    document.addEventListener('auth:event', function (e) {
      if (!e.detail || e.detail.event_name !== 'auth.sso.started') return;
      const portal = (e.detail.payload && e.detail.payload.portal) || 'candidate';

      // FR-005-01: only initiate for eligible portals
      if (!isPortalEligible(portal)) {
        // Navigate to callback screen to show the ineligible state
        showCallbackState('sso-state-ineligible');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INITIALISE
  // ═══════════════════════════════════════════════════════════

  function init() {
    bindRetryButtons();
    bindAuthEventListener();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Public API ──────────────────────────────────────────────
  window.SsoHandler = {
    onScreenActivate: onScreenActivate,
    onScreenDeactivate: onScreenDeactivate,
    isPortalEligible: isPortalEligible,
  };
})();
