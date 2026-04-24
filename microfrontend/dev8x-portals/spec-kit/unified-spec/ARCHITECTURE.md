# Architecture

> Unified system architecture for the Dev8X Talent Management & CRM Platform.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEV8X PLATFORM                               │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Candidate│  │  Client  │  │ HR Admin │  │   CRM    │           │
│  │  Portal  │  │  Portal  │  │  Panel   │  │ Platform │           │
│  │  (2xx)   │  │  (3xx)   │  │  (1xx)   │  │  (4xx)   │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │              │              │              │                 │
│  ┌────┴──────────────┴──────────────┴──────────────┴─────┐         │
│  │              AUTHENTICATION LAYER (0xx)                │         │
│  │   Portal Routing · Login · MFA · SSO · Password Reset │         │
│  └───────────────────────┬───────────────────────────────┘         │
│                          │                                          │
│  ┌───────────────────────┴───────────────────────────────┐         │
│  │              SHARED SERVICES LAYER                     │         │
│  │   RBAC · Events · Notifications · Document Mgmt       │         │
│  └───────────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Domain Architecture

### Domain 0xx — Authentication & Identity

The authentication layer is **shared across all portals**. It provides a single entry point that routes users to their designated portal based on role.

| Module | Responsibility |
|--------|---------------|
| `001-authentication` | Credential validation, session management, login/logout |
| `002-portal-routing` | Portal selection, role-based destination mapping |
| `003-mfa` | Multi-factor authentication (Admin-required TOTP) |
| `004-password-reset` | Token-based password recovery flow |
| `005-sso` | OAuth 2.0 social login (Google; extensible) |

**Key architectural decision**: Admin portal requires mandatory 2FA. Candidate and Client portals support optional 2FA. See [ADR-010](/.specify/decisions/adr-010-multi-portal-auth.md).

### Domain 1xx — HR Admin Panel

The administrative control plane for talent management operations.

| Module | Responsibility |
|--------|---------------|
| `100-admin-dashboard` | KPI aggregation, funnel metrics, pipeline summary |
| `101-admin-applicants` | Applicant CRUD, status lifecycle, detail views |
| `102-admin-pipeline` | Kanban board, stage transitions, drag-drop business rules |
| `103-admin-jobs` | Job posting lifecycle (Draft → Live → Paused → Closed) |
| `104-admin-interviews` | Interview scheduling, time slot management, interviewer assignment |
| `105-admin-evaluations` | Multi-dimension scoring, checklists, assessment workflows |
| `106-admin-documents` | Document upload, viewing, per-applicant association |
| `107-admin-email-templates` | Template CRUD, variable substitution, message dispatch |
| `108-admin-settings` | System configuration, user management |

### Domain 2xx — Candidate Portal

The external-facing portal for job applicants and new hires.

| Module | Responsibility |
|--------|---------------|
| `200-candidate-dashboard` | Application status overview, progress tracker, deadlines |
| `201-candidate-application` | Application timeline, step-by-step flow, AI screening results |
| `202-candidate-interviews` | Interview scheduling, time slot selection, confirmation |
| `203-candidate-documents` | Document management, e-signature, categorized document lists |
| `204-candidate-onboarding` | Account provisioning, software setup, first-day checklist |
| `205-candidate-messages` | Inbox, message threads, read/unread management |
| `206-candidate-profile` | Personal info, editable profile, emergency contacts |

### Domain 3xx — Client Portal

The external-facing portal for client project management and billing.

| Module | Responsibility |
|--------|---------------|
| `300-client-dashboard` | KPIs, welcome banner, quick action links |
| `301-client-projects` | Project list, detail view, progress tracking, team roster |
| `302-client-invoices` | Invoice management, payment status, filtering |
| `303-client-files` | File management, categorization, version control |
| `304-client-working-hours` | Clockify integration, time logs, budget burn tracking |
| `305-client-messaging` | Thread-based messaging, team communication |
| `306-client-support` | Support ticket system, status lifecycle |
| `307-client-contracts` | Contract management, e-signature |

### Domain 4xx — CRM / Sales Platform

The internal sales and business development platform.

| Module | Responsibility |
|--------|---------------|
| `400-crm-dashboard` | Pipeline stats, funnel, outreach feed, hot leads |
| `401-crm-contacts` | Contact CRUD, health scores, sentiment, filtering |
| `402-crm-pipeline` | Kanban deal board, stage transitions, stale indicators |
| `403-crm-outreach-analytics` | Channel metrics, heatmap, response analysis |
| `404-crm-templates` | Template library, editor, variable system, preview |
| `405-crm-lead-stacks` | Curated lead lists, platform targeting |
| `406-crm-scoring` | Lead scoring, multi-dimension assessment |
| `407-crm-archive` | Closed deals (Won/Lost), historical data |
| `408-crm-settings` | System config, user management, integrations |

