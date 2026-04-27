/**
 * mfa-challenge.js — 003-mfa
 *
 * All interactive logic for the MFA verification screen.
 * Handles TOTP digit input, recovery code entry, tab switching,
 * countdown timers, attempt tracking, and challenge rotation.
 *
 * Spec coverage:
 *   FR-003-01 · Issue MFA challenges for privileged sessions
 *   FR-003-02 · Verify TOTP or recovery code
 *   FR-003-03 · Support step-up verification
 *   BR-003-01 · Single active challenge (new challenge invalidates prior)
 *   BR-003-02 · Recovery code consumption (server enforced; low-codes warn)
 *   EVT-003-01 · auth.mfa.challenge_issued
 *   EVT-003-02 · auth.mfa.verified
 *   EVT-003-03 · auth.mfa.failed
 *   EVT-003-04 · auth.mfa.expired
 *   INV-003-01 · verified/failed/expired challenges are terminal
 *   INV-003-02 · expired challenges cannot be re-promoted to issued
 *   Constitution G-09 · MFA mandatory for admin; no bypass path
 *   ADR-010    · Admin sessions expire after 4 h; TOTP valid 30 s
 */

(function MfaChallenge() {
  'use strict';

  // ── Constants ───────────────────────────────────────────────
  const TOTP_WINDOW_SECS = 30; // TOTP code validity window
  const MAX_ATTEMPTS = 3; // FR-003-02: 3 failed attempts → terminal
  const RESEND_COOLDOWN = 30; // Seconds before resend is available
  const RECOVERY_LOW_THRESHOLD = 2; // Warn when fewer than this many codes remain

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
     * POST /api/v1/auth/mfa/challenge
     * Issues or rotates a challenge (BR-003-01: prior challenge expired).
     */
    issueChallenge: function (sessionId, challengeType) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            ok: true,
            data: {
              challenge_id: 'chal-' + Math.random().toString(36).slice(2),
              status: 'issued',
              session_activated: false,
            },
          });
        }, 600);
      });
    },

    /**
     * POST /api/v1/auth/mfa/verify
     * Verifies a submitted TOTP code.
     */
    verifyTotp: function (challengeId, code) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          // Demo: any 6-digit code passes
          const valid = /^\d{6}$/.test(code);
          resolve({
            ok: valid,
            data: {
              challenge_id: challengeId,
              status: valid ? 'verified' : 'failed',
              session_activated: valid,
            },
          });
        }, 800);
      });
    },

    /**
     * POST /api/v1/auth/mfa/recovery
     * Verifies a recovery code.
     */
    verifyRecovery: function (challengeId, code) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          // Demo: any non-empty code passes; simulate low-codes on 3rd+ try
          const valid = code.trim().length >= 8;
          resolve({
            ok: valid,
            data: {
              challenge_id: challengeId,
              status: valid ? 'verified' : 'failed',
              session_activated: valid,
              remaining_codes: 1, // Simulate low recovery codes
            },
          });
        }, 800);
      });
    },
  };

  // ── State ───────────────────────────────────────────────────
  const state = {
    currentChallengeId: 'chal-demo-initial',
    activeTab: 'totp', // 'totp' | 'recovery'
    totpAttempts: 0,
    recoveryAttempts: 0,
    totpExpired: false,
    totpCountdownTimer: null,
    resendCountdownTimer: null,
    resendSecsRemaining: RESEND_COOLDOWN,
  };

  // ═══════════════════════════════════════════════════════════
  // TAB SWITCHING
  // ═══════════════════════════════════════════════════════════

  function switchTab(tabName) {
    state.activeTab = tabName;

    const totpTab = document.getElementById('mfa-tab-totp');
    const recoveryTab = document.getElementById('mfa-tab-recovery');
    const totpPanel = document.getElementById('mfa-panel-totp');
    const recoveryPanel = document.getElementById('mfa-panel-recovery');
    const subtitle = document.getElementById('mfa-subtitle');

    if (!totpTab || !recoveryTab || !totpPanel || !recoveryPanel) return;

    const isTOTP = tabName === 'totp';

    totpTab.setAttribute('aria-selected', String(isTOTP));
    totpTab.classList.toggle('mfa-type-tabs__tab--active', isTOTP);
    recoveryTab.setAttribute('aria-selected', String(!isTOTP));
    recoveryTab.classList.toggle('mfa-type-tabs__tab--active', !isTOTP);

    totpPanel.hidden = !isTOTP;
    recoveryPanel.hidden = isTOTP;

    if (subtitle) {
      subtitle.textContent = isTOTP ? 'Enter the 6-digit code from your authenticator app to complete sign-in.' : 'Use one of your saved recovery codes to verify your identity.';
    }

    hideMfaError();
  }

  function bindTabs() {
    const tabs = document.querySelectorAll('#mfa-tabs .mfa-type-tabs__tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchTab(tab.dataset.tab);
      });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchTab(tab.dataset.tab);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // OTP DIGIT INPUT
  // ═══════════════════════════════════════════════════════════

  const OTP_IDS = ['otp-1', 'otp-2', 'otp-3', 'otp-4', 'otp-5', 'otp-6'];

  function getOtpDigits() {
    return OTP_IDS.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);
  }

  function getOtpCode() {
    return getOtpDigits()
      .map(function (el) {
        return el.value;
      })
      .join('');
  }

  function clearOtpDigits() {
    getOtpDigits().forEach(function (el) {
      el.value = '';
      el.classList.remove('otp-digit--filled', 'otp-digit--error', 'otp-digit--success');
    });
    enableSubmitWhenComplete();
  }

  function markOtpError() {
    getOtpDigits().forEach(function (el) {
      el.classList.add('otp-digit--error');
      el.classList.remove('otp-digit--filled', 'otp-digit--success');
    });
  }

  function markOtpSuccess() {
    getOtpDigits().forEach(function (el) {
      el.classList.add('otp-digit--success');
      el.classList.remove('otp-digit--filled', 'otp-digit--error');
    });
  }

  function enableSubmitWhenComplete() {
    const btn = document.getElementById('mfa-totp-submit');
    const code = getOtpCode();
    if (btn) btn.disabled = code.length < 6;
  }

  function focusDigit(index) {
    const digits = getOtpDigits();
    if (digits[index]) digits[index].focus();
  }

  function bindOtpInput() {
    const digits = getOtpDigits();

    digits.forEach(function (digit, index) {
      // Input handler: accept one digit, auto-advance
      digit.addEventListener('input', function (e) {
        const raw = e.target.value.replace(/\D/g, '');
        // Accept only the last typed character
        e.target.value = raw.slice(-1);
        e.target.classList.toggle('otp-digit--filled', e.target.value.length > 0);
        e.target.classList.remove('otp-digit--error');

        if (e.target.value && index < digits.length - 1) {
          focusDigit(index + 1);
        }
        enableSubmitWhenComplete();
      });

      // Keydown: handle backspace navigation and arrow keys
      digit.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace') {
          if (!e.target.value && index > 0) {
            focusDigit(index - 1);
            const prev = digits[index - 1];
            if (prev) {
              prev.value = '';
              prev.classList.remove('otp-digit--filled', 'otp-digit--error');
            }
          } else {
            e.target.value = '';
            e.target.classList.remove('otp-digit--filled', 'otp-digit--error');
          }
          enableSubmitWhenComplete();
        } else if (e.key === 'ArrowLeft' && index > 0) {
          e.preventDefault();
          focusDigit(index - 1);
        } else if (e.key === 'ArrowRight' && index < digits.length - 1) {
          e.preventDefault();
          focusDigit(index + 1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const code = getOtpCode();
          if (code.length === 6) submitTotp();
        }
      });

      // Paste: distribute digits across boxes
      digit.addEventListener('paste', function (e) {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);

        pasted.split('').forEach(function (char, i) {
          const target = digits[index + i];
          if (target) {
            target.value = char;
            target.classList.add('otp-digit--filled');
            target.classList.remove('otp-digit--error');
          }
        });

        // Focus the next empty digit or the last one
        const nextEmpty = digits.findIndex(function (d, i) {
          return i >= index && !d.value;
        });
        focusDigit(nextEmpty >= 0 ? nextEmpty : digits.length - 1);
        enableSubmitWhenComplete();
      });

      // Select-all on focus for easy replacement
      digit.addEventListener('focus', function () {
        digit.select();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // TOTP COUNTDOWN TIMER
  // ═══════════════════════════════════════════════════════════

  function startTotpCountdown() {
    clearInterval(state.totpCountdownTimer);
    state.totpExpired = false;
    let secsLeft = TOTP_WINDOW_SECS;

    const timerEl = document.getElementById('mfa-totp-countdown');

    function tick() {
      if (timerEl) {
        timerEl.textContent = secsLeft;
        timerEl.classList.toggle('mfa-expiry__timer--urgent', secsLeft <= 10);
      }

      if (secsLeft <= 0) {
        clearInterval(state.totpCountdownTimer);
        state.totpExpired = true;

        // INV-003-02: expired challenge is terminal; auto-emit expiry event
        emitEvent('auth.mfa.expired', { challenge_id: state.currentChallengeId });

        // Clear digits and disable submit to prevent reuse
        clearOtpDigits();
        showMfaError('Code expired', 'Your authenticator code has expired. A new challenge has been issued automatically.');

        // Silently issue new challenge (BR-003-01) and restart countdown
        MockAPI.issueChallenge(null, 'totp').then(function (r) {
          if (r.ok) {
            state.currentChallengeId = r.data.challenge_id;
            state.totpAttempts = 0;
            resetAttemptDots('mfa-totp-attempts', 'mfa-totp-attempts-label');
            emitEvent('auth.mfa.challenge_issued', {
              challenge_id: r.data.challenge_id,
              challenge_type: 'totp',
              expires_at: new Date(Date.now() + TOTP_WINDOW_SECS * 1000).toISOString(),
            });
            // Wait a beat then clear error and start fresh
            setTimeout(function () {
              hideMfaError();
              startTotpCountdown();
            }, 1500);
          }
        });
      }

      secsLeft--;
    }

    tick();
    state.totpCountdownTimer = setInterval(tick, 1000);
  }

  // ═══════════════════════════════════════════════════════════
  // RESEND / ROTATE CHALLENGE COUNTDOWN
  // ═══════════════════════════════════════════════════════════

  function startResendCountdown() {
    clearInterval(state.resendCountdownTimer);
    state.resendSecsRemaining = RESEND_COOLDOWN;

    const resendBtn = document.getElementById('mfa-resend-btn');
    const resendCountdown = document.getElementById('mfa-resend-countdown');

    if (resendBtn) resendBtn.disabled = true;

    function tick() {
      if (resendCountdown) {
        resendCountdown.textContent = state.resendSecsRemaining + 's';
        resendCountdown.setAttribute('aria-hidden', 'true');
      }

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

  function bindResendButton() {
    const btn = document.getElementById('mfa-resend-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      btn.disabled = true;
      clearOtpDigits();
      hideMfaError();

      MockAPI.issueChallenge(null, 'totp').then(function (r) {
        if (r.ok) {
          state.currentChallengeId = r.data.challenge_id;
          state.totpAttempts = 0;
          resetAttemptDots('mfa-totp-attempts', 'mfa-totp-attempts-label');

          // BR-003-01: emit issued event for the new challenge
          emitEvent('auth.mfa.challenge_issued', {
            challenge_id: r.data.challenge_id,
            challenge_type: 'totp',
            expires_at: new Date(Date.now() + TOTP_WINDOW_SECS * 1000).toISOString(),
          });

          startTotpCountdown();
          startResendCountdown();
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // ATTEMPT DOTS
  // ═══════════════════════════════════════════════════════════

  function updateAttemptDots(containerId, labelId, usedCount) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const dots = container.querySelectorAll('.mfa-attempts__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('mfa-attempts__dot--used', i < usedCount);
    });

    const srLabel = document.getElementById(labelId);
    const remaining = Math.max(0, MAX_ATTEMPTS - usedCount);
    if (srLabel) srLabel.textContent = remaining + ' attempt' + (remaining !== 1 ? 's' : '') + ' remaining';
  }

  function resetAttemptDots(containerId, labelId) {
    updateAttemptDots(containerId, labelId, 0);
  }

  // ═══════════════════════════════════════════════════════════
  // ERROR / ALERT DISPLAY
  // ═══════════════════════════════════════════════════════════

  function showMfaError(title, body) {
    const container = document.getElementById('mfa-error');
    const titleEl = document.getElementById('mfa-error-title');
    const bodyEl = document.getElementById('mfa-error-body');
    if (container) container.hidden = false;
    if (titleEl) titleEl.textContent = title || 'Incorrect code';
    if (bodyEl) bodyEl.textContent = body || 'The code you entered is invalid or has expired. Please try again.';
  }

  function hideMfaError() {
    const container = document.getElementById('mfa-error');
    if (container) container.hidden = true;
  }

  function setButtonLoading(btnId, loading, label) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.classList.toggle('btn--loading', loading);
    if (!loading && label) btn.textContent = label;
  }

  // ═══════════════════════════════════════════════════════════
  // TOTP FORM SUBMISSION
  // ═══════════════════════════════════════════════════════════

  function submitTotp() {
    const code = getOtpCode();
    if (code.length < 6) return;

    setButtonLoading('mfa-totp-submit', true);
    hideMfaError();

    MockAPI.verifyTotp(state.currentChallengeId, code)
      .then(function (response) {
        setButtonLoading('mfa-totp-submit', false, 'Verify');

        if (response.ok && response.data.session_activated) {
          // INV-003-01: verified is terminal — stop timers
          clearInterval(state.totpCountdownTimer);
          clearInterval(state.resendCountdownTimer);

          markOtpSuccess();

          // Emit EVT-003-02
          emitEvent('auth.mfa.verified', {
            challenge_id: state.currentChallengeId,
            verification_method: 'totp',
          });

          // Short pause for visual feedback, then route to portal
          setTimeout(function () {
            const portal = sessionStorage.getItem('dev8x_session_portal') || 'admin';
            navigate('portal-' + portal);
          }, 600);
        } else {
          // INV-003-01: failed is terminal only after MAX_ATTEMPTS
          state.totpAttempts++;
          markOtpError();
          updateAttemptDots('mfa-totp-attempts', 'mfa-totp-attempts-label', state.totpAttempts);

          // Emit EVT-003-03
          emitEvent('auth.mfa.failed', {
            challenge_id: state.currentChallengeId,
            attempt_count: state.totpAttempts,
          });

          if (state.totpAttempts >= MAX_ATTEMPTS) {
            // Challenge is now in terminal failed state
            clearInterval(state.totpCountdownTimer);
            clearInterval(state.resendCountdownTimer);
            showMfaError('Too many failed attempts', 'This verification challenge has been locked. Please use a recovery code or contact support.');
            const submitBtn = document.getElementById('mfa-totp-submit');
            if (submitBtn) submitBtn.disabled = true;
            const resendBtn = document.getElementById('mfa-resend-btn');
            if (resendBtn) resendBtn.disabled = true;
          } else {
            showMfaError('Incorrect code', 'The code you entered is invalid or has expired. ' + (MAX_ATTEMPTS - state.totpAttempts) + ' attempt(s) remaining.');
            // Clear digits for next try
            setTimeout(clearOtpDigits, 600);
          }
        }
      })
      .catch(function () {
        setButtonLoading('mfa-totp-submit', false, 'Verify');
        showMfaError('Connection error', 'Unable to reach the server. Please try again.');
      });
  }

  function bindTotpForm() {
    const form = document.getElementById('mfa-form-totp');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitTotp();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // RECOVERY CODE FORM
  // ═══════════════════════════════════════════════════════════

  function bindRecoveryForm() {
    const form = document.getElementById('mfa-form-recovery');
    if (!form) return;

    const input = document.getElementById('mfa-recovery-input');

    // Auto-uppercase and format as user types
    if (input) {
      input.addEventListener('input', function () {
        const cursor = input.selectionStart;
        input.value = input.value.toUpperCase().replace(/[^A-Z0-9\-]/g, '');
        try {
          input.setSelectionRange(cursor, cursor);
        } catch (_) {}

        const errorEl = document.getElementById('mfa-recovery-error');
        if (errorEl) {
          errorEl.hidden = true;
          input.classList.remove('input--error');
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const code = input ? input.value.trim() : '';
      const errorEl = document.getElementById('mfa-recovery-error');

      if (!code || code.length < 8) {
        if (errorEl) errorEl.hidden = false;
        if (input) input.classList.add('input--error');
        return;
      }

      setButtonLoading('mfa-recovery-submit', true);

      MockAPI.verifyRecovery(state.currentChallengeId, code)
        .then(function (response) {
          setButtonLoading('mfa-recovery-submit', false, 'Verify recovery code');

          if (response.ok && response.data.session_activated) {
            // Emit EVT-003-02
            emitEvent('auth.mfa.verified', {
              challenge_id: state.currentChallengeId,
              verification_method: 'recovery_code',
            });

            // BR-003-02: code is consumed — warn if remaining count is low
            if (typeof response.data.remaining_codes === 'number' && response.data.remaining_codes < RECOVERY_LOW_THRESHOLD) {
              const lowWarn = document.getElementById('mfa-recovery-low-warn');
              if (lowWarn) lowWarn.hidden = false;

              // Delay navigation to let user read the warning
              setTimeout(function () {
                const portal = sessionStorage.getItem('dev8x_session_portal') || 'admin';
                navigate('portal-' + portal);
              }, 2500);
            } else {
              const portal = sessionStorage.getItem('dev8x_session_portal') || 'admin';
              navigate('portal-' + portal);
            }
          } else {
            state.recoveryAttempts++;
            if (input) {
              input.classList.add('input--error');
              input.value = '';
            }
            if (errorEl) errorEl.hidden = false;

            updateAttemptDots('mfa-recovery-attempts', 'mfa-recovery-attempts-label', state.recoveryAttempts);

            // Emit EVT-003-03
            emitEvent('auth.mfa.failed', {
              challenge_id: state.currentChallengeId,
              attempt_count: state.recoveryAttempts,
            });

            if (state.recoveryAttempts >= MAX_ATTEMPTS) {
              showMfaError('Too many failed attempts', 'Recovery code verification has been locked. Please contact support.');
              const submitBtn = document.getElementById('mfa-recovery-submit');
              if (submitBtn) submitBtn.disabled = true;
            }
          }
        })
        .catch(function () {
          setButtonLoading('mfa-recovery-submit', false, 'Verify recovery code');
          showMfaError('Connection error', 'Unable to reach the server. Please try again.');
        });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // STEP-UP SUPPORT (FR-003-03)
  // ═══════════════════════════════════════════════════════════

  /**
   * Configures the MFA screen for a step-up flow.
   * In step-up mode the back/cancel button is shown and the
   * step indicator is hidden (the user is already authenticated).
   */
  function configureForStepUp() {
    const backBtn = document.getElementById('mfa-back-btn');
    const steps = document.querySelector('#screen-mfa .auth-steps');
    if (backBtn) backBtn.hidden = false;
    if (steps) steps.hidden = true;
  }

  /**
   * Configures the MFA screen for the normal admin login flow.
   */
  function configureForLogin() {
    const backBtn = document.getElementById('mfa-back-btn');
    const steps = document.querySelector('#screen-mfa .auth-steps');
    if (backBtn) backBtn.hidden = true;
    if (steps) steps.hidden = false;
  }

  function bindBackButton() {
    const backBtn = document.getElementById('mfa-back-btn');
    if (!backBtn) return;
    backBtn.addEventListener('click', function () {
      clearInterval(state.totpCountdownTimer);
      clearInterval(state.resendCountdownTimer);
      navigate('login');
    });
  }

  function bindSupportButton() {
    const btn = document.getElementById('mfa-support-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      // In production this would open a support channel
      alert('Please contact support@dev8x.com for account recovery assistance.');
    });
  }

  // ═══════════════════════════════════════════════════════════
  // SCREEN LIFECYCLE
  // ═══════════════════════════════════════════════════════════

  /**
   * Called by router.js whenever the MFA screen becomes active.
   * Resets all state and emits the initial challenge issued event.
   */
  function onScreenActivate(options) {
    options = options || {};

    // Reset state
    state.totpAttempts = 0;
    state.recoveryAttempts = 0;
    state.totpExpired = false;
    state.currentChallengeId = 'chal-demo-' + Date.now();

    clearOtpDigits();
    hideMfaError();
    resetAttemptDots('mfa-totp-attempts', 'mfa-totp-attempts-label');
    resetAttemptDots('mfa-recovery-attempts', 'mfa-recovery-attempts-label');
    switchTab('totp');

    const lowWarn = document.getElementById('mfa-recovery-low-warn');
    if (lowWarn) lowWarn.hidden = true;

    const recoveryError = document.getElementById('mfa-recovery-error');
    if (recoveryError) recoveryError.hidden = true;

    const recoveryInput = document.getElementById('mfa-recovery-input');
    if (recoveryInput) {
      recoveryInput.value = '';
      recoveryInput.classList.remove('input--error');
    }

    // Emit EVT-003-01 (initial challenge)
    emitEvent('auth.mfa.challenge_issued', {
      challenge_id: state.currentChallengeId,
      challenge_type: 'totp',
      expires_at: new Date(Date.now() + TOTP_WINDOW_SECS * 1000).toISOString(),
    });

    if (options.stepUp) {
      configureForStepUp();
    } else {
      configureForLogin();
    }

    startTotpCountdown();
    startResendCountdown();

    // Focus first digit
    setTimeout(function () {
      focusDigit(0);
    }, 100);
  }

  // ═══════════════════════════════════════════════════════════
  // INITIALISE
  // ═══════════════════════════════════════════════════════════

  function init() {
    bindTabs();
    bindOtpInput();
    bindTotpForm();
    bindRecoveryForm();
    bindResendButton();
    bindBackButton();
    bindSupportButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Public API ──────────────────────────────────────────────
  window.MfaChallenge = {
    onScreenActivate: onScreenActivate,
  };
})();
