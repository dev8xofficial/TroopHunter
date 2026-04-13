# The Burkes Group CRM Platform — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's **CRM Platform** — a multi-department customer relationship management system serving Insurance, Mortgage, and Real Estate operations with integrated VOIP calling, SMS messaging, email communication, pipeline management, compliance recording, and third-party service integrations.

This repository is the **single source of truth** for all product decisions, designs, and implementation guidance. Code serves these specifications, not the reverse.

> **What makes this spec-kit different from the portal spec-kits?** The six portal spec-kits (Admin, Agent, Attorney, Client, Main, Service Partner) define the _external-facing layer_ — where clients, agents, and partners interact with transaction data. This CRM spec-kit defines the _internal operational layer_ — the daily tool that Burkes Group staff use to manage leads, communicate with customers, track pipelines across departments, and maintain compliance. Both layers share a backend API and database; this spec governs the CRM's screens, data schemas, integrations, and workflows.

---

## 📋 Quick Navigation

### For New Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write specs (tone, structure, naming)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business and technical vocabulary
- **[FAQ.md](FAQ.md)** — Common questions about CRM design, departments, and compliance

### For Product & Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — CRM architecture, data flow, integration points, two-layer system
- **[ROADMAP.md](ROADMAP.md)** — Feature prioritization and phased release timeline
- **[GOVERNANCE.md](GOVERNANCE.md)** — Decision-making process and approval gates

### For Implementation

- **[.specify/specs/](.specify/specs/)** — Feature specifications (000-foundation through 015-admin-settings)
- **[.specify/templates/](.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](.specify/memory/constitution.md)** — Project constitution (principles, departments, lifecycle, data vocab)
- **[.specify/decisions/](.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](.specify/research/)** — User research, competitive analysis, integration API research

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the CRM Platform. In SDD:

- **Specifications are the source of truth** — they describe _what_ the system does and _why_, in technology-agnostic language
- **Code is the manifestation** — developers translate specs into working systems
- **Plans bridge the gap** — implementation plans translate specs into technical architecture before coding begins

Every feature in this CRM is governed by:

1. A **Feature Specification** (what the operator experiences, what the system does)
2. An **Implementation Plan** (technical architecture, phases, integration points)
3. **Developer Tasks** (granular, assignable work with acceptance criteria)
4. **Supporting Artifacts** (decisions, validation schemas, test scenarios, rollout plans)

---

## 📁 Repository Structure

