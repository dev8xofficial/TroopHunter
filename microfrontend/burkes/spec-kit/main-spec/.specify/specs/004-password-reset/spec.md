# 004 Password Reset — Specification

## 1. Overview

The **Password Reset** module provides a two-stage account recovery workflow allowing users to regain access to their account when credentials are forgotten. It initiates an out-of-band email delivery and confirms dispatch to the user.

## 2. Capabilities

- **C-01: Reset Request Form**: User submits their registered email address to trigger the password reset pipeline.
- **C-02: Confirmation Feedback**: Upon submission, the system transitions to a success state confirming that a reset link has been dispatched.
- **C-03: Email Resend**: User may request a second dispatch of the reset email if the first is not received.
- **C-04: Return Navigation**: At every stage, the user may cancel the flow and return to the primary login screen (`page-1-login`).

## 3. UI/UX Sequence

### Stage 1 — Reset Request (page-9-reset)

1. User arrives from the `001-authentication` screen via the "Forgot your password?" link.
2. The system renders a centered card overlay on a gradient background (`reset-flow-container`).
3. User enters their registered email address into the `form-input` field.
4. User submits the form via "Send Reset Link".
5. System validates the email format client-side (HTML5 `required` + `type="email"`).
6. On valid submission, the system transitions to Stage 2.

### Stage 2 — Confirmation (page-10-reset-success)

1. The system displays a success icon (✉️) and confirmation message.
2. A numbered instruction set (1–4) guides the user through the next steps.
3. User may click "Resend Email" to trigger a second dispatch.
4. User may click "← Back to Sign In" to return to the login gateway.

## 4. Dependencies

- Depends on `000-foundation` for design tokens (`.reset-card`, `.form-input`, `.btn`, gradient background).
- Entered from `001-authentication` via the "Forgot your password?" anchor.
- Exits back to `001-authentication` or waits for the user to follow the email link in their inbox.

## 5. Acceptance Criteria

- Email field must enforce valid format using HTML5 validation before form submission proceeds.
- Submitting any syntactically valid email (registered or not) must always advance to Stage 2 — the system must never reveal whether an email address is registered (security by obscurity).
- The confirmation card must display all four next-step instructions in sequence.
- "Resend Email" must be accessible and trigger a second dispatch without reloading Stage 1.
- Reset links delivered by email must expire after 1 hour.
- "← Back to Sign In" must be present and functional at both Stage 1 and Stage 2.

## 6. Security Context

- The system must return identical UI feedback regardless of whether the submitted email is registered or not, to prevent email enumeration attacks.
- Reset tokens are single-use; once consumed they are invalidated on the backend.
- All reset link traffic must transit over TLS.
