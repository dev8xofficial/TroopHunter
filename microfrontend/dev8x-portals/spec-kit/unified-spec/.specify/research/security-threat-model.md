# Security Threat Model

> Research document identifying security threats, attack surfaces, and mitigations for the Dev8X platform.

---

## Methodology

This threat model uses the **STRIDE** framework:

| Category | Threat Type |
|----------|------------|
| **S** | Spoofing — impersonating another user or system |
| **T** | Tampering — unauthorized modification of data |
| **R** | Repudiation — denying an action without proof |
| **I** | Information Disclosure — exposing data to unauthorized parties |
| **D** | Denial of Service — making the system unavailable |
| **E** | Elevation of Privilege — gaining unauthorized access |

---

## Attack Surface Map

```
External Attackers                    Insider Threats
      │                                    │
      ▼                                    ▼
┌─────────────┐                   ┌─────────────┐
│  Browser /  │                   │  Malicious   │
│  API Client │                   │  Employee    │
└──────┬──────┘                   └──────┬──────┘
       │                                  │
┌──────▼──────────────────────────────────▼──────┐
│              AUTHENTICATION LAYER               │
│  Login Forms │ SSO │ MFA │ Session Mgmt         │
├─────────────────────────────────────────────────┤
│              API GATEWAY                         │
│  RBAC │ Rate Limiting │ Input Validation         │
├─────────────────┬───────────────────────────────┤
│  Domain Services│              Event Bus         │
│  (Business Logic)               (Audit Log)      │
├─────────────────┴───────────────────────────────┤
│              DATA LAYER                          │
│  User Store │ Files │ Sessions │ Audit Records   │
└─────────────────────────────────────────────────┘
```

---

## Threat Register

### T-01: Credential Stuffing (S)

| Attribute | Value |
|-----------|-------|
| **Target** | Login endpoints (`/auth/login`) |
| **Threat** | Attacker uses leaked credentials from other breaches to gain access |
| **Likelihood** | High |
| **Impact** | Critical — full account takeover |
| **Mitigations** | Account lockout (3 attempts for Admin, 5 for others); Rate limiting per IP; CAPTCHA after 3 failures; Password breach checking against known compromised passwords |
| **Spec Reference** | ADR-010, Module 001-authentication |

### T-02: Session Hijacking (S)

| Attribute | Value |
|-----------|-------|
| **Target** | JWT tokens in browser storage |
| **Threat** | Attacker steals session token via XSS or network interception |
| **Likelihood** | Medium |
| **Impact** | Critical — full account takeover for session duration |
| **Mitigations** | HTTP-only, Secure, SameSite cookies for token storage; Short-lived tokens (4h Admin, 8h CRM, 24h Candidate/Client); Token binding to IP (optional); CSP headers preventing XSS |
| **Spec Reference** | Module 001-authentication |

### T-03: MFA Bypass (S)

| Attribute | Value |
|-----------|-------|
| **Target** | Admin portal TOTP verification |
| **Threat** | Attacker bypasses 2FA through social engineering, SIM swap, or TOTP code brute-force |
| **Likelihood** | Low |
| **Impact** | Critical — admin access without 2FA |
| **Mitigations** | TOTP codes valid for 30s only; Max 3 TOTP attempts per session; TOTP brute-force lockout; Recovery codes stored hashed |
| **Spec Reference** | ADR-010, Module 003-mfa, Constitution G-09 |

### T-04: Privilege Escalation (E)

| Attribute | Value |
|-----------|-------|
| **Target** | API endpoints across portal boundaries |
| **Threat** | Candidate user modifies JWT claims to access Admin endpoints |
| **Likelihood** | Medium |
| **Impact** | Critical — cross-portal data access |
| **Mitigations** | JWT signed with server-side secret (RS256); Portal claim verified on every API call; RBAC enforcement at API gateway level; JWT tokens are server-issued only (never client-modified) |
| **Spec Reference** | ADR-006, ADR-010, contracts/access-control.yaml |

### T-05: IDOR (Insecure Direct Object Reference) (I)

| Attribute | Value |
|-----------|-------|
| **Target** | Resource endpoints (`/candidate/documents/{id}`, `/client/projects/{id}`) |
| **Threat** | User A accesses User B's data by guessing/enumerating resource IDs |
| **Likelihood** | High |
| **Impact** | High — unauthorized data disclosure |
| **Mitigations** | UUID v4 for all resource IDs (non-enumerable); Ownership verification on every resource access; "Own" RBAC scope enforced at query level |
| **Spec Reference** | Constitution G-03, G-04, contracts/access-control.yaml |