```
.
├── README.md                           ⬅ You are here
├── STANDARDS.md                        Writing standards and conventions
├── ARCHITECTURE.md                     CRM architecture and data flow
├── GLOSSARY.md                         Vocabulary (business + technical)
├── FAQ.md                              Common questions
├── ROADMAP.md                          Feature timeline and priorities
├── CHANGELOG.md                        Spec-kit evolution
├── CONTRIBUTING.md                     How to propose changes
├── GOVERNANCE.md                       Approval process and decision-making
├── CODE_OF_CONDUCT.md                  Community standards
├── SPEC-DRIVEN.md                      SDD philosophy and methodology
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md             Project charter (principles, departments, stages, vocab)
│   │
│   ├── specs/
│   │   ├── 000-foundation/             App shell, sidebar nav, top nav, design tokens, VOIP bar
│   │   │   ├── spec.md
│   │   │   ├── changelog.md
│   │   │   ├── validation-schema.json
│   │   │   ├── test-scenarios.md
│   │   │   ├── rollout.md
│   │   │   ├── metrics.md
│   │   │   └── risks.md
│   │   ├── 001-dashboard/              Executive KPI overview, pipeline funnel, activity feed
│   │   ├── 002-contacts/               Unified customer directory across all departments
│   │   ├── 003-pipeline/               Kanban, list, and forecast pipeline views
│   │   ├── 004-activities/             Full audit trail and activity timeline
│   │   ├── 005-calendar/               Two-way synced calendar (Outlook + Google)
│   │   ├── 006-calls/                  VOIP calling, call log, compliance recordings
│   │   ├── 007-sms/                    Two-way SMS / text messaging
│   │   ├── 008-email/                  Email inbox, compose, Outlook integration
│   │   ├── 009-email-blast/            Email campaign creation, send, analytics
│   │   ├── 010-video-meetings/         Video meeting launcher (Teams + Google Meet)
│   │   ├── 011-insurance/              Insurance department pipeline, quoting, policies
│   │   ├── 012-mortgage/               Mortgage department pipeline, Arive sync
│   │   ├── 013-real-estate/            Real estate department pipeline, DotLoop
│   │   ├── 014-integrations/           Third-party integration connector management
│   │   ├── 015-reports/                Revenue, conversion, department KPIs
│   │   └── 016-admin-settings/         Users, roles, retention policies, subscriptions
│   │
│   ├── templates/
│   │   ├── spec-template.md            Feature specification template
│   │   ├── plan-template.md            Implementation plan template
│   │   ├── tasks-template.md           Developer tasks template
│   │   ├── adr-template.md             Architecture Decision Record template
│   │   ├── changelog-template.md       Version history template
│   │   ├── validation-schema-template.json
│   │   ├── test-scenarios-template.md
│   │   ├── rollout-template.md
│   │   ├── metrics-template.md
│   │   └── risks-template.md
│   │
│   ├── schemas/
│   │   ├── contact.schema.json         Unified contact / customer data model
│   │   ├── lead.schema.json            Lead / pipeline entity
│   │   ├── activity.schema.json        Activity log entry (immutable audit trail)
│   │   ├── user.schema.json            CRM system user (agent / admin)
│   │   ├── policy.schema.json          Insurance policy sub-record
│   │   ├── transaction.schema.json     Real estate transaction sub-record
│   │   ├── mortgage.schema.json        Mortgage / loan sub-record
│   │   └── call-recording.schema.json  VOIP recording metadata and retention
│   │
│   ├── decisions/
│   │   ├── adr-001-custom-crm.md       Why build custom rather than use off-the-shelf
│   │   ├── adr-002-unified-contact.md  Why single customer record, multi-dept access
│   │   ├── adr-003-marketing-entity.md Why marketing company owns data (compliance)
│   │   ├── adr-004-outlook-email.md    Why Microsoft Outlook for email, not self-hosted
│   │   ├── adr-005-pwa-first.md        Why PWA over native app for Phase 1
│   │   ├── adr-006-voip-strategy.md    VOIP provider selection criteria and recording
│   │   ├── adr-007-append-only-log.md  Why immutable activity log for compliance
│   │   └── adr-008-saas-ready.md       Why architect for multi-tenant SaaS from day one
│   │
│   └── research/
│       ├── constitution-rationale.md   Why these principles?
│       ├── user-personas.md            Who uses the CRM? What do they need?
│       ├── competitive-analysis.md     Follow Up Boss, Agency Zoom, HubSpot comparison
│       ├── voip-provider-research.md   Twilio, Telnyx, GoTo, RingCentral evaluation
│       ├── integration-api-audit.md    API docs review for Arive, DotLoop, HAR, Outlook
│       └── transition-plan.md          Data migration from Follow Up Boss + Agency Zoom
│
├── screens/                            YAML screen specifications (declarative UI)
│   ├── dashboard.yaml                  Executive KPI dashboard layout
│   ├── contacts.yaml                   Contacts directory layout
│   └── pipeline.yaml                   Pipeline board layout (kanban, list, forecast)
│
├── components/                         Reusable YAML component definitions
│   ├── stat_card.yaml                  KPI statistic card
│   ├── data_table.yaml                 Sortable, filterable data table
│   ├── modals.yaml                     Modal dialog definitions
│   ├── nav.yaml                        Sidebar and top navigation
│   └── pipeline_board.yaml             Kanban pipeline board
│
├── schemas/                            JSON Schema validation files
│
├── index.yaml                          Master CRM manifest (screens, components, integrations)
├── layout.yaml                         App shell, sidebar, top nav, responsive grid system
├── design.tokens.yaml                  Design token system (colours, typography, spacing)
├── api.yaml                            REST API contract for all CRM endpoints
├── access_control.yaml                 RBAC roles, permissions, department scoping
├── interactions.yaml                   User interaction flows (modals, drawers, confirmations)
└── events.yaml                         System event definitions (notifications, triggers)
```

