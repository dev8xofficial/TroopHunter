# Architecture Overview — Main Portal

This document describes the high-level architecture of The Burkes Group Main Portal, its screen structure, data flow, and integration points.

---

## 1. System Context

The Main Portal is a **single-page web application** serving as the central authentication and routing hub for all users at The Burkes Group. It is the gatekeeper system:

- **Main Portal** (this spec-kit): Used by all users to authenticate, verify identity via MFA, and route into their specific environments.
- **Sub-Portals** (separate spec-kits): The isolated environments accessed after routing (Client, Attorney, CPA, Agent, Lender, Service Partner, Admin).

The Main Portal ensures absolute identity verification and role-scoping before passing the user session over to a sub-portal.

---

## 2. Portal Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MAIN PORTAL (SPA)                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 Foundation Layer (000)                       │   │
│  │  ┌──────┐  ┌────────┐  ┌──────────┐  ┌─────────────────┐  │   │
│  │  │ Boot │  │ Brand  │  │  Design  │  │  Alert System   │  │   │
│  │  │Loader│  │ Identity│  │  Tokens  │  │                 │  │   │
│  │  └──────┘  └────────┘  └──────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Screen Layer                             │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────────┐  ┌───────────┐             │   │
│  │  │   Auth   │  │     MFA      │  │Role Routing│             │   │
│  │  │  (001)   │  │    (002)     │  │   (003)   │             │   │
│  │  └──────────┘  └──────────────┘  └───────────┘             │   │
│  │                                                              │   │
│  │  ┌──────────┐                                                │   │
│  │  │ Password │                                                │   │
│  │  │  Reset   │                                                │   │
│  │  │  (004)   │                                                │   │
│  │  └──────────┘                                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌──────────────┐
│  Auth       │    │     Sub-        │    │    Logging   │
│  Provider   │    │    Portals      │    │    Service   │
│  (Session)  │    │   (Routing)     │    │   (Security) │
└─────────────┘    └─────────────────┘    └──────────────┘
```

---

## 3. Screen Inventory

| # | Screen | Route ID | Purpose | Primary Actions |
|---|--------|----------|---------|-----------------|
| 000 | Foundation | `—` | Global infrastructure (tokens, alerts, brand) | N/A — consumed by all screens |
| 001 | Authentication | `page-1-login` | Base login, initial verification | Enter email/pass, role selection |
| 002 | MFA | `page-2-mfa` | Two-factor verification stage | Enter 6-digit code, trust device |
| 003 | Role Routing | `page-3` to `page-8` | Capability awareness and routing | Confirm routing, view permissions |
| 004 | Password Reset | `page-9-reset` | Account recovery | Reset password, return to login |

---

## 4. Data Flow

### 4.1 Authentication Lifecycle

1. **Initiate** login via email, password, and intended role (Authentication screen).
2. **Verify** credentials against Auth Provider. If MFA is enabled, redirect to MFA screen.
3. **MFA Verification** via 6-digit code.
4. **Determine Capabilities** and present permission definitions via Role Routing view.
5. **Route** user to their respective standalone platform via hard-navigation (e.g. `client.html`, `agent.html`).

### 4.2 Security Logging

Every authentication attempt writes to the security log:

```
User Action → Auth Request → Success/Failure Evaluated → Security Event Created
```

Event types include: `login_attempt`, `login_success`, `login_failed`, `mfa_prompted`, `mfa_success`, `mfa_failed`, `password_reset_requested`, `password_reset_completed`.

---

## 5. Security Model

- **Absolute Isolation**: The Main Portal is purely a gatekeeper. It does not load or process transaction data.
- **Strict Role Boundaries**: Users are firmly routed only to portals matching their verified cryptographic token capabilities.
- **Timeouts**: MFA sessions expire within a defined window. Password reset keys are single-use and time-bound.
- **Auditing**: All logins, routing decisions, MFA challenges, and password resets are audited for SOC2 compliance.

---

**Version**: 1.0
**Last Updated**: April 11, 2026
