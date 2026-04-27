/**
 * auth-form.js — 001-authentication
 *
 * All interactive logic for the login and registration screens.
 *
 * Spec coverage:
 *   FR-001-01 · Validate email + password credentials
 *   FR-001-02 · Candidate self-registration
 *   FR-001-03 · Portal-scoped sessions (mfa_required flag handling)
 *   FR-001-04 · Account lockout policy (attempt dots + overlay timer)
 *   BR-001-01 · No user enumeration (same error for bad email or bad pw)
 *   BR-001-02 · Portal-scoped claims preserved in session response
 *   BR-001-03 · Admin lockout severity (3 attempts vs 5)
 *   EVT-001-01 · auth.session.login
 *   EVT-001-02 · auth.session.logout  (wired in router, not here)
 *   EVT-001-03 · auth.session.login_failed
 *   EVT-001-04 · auth.account.registered
 *   EVT-001-05 · auth.account.locked
 *   ADR-010    · Portal-specific session lifetimes and MFA routing
 *   Constitution G-09 · Admin MFA is mandatory — no bypass path
 */

(function AuthForm() {
  'use strict';

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
  // Simulates the API contract from api-contracts.md.
  // All calls resolve after a realistic network delay.
  // Replace with real fetch() in production.
  const MockAPI = {
    /** POST /api/v1/auth/login */
    login: function (email, password, portal) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          // Demo: any well-formed credentials succeed.
          // Admin portal always returns mfa_required: true (G-09).
          const now = new Date();
          const ttlMs = { admin: 4, crm: 8, candidate: 24, client: 24 }[portal] * 3600000;
          resolve({
            ok: true,
            data: {
              token: 'demo-token-' + Math.random().toString(36).slice(2),
              portal: portal,
              expires_at: new Date(now.getTime() + ttlMs).toISOString(),
              mfa_required: portal === 'admin',
            },
          });
        }, 900);
      });
    },

    /** POST /api/v1/auth/register */
    register: function (firstName, lastName, email, password) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            ok: true,
            data: {
              user_id: 'usr-' + Math.random().toString(36).slice(2),
              email: email,
              message: 'Account created. Please check your inbox to verify your email.',
            },
          });
        }, 1100);
      });
    },
  };

  // ════════════════════════════════════════════════════════════
  // PASSWORD TOGGLE
  // Shared by login and register screens.
  // ════════════════════════════════════════════════════════════

  function initPasswordToggle(toggleId, inputId, iconShowId, iconHideId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    const iconShow = document.getElementById(iconShowId);
    const iconHide = document.getElementById(iconHideId);
    if (!toggle || !input) return;

    toggle.addEventListener('click', function () {
      const isShowing = input.type === 'text';
      input.type = isShowing ? 'password' : 'text';
      toggle.setAttribute('aria-pressed', String(!isShowing));
      toggle.setAttribute('aria-label', isShowing ? 'Show password' : 'Hide password');
      if (iconShow) iconShow.style.display = isShowing ? '' : 'none';
      if (iconHide) iconHide.style.display = isShowing ? 'none' : '';
    });
  }

  // ════════════════════════════════════════════════════════════
  // PASSWORD STRENGTH METER
  // 5-level scoring: Weak / Fair / Good / Strong / Excellent
  // ════════════════════════════════════════════════════════════

  const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

  function calcPasswordStrength(pw) {
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
      const score = calcPasswordStrength(input.value);
      meter.dataset.strength = score;
      meter.setAttribute('aria-valuenow', score);
      if (label) label.textContent = score > 0 ? STRENGTH_LABELS[score] : '—';
    });
  }

  // ════════════════════════════════════════════════════════════
  // PASSWORD MATCH INDICATOR
  // ════════════════════════════════════════════════════════════

  function initMatchIndicator(passwordId, confirmId, matchBadgeId, errorId) {
    const pwInput = document.getElementById(passwordId);
    const cfInput = document.getElementById(confirmId);
    const badge = document.getElementById(matchBadgeId);
    const errorSpan = document.getElementById(errorId);
    if (!pwInput || !cfInput) return;

    function check() {
      const bothFilled = pwInput.value.length > 0 && cfInput.value.length > 0;
      const matches = pwInput.value === cfInput.value;

      if (badge) badge.hidden = !(bothFilled && matches);
      if (errorSpan) errorSpan.hidden = !(bothFilled && !matches);

      cfInput.classList.toggle('input--success', bothFilled && matches);
      cfInput.classList.toggle('input--error', bothFilled && !matches);
    }

    pwInput.addEventListener('input', check);
    cfInput.addEventListener('input', check);
  }

  // ════════════════════════════════════════════════════════════
  // FIELD VALIDATION HELPERS
  // ════════════════════════════════════════════════════════════

  function isValidEmail(value) {
    // RFC 5322 simplified — reject obvious malformations
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  function isValidPassword(value) {
    if (value.length < 8) return false;
    return /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
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

  // ════════════════════════════════════════════════════════════
  // BUTTON LOADING STATE
  // ════════════════════════════════════════════════════════════

  function setButtonLoading(btnId, loading, originalText) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.classList.toggle('btn--loading', loading);
    if (!loading && originalText) btn.textContent = originalText;
  }

  // ════════════════════════════════════════════════════════════
  // ATTEMPT TRACKER + LOCKOUT OVERLAY
  // FR-001-04, BR-001-03
  // ════════════════════════════════════════════════════════════

  const attemptState = { count: 0, locked: false, lockTimer: null };

  function getPortalConfig() {
    if (window.PortalSelector) return window.PortalSelector.getConfig();
    return { maxAttempts: 5, lockoutMins: 30 };
  }

  function getPortalKey() {
    if (window.PortalSelector) return window.PortalSelector.getPortalKey();
    return sessionStorage.getItem('dev8x_selected_portal') || 'candidate';
  }

  function resetAttempts() {
    attemptState.count = 0;
    attemptState.locked = false;
    clearInterval(attemptState.lockTimer);

    const container = document.getElementById('login-attempts');
    if (container) {
      container.hidden = true;
      container.querySelectorAll('.mfa-attempts__dot').forEach(function (d) {
        d.classList.remove('mfa-attempts__dot--used');
      });
    }

    const overlay = document.getElementById('login-lockout-overlay');
    if (overlay) overlay.hidden = true;
  }

  function recordFailedAttempt(email) {
    if (attemptState.locked) return;
    const cfg = getPortalConfig();
    attemptState.count++;

    // Reveal and update attempt dots
    const container = document.getElementById('login-attempts');
    if (container) {
      container.hidden = false;
      const dots = container.querySelectorAll('.mfa-attempts__dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('mfa-attempts__dot--used', i < attemptState.count);
      });
      const srLabel = document.getElementById('login-attempts-label');
      const remaining = Math.max(0, cfg.maxAttempts - attemptState.count);
      if (srLabel) srLabel.textContent = remaining + ' attempts remaining';
    }

    if (attemptState.count >= cfg.maxAttempts) {
      triggerLockout(email, cfg.lockoutMins);
    }
  }

  function triggerLockout(email, lockoutMins) {
    attemptState.locked = true;

    // Emit EVT-001-05
    emitEvent('auth.account.locked', {
      email: email,
      portal: getPortalKey(),
      locked_until: new Date(Date.now() + lockoutMins * 60000).toISOString(),
    });

    const overlay = document.getElementById('login-lockout-overlay');
    if (!overlay) return;
    overlay.hidden = false;

    // Countdown timer
    let totalSeconds = lockoutMins * 60;

    function tick() {
      const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const s = String(totalSeconds % 60).padStart(2, '0');
      const minEl = document.getElementById('lockout-min');
      const secEl = document.getElementById('lockout-sec');
      if (minEl) minEl.textContent = m;
      if (secEl) secEl.textContent = s;

      if (totalSeconds <= 0) {
        clearInterval(attemptState.lockTimer);
        overlay.hidden = true;
        attemptState.locked = false;
        attemptState.count = 0;
        const container = document.getElementById('login-attempts');
        if (container) container.hidden = true;
      }
      totalSeconds--;
    }

    tick();
    attemptState.lockTimer = setInterval(tick, 1000);
  }

  // ════════════════════════════════════════════════════════════
  // LOGIN FORM
  // FR-001-01, FR-001-03, FR-001-04
  // ════════════════════════════════════════════════════════════

  function showLoginError(title, body) {
    const container = document.getElementById('login-error');
    const titleEl = document.getElementById('login-error-title');
    const bodyEl = document.getElementById('login-error-body');
    if (container) container.hidden = false;
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
  }

  function hideLoginError() {
    const container = document.getElementById('login-error');
    if (container) container.hidden = true;
  }

  function validateLoginFields(email, password) {
    let valid = true;

    if (!isValidEmail(email)) {
      showFieldError('login-email-error', 'login-email');
      valid = false;
    } else {
      hideFieldError('login-email-error', 'login-email');
    }

    if (!password || password.length < 8) {
      showFieldError('login-password-error', 'login-password');
      valid = false;
    } else {
      hideFieldError('login-password-error', 'login-password');
    }

    return valid;
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (attemptState.locked) return;

    const emailEl = document.getElementById('login-email');
    const passwordEl = document.getElementById('login-password');
    if (!emailEl || !passwordEl) return;

    const email = emailEl.value.trim();
    const password = passwordEl.value;
    const portal = getPortalKey();

    hideLoginError();

    if (!validateLoginFields(email, password)) return;

    setButtonLoading('login-submit-btn', true);

    MockAPI.login(email, password, portal)
      .then(function (response) {
        setButtonLoading('login-submit-btn', false, 'Sign in');

        if (response.ok) {
          // Persist session token (demo only — real app uses HttpOnly cookie)
          sessionStorage.setItem('dev8x_session_token', response.data.token);
          sessionStorage.setItem('dev8x_session_portal', response.data.portal);
          sessionStorage.setItem('dev8x_mfa_required', String(response.data.mfa_required));

          // Emit EVT-001-01
          emitEvent('auth.session.login', {
            portal: response.data.portal,
            ip_address: '(client)',
            user_agent: navigator.userAgent,
          });

          resetAttempts();

          // Admin must complete MFA before reaching portal (G-09)
          if (response.data.mfa_required) {
            navigate('mfa');
          } else {
            // Emit route-resolved and navigate to portal
            emitEvent('auth.route.resolved', {
              portal_key: portal,
              role: '(demo)',
              decision: 'allow',
              resolved_route: '/' + portal + '/dashboard',
            });
            navigate('portal-' + portal); // router handles unknown → mock dashboard
          }
        } else {
          // BR-001-01: same message for bad email OR bad password
          showLoginError('Invalid email or password', 'Please check your credentials and try again.');
          recordFailedAttempt(email);

          // Emit EVT-001-03
          emitEvent('auth.session.login_failed', {
            email: email,
            portal: portal,
            attempt_count: attemptState.count,
          });
        }
      })
      .catch(function () {
        setButtonLoading('login-submit-btn', false, 'Sign in');
        showLoginError('Connection error', 'Unable to reach the server. Please try again.');
      });
  }

  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', handleLoginSubmit);

    // Inline validation on blur
    const emailInput = document.getElementById('login-email');
    if (emailInput) {
      emailInput.addEventListener('blur', function () {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
          showFieldError('login-email-error', 'login-email');
        } else {
          hideFieldError('login-email-error', 'login-email');
        }
      });
    }

    // Clear error on input
    const passwordInput = document.getElementById('login-password');
    if (passwordInput) {
      passwordInput.addEventListener('input', function () {
        hideFieldError('login-password-error', 'login-password');
        hideLoginError();
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', function () {
        hideLoginError();
      });
    }

    // Password show/hide
    initPasswordToggle('login-pw-toggle', 'login-password', 'login-pw-icon-show', 'login-pw-icon-hide');

    // Forgot password → reset screen
    const forgotBtn = document.getElementById('login-forgot-btn');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', function () {
        navigate('password-reset');
      });
    }

    // Register link (candidate only — portal-selector.js controls visibility)
    const registerBtn = document.getElementById('login-register-btn');
    if (registerBtn) {
      registerBtn.addEventListener('click', function () {
        navigate('register');
      });
    }

    // Google SSO button → SSO init
    const googleBtn = document.getElementById('login-google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', function () {
        const portal = getPortalKey();
        // Emit EVT-005-01
        emitEvent('auth.sso.started', { provider: 'google', portal: portal });
        navigate('sso-callback');
      });
    }

    // Session hint: update when remember-me toggled
    const rememberCheckbox = document.getElementById('login-remember');
    const sessionValue = document.getElementById('login-session-value');
    if (rememberCheckbox && sessionValue) {
      rememberCheckbox.addEventListener('change', function () {
        const cfg = getPortalConfig();
        sessionValue.textContent = rememberCheckbox.checked ? '30 d' : cfg.sessionLabel;
      });
    }
  }

  // ════════════════════════════════════════════════════════════
  // REGISTER FORM
  // FR-001-02
  // ════════════════════════════════════════════════════════════

  function validateRegisterFields(firstName, lastName, email, password, confirm) {
    let valid = true;

    if (!firstName || firstName.trim().length === 0) {
      showFieldError('reg-first-name-error', 'reg-first-name');
      valid = false;
    } else {
      hideFieldError('reg-first-name-error', 'reg-first-name');
    }

    if (!lastName || lastName.trim().length === 0) {
      showFieldError('reg-last-name-error', 'reg-last-name');
      valid = false;
    } else {
      hideFieldError('reg-last-name-error', 'reg-last-name');
    }

    if (!isValidEmail(email)) {
      showFieldError('reg-email-error', 'reg-email');
      valid = false;
    } else {
      hideFieldError('reg-email-error', 'reg-email');
    }

    if (!isValidPassword(password)) {
      showFieldError('reg-password-error', 'reg-password');
      valid = false;
    } else {
      hideFieldError('reg-password-error', 'reg-password');
    }

    if (!confirm || confirm !== password) {
      showFieldError('reg-confirm-error', 'reg-password-confirm');
      valid = false;
    } else {
      hideFieldError('reg-confirm-error', 'reg-password-confirm');
    }

    return valid;
  }

  function showRegisterError(message) {
    const container = document.getElementById('register-error');
    const bodyEl = document.getElementById('register-error-body');
    if (container) container.hidden = false;
    if (bodyEl) bodyEl.textContent = message;
  }

  function hideRegisterError() {
    const container = document.getElementById('register-error');
    if (container) container.hidden = true;
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();

    const firstName = (document.getElementById('reg-first-name') || {}).value || '';
    const lastName = (document.getElementById('reg-last-name') || {}).value || '';
    const email = ((document.getElementById('reg-email') || {}).value || '').trim();
    const password = (document.getElementById('reg-password') || {}).value || '';
    const confirm = (document.getElementById('reg-password-confirm') || {}).value || '';

    hideRegisterError();

    if (!validateRegisterFields(firstName, lastName, email, password, confirm)) return;

    setButtonLoading('register-submit-btn', true);

    MockAPI.register(firstName, lastName, email, password)
      .then(function (response) {
        setButtonLoading('register-submit-btn', false, 'Create account');

        if (response.ok) {
          // Emit EVT-001-04
          emitEvent('auth.account.registered', {
            email: email,
            registration_method: 'email',
          });

          // Show success state — BR-001-01: same message even if email exists
          const successEl = document.getElementById('register-success');
          const formEl = document.getElementById('register-form');
          if (successEl) successEl.hidden = false;
          if (formEl) formEl.hidden = true;

          // Hide footer links during success
          const footer = document.querySelector('#screen-register .auth-card__footer');
          if (footer) footer.hidden = true;
          const terms = document.querySelector('#screen-register .register-terms');
          if (terms) terms.hidden = true;
        } else {
          // Generic error (BR-001-01 — no email enumeration in error messaging)
          showRegisterError('Something went wrong. Please try again.');
        }
      })
      .catch(function () {
        setButtonLoading('register-submit-btn', false, 'Create account');
        showRegisterError('Unable to create your account. Please check your connection and try again.');
      });
  }

  function initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', handleRegisterSubmit);

    // Password show/hide
    initPasswordToggle('reg-pw-toggle', 'reg-password', 'reg-pw-icon-show', 'reg-pw-icon-hide');

    // Strength meter
    initStrengthMeter('reg-password', 'reg-password-strength', 'reg-strength-label');

    // Match indicator
    initMatchIndicator('reg-password', 'reg-password-confirm', 'reg-confirm-match', 'reg-confirm-error');

    // Inline email validation on blur
    const emailInput = document.getElementById('reg-email');
    if (emailInput) {
      emailInput.addEventListener('blur', function () {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
          showFieldError('reg-email-error', 'reg-email');
        } else {
          hideFieldError('reg-email-error', 'reg-email');
        }
      });
    }

    // Back to login
    const backBtn = document.getElementById('register-back-btn');
    const signinBtn = document.getElementById('register-signin-btn');

    [backBtn, signinBtn].forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('click', function () {
        // Reset form state before navigating away
        form.reset();
        hideRegisterError();
        const successEl = document.getElementById('register-success');
        if (successEl) successEl.hidden = true;
        form.hidden = false;
        const footer = document.querySelector('#screen-register .auth-card__footer');
        if (footer) footer.hidden = false;
        const terms = document.querySelector('#screen-register .register-terms');
        if (terms) terms.hidden = false;
        // Reset strength meter
        const meter = document.getElementById('reg-password-strength');
        if (meter) {
          meter.dataset.strength = 0;
        }
        const strengthLabel = document.getElementById('reg-strength-label');
        if (strengthLabel) strengthLabel.textContent = '—';
        navigate('login');
      });
    });
  }

  // ════════════════════════════════════════════════════════════
  // INITIALISE
  // ════════════════════════════════════════════════════════════

  function init() {
    initLoginForm();
    initRegisterForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Public API ──────────────────────────────────────────────
  window.AuthForm = {
    resetAttempts: resetAttempts,
  };
})();
