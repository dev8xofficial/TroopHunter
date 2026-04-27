# HANDOFF: auth — Batch 4 Complete

## Status

Batch 4 of 10 complete.

## Files Written (Batch 4)

7. `screens/auth-register.html` — Candidate self-registration (001-authentication FR-001-02).
   - Wide card (`auth-card--wide`) with `data-portal="candidate"` and candidate-portal chip.
   - `register-name-row` CSS grid: first name + last name inputs side by side (stacks on mobile via media query in screen.css).
   - Email field with left envelope icon.
   - Password field with show/hide toggle (matching login screen pattern) + 5-level strength meter (`password-strength[data-strength]`). JS must set `data-strength="1–5"` and update `#reg-strength-label` text ("Weak" / "Fair" / "Good" / "Strong" / "Excellent").
   - Password confirmation field with `verified-badge` match indicator (shown when both fields are non-empty and match).
   - Inline `form-error` spans on every field with `role="alert"`.
   - Success alert (`#register-success`) revealed after 2xx response — covers duplicate-email case too (BR-001-01 no enumeration).
   - `register-terms` T&C note below the form.
   - Footer sign-in link (`#register-signin-btn`) → routes to screen-login.

8. `screens/auth-mfa.html` — TOTP / recovery code verification (003-mfa).
   - Two-step progress indicator (`auth-steps`): step 1 (Credentials) marked done, step 2 (Verification) active.
   - Admin security badge (`security-badge--admin`) at top of card.
   - Tab strip (`mfa-type-tabs`): Authenticator tab (active) | Recovery code tab. `role="tablist"` with `aria-selected` toggled by JS.
   - **TOTP panel** (`#mfa-panel-totp`):
     - `mfa-issuer` row with 🔐 icon and open-app prompt.
     - `otp-input-group`: inputs `#otp-1` through `#otp-6` split 3+separator+3. `autocomplete="one-time-code"` on first digit only. JS auto-advances focus, handles paste, marks `.otp-digit--filled`, applies `.otp-digit--error` on failure.
     - 30-second countdown (`#mfa-totp-countdown`) with `mfa-expiry__timer--urgent` class when ≤ 10 s.
     - 3 attempt dots (`#mfa-totp-attempts`). JS marks `.mfa-attempts__dot--used` on each failure.
     - Submit button (`#mfa-totp-submit`) starts `disabled`; JS enables when all 6 digits are filled.
     - Resend button (`#mfa-resend-btn`) and countdown (`#mfa-resend-countdown`): disabled until timer expires, then calls `POST /api/v1/auth/mfa/challenge`.
   - **Recovery code panel** (`#mfa-panel-recovery`, `hidden` by default):
     - Guidance note (`mfa-recovery-hint`).
     - Single `recovery-input` styled for uppercase monospace entry (placeholder `XXXX-XXXX-XXXX`).
     - Same 3-dot attempt counter (`#mfa-recovery-attempts`).
     - Low-codes warning alert (`#mfa-recovery-low-warn`) revealed by JS if API signals < 2 codes remain.
   - Cancel back-link (`#mfa-back-btn`) hidden by default; revealed only for step-up flows (not initial admin login).

## Spec Coverage This Batch

| Requirement                              | Screen             | Notes                                                    |
| ---------------------------------------- | ------------------ | -------------------------------------------------------- |
| FR-001-02 · Candidate self-registration  | auth-register.html | Full form with name row, email, password+confirm         |
| FR-003-01 · Issue MFA challenge          | auth-mfa.html      | Step indicator shows progression from credentials        |
| FR-003-02 · Verify TOTP or recovery code | auth-mfa.html      | Both panels with their input patterns                    |
| FR-003-03 · Step-up verification         | auth-mfa.html      | Cancel back-link markup (hidden; JS reveals for step-up) |
| BR-003-01 · Single active challenge      | auth-mfa.html      | Resend triggers new challenge; server invalidates prior  |
| BR-003-02 · Recovery code consumption    | auth-mfa.html      | Low-codes warning; server enforces single use            |
| EVT-003-01–04 · MFA audit events         | auth-mfa.html      | All states wired: submit / failure / expiry / resend     |
| Constitution G-09 · MFA mandatory admin  | auth-mfa.html      | Gold verify button; no skip path available               |

## Pending (Batch 5)

Next: `screens/auth-password-reset.html` + `screens/auth-sso-callback.html`

- **auth-password-reset.html**: 3-step flow (Request → Verify token → New password). Uses `reset-steps-track`, `reset-step`, `reset-step-connector`, `reset-token-expiry`, `reset-success` CSS classes. FR-004-01 through FR-004-03.
- **auth-sso-callback.html**: Loading/processing/error states for Google OAuth callback. Uses `sso-callback-state`, orbit spinner, `sso-callback-error` CSS classes. FR-005-02.

## Run Next Batch

Re-invoke spec-kit-to-code.md prompt. Current batch pointer: **Batch 5**.
