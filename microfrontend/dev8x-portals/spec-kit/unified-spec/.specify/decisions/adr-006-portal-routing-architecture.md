# ADR-006: Portal Routing Architecture

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

The Dev8X platform serves multiple user types through distinct portal experiences. The `auth.html` prototype implements a **portal selector** pattern where users first choose their portal type (Candidate, Client, Admin), then authenticate with portal-specific forms.

Key observations from the HTML prototype:

1. A `portalConfig` JavaScript object maps portal types to destination pages, branding, and onboarding steps
2. Each portal has its own login form with different field requirements (Admin requires TOTP, Client has no signup)
3. Session storage tracks both `portal` type and `authenticated` status
4. Google SSO is available for Candidate and Client but not Admin

This raises the architectural question: should routing happen pre-authentication or post-authentication?

---

## Decision

Adopt a **pre-authentication portal routing** architecture:

```
Browser → Portal Selector → Auth Form (portal-specific) → JWT with portal claim → Portal App
```

1. **Portal selector** is the first screen — unauthenticated
2. Each portal has **specific auth requirements** (Admin = email + password + TOTP; Candidate = email + password or Google SSO; Client = email + password or Google SSO, no signup)
3. The JWT token includes a `portal` claim that restricts API access to the appropriate domain
4. Post-authentication routing sends the user to their portal's entry point
5. Users cannot switch portals without re-authenticating

---

## Consequences

### Positive

- **Security isolation**: Admin portal's MFA requirement is enforced at the gate
- **Clean separation**: Each portal can have distinct auth flows without conditional logic
- **Clear UX**: Users self-identify their role before entering credentials
- **Token scoping**: JWT `portal` claim enables API-level domain isolation

### Negative

- **Multi-role users**: A person who is both a Candidate and a Client must log in separately to each portal
- **No universal session**: Switching portals requires re-authentication
- **Portal discovery**: New users must know which portal applies to them

---

## Alternatives Considered

### Alternative 1: Post-Authentication Routing

**Description**: Single login form for all users; portal determined by user's role in the database.
**Rejected Because**: Admin MFA would need to be conditionally applied based on role lookup, increasing login flow complexity. Candidate signup form would need to be gated behind role detection.

### Alternative 2: Subdomain-Based Routing

**Description**: `candidate.dev8x.com`, `client.dev8x.com`, `admin.dev8x.com` with separate auth systems.
**Rejected Because**: Increased infrastructure complexity. Shared session management across subdomains is harder. Central auth contract is preferred for consistency.

---

## References

- [001-authentication](../specs/001-authentication/spec.md)
- [002-portal-routing](../specs/002-portal-routing/spec.md)
- [contracts/access-control.yaml](../../contracts/access-control.yaml) — Auth section
