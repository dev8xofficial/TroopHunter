# Password Reset — Rollout Plan

## 1. Feature Dependencies

- `000-foundation`: Design tokens for `.reset-flow-container`, `.reset-card`, `.form-input`, and `.btn` variants must be stable before this feature ships.
- `001-authentication`: The "Forgot your password?" anchor link must be live and pointing to `page-9-reset`.
- Backend email dispatch service must be configured and tested in staging before any production traffic is routed.

## 2. Pre-Launch Checklist

- [ ] Backend reset-token generation and single-use invalidation logic reviewed and tested.
- [ ] Email delivery service (transactional provider) verified in staging — including SPF/DKIM/DMARC configuration.
- [ ] Rate-limiting rules applied per IP and per email address.
- [ ] Token expiry (1-hour TTL) confirmed at the infrastructure level.
- [ ] Email enumeration protection verified via manual QA: unregistered emails produce identical UI as registered emails.

## 3. Release Steps

1. Deploy static UI changes (`page-9-reset` and `page-10-reset-success` screens).
2. Enable backend reset-token endpoint behind a feature flag.
3. Perform end-to-end smoke test in staging: submit real email → receive link → click → confirm token consumption.
4. Enable feature flag in production.
5. Monitor **Email Delivery Time** and **Reset Completion Rate** for 48 hours post-launch.

## 4. Rollback Plan

- If the backend reset endpoint experiences errors, disable the feature flag. The "Forgot your password?" link can temporarily be hidden via a CSS override while the issue is resolved.
- Static UI screens carry no rollback risk.
