# ADR-010: Multi-Portal Authentication

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

The Dev8X platform serves 4 distinct portal audiences through a shared authentication layer. Each portal has different security requirements:

| Portal | Auth Methods | MFA | Signup | OAuth |
|--------|-------------|-----|--------|-------|
| Candidate | Email + Password | Optional (future) | ✅ Available | ✅ Google |
| Client | Email + Password | Optional (future) | ❌ Admin-provisioned | ✅ Google |
| Admin/HR | Email + Password + **TOTP** | **Required** | ❌ Admin-provisioned | ❌ Disabled |
| CRM | Email + Password | Optional (future) | ❌ Admin-provisioned | ❌ Disabled |

The `auth.html` prototype implements all 4 flows in a single page with portal-specific form switching. The key question is how to handle asymmetric security requirements across portals.

---

## Decision

Implement **portal-scoped authentication policies** with these rules:

### Authentication Policies

1. **Admin portal**: **Mandatory 2FA** — login requires email + password + TOTP code. No SSO. Sessions expire after 4 hours of inactivity. All logins logged with IP and user agent.

2. **Candidate portal**: **Standard auth** — email + password or Google SSO. Self-registration available. Sessions expire after 24 hours. Account lockout after 5 failed attempts (30-minute cooldown).

3. **Client portal**: **Standard auth** — email + password or Google SSO. No self-registration — accounts are provisioned by admin. "Remember me" option for 30-day persistent sessions.

4. **CRM portal**: **Enhanced auth** — email + password only. No SSO. Sessions expire after 8 hours. MFA optional today, mandatory in Phase 3 (per ROADMAP.md).

### Session Token Structure

```yaml
JWT Claims:
  sub: user_id (uuid)
  portal: candidate | client | admin | crm
  role: super_admin | hr_admin | candidate | client | sales_rep | manager
  iat: issued_at (timestamp)
  exp: expiry (timestamp)
  mfa_verified: boolean
```

The `portal` claim ensures API endpoints can enforce domain isolation — a token issued for the Candidate portal cannot access Admin endpoints.

### Account Lockout Policy

| Portal | Max Attempts | Lockout Duration | Unlock Method |
|--------|-------------|------------------|---------------|
| Admin | 3 | 60 minutes | Manual by super_admin |
| CRM | 5 | 30 minutes | Auto-unlock after duration |
| Client | 5 | 30 minutes | Auto-unlock after duration |
| Candidate | 5 | 30 minutes | Auto-unlock after duration |

### Password Requirements

| Requirement | Value |
|-------------|-------|
| Minimum length | 8 characters |
| Complexity | At least 1 uppercase, 1 lowercase, 1 digit |
| History | Cannot reuse last 5 passwords (Admin only) |
| Expiry | 90 days (Admin), no expiry (others) |

---

## Consequences

### Positive

- **Security proportional to risk**: Admin portal (highest privilege) has strictest auth
- **Flexible**: Each portal's policy can evolve independently
- **SSO where it matters**: Candidates and clients benefit from Google SSO; admin is protected from SSO-based attacks
- **Audit trail**: All auth events are logged with portal, IP, and user agent

### Negative

- **Complexity**: 4 different auth flows to implement and test
- **User friction**: Admin users must use an authenticator app for every login
- **Multi-role gap**: A person who is both a Client and a Manager cannot share sessions

---

## Alternatives Considered

### Alternative 1: Uniform Auth Policy

**Description**: Same auth requirements for all portals (e.g., MFA for everyone).
**Rejected Because**: MFA for candidates applying to a job creates unnecessary friction. MFA for admins is a security necessity. One size doesn't fit all.

### Alternative 2: Post-Login MFA Escalation

**Description**: Login sans MFA, then prompt for TOTP when accessing sensitive operations.
**Rejected Because**: Increases attack surface — a compromised admin account could access the dashboard before the MFA prompt. Pre-auth MFA is more secure.

---

## References

- [001-authentication](../specs/001-authentication/spec.md)
- [003-mfa](../specs/003-mfa/spec.md)
- [005-sso](../specs/005-sso/spec.md)
- [ADR-006: Portal Routing Architecture](adr-006-portal-routing-architecture.md)
- [Constitution](../memory/constitution.md) — Guardrail G-09: Never disable MFA for super_admin