---

## Cross-Cutting Concerns

### Role-Based Access Control (RBAC)

Six platform roles with domain-scoped permissions:

| Role | Auth | Admin | Candidate | Client | CRM |
|------|------|-------|-----------|--------|-----|
| `super_admin` | Full | Full | Read | Read | Full |
| `hr_admin` | Login | Full | Read | — | — |
| `candidate` | Login + Register | — | Own data | — | — |
| `client` | Login | — | — | Own projects | — |
| `sales_rep` | Login | — | — | — | Full |
| `manager` | Login | Read | Read | Own projects | Full |

Full RBAC matrix: [`contracts/access-control.yaml`](contracts/access-control.yaml)

### Entity State Machines

| Entity | States | Canonical Source |
|--------|--------|-----------------|
| Applicant | Applied → Shortlisted → Interview → Selected → Joined (+ Rejected, Future Hire) | `contracts/interactions.yaml` |
| Job Posting | Draft → Live → Paused → Closed | `contracts/interactions.yaml` |
| Deal | New Lead → Contacted → Meeting Set → Proposal → Won / Lost | `contracts/interactions.yaml` |
| Invoice | Draft → Due → Paid / Overdue | `contracts/interactions.yaml` |
| Support Ticket | Open → In Progress → Resolved | `contracts/interactions.yaml` |
| Document | Pending → Signed | `contracts/interactions.yaml` |

### Event-Driven Audit

All state changes emit events recorded in an append-only audit log. Events are defined in [`contracts/events.yaml`](contracts/events.yaml) and referenced by each module's `activity-log-events.md`.

### Integration Points

| System | Domain | Purpose |
|--------|--------|---------|
| **Clockify** | Client (3xx) | Time tracking, working hours aggregation |
| **Google OAuth** | Auth (0xx) | Social login for Candidate and Client portals |
| **TOTP Provider** | Auth (0xx) | 2FA code generation and validation for Admin |

---

## Data Flow

```
                    ┌─────────────┐
                    │   Browser   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Auth (0xx) │  ← Portal Selector → Route to Domain
                    └──────┬──────┘
                           │ JWT Session
              ┌────────────┼────────────┬────────────┐
              │            │            │            │
       ┌──────▼──────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐
       │ Admin (1xx) │ │Cand(2xx)│ │Cli (3xx)│ │CRM(4xx) │
       └──────┬──────┘ └──┬──────┘ └──┬──────┘ └──┬──────┘
              │            │            │            │
       ┌──────▼────────────▼────────────▼────────────▼──────┐
       │                  API Gateway                        │
       │        RBAC Enforcement │ Rate Limiting             │
       └────────────────────────┬───────────────────────────┘
                                │
       ┌────────────────────────▼───────────────────────────┐
       │                 Domain Services                     │
       │   Applicant │ Job │ Project │ Invoice │ Deal │ …    │
       └────────────────────────┬───────────────────────────┘
                                │
       ┌────────────────────────▼───────────────────────────┐
       │              Event Bus / Audit Log                  │
       │          Append-only │ Immutable │ Queryable        │
       └────────────────────────────────────────────────────┘
```

---

## Module Standard

Every module contains exactly **13 artifacts**:

| # | File | Purpose |
|---|------|---------|
| 1 | `spec.md` | Feature specification (scenario-driven, tech-agnostic) |
| 2 | `plan.md` | Implementation plan |
| 3 | `tasks.md` | Task breakdown |
| 4 | `changelog.md` | Version history |
| 5 | `metrics.md` | Success metrics & KPIs |
| 6 | `risks.md` | Risk assessment & mitigations |
| 7 | `rollout.md` | Rollout strategy & feature flags |
| 8 | `test-scenarios.md` | Test cases & acceptance criteria |
| 9 | `validation-schema.json` | Payload validation rules |
| 10 | `rbac-matrix.md` | Role-based access control |
| 11 | `activity-log-events.md` | Audit event definitions |
| 12 | `api-contracts.md` | REST API endpoint contracts |
| 13 | `state-machines.md` | State transition definitions |

See [ADR-004](/.specify/decisions/adr-004-13-file-module-standard.md) for rationale.