---

## 🚀 Getting Started

### As a Product Manager/Designer

1. Read **[.specify/memory/constitution.md](.specify/memory/constitution.md)** to understand project principles, departments, and the 6-stage pipeline lifecycle
2. Pick a feature spec from **[.specify/specs/](.specify/specs/)** (e.g., `001-dashboard/spec.md`)
3. Follow the User Scenarios and Functional Requirements to understand what the CRM does
4. Check **[ARCHITECTURE.md](ARCHITECTURE.md)** to see how the CRM connects to all six portals

### As a Developer

1. Read **[STANDARDS.md](STANDARDS.md)** and **[CONTRIBUTING.md](CONTRIBUTING.md)**
2. Find your feature in **[.specify/specs/](.specify/specs/)**
3. Read the feature's `spec.md` to understand requirements
4. Read `plan.md` for implementation architecture and phases
5. Read `tasks.md` for your specific work
6. Check the `schemas/` directory for data contracts
7. Review `index.yaml` for the master manifest and integration map

### As an Architect

1. Start with **[ARCHITECTURE.md](ARCHITECTURE.md)** and **[GLOSSARY.md](GLOSSARY.md)**
2. Dive into **[.specify/decisions/](.specify/decisions/)** to understand why design choices were made
3. Review **[.specify/specs/000-foundation/spec.md](.specify/specs/000-foundation/spec.md)** (foundation layer)
4. Check **[.specify/research/](.specify/research/)** for integration API audits and competitive context
5. Review `index.yaml`, `layout.yaml`, and `api.yaml` for the declarative system definition

---

## ✍️ Writing a New Spec

Use the `/speckit.specify` command in GitHub Copilot Chat:

```
/speckit.specify
Create a new feature spec for [FEATURE DESCRIPTION]
```

This command will:

- Auto-number the feature (000, 001, etc.)
- Create a branch with semantic naming
- Populate the spec template with your description
- Ensure constitution compliance

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for detailed instructions.

---

## 🔄 Creating an Implementation Plan

Once a spec is approved, use `/speckit.plan`:

```
/speckit.plan
Create implementation plan for spec at [SPEC_FILE_PATH]
```

This translates the spec into:

- Technical architecture (components, layers, services)
- Phased delivery plan (what ships in v1, v1.1, etc.)
- Integration points with existing portals and third-party services
- Data design and contracts

---

## 📋 Generating Developer Tasks

Once a plan is approved, use `/speckit.tasks`:

```
/speckit.tasks
Generate developer tasks for plan at [PLAN_FILE_PATH]
```

This produces:

- Granular, independently assignable tasks
- Dependency-ordered (data → UI → integration → testing)
- Clear acceptance criteria for each task

---

## 🏗️ System Architecture at a Glance

### The Two-Layer Architecture

