# Authentication — Risks

> **Module ID**: `001-authentication`

---

## Risk Register

| ID | Risk | Probability | Impact | Severity | Mitigation |
|----|------|-------------|--------|----------|------------|
| R-001-01 | Credential stuffing attack using leaked passwords | High | Critical | Critical | Account lockout (FR-001-05), rate limiting (10/min), CAPTCHA after 3 failures |
| R-001-02 | Session token theft via XSS | Medium | Critical | Critical | HTTP-only cookies, CSP headers, short-lived tokens |
| R-001-03 | User enumeration via timing or error differences | Medium | Medium | Medium | BR-001-01 identical error responses, constant-time comparison |
| R-001-04 | Email verification token brute-force | Low | Medium | Low | UUID tokens (unguessable), 24h expiry, 3 resend limit |
| R-001-05 | Password reset token interception | Medium | High | High | Addressed in 004-password-reset module |

---

## Security Risks

| ID | Threat | STRIDE Category | Mitigation |
|----|--------|----------------|------------|
| S-001-01 | Impersonation via stolen credentials | Spoofing | MFA for Admin, lockout, breach detection |
| S-001-02 | JWT tampering to escalate role | Tampering | RS256 signing, server-side validation |
| S-001-03 | Cross-portal access via modified JWT | Elevation | Portal claim verification on every request |
| S-001-04 | Login attempt without audit trail | Repudiation | All attempts logged (EVT-001-01/03) |

---

## Dependency Risks

| Dependency | Risk | Fallback |
|-----------|------|----------|
| Email service (verification) | Email delivery failure delays registration | Queue retries, resend endpoint |
| TOTP provider (Admin MFA) | TOTP clock drift causes valid codes to reject | 30-second window with ±1 step tolerance |
