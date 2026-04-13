# 002 Multi-Factor Authentication (MFA) — Specification

## 1. Overview
The **MFA** module serves as the secondary verification stage. It requires users to enter a time-based or SMS-delivered 6-digit code, offering enhanced security.

## 2. Capabilities
- **C-01: Token Entry**: 6-digit input field with letter spacing, center alignment, and `maxlength="6"` validation.
- **C-02: Device Trust**: Checkbox allowing users to bypass MFA on this browser for 30 days.
- **C-03: Recovery**: "Back to Sign In" mechanism allowing users to return to the primary login screen.

## 3. UI/UX Sequence
1. User successfully completes `001-authentication`.
2. System evaluates security policy and routes to `page-2-mfa`.
3. User receives a code out-of-band (e.g., Authenticator App or SMS).
4. User enters the 6-digit code.
5. User optionally selects "Trust this device for 30 days".
6. Form is submitted. Valid codes proceed to `003-role-routing`. Invalid codes show an inline error.

## 4. Acceptance Criteria
- Input must only accept 6 characters.
- Must display numeric keypad on mobile devices (`pattern="[0-9]*"`, `inputmode="numeric"` should be used).
- Trust checkbox must submit a boolean payload.
