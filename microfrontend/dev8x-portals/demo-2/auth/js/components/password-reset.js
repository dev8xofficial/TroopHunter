/**
 * password-reset.js — 004-password-reset
 *
 * All interactive logic for the 3-step password reset screen.
 *
 * Step 1 — Request:  POST /api/v1/auth/password/request
 * Step 2 — Verify:   POST /api/v1/auth/password/verify-token
 * Step 3 — Complete: POST /api/v1/auth/password/reset
 *
 * Spec coverage:
 *   FR-004-01 · Issue reset requests safely (no user enumeration)
 *   FR-004-02 · Verify reset tokens
 *   FR-004-03 · Complete password reset + revoke sessions
 *   BR-004-01 · Indistinguishable response for known/unknown emails
 *   BR-004-02 · Token consumed on completion; sessions revoked
 *   EVT-004-01 · auth.password.reset_requested
 *   EVT-004-02 · auth.password.token_verified
 *   EVT-004-03 · auth.password.reset_completed
 *   INV-004-01 · Consumed tokens cannot return to earlier state
 *   INV-004-02 · Only verified tokens may complete reset
 *   ADR-010    · Password complexity requirements
 */

(function PasswordReset() {
  'use strict';

  // ── Constants ───────────────────────────────────────────────
  const TOKEN_TTL_SECS = 23 * 60 + 59; // ~24 h display (one tick already elapsed)
  const RESEND_COOLDOWN = 60; // Seconds before re-request is available
  const TOKEN_CODE_LEN = 6; // Demo uses a 6-digit code

  // ── State ───────────────────────────────────────────────────
  const state = {
    currentStep: 1, // 1 | 2 | 3
    submittedEmail: '',
    verifiedToken: '',
    tokenExpiryTimer: null,
    resendCountdownTimer: null,
    tokenSecsRemaining: TOKEN_TTL_SECS,
    resendSecsRemaining: RESEND_COOLDOWN,
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
     * POST /api/v1/auth/password/request
     * BR-004-01: always returns accepted:true regardless of email existence.
     */
    requestReset: function (email) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            ok: true,
            data: {
              accepted: true,
              token_valid: null,
              sessions_revoked: 0,
            },
          });
        }, 900);
      });
    },

    /**
     * POST /api/v1/auth/password/verify-token
     * INV-004-02: only a valid token may advance to step 3.
     */
    verifyToken: function (token) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          // Demo: any 6-digit code is valid
          const valid = /^\d{6}$/.test(token);
          resolve({
            ok: valid,
            data: {
              accepted: valid,
              token_valid: valid,
              sessions_revoked: 0,
            },
          });
        }, 800);
      });
    },

    /**
     * POST /api/v1/auth/password/reset
     * BR-004-02: token consumed; sessions revoked.
     * INV-004-01: consumed token cannot be reused.
     */
    completeReset: function (token, password) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            ok: true,
            data: {
              accepted: true,
              token_valid: false, // now consumed
              sessions_revoked: 2,
            },
          });
        }, 1000);
      });
    },
  };

  // ═══════════════════════════════════════════════════════════
  // STEP INDICATOR
  // ═══════════════════════════════════════════════════════════

  function advanceStep(toStep) {
    state.currentStep = toStep;

    [1, 2, 3].forEach(function (n) {
      const stepEl = document.getElementById('reset-step-' + n);
      if (!stepEl) return;
      stepEl.classList.remove('reset-step--active', 'reset-step--done');

      if (n < toStep) {
        stepEl.classList.add('reset-step--done');
        stepEl.setAttribute('aria-label', 'Step ' + n + ': complete');
      } else if (n === toStep) {
        stepEl.classList.add('reset-step--active');
        stepEl.setAttribute('aria-current', 'step');
        stepEl.setAttribute('aria-label', 'Step ' + n + ': current');
      } else {
        stepEl.removeAttribute('aria-current');
        stepEl.setAttribute('aria-label', 'Step ' + n + ': pending');
      }
    });

    // Fill connector lines for completed steps
    [1, 2].forEach(function (n) {
      const connector = document.getElementById('reset-connector-' + n);
      if (!connector) return;
      connector.classList.toggle('reset-step-connector--done', n < toStep);
    });

    // Show correct panel
    const panels = ['request', 'verify', 'new-password'];
    panels.forEach(function (name, i) {
      const panel = document.getElementById('reset-panel-' + name);
      if (panel) panel.hidden = i + 1 !== toStep;
    });

    // Update subtitle per step
    updateSubtitle(toStep);
    hideResetError();
  }

  function updateSubtitle(step) {
    const subtitle = document.getElementById('reset-subtitle');
    if (!subtitle) return;

    const messages = {
      1: "Enter your email address and we'll send you a link to reset your password.",
      2: 'Enter the 6-digit verification code we sent to your email.',
      3: 'Create a new password that meets the security requirements below.',
    };

    subtitle.textContent = messages[step] || '';
  }

  // ═══════════════════════════════════════════════════════════
  // ERROR DISPLAY
  // ═══════════════════════════════════════════════════════════

  function showResetError(message) {
    const container = document.getElementById('reset-error');
    const bodyEl = document.getElementById('reset-error-body');
    if (container) container.hidden = false;
    if (bodyEl) bodyEl.textContent = message;
  }

  function hideResetError() {
    const container = document.getElementById('reset-error');
    if (container) container.hidden = true;
  }

  function showFieldError(errorId, inputId) {
    const err = document.getElementById(errorId);
    const input = document.getElementById(inputId);
    if (err) err.hidden = false;
    if (input) input.classList.add('input--error');
  }

  function hideFieldError(errorId, inputId) {
    const err = document.getElementById(errorId);
    const input = document.getElementById(inputId);
    if (err) err.hidden = true;
    if (input) input.classList.remove('input--error');
  }

  function setButtonLoading(btnId, loading, label) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.classList.toggle('btn--loading', loading);
    if (!loading && label) btn.textContent = label;
  }

  // ═══════════════════════════════════════════════════════════
  // FIELD VALIDATION
  // ═══════════════════════════════════════════════════════════

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value || '').trim());
  }

  function isValidPassword(value) {
    return (value || '').length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
  }

  // ═══════════════════════════════════════════════════════════
  // PASSWORD STRENGTH METER
  // ═══════════════════════════════════════════════════════════

  const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

  function calcStrength(pw) {
    if (!pw || pw.length === 0) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 5);
  }

  function initStrengthMeter(inputId, meterId, labelId) {
    const input = document.getElementById(inputId);
    const meter = document.getElementById(meterId);
    const label = document.getElementById(labelId);
    if (!input || !meter) return;

    input.addEventListener('input', function () {
      const score = calcStrength(input.value);
      meter.dataset.strength = score;
      meter.setAttribute('aria-valuenow', score);
      if (label) label.textContent = score > 0 ? STRENGTH_LABELS[score] : '—';
    });
  }

  function initMatchIndicator(passwordId, confirmId, matchBadgeId, errorId) {
    const pw = document.getElementById(passwordId);
    const cfm = document.getElementById(confirmId);
    const badge = document.getElementById(matchBadgeId);
    const err = document.getElementById(errorId);
    if (!pw || !cfm) return;

    function check() {
      const both = pw.value.length > 0 && cfm.value.length > 0;
      const match = pw.value === cfm.value;
      if (badge) badge.hidden = !(both && match);
      if (err) err.hidden = !(both && !match);
      cfm.classList.toggle('input--success', both && match);
      cfm.classList.toggle('input--error', both && !match);
    }

    pw.addEventListener('input', check);
    cfm.addEventListener('input', check);
  }

  function initPasswordToggle(toggleId, inputId, showId, hideId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    const iconShow = document.getElementById(showId);
    const iconHide = document.getElementById(hideId);
    if (!toggle || !input) return;

    toggle.addEventListener('click', function () {
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      toggle.setAttribute('aria-pressed', String(!showing));
      toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
      if (iconShow) iconShow.style.display = showing ? '' : 'none';
      if (iconHide) iconHide.style.display = showing ? 'none' : '';
    });
  }

  // ═══════════════════════════════════════════════════════════
  // TOKEN EXPIRY COUNTDOWN (Step 2)
  // ═══════════════════════════════════════════════════════════

  function startTokenExpiryCountdown() {
    clearInterval(state.tokenExpiryTimer);
    state.tokenSecsRemaining = TOKEN_TTL_SECS;

    const timerEl = document.getElementById('reset-token-timer');

    function formatTime(secs) {
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;
      if (h > 0) {
        return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      }
      return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function tick() {
      if (timerEl) timerEl.textContent = formatTime(state.tokenSecsRemaining);
      if (state.tokenSecsRemaining <= 0) {
        clearInterval(state.tokenExpiryTimer);
        // Token has expired — show error and return to step 1
        showResetError('Your reset link has expired. Please request a new one.');
        setTimeout(function () {
          advanceStep(1);
        }, 2500);
      }
      state.tokenSecsRemaining--;
    }

    tick();
    state.tokenExpiryTimer = setInterval(tick, 1000);
  }

  // ═══════════════════════════════════════════════════════════
  // RESEND COUNTDOWN (Step 1)
  // ═══════════════════════════════════════════════════════════

  function startResendCountdown() {
    clearInterval(state.resendCountdownTimer);
    state.resendSecsRemaining = RESEND_COOLDOWN;

    const resendBtn = document.getElementById('reset-resend-btn');
    const resendCountdown = document.getElementById('reset-resend-countdown');
    const resendBlock = document.getElementById('reset-resend-block');

    if (resendBlock) resendBlock.hidden = false;
    if (resendBtn) resendBtn.disabled = true;

    function tick() {
      if (resendCountdown) resendCountdown.textContent = state.resendSecsRemaining + 's';

      if (state.resendSecsRemaining <= 0) {
        clearInterval(state.resendCountdownTimer);
        if (resendBtn) resendBtn.disabled = false;
        if (resendCountdown) resendCountdown.textContent = '';
      }

      state.resendSecsRemaining--;
    }

    tick();
    state.resendCountdownTimer = setInterval(tick, 1000);
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 1: REQUEST
  // ═══════════════════════════════════════════════════════════

  function handleRequestSubmit(e) {
    e.preventDefault();

    const emailInput = document.getElementById('reset-email');
    const email = emailInput ? emailInput.value.trim() : '';

    hideResetError();
    hideFieldError('reset-email-error', 'reset-email');

    if (!isValidEmail(email)) {
      showFieldError('reset-email-error', 'reset-email');
      return;
    }

    setButtonLoading('reset-request-submit', true);

    MockAPI.requestReset(email)
      .then(function (response) {
        setButtonLoading('reset-request-submit', false, 'Send reset link');

        if (response.ok) {
          state.submittedEmail = email;

          // Emit EVT-004-01 — BR-004-01: same response regardless of email existence
          emitEvent('auth.password.reset_requested', {
            email: email,
            token_expires_at: new Date(Date.now() + TOKEN_TTL_SECS * 1000).toISOString(),
          });

          // Update step 2 email display
          const emailDisplay = document.getElementById('reset-email-display');
          if (emailDisplay) emailDisplay.textContent = email;

          // Advance to step 2
          advanceStep(2);
          startTokenExpiryCountdown();

          // Show resend block on step 1 after first submission
          startResendCountdown();
        } else {
          showResetError('Something went wrong. Please try again.');
        }
      })
      .catch(function () {
        setButtonLoading('reset-request-submit', false, 'Send reset link');
        showResetError('Unable to send reset link. Please check your connection and try again.');
      });
  }

  function bindRequestForm() {
    const form = document.getElementById('reset-request-form');
    if (!form) return;

    form.addEventListener('submit', handleRequestSubmit);

    const emailInput = document.getElementById('reset-email');
    if (emailInput) {
      emailInput.addEventListener('input', function () {
        hideResetError();
        hideFieldError('reset-email-error', 'reset-email');
      });
      emailInput.addEventListener('blur', function () {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
          showFieldError('reset-email-error', 'reset-email');
        }
      });
    }

    // Resend button
    const resendBtn = document.getElementById('reset-resend-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', function () {
        const email = state.submittedEmail || (document.getElementById('reset-email') ? document.getElementById('reset-email').value.trim() : '');
        if (!email) return;

        resendBtn.disabled = true;

        MockAPI.requestReset(email).then(function () {
          emitEvent('auth.password.reset_requested', {
            email: email,
            token_expires_at: new Date(Date.now() + TOKEN_TTL_SECS * 1000).toISOString(),
          });
          startResendCountdown();
        });
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 2: VERIFY TOKEN
  // ═══════════════════════════════════════════════════════════

  function handleVerifySubmit(e) {
    e.preventDefault();

    const tokenInput = document.getElementById('reset-token-input');
    const token = tokenInput ? tokenInput.value.trim() : '';

    hideResetError();
    hideFieldError('reset-token-error', 'reset-token-input');

    if (!token || token.length < TOKEN_CODE_LEN) {
      showFieldError('reset-token-error', 'reset-token-input');
      return;
    }

    setButtonLoading('reset-verify-submit', true);

    MockAPI.verifyToken(token)
      .then(function (response) {
        setButtonLoading('reset-verify-submit', false, 'Verify code');

        if (response.ok && response.data.token_valid) {
          state.verifiedToken = token;

          // Stop token expiry countdown — INV-004-02 satisfied
          clearInterval(state.tokenExpiryTimer);

          // Emit EVT-004-02
          emitEvent('auth.password.token_verified', {
            token_id: token,
          });

          // Advance to step 3
          advanceStep(3);
          initStrengthMeter('reset-new-password', 'reset-pw-strength', 'reset-strength-label');
          initMatchIndicator('reset-new-password', 'reset-confirm-password', 'reset-confirm-match', 'reset-confirm-error');
          initPasswordToggle('reset-pw-toggle', 'reset-new-password', 'reset-pw-icon-show', 'reset-pw-icon-hide');

          setTimeout(function () {
            const pwInput = document.getElementById('reset-new-password');
            if (pwInput) pwInput.focus();
          }, 100);
        } else {
          showFieldError('reset-token-error', 'reset-token-input');
          if (tokenInput) tokenInput.value = '';
          showResetError('The code you entered is invalid or has expired. Please check your email and try again.');
        }
      })
      .catch(function () {
        setButtonLoading('reset-verify-submit', false, 'Verify code');
        showResetError('Unable to verify code. Please check your connection and try again.');
      });
  }

  function bindVerifyForm() {
    const form = document.getElementById('reset-verify-form');
    if (!form) return;

    form.addEventListener('submit', handleVerifySubmit);

    const tokenInput = document.getElementById('reset-token-input');
    if (tokenInput) {
      tokenInput.addEventListener('input', function () {
        hideResetError();
        hideFieldError('reset-token-error', 'reset-token-input');
        // Strip non-digits
        tokenInput.value = tokenInput.value.replace(/\D/g, '').slice(0, TOKEN_CODE_LEN);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 3: NEW PASSWORD
  // ═══════════════════════════════════════════════════════════

  function handleNewPasswordSubmit(e) {
    e.preventDefault();

    const pwInput = document.getElementById('reset-new-password');
    const cfmInput = document.getElementById('reset-confirm-password');
    const password = pwInput ? pwInput.value : '';
    const confirm = cfmInput ? cfmInput.value : '';

    hideResetError();
    hideFieldError('reset-pw-error', 'reset-new-password');
    hideFieldError('reset-confirm-error', 'reset-confirm-password');

    let valid = true;

    if (!isValidPassword(password)) {
      showFieldError('reset-pw-error', 'reset-new-password');
      valid = false;
    }

    if (!confirm || confirm !== password) {
      showFieldError('reset-confirm-error', 'reset-confirm-password');
      valid = false;
    }

    if (!valid) return;

    setButtonLoading('reset-new-password-submit', true);

    MockAPI.completeReset(state.verifiedToken, password)
      .then(function (response) {
        setButtonLoading('reset-new-password-submit', false, 'Set new password');

        if (response.ok) {
          // INV-004-01: token is now consumed — cannot be reused
          state.verifiedToken = '';

          // BR-004-02: revoke sessions
          sessionStorage.removeItem('dev8x_session_token');
          sessionStorage.removeItem('dev8x_session_portal');
          sessionStorage.removeItem('dev8x_mfa_required');

          // Emit EVT-004-03
          emitEvent('auth.password.reset_completed', {
            sessions_revoked: response.data.sessions_revoked || 0,
          });

          // Show success state and hide the 3-step forms
          showSuccessState();
        } else {
          showResetError('Unable to update your password. Please try again.');
        }
      })
      .catch(function () {
        setButtonLoading('reset-new-password-submit', false, 'Set new password');
        showResetError('Unable to update your password. Please check your connection and try again.');
      });
  }

  function showSuccessState() {
    // Hide all step panels and step indicator
    ['request', 'verify', 'new-password'].forEach(function (name) {
      const panel = document.getElementById('reset-panel-' + name);
      if (panel) panel.hidden = true;
    });

    const steps = document.getElementById('reset-steps');
    const footer = document.getElementById('reset-footer');
    const subtitle = document.getElementById('reset-subtitle');

    if (steps) steps.hidden = true;
    if (footer) footer.hidden = true;
    if (subtitle) subtitle.textContent = 'Your password has been updated successfully.';

    const successEl = document.getElementById('reset-success');
    if (successEl) successEl.hidden = false;
  }

  function bindNewPasswordForm() {
    const form = document.getElementById('reset-new-password-form');
    if (!form) return;
    form.addEventListener('submit', handleNewPasswordSubmit);
  }

  // ═══════════════════════════════════════════════════════════
  // NAVIGATION / FOOTER LINKS
  // ═══════════════════════════════════════════════════════════

  function bindNavigationLinks() {
    // "Back to sign in" back button
    const backBtn = document.getElementById('reset-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        onScreenDeactivate();
        navigate('login');
      });
    }

    // Footer "Sign in" link
    const signinBtn = document.getElementById('reset-signin-btn');
    if (signinBtn) {
      signinBtn.addEventListener('click', function () {
        onScreenDeactivate();
        navigate('login');
      });
    }

    // Success state "Sign in" button
    const goLoginBtn = document.getElementById('reset-go-login-btn');
    if (goLoginBtn) {
      goLoginBtn.addEventListener('click', function () {
        onScreenDeactivate();
        navigate('login');
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SCREEN LIFECYCLE
  // ═══════════════════════════════════════════════════════════

  /**
   * Called by router.js when the password reset screen becomes active.
   * Always starts fresh from step 1.
   */
  function onScreenActivate() {
    clearInterval(state.tokenExpiryTimer);
    clearInterval(state.resendCountdownTimer);

    state.currentStep = 1;
    state.submittedEmail = '';
    state.verifiedToken = '';

    // Reset all panels to initial state
    advanceStep(1);

    const resendBlock = document.getElementById('reset-resend-block');
    if (resendBlock) resendBlock.hidden = true;

    const steps = document.getElementById('reset-steps');
    if (steps) steps.hidden = false;

    const footer = document.getElementById('reset-footer');
    if (footer) footer.hidden = false;

    const successEl = document.getElementById('reset-success');
    if (successEl) successEl.hidden = true;

    const emailInput = document.getElementById('reset-email');
    if (emailInput) emailInput.value = '';

    const tokenInput = document.getElementById('reset-token-input');
    if (tokenInput) {
      tokenInput.value = '';
      tokenInput.classList.remove('input--error', 'input--success');
    }

    setTimeout(function () {
      const emailInput = document.getElementById('reset-email');
      if (emailInput) emailInput.focus();
    }, 100);
  }

  /**
   * Called when navigating away from the reset screen.
   * Clears all timers.
   */
  function onScreenDeactivate() {
    clearInterval(state.tokenExpiryTimer);
    clearInterval(state.resendCountdownTimer);
  }

  // ═══════════════════════════════════════════════════════════
  // INITIALISE
  // ═══════════════════════════════════════════════════════════

  function init() {
    bindRequestForm();
    bindVerifyForm();
    bindNewPasswordForm();
    bindNavigationLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Public API ──────────────────────────────────────────────
  window.PasswordReset = {
    onScreenActivate: onScreenActivate,
    onScreenDeactivate: onScreenDeactivate,
  };
})();