### T-06: Data Tampering in Pipeline (T)

| Attribute | Value |
|-----------|-------|
| **Target** | Applicant status transitions, deal stage changes |
| **Threat** | Unauthorized state transition (e.g., candidate marks themselves as "Selected") |
| **Likelihood** | Medium |
| **Impact** | High — business logic corruption |
| **Mitigations** | All state transitions gated by RBAC (only hr_admin/super_admin can change applicant status); State machine invariants enforced server-side; Every transition emits an audit event |
| **Spec Reference** | contracts/interactions.yaml, Constitution G-05 |

### T-07: Audit Log Tampering (R)

| Attribute | Value |
|-----------|-------|
| **Target** | Activity log / event store |
| **Threat** | Admin deletes or modifies audit log entries to cover tracks |
| **Likelihood** | Low |
| **Impact** | Critical — loss of auditability |
| **Mitigations** | Append-only log (no UPDATE or DELETE operations); Separate write-only permissions; Log integrity checksums; External backup with tamper detection |
| **Spec Reference** | Constitution P-03, G-01 |

### T-08: Document Forgery (T)

| Attribute | Value |
|-----------|-------|
| **Target** | E-signature system (Modules 203, 307) |
| **Threat** | User uploads a pre-signed document or modifies a document after signing |
| **Likelihood** | Low |
| **Impact** | High — legal liability |
| **Mitigations** | Document hash recorded at signing time; Signed documents are immutable (Constitution INV-DOC-01); Re-signing requires new document version; Signature includes timestamp, user ID, and IP |
| **Spec Reference** | Module 203-candidate-documents, Module 307-client-contracts |

### T-09: Rate Limit Bypass (D)

| Attribute | Value |
|-----------|-------|
| **Target** | All API endpoints |
| **Threat** | Attacker overwhelms API with high-volume requests |
| **Likelihood** | Medium |
| **Impact** | Medium — service degradation |
| **Mitigations** | Per-IP rate limiting at API gateway; Per-user rate limiting for authenticated endpoints; Exponential backoff for repeated failures; DDoS protection at infrastructure level |
| **Spec Reference** | api-contracts.md (per-endpoint rate limits) |

### T-10: Cross-Portal Data Leakage (I)

| Attribute | Value |
|-----------|-------|
| **Target** | API responses across portal boundaries |
| **Threat** | Client portal API accidentally returns CRM deal data or HR applicant data |
| **Likelihood** | Medium |
| **Impact** | High — confidentiality breach |
| **Mitigations** | Portal claim in JWT restricts API scope; Domain-isolated service layer; Response filtering at API gateway; Automated API security tests verifying cross-portal isolation |
| **Spec Reference** | ADR-006, Constitution G-02, G-03, G-04 |

---

## Risk Summary Matrix

| Threat | STRIDE | Likelihood | Impact | Priority |
|--------|--------|------------|--------|----------|
| T-01 Credential Stuffing | S | High | Critical | P0 |
| T-02 Session Hijacking | S | Medium | Critical | P0 |
| T-03 MFA Bypass | S | Low | Critical | P1 |
| T-04 Privilege Escalation | E | Medium | Critical | P0 |
| T-05 IDOR | I | High | High | P0 |
| T-06 Pipeline Tampering | T | Medium | High | P1 |
| T-07 Audit Log Tampering | R | Low | Critical | P1 |
| T-08 Document Forgery | T | Low | High | P2 |
| T-09 Rate Limit Bypass | D | Medium | Medium | P2 |
| T-10 Cross-Portal Leakage | I | Medium | High | P1 |

---

## Security Testing Requirements

1. **Authentication tests**: Verify lockout, MFA enforcement, session expiry for all 4 portal types
2. **RBAC tests**: Verify every role × operation × portal combination (see test matrix in contracts/access-control.yaml)
3. **IDOR tests**: Attempt cross-user access on every resource endpoint
4. **Input validation tests**: SQL injection, XSS, path traversal on all input fields
5. **Rate limiting tests**: Verify per-IP and per-user limits on all endpoints
6. **State machine tests**: Attempt invalid transitions (e.g., candidate self-promoting status)
7. **Audit integrity tests**: Verify log immutability and completeness
