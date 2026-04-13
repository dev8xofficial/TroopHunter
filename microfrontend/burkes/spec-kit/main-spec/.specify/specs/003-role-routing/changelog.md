# Password Reset — Changelog

## [1.0.0] - Initial Specification
- Extracted password reset logic from `page-9-reset` and `page-10-reset-success` in `index.html` into a standalone specification.
- Documented two-stage recovery workflow: reset request form → confirmation screen.
- Specified email enumeration prevention requirement (identical response regardless of registration status).
- Defined 1-hour reset link expiry and single-use token invalidation policy.
- Captured `C-01` through `C-04` capabilities: request form, confirmation feedback, email resend, and return navigation.