The Burkes Group platform operates as a two-layer system. The CRM is the **internal operational layer**; the portals are the **external-facing layer**. Both share a backend API and database.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     CRM LAYER (this spec-kit)                            │
│  Internal operators: Agents, Insurance, Mortgage, Admin                  │
│  VOIP · SMS · Email · Pipeline · Activities · Integrations · Reports     │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │  Shared Backend API + Database
┌───────────────────────────────▼──────────────────────────────────────────┐
│                     PORTAL LAYER (separate spec-kits)                    │
│  Client Portal    — buyers/sellers see their transaction status          │
│  Attorney Portal  — review documents, add notes                          │
│  Agent Portal     — upload docs, manage transactions                     │
│  Admin Portal     — platform-wide management                             │
│  Service Partner  — partner referral directory                            │
│  Main Portal      — authentication entry point + role routing            │
└──────────────────────────────────────────────────────────────────────────┘
```

### CRM Screen Inventory

The CRM consists of **16 screens** organized into four functional groups, served by a shared Foundation (000):

#### Core Operations — Phase 1

| Screen                    | Route          | Purpose                                                      |
| ------------------------- | -------------- | ------------------------------------------------------------ |
| **Dashboard** (001)       | `/dashboard`   | Executive KPI overview, pipeline funnel, activity feed, schedule, integrations status |
| **Contacts** (002)        | `/contacts`    | Unified customer directory across Insurance, Mortgage, and Real Estate |
| **Pipeline** (003)        | `/pipeline`    | Kanban board, list view, and revenue forecast across all departments |
| **Calls (VOIP)** (006)   | `/calls`       | Dialer, call log, compliance recordings with per-department retention |
| **SMS / Text** (007)     | `/sms`         | Two-way SMS conversation threads via central VOIP number     |
| **Email** (008)           | `/email`       | Inbox, compose, and auto-log via Microsoft Outlook integration |

#### Extended Features — Phase 2

| Screen                    | Route          | Purpose                                                      |
| ------------------------- | -------------- | ------------------------------------------------------------ |
| **Activities** (004)      | `/activities`  | Full audit trail and immutable activity timeline per contact  |
| **Calendar** (005)        | `/calendar`    | Two-way synced calendar (Microsoft Outlook + Google Calendar) |
| **Email Blast** (009)     | `/email-blast` | Email campaign builder, send queue, open tracking analytics  |
| **Video Meetings** (010)  | `/video-meetings` | Quick-launch to Microsoft Teams / Google Meet + meeting log |
| **Insurance** (011)       | `/insurance`   | Insurance-specific pipeline, quoting, policy lifecycle       |
| **Mortgage** (012)        | `/mortgage`    | Mortgage pipeline, Arive sync, pre-approval tracking         |
| **Real Estate** (013)     | `/real-estate` | Real estate pipeline, DotLoop integration, closing tracker   |

#### Administration — Phase 2

| Screen                    | Route          | Purpose                                                      |
| ------------------------- | -------------- | ------------------------------------------------------------ |
| **Integrations** (014)    | `/integrations` | Third-party service connector management and status monitor  |
| **Reports** (015)         | `/reports`     | Revenue, conversion rates, department KPIs, agent performance |
| **Admin Settings** (016)  | `/admin`       | Users, roles, retention policies, subscription tier management |

All screens are built on a shared **Foundation** (000) providing:

- Authenticated operator session context with department badge
- Collapsible sidebar navigation organized by Main, Communications, Departments, and Tools
- Sticky top navigation with global search, quick-action buttons (New Lead, Dial, SMS, Email, Meet), and notification bell
- VOIP status bar with live compliance recording indicator
- Design token system (colours, typography, spacing, department colour coding)
- Activity logging contract (append-only, immutable)

---

## 🏢 Multi-Department Model

The CRM serves three co-located business divisions under a single platform owned by Burkes Group Marketing LLC:

| Department    | Colour Token | Icon            | Primary Operators         | Key Integration    |
| ------------- | ------------ | --------------- | ------------------------- | ------------------ |
| **Insurance** | Gold         | `crm-shield`    | Jaquarian Bonilla (Owner) | Vertafore / Agency Zoom → standalone |
| **Mortgage**  | Blue         | `crm-bank`      | Third-party lenders       | Arive (required)   |
| **Real Estate** | Green      | `crm-buildings` | Tom Burke (Owner)         | HAR, DotLoop       |

Each department has:

- Its own pipeline stage interpretation (a contact can be in "Quoted" for Insurance and "Under Contract" for Real Estate simultaneously)
- Department-scoped compliance rules (call retention: 18 months Insurance, 24 months Mortgage, 4 years Real Estate)
- Dedicated document retention policies
- Independent assigned agents

All departments share a **single, unified contact record** — the central architectural principle of this CRM.

---

## 📊 Pipeline Stages

The CRM uses a 6-stage pipeline shared across all three departments. Each stage has a department-specific interpretation:

| Stage              | Real Estate                | Insurance              | Mortgage                 |
| ------------------ | -------------------------- | ---------------------- | ------------------------ |
| **New Inquiry**    | Buyer / seller lead        | Prospect for quote     | Pre-approval request     |
| **Contacted**      | First contact made         | Quote discussion open  | Lender introduction      |
| **Quoted / Offer** | Offer submitted            | Policy quoted          | Pre-approval issued      |
| **Under Contract** | Contract executed          | —                      | Loan processing          |
| **Pending Close**  | Closing scheduled          | Policy bound           | Clear-to-close           |
| **Closed**         | Transaction closed         | Policy issued          | Loan funded              |

---

## 🔌 Integration Ecosystem

The CRM integrates with external services across three priority tiers:

### 🔴 Priority 1 — Core Operations (Phase 1)

| Integration          | Direction     | Purpose                                          |
| -------------------- | ------------- | ------------------------------------------------ |
| Microsoft Outlook    | Bidirectional | Email in/out, calendar sync, blast sending, auto-log |
| VOIP Provider (TBD)  | Bidirectional | Calling, SMS, recording, compliance storage      |
| Arive                | Bidirectional | Mortgage applications, pre-approvals, loan pipeline |
| Follow Up Boss       | Inbound only  | Legacy contact import and data migration         |

### 🟡 Priority 2 — Extended (Phase 2)

| Integration            | Direction     | Purpose                                        |
| ---------------------- | ------------- | ---------------------------------------------- |
| HAR (Houston MLS)      | Inbound       | Agent license verification, listing data       |
| Vertafore / Agency Zoom | Syncing      | Insurance quoting sync (until standalone)       |
| DotLoop                | Bidirectional | Real estate contracts, e-signature             |
| Google Calendar        | Bidirectional | Two-way calendar sync with Google               |

### 🟠 Priority 3 — Future (Phase 3)

| Integration          | Direction | Purpose                                          |
| -------------------- | --------- | ------------------------------------------------ |
| Microsoft Teams      | Outbound  | Video meeting quick-launch + internal comms       |
| Google Meet          | Outbound  | Video meeting quick-launch + screen share         |
| DocuSign / Adobe     | Outbound  | E-signature (DotLoop may cover real estate)       |

---

## 📦 Data Model

### The Unified Contact Record

The CRM's central architectural principle is a **single, permanent, cumulative customer record** shared across all departments. Any agent who adds information to a contact profile permanently enriches that record.

```
Contact
├── Identity (created at intake)
│   ├── id, first_name, last_name, email, phone
│   ├── source, created_at, created_by
│   └── consent: { consented_at, consent_document_id }
│
├── Personal (added progressively)
│   ├── date_of_birth, address, city, state, zip
│   ├── family_members: [{ name, relationship, dob }]
│   └── vehicles: [{ vin, make, model, year }]
│
├── Department Assignments
│   ├── departments: [insurance, mortgage, real_estate]
│   ├── pipeline_stage: { per department }
│   └── assigned_agents: { per department }
│
├── Sub-Records (department-specific)
│   ├── InsuranceRecord: { policy_type, carrier, premium, effective, expiration }
│   ├── MortgageRecord: { arive_loan_id, pre_approval_amount, loan_type, lender }
│   └── RealEstateRecord: { property_address, dotloop_id, closing_date, commission }
│
├── Activities (append-only, immutable)
│   └── [Activity]: { type, agent_id, department, recorded, recording_url, notes }
│
└── Documents (linked)
    └── [Document]: { type, upload_date, retention_expires_at }
