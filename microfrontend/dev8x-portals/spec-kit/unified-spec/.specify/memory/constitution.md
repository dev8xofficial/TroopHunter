# Dev8X Platform Constitution

> **Version**: 1.0.0
> **Last Amended**: 2026-04-22
> **Authority**: Platform Architect

This is the foundational governance document for the Dev8X Talent Management & CRM Platform. All specification artifacts must comply with this constitution.

---

## 1. Platform Identity

**Dev8X** is a unified multi-portal talent management and client services platform. It serves job candidates, clients, HR administrators, and sales teams through domain-isolated portals backed by shared authentication and infrastructure.

**Mission**: Provide a scalable, auditable, and specification-driven platform that automates talent management workflows, client project delivery, and sales pipeline operations.

---

## 2. Core Principles

### P-01: Technology Agnostic
Specifications define _what_ the system does, never _how_ it is built. No framework, library, or language references in spec files.

### P-02: Single Source of Truth
Each fact exists in exactly one artifact. Other documents reference it. Duplication is a specification defect.

### P-03: Append-Only Audit
All state changes emit events to an immutable, append-only audit log. Events are never deleted or retroactively modified.

### P-04: Domain Isolation
Each domain (0xx–4xx) is self-contained. Cross-domain communication occurs only through centralized contracts — never through direct inter-module imports.

### P-05: Role-Based Access Enforcement
Every operation is gated by RBAC. No endpoint, data query, or state transition executes without role verification.

### P-06: Specification-First Development
Code is derived from specifications. Implementation begins only after specs are merged and validated through CI.

### P-07: Immutable Decisions
Architecture Decision Records (ADRs) document all significant decisions. Past ADRs are never deleted — they are superseded by new ADRs.

### P-08: No UI in Specs
This spec-kit is strictly functional. CSS, layout, color, typography, design tokens, and visual specifications are categorically excluded.

---

## 3. Actors

| Role ID | Display Name | Description | Portals |
|---------|-------------|-------------|---------|
| `super_admin` | Super Administrator | Full platform access, system configuration | Admin |
| `hr_admin` | HR Administrator | Talent management operations | Admin |
| `candidate` | Candidate | Job applicant and new hire | Candidate |
| `client` | Client | External client with project access | Client |
| `sales_rep` | Sales Representative | CRM and business development | CRM |
| `manager` | Manager | Cross-domain oversight, team management | Admin (read), Client (own), CRM |

---

## 4. Domain Registry

| Code | Domain | Description | Module Range |
|------|--------|-------------|-------------|
| `0xx` | Authentication & Identity | Login, MFA, SSO, password recovery, portal routing | 001–005 |
| `1xx` | HR Admin Panel | Applicant tracking, jobs, interviews, evaluations | 100–108 |
| `2xx` | Candidate Portal | Application timeline, scheduling, onboarding | 200–206 |
| `3xx` | Client Portal | Projects, invoices, files, time tracking, support | 300–307 |
| `4xx` | CRM / Sales | Contacts, deals pipeline, outreach, templates, scoring | 400–408 |

---

## 5. Entity Lifecycles

### 5.1 Applicant Lifecycle

```
Applied → Shortlisted → Interview → Selected → Joined
    ↓           ↓            ↓           ↓
 Rejected    Rejected     Rejected    Rejected
    ↓           ↓            ↓
Future Hire  Future Hire  Future Hire
```

**Terminal states**: Joined, Rejected, Future Hire

### 5.2 Job Posting Lifecycle

```
Draft → Live ⇄ Paused → Closed
  ↓                        ↑
  └────────────────────────┘
```

**Terminal state**: Closed (cannot be reopened)

### 5.3 Deal Pipeline

```
New Lead → Contacted → Meeting Set → Proposal → Won
    ↓          ↓            ↓           ↓
   Lost       Lost         Lost        Lost
```

**Terminal states**: Won, Lost

### 5.4 Invoice Lifecycle

```
Draft → Due → Paid
              ↓
           Overdue → Paid
```

**Terminal state**: Paid

### 5.5 Support Ticket Lifecycle

```
Open → In Progress → Resolved ⇄ Open (reopen within 30 days)
```

### 5.6 Document Lifecycle

```
Pending → Signed
```

**Invariant**: Signed documents cannot be unsigned.

---

## 6. Global Data Vocabulary

| Field | Type | Constraints | Usage |
|-------|------|-------------|-------|
| `id` | UUID v4 | Primary key, immutable | All entities |
| `created_at` | ISO-8601 datetime | Auto-generated, immutable | All entities |
| `updated_at` | ISO-8601 datetime | Auto-updated on mutation | All entities |
| `email` | string | RFC 5322, max 254 chars, unique per role | Users, contacts |
| `status` | string enum | Domain-specific allowed values | Stateful entities |
| `name` | string | min 1, max 255 chars | All named entities |
| `role` | string enum | One of 6 platform roles | Users |

---

## 7. System-Wide Events

All events follow the canonical schema defined in [`contracts/events.yaml`](../../contracts/events.yaml).

**Event naming convention**: `{domain}.{entity}.{action}`

**Examples**:
- `auth.session.login`
- `admin.applicant.status_changed`
- `crm.deal.won`

---

## 8. Guardrails (Negative Constraints)

| ID | Constraint |
|----|-----------|
| G-01 | Never mutate the activity log. Events are append-only and immutable. |
| G-02 | Never expose admin endpoints to candidate or client roles. |
| G-03 | Never allow a candidate to view other candidates' data. |
| G-04 | Never allow a client to view other clients' projects. |
| G-05 | Never skip pipeline stages for applicants. |
| G-06 | Never reopen a closed job posting. Create a new posting instead. |
| G-07 | Never allow unsigned documents to proceed past the onboarding gate. |
| G-08 | Never store plaintext passwords. All passwords must be hashed. |
| G-09 | Never disable MFA for super_admin accounts. |
| G-10 | Never include UI, CSS, or design content in specification files. |

---

## 9. Amendment Process

This constitution may only be amended through:

1. A Pull Request modifying this file
2. Approval from the Platform Architect and all Domain Owners
3. An accompanying ADR documenting the change rationale
4. CI validation passing on all dependent modules
