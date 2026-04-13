# Password Reset — Risks & Mitigations

| Risk                         | Impact | Mitigation                                                                                                                                               |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Email Enumeration            | High   | Always return an identical success response regardless of whether the submitted email is registered. Never expose account existence through UI feedback. |
| Reset Token Replay           | High   | Tokens are single-use and invalidated immediately upon consumption. Expired tokens (>1 hour) are rejected.                                               |
| Brute-Force Token Guessing   | High   | Tokens must be cryptographically random (minimum 128-bit entropy). Rate-limit reset requests per IP and per email address.                               |
| Resend Spam / Email Flooding | Medium | Throttle resend requests (e.g., maximum 3 dispatches per email per hour). Surface a cooldown notice to the user if the limit is reached.                 |
| Reset Link Interception      | Medium | All reset links must be delivered over encrypted email transport and clicked over TLS. Links should be one-time-use and domain-locked.                   |
| Stale Session After Reset    | Low    | Completing a password reset must invalidate all existing sessions for the account to prevent concurrent access.                                          |