```

### Key Schemas

| Schema | File | Purpose |
| ------ | ---- | ------- |
| Contact | `schemas/contact.schema.json` | Unified customer data model |
| Lead | `schemas/lead.schema.json` | Pipeline lead entity with department stages |
| Activity | `schemas/activity.schema.json` | Immutable audit trail entry |
| User | `schemas/user.schema.json` | CRM operator (agent / admin / department head) |
| Policy | `schemas/policy.schema.json` | Insurance policy sub-record |
| Transaction | `schemas/transaction.schema.json` | Real estate transaction sub-record |
| Mortgage | `schemas/mortgage.schema.json` | Mortgage / loan sub-record |
| Call Recording | `schemas/call-recording.schema.json` | VOIP recording metadata and retention rules |

---

## 🔒 Compliance & Data Retention

The CRM enforces department-specific retention policies as a hard compliance requirement:

| Data Type                  | Insurance      | Mortgage       | Real Estate    |
| -------------------------- | -------------- | -------------- | -------------- |
| Customer records           | Indefinite     | Indefinite     | Indefinite     |
| Policy / contract docs     | 2–3 years      | 2 years        | 4 years        |
| VOIP call recordings       | 18 months      | 24 months      | 4 years        |
| Video meeting recordings   | 90 days        | 90 days        | 90 days        |
| SMS messages               | Microsoft-hosted storage                                |
| Emails                     | Microsoft Outlook storage (no self-hosting)              |

> **Compliance ownership**: Burkes Group Marketing LLC owns the platform and all data. Individual divisions (Insurance, Mortgage, Real Estate) rent access to the platform via subscription. This structure is a legal compliance requirement — the mortgage entity and insurance entity cannot co-own customer data directly.

---

## 👥 CRM Users & Roles

| Role                    | Abbrev | Department Access            | Can Transfer Leads | Admin Access |
| ----------------------- | ------ | ---------------------------- | ------------------ | ------------ |
| Department Owner        | OW     | Own department + read all    | ✓                  | ✓            |
| Insurance Agent         | IA     | Insurance                    | ✓                  | ✗            |
| Mortgage Liaison        | ML     | Mortgage                     | ✗ (view-only)      | ✗            |
| Real Estate Agent       | RA     | Real Estate                  | ✓                  | ✗            |
| Platform Administrator  | PA     | All departments              | ✓                  | ✓            |

For the reference implementation, the primary CRM operators are:

- **Jaquarian Bonilla** — Insurance Department Owner (Initials: JB)
- **Tom Burke** — Real Estate Department Owner (Initials: TB)

---

## 📱 Mobile & PWA Strategy

The CRM is built as a **Progressive Web App (PWA)** — mobile-responsive with install-to-home-screen capability. Native mobile apps are deferred to Phase 3.

PWA capabilities:

- Mobile-first responsive layouts with sidebar-to-drawer collapse at ≤992px
- PWA manifest + service worker for app-like installation on iOS and Android
- Camera access for document photo upload via browser APIs
- Push notifications via Web Push API
- Two-factor authentication via the web (no native biometrics required initially)

---

## 🏪 SaaS Commercialisation Path

The CRM is architected for future multi-tenant SaaS distribution (`saas_ready: true` in `index.yaml`):

- **RBAC at tenant level** — subscription tiers control feature access
- **Multi-tenant database isolation** — each client company's data is fully isolated
- **Subscription tiers** — Premium / Diamond / Super (feature gating per tier)
- **White-labelling** — configurable logo, colour tokens, and domain per tenant
- **The Burkes Group is the first tenant** — future tenants onboard via admin

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from the constitution):

- **P-01: Operator-First Clarity** — Every screen answers "What do I need to action right now?" within 60 seconds
- **P-02: Single Source of Truth** — The CRM is the authoritative customer record; no cross-referencing external tools
- **P-03: Unified Customer Record** — One contact, one profile, enriched by every department; never duplicated
- **P-04: Department-Scoped Access** — Each department owns their pipeline data; cross-department reads are unrestricted, writes are scoped
- **P-05: Compliance by Default** — Call recording, data retention, and consent capture are automatic, not optional
- **P-06: Progressive Disclosure** — Complex flows (new lead, call setup, pipeline transfer) use stepped modals and drawers
- **P-07: Graceful Incompleteness** — No hard locks on minimal-data contacts; use "Missing Data" badges to prompt enrichment
- **P-08: Technology-Agnostic Specs** — Specs describe _what_ and _why_; never _how_ or with framework names
- **P-09: Audit-Visible Activity** — Every meaningful state change produces an immutable, visible activity log entry
- **P-10: SaaS-Ready Architecture** — All design decisions account for future multi-tenant distribution

---

## 🗺️ Phased Delivery Roadmap

### Phase 1 — Core CRM (Weeks 1–8)

Functional CRM that replaces Follow Up Boss and forms the operational backbone.

| Deliverable | Screens |
| --- | --- |
| Contact management, department tagging, lead transfer | 002-contacts |
| Pipeline (kanban + list) across all departments | 003-pipeline |
| VOIP calling + SMS via selected provider | 006-calls, 007-sms |
| Outlook email integration (in/out + auto-log) | 008-email |
| Executive dashboard with KPIs, activity feed, schedule | 001-dashboard |
| Auth & RBAC shared with portal layer | 000-foundation |
| Call recording with basic retention | 006-calls |
| CRM-Portal bridge (client form → CRM contact) | Cross-system |

### Phase 2 — Extended Features (Weeks 8–14)

| Deliverable | Screens |
| --- | --- |
| Email blast / campaigns | 009-email-blast |
| Calendar sync (Outlook + Google) | 005-calendar |
| Activities screen (full audit trail) | 004-activities |
| Department sub-views (Insurance, Mortgage, RE) | 011, 012, 013 |
| Arive + HAR integration | 014-integrations |
| Reports and analytics | 015-reports |
| PWA manifest + install prompt | 000-foundation |

### Phase 3 — Scale & SaaS (Weeks 14–24)

| Deliverable | Screens |
| --- | --- |
| DotLoop integration | 014-integrations |
| Multi-tenant RBAC + subscription billing | 016-admin-settings |
| White-labelling support | 000-foundation |
| Native mobile app (if PWA proves insufficient) | — |
| AI-assisted lead scoring and email drafting | Cross-system |

---

## 🔗 Cross-References

### Portal Spec-Kits (External Layer)

| Spec-Kit | Path | Relationship to CRM |
| --- | --- | --- |
| **Admin Portal** | `../admin-spec/` | Admin actions write to CRM backend; user management shared |
| **Agent Portal** | `../agent-spec/` | Agent uploads and transactions sync to CRM contact records |
| **Attorney Portal** | `../attorney-spec/` | Attorney notes create CRM activity entries |
| **Client Portal** | `../client-spec/` | Client form submissions create CRM contacts |
| **Main Portal** | `../main-spec/` | Auth service shared; role routing to CRM or portal |
| **Service Partner Portal** | `../servicePartner-spec/` | Partner directory feeds CRM referral workflows |

### Key Internal Files

- **Spec-Driven Development Philosophy**: [SPEC-DRIVEN.md](SPEC-DRIVEN.md)
- **Global Project Constitution**: [.specify/memory/constitution.md](.specify/memory/constitution.md)
- **Implementation Standards**: [STANDARDS.md](STANDARDS.md)
- **CRM Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Contributing Guidelines**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📞 Questions?

- Check [FAQ.md](FAQ.md) for common questions
- See [GLOSSARY.md](GLOSSARY.md) for terminology
- Open an issue using [.github/ISSUE_TEMPLATE/question.md](.github/ISSUE_TEMPLATE/question.md)

---

## 📄 License & Attribution

This specification kit is maintained by The Burkes Group Product and Engineering teams. All specifications are proprietary; external sharing requires explicit approval.

**Version**: 1.0
**Last Updated**: April 13, 2026
**Platform Owner**: Burkes Group Marketing LLC
**Maintained by**: [See CODEOWNERS](.github/CODEOWNERS)

---

> **The power is in the clarity of intent.** When specifications are precise, unambiguous, and discoverable, implementation becomes a mechanical transformation. This repo ensures that transformation happens right the first time.
