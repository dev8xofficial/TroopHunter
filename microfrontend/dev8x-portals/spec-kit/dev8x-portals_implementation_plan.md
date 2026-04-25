# Unified Spec-Kit: Dev8X Platform + Burkes Group Consolidation

**Goal**: Convert 5 Dev8X HTML prototypes + existing Burkes Group spec-kit context into a single, unified, GitHub-standard spec-kit at `d:\Dev8x\Primary\microfrontend\dev8x-portals\spec-kit\unified-spec\`.

---

## Source Inventory

### HTML Files to Convert (5 — `dev8x-portals/`)

| File | Size | Domain | Functional Surface |
|------|------|--------|--------------------|
| `auth.html` | 35KB | Login & Authentication | Portal selector, 3 auth forms (Candidate/Client/Admin), signup, SSO, 2FA |
| `admin-panel.html` | 644KB | HR Admin Panel | Dashboard, applicant table, pipeline kanban, job postings, interviews, applicant detail, document viewer, settings |
| `candidate-portal.html` | 181KB | Candidate Portal | Application timeline, interview scheduling, document signing, onboarding, profile, messages, documents |
| `client-portal.html` | 277KB | Client Portal | Project dashboard, invoices, files & docs, working hours (Clockify), messaging, support, contracts |
| `crm-portal.html` | 331KB | CRM/Sales Platform | Contacts, pipeline board, outreach analytics, templates, lead stacks, scoring, archive, settings |

### Conversation Context Documents (3 — `burkes/prompts/`)

| File | Key Insight Applied |
|------|-------------------|
| `crm-vs-attorney-comparison.md` | Attorney has best GitHub automation (5 workflows, 4 templates); CRM has best content depth. Adopt Attorney's `.github/` + CRM's content innovations |
| `comparsion-attonery.md` | Attorney is the right reusable template — 13 files/module, `plan.md` + `tasks.md` per module. Fix stale constitution before reuse |
| `spec-kit-comparison-analysis.md` | Gold standard checklist: 11-file minimum, 5 workflows, 4 issue templates. CRM's YAML contract layer is an innovation to adopt |

### Prior Implementation Plan (1)

| File | Relevance |
|------|-----------|
| `implementation_plan.md.resolved` (conv `0eb52d83`) | Defines the unified folder structure, domain numbering (0xx–8xx), centralized contracts, constitution unification, and ADR consolidation strategy. This plan extends it to cover the Dev8X HTML files |

---

## User Review Required

> [!IMPORTANT]
> **Output Location**: This plan creates the unified spec-kit at `d:\Dev8x\Primary\microfrontend\dev8x-portals\spec-kit\unified-spec\`. Confirm this path is acceptable.

> [!IMPORTANT]
> **Two Platform Families**: The Dev8X HTML files represent an HR/Talent Management platform, while the Burkes Group files represent a Real Estate platform. Should these be treated as:
> - **(A)** Two separate domain families within ONE unified spec-kit (Dev8X = Domains 0xx–4xx, Burkes = Domains 5xx–13xx), or
> - **(B)** Two separate spec-kit repositories with a shared `.github/` automation layer?

> [!WARNING]
> **No UI/Design Content**: Per your constraint, all CSS, layout, design tokens, screen manifests, color values, typography, and visual specifications will be strictly excluded. Only functional components, business logic, data models, state machines, RBAC, API contracts, and workflows will be extracted.

---

## Phase 1: Per-File Functional Extraction

### 1.1 `auth.html` → Domain 000: Login & Authentication

**Extracted Functional Components:**

| Component | Business Logic | Data Entities |
|-----------|---------------|---------------|
| **Portal Selector** | Role-based routing: maps user type (Candidate/Client/Admin) to destination portal. `portalConfig` defines per-portal routing rules | `PortalConfig { tag, dest, steps[] }` |
| **Candidate Login** | Email + Password credential validation. Session storage: `d8x_portal`, `d8x_authed` | `Credential { email, password }`, `Session { portal, authed }` |
| **Candidate Signup** | Registration with: first_name, last_name, email, phone, password. Terms acceptance required | `Registration { first_name, last_name, email, phone, password, terms_accepted }` |
| **Client Login** | Email + Password + "Remember me" persistent session. No signup — clients are provisioned ("Contact Dev8X to get set up") | `ClientCredential { email, password, remember_me }` |
| **Admin Login** | Email + Password + 2FA code (6-digit TOTP). Restricted access with unauthorized access warning. All sessions logged | `AdminCredential { email, password, totp_code }` |
| **Google SSO** | OAuth 2.0 social login for Candidate and Client portals. Not available for Admin | `OAuthToken { provider: 'google', token }` |
| **Forgot Password** | Password recovery flow linked from all 3 auth forms | `PasswordReset { email, reset_token }` |

**Modules:**

| Module | Scope |
|--------|-------|
| `001-authentication` | Login, signup, credential validation, session management |
| `002-portal-routing` | Portal selector, role → destination mapping |
| `003-mfa` | Admin 2FA (TOTP), future MFA expansion |
| `004-password-reset` | Forgot password, token-based recovery |
| `005-sso` | Google OAuth, extensible SSO provider framework |

---

### 1.2 `admin-panel.html` → Domain 100: HR Admin Panel

**Extracted Functional Components:**

| Component | Business Logic | Data Entities |
|-----------|---------------|---------------|
| **Dashboard** | KPI stats: Total Applicants, Active Jobs, Interviews This Week, Avg. Time-to-Hire. Delta metrics (period-over-period change) | `DashboardKPI { metric, value, delta, direction }` |
| **Applicant Table** | Filterable by status (Applied, Shortlisted, Interview, Selected, Rejected, Future Hire, Joined). Paginated. Sortable columns | `Applicant { id, name, email, position, status, applied_date, source, department }` |
| **Applicant Detail** | Profile card with evaluation scores (star rating). Document inventory. Application timeline with expandable steps | `ApplicantProfile { applicant_id, evaluation_scores[], documents[], timeline_steps[] }` |
| **Pipeline Kanban** | 5-column board: Applied → Shortlisted → Interview → Selected → Joined. Card drag/drop. Per-card: avatar, role, days-in-stage, tags, urgency indicator | `PipelineStage { name, candidates[], count }`, `PipelineCard { candidate_id, role, days_in_stage, tags[], urgent }` |
| **Funnel Stats** | 5-stage conversion funnel: Applied → Shortlisted → Interview → Selected → Joined with percentages and conversion rates | `FunnelMetric { stage, count, percentage, conversion_rate }` |
| **Job Postings** | Job cards with: title, department, status (Live/Draft/Paused), applicant count, department icon | `JobPosting { id, title, department, status, applicant_count, posted_date }` |
| **Interviews** | Interview scheduling with time slots, interviewer assignment, candidate matching | `Interview { id, candidate_id, interviewer_id, datetime, type, status }` |
| **Evaluation** | Scoring grid per candidate. Multi-dimension ratings. Checklist-based assessment | `Evaluation { candidate_id, scores: { dimension: rating }[], checklist[], notes }` |
| **Documents** | Document viewer (PDF placeholder), document list per applicant with type/size metadata | `Document { id, name, type, size, uploaded_by, upload_date }` |
| **Email Templates** | Template preview with variable substitution (candidate name, position, etc.) | `EmailTemplate { id, name, body, variables[] }` |
| **Toast/Notifications** | System notification delivery (success/error) | `Notification { type, message, timestamp }` |
| **Search** | Global search across applicants, jobs, interviews | `SearchQuery { query, scope, results[] }` |

**Modules:**

| Module | Scope |
|--------|-------|
| `100-admin-dashboard` | KPIs, funnel metrics, pipeline summary |
| `101-admin-applicants` | Applicant CRUD, filtering, pagination, detail view |
| `102-admin-pipeline` | Kanban board, stage transitions, drag-drop rules |
| `103-admin-jobs` | Job posting CRUD, status lifecycle (Draft→Live→Paused→Closed) |
| `104-admin-interviews` | Interview scheduling, time slots, interviewer assignment |
| `105-admin-evaluations` | Scoring, checklists, multi-dimension assessment |
| `106-admin-documents` | Document management, upload, viewing, per-applicant association |
| `107-admin-email-templates` | Template CRUD, variable system, message sending |
| `108-admin-settings` | System configuration, user management |
| `109-admin-performance` | Performance tracking, clockify integration |
| `110-admin-team` | Internal HR team management, roles |
| `111-admin-analytics` | Platform analytics, funnel metrics |

---

### 1.3 `candidate-portal.html` → Domain 200: Candidate Portal

**Extracted Functional Components:**

| Component | Business Logic | Data Entities |
|-----------|---------------|---------------|
| **Application Timeline** | Multi-step vertical timeline: Application Submitted → AI Screening → Shortlisted → Interview Scheduled → Interview → HR Review → Offer/Not Selected. Steps have states: done/current/pending/skipped. Expandable detail panels per step | `TimelineStep { name, status, date, details, expandable }` |
| **Interview Scheduling** | Date picker + time slot grid (3 columns). Slots: available/selected/taken. Confirmation flow | `TimeSlot { date, time, available, selected }` |
| **Document Signing** | E-signature workflow. Document list with signed/pending status. Sign action triggers status change | `DocumentSign { doc_id, name, status: signed|pending, signed_date }` |
| **Onboarding** | Post-hire onboarding: account provisioning (Microsoft 365, Slack, Jira, GitHub), software installation checklist, first-day setup items | `OnboardingItem { type, name, status, description }`, `Account { service, value }` |
| **Documents Tab** | Categorized document list: Employment Docs, Identity Verification, Tax & Compliance, Education. Documents have tags (Required/Signed/Pending/Read-only) and actions (View/Sign/Download) | `CandidateDocument { id, name, category, tag, actions[] }` |
| **Messages** | Message inbox with sender avatar, subject, preview, timestamp, read/unread status | `Message { id, sender, subject, preview, timestamp, read }` |
| **Profile** | Personal info, contact info, employment details. Editable fields | `CandidateProfile { name, email, phone, address, emergency_contact, skills[], education[] }` |
| **Progress Tracker** | Sidebar progress card showing overall completion percentage and per-step status | `ProgressTracker { overall_pct, steps: { name, status }[] }` |
| **Deadlines** | Upcoming deadline items with priority-coded dots (red/orange/green) | `Deadline { label, date, priority }` |
| **Quick Actions** | Action buttons: Upload Document, Message HR, View Offer, Schedule Call | `QuickAction { label, icon, action }` |
| **Policy Modal** | Policy document viewer with accept/decline. Required acknowledgement before proceeding | `PolicyAcknowledgement { policy_id, accepted, accepted_date }` |

**Modules:**

| Module | Scope |
|--------|-------|
| `200-candidate-dashboard` | Application status, progress tracker, deadlines, quick actions |
| `201-candidate-application` | Application timeline, step-by-step flow, AI screening results |
| `202-candidate-interviews` | Interview scheduling, time slot selection, confirmation |
| `203-candidate-documents` | Document management, e-signing, categorized document list |
| `204-candidate-onboarding` | Account provisioning, software setup, first-day checklist |
| `205-candidate-messages` | Inbox, message threads, read/unread |
| `206-candidate-profile` | Personal info, editable profile, emergency contacts |
| `207-candidate-performance` | Performance dashboard, target hours, late alerts |

---

### 1.4 `client-portal.html` → Domain 300: Client Portal

**Extracted Functional Components:**

| Component | Business Logic | Data Entities |
|-----------|---------------|---------------|
| **Dashboard** | Welcome banner, KPI stats (Active Projects, Total Invoiced, Open Tickets, Team Size). Quick links bar | `ClientDashboard { projects_count, total_invoiced, open_tickets, team_size }` |
| **Projects** | Project cards with: name, status (On Track/At Risk/Delayed/Completed), progress bar (%), team members, PM info, payment type (Fixed/Hourly/Monthly) | `Project { id, name, status, progress_pct, team[], pm, payment_type, budget }` |
| **Invoices** | Invoice table with: ID, project, amount, status (Paid/Due/Overdue/Draft), date, payment method. Filter by status | `Invoice { id, project_id, amount, status, issue_date, due_date, payment_method }` |
| **Files & Documents** | Project-scoped file management. Categories: Contracts, Deliverables, Reports. Upload, download, version tracking | `File { id, name, project_id, category, version, size, uploaded_by, upload_date }` |
| **Working Hours (Clockify)** | Time tracking integration: weekly bar chart, daily time log table, team breakdown, budget burn bar, score ring | `TimeEntry { id, date, hours, task, team_member, project_id }`, `BudgetBurn { used, total, pct }` |
| **Messaging** | Thread-based messaging with team members | `Thread { id, participants[], messages[] }` |
| **Support Tickets** | Ticket system: status (Open/In Progress/Resolved), priority, category | `Ticket { id, subject, status, priority, category, created_date }` |
| **Contracts** | Contract documents with signing status (Signed/Pending/Draft) | `Contract { id, name, project_id, status, signed_date }` |
| **Payment Summary** | Line-item billing: subtotal, tax, total. Payment method badges | `PaymentSummary { items[], subtotal, tax, total, payment_method }` |

**Modules:**

| Module | Scope |
|--------|-------|
| `300-client-dashboard` | KPIs, welcome banner, quick links |
| `301-client-projects` | Project list, detail view, progress tracking, team |
| `302-client-invoices` | Invoice management, payment status, filtering |
| `303-client-files` | File management, categorization, version control |
| `304-client-working-hours` | Clockify integration, time logs, bar charts, budget burn |
| `305-client-messaging` | Thread-based messaging, team communication |
| `306-client-support` | Support tickets, status lifecycle |
| `307-client-contracts` | Contract management, e-signing |
| `308-client-milestones` | Project milestones, phase tracking |
| `309-client-payment-methods` | Billing management, saved cards |
| `310-client-team` | Client-side team provisioning, roles |
| `311-client-notifications` | System notifications, inbox |
| `312-client-settings` | Client profile, security, danger zone |

---

### 1.5 `crm-portal.html` → Domain 400: CRM/Sales Platform

**Extracted Functional Components:**

| Component | Business Logic | Data Entities |
|-----------|---------------|---------------|
| **Dashboard** | Pipeline stats (6 metrics), funnel visualization (Lead→Contacted→Meeting→Proposal→Closed), outreach feed, hot leads list. Pipeline toggle: B2B / Freelance | `CRMDashboard { pipeline_stats[], funnel[], outreach_feed[], hot_leads[] }` |
| **Contacts** | Contact table with: name, company, role, health score bar, last contact date, lead temperature (Hot/Warm/Cool), channel chips (LinkedIn/Email/WhatsApp/Upwork/Call), sentiment (Positive/Neutral/Negative/No Response/Burned). Decision maker flag. Filtering by pipeline, temperature, channel | `Contact { id, name, company, role, health_score, last_contact, temperature, channels[], sentiment, is_dm, pipeline }` |
| **Pipeline Board** | Kanban: New Lead → Contacted → Meeting Set → Proposal → Won / Lost. Per-card: company, deal value, age in days. Stale deal indicators (amber/red borders) | `Deal { id, contact_id, stage, value, age_days, stale_level }` |
| **Outreach Analytics** | Channel performance table: LinkedIn, Email, WhatsApp, Upwork, Cold Call — with sent, reply-rate, meeting-rate, best-channel highlighting. Heatmap: day-of-week × time-of-day response matrix | `ChannelMetric { channel, sent, replied, meetings, reply_rate, meeting_rate }`, `HeatmapCell { day, hour, value }` |
| **Templates** | Template library grouped by channel (LinkedIn, Email, WhatsApp). Template editor with variable chips ({first_name}, {company}, etc.). Live preview. Per-template reply rate | `Template { id, name, channel, body, variables[], reply_rate }` |
| **Lead Stacks** | Curated lead lists: "SaaS Founders Series A+", "Marketing Agency Owners", etc. Per-stack: platform chips, lead count, last outreach date | `LeadStack { id, name, description, platforms[], lead_count, last_outreach }` |
| **Scoring** | Lead scoring cards: composite score (0-100) with per-dimension bars: Response Time, Budget Fit, Decision Power, Timeline, Tech Stack Match | `LeadScore { contact_id, total_score, dimensions: { name, score }[] }` |
| **Archive** | Two tabs: Closed Won / Closed Lost. Historical deal data | `ArchivedDeal { deal_id, outcome: won|lost, close_date, value }` |
| **Settings** | Tabs: General, Users, Integrations. Toggle switches for auto-follow-up, email sync, etc. User management with role assignment | `Setting { key, value, type: toggle|text|select }`, `CRMUser { id, name, role, department }` |

**Modules:**

| Module | Scope |
|--------|-------|
| `400-crm-dashboard` | Pipeline stats, funnel, outreach feed, hot leads |
| `401-crm-contacts` | Contact CRUD, filtering, health scores, sentiment |
| `402-crm-pipeline` | Kanban board, deal stages, stale indicators |
| `403-crm-outreach-analytics` | Channel metrics, heatmap, response analysis |
| `404-crm-templates` | Template library, editor, variables, preview |
| `405-crm-lead-stacks` | Curated lead lists, platform targeting |
| `406-crm-scoring` | Lead scoring, multi-dimension assessment |
| `407-crm-archive` | Closed deals (Won/Lost), historical data |
| `408-crm-settings` | System config, user management, integrations |
| `409-crm-companies` | Account-level CRM management |
| `410-crm-jobs` | Job requisition tracking for recruiting |

---

## Phase 2: Unified Spec-Kit Architecture

### Folder Structure

```
unified-spec/
│
├── README.md                          # Platform overview, navigation guide
├── ARCHITECTURE.md                    # Unified system architecture
├── STANDARDS.md                       # Writing standards (Attorney prescriptive style)
├── GLOSSARY.md                        # Cross-domain unified glossary
├── FAQ.md                             # Contributor FAQ
├── ROADMAP.md                         # Platform-wide feature roadmap
├── CHANGELOG.md                       # Spec-kit evolution log
├── CONTRIBUTING.md                    # Contribution guidelines
├── GOVERNANCE.md                      # Decision-making process
├── CODE_OF_CONDUCT.md                 # Community standards
├── SPEC-DRIVEN.md                     # SDD methodology
├── constitution.md                    # → symlink to .specify/memory/constitution.md
│
├── PHASE-1-DELIVERABLE.md             # Delivery scope: Auth + Admin + Candidate
├── PHASE-2-DELIVERABLE.md             # Delivery scope: Client + CRM
│
├── contracts/                         # Centralized YAML contracts
│   ├── api.yaml                       # Unified REST API manifest (all domains)
│   ├── access-control.yaml            # Unified RBAC (all roles × all domains)
│   ├── events.yaml                    # Unified system events
│   └── interactions.yaml              # Unified interaction/state flows
│
├── schemas/                           # Centralized domain schemas
│   ├── user.schema.json
│   ├── session.schema.json
│   ├── credential.schema.json
│   ├── applicant.schema.json
│   ├── job-posting.schema.json
│   ├── interview.schema.json
│   ├── evaluation.schema.json
│   ├── pipeline-card.schema.json
│   ├── document.schema.json
│   ├── project.schema.json
│   ├── invoice.schema.json
│   ├── time-entry.schema.json
│   ├── ticket.schema.json
│   ├── contract.schema.json
│   ├── contact.schema.json
│   ├── deal.schema.json
│   ├── template.schema.json
│   ├── lead-stack.schema.json
│   ├── lead-score.schema.json
│   ├── notification.schema.json
│   └── email-template.schema.json
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md            # SINGLE authoritative constitution
│   │
│   ├── specs/
│   │   ├── 000-foundation/            # Platform-wide foundation [13 files]
│   │   │
│   │   │── ─── DOMAIN 0xx: AUTH ───
│   │   ├── 001-authentication/        # [13 files]
│   │   ├── 002-portal-routing/        # [13 files]
│   │   ├── 003-mfa/                   # [13 files]
│   │   ├── 004-password-reset/        # [13 files]
│   │   ├── 005-sso/                   # [13 files]
│   │   │
│   │   │── ─── DOMAIN 1xx: HR ADMIN ───
│   │   ├── 100-admin-dashboard/       # [13 files]
│   │   ├── 101-admin-applicants/      # [13 files]
│   │   ├── 102-admin-pipeline/        # [13 files]
│   │   ├── 103-admin-jobs/            # [13 files]
│   │   ├── 104-admin-interviews/      # [13 files]
│   │   ├── 105-admin-evaluations/     # [13 files]
│   │   ├── 106-admin-documents/       # [13 files]
│   │   ├── 107-admin-email-templates/ # [13 files]
│   │   ├── 108-admin-settings/        # [13 files]
│   │   │
│   │   │── ─── DOMAIN 2xx: CANDIDATE ───
│   │   ├── 200-candidate-dashboard/   # [13 files]
│   │   ├── 201-candidate-application/ # [13 files]
│   │   ├── 202-candidate-interviews/  # [13 files]
│   │   ├── 203-candidate-documents/   # [13 files]
│   │   ├── 204-candidate-onboarding/  # [13 files]
│   │   ├── 205-candidate-messages/    # [13 files]
│   │   ├── 206-candidate-profile/     # [13 files]
│   │   │
│   │   │── ─── DOMAIN 3xx: CLIENT ───
│   │   ├── 300-client-dashboard/      # [13 files]
│   │   ├── 301-client-projects/       # [13 files]
│   │   ├── 302-client-invoices/       # [13 files]
│   │   ├── 303-client-files/          # [13 files]
│   │   ├── 304-client-working-hours/  # [13 files]
│   │   ├── 305-client-messaging/      # [13 files]
│   │   ├── 306-client-support/        # [13 files]
│   │   ├── 307-client-contracts/      # [13 files]
│   │   │
│   │   │── ─── DOMAIN 4xx: CRM ───
│   │   ├── 400-crm-dashboard/         # [13 files]
│   │   ├── 401-crm-contacts/          # [13 files]
│   │   ├── 402-crm-pipeline/          # [13 files]
│   │   ├── 403-crm-outreach-analytics/# [13 files]
│   │   ├── 404-crm-templates/         # [13 files]
│   │   ├── 405-crm-lead-stacks/       # [13 files]
│   │   ├── 406-crm-scoring/           # [13 files]
│   │   ├── 407-crm-archive/           # [13 files]
│   │   └── 408-crm-settings/          # [13 files]
│   │
│   ├── templates/                     # 13 artifact templates
│   │   ├── spec-template.md
│   │   ├── plan-template.md
│   │   ├── tasks-template.md
│   │   ├── changelog-template.md
│   │   ├── metrics-template.md
│   │   ├── risks-template.md
│   │   ├── rollout-template.md
│   │   ├── test-scenarios-template.md
│   │   ├── validation-schema-template.json
│   │   ├── rbac-matrix-template.md
│   │   ├── activity-log-events-template.md
│   │   ├── api-contracts-template.md
│   │   ├── state-machines-template.md
│   │   └── adr-template.md
│   │
│   ├── schemas/                       # Meta-schemas only
│   │   ├── spec-structure.json
│   │   ├── plan-structure.json
│   │   └── tasks-structure.json
│   │
│   ├── decisions/                     # ADR registry
│   │   ├── adr-001-unified-spec-kit.md
│   │   ├── adr-002-domain-numbering.md
│   │   ├── adr-003-centralized-contracts.md
│   │   ├── adr-004-13-file-module-standard.md
│   │   ├── adr-005-tech-agnostic-specs.md
│   │   ├── adr-006-portal-routing-architecture.md
│   │   ├── adr-007-pipeline-kanban-state-machine.md
│   │   ├── adr-008-clockify-integration-strategy.md
│   │   ├── adr-009-lead-scoring-model.md
│   │   └── adr-010-multi-portal-auth.md
│   │
│   └── research/
│       ├── user-personas.md
│       ├── competitive-analysis.md
│       └── security-threat-model.md
│
├── .github/                           # Attorney-grade GitHub automation
│   ├── workflows/
│   │   ├── validate-specs.yml
│   │   ├── validate-schema.yml
│   │   ├── validate-dependencies.yml
│   │   ├── pr-checks.yml
│   │   └── version-check.yml
│   │
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.md
│   │   ├── question.md
│   │   ├── spec-new.md
│   │   └── spec-update.md
│   │
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   ├── pull_request_template.md
│   ├── specify.prompt.md
│   ├── plan.prompt.md
│   └── tasks.prompt.md
│
└── reference/                         # Source HTML prototypes (archive)
    └── README.md
```

### Per-Module Artifact Set (13 Files — Gold Standard)

Every module directory contains exactly these 13 files:

```
spec.md                    # Feature specification (scenario-driven, tech-agnostic)
changelog.md               # Version history
metrics.md                 # Success metrics & KPIs
risks.md                   # Risk assessment & mitigations
rollout.md                 # Rollout strategy & feature flags
test-scenarios.md          # Test cases & acceptance criteria
validation-schema.json     # Payload validation rules
rbac-matrix.md             # Role-based access control (references contracts/access-control.yaml)
activity-log-events.md     # Audit events (references contracts/events.yaml)
api-contracts.md           # REST API endpoints (references contracts/api.yaml)
state-machines.md          # State transitions (references contracts/interactions.yaml)
plan.md                    # Implementation plan
tasks.md                   # Task breakdown
```

---

## Phase 3: Centralized Contracts

### contracts/api.yaml

All REST endpoints grouped by domain:

| Domain | Endpoint Groups |
|--------|----------------|
| Auth (0xx) | `POST /auth/login`, `POST /auth/register`, `POST /auth/mfa/verify`, `POST /auth/password/reset`, `POST /auth/sso/google` |
| Admin (1xx) | `GET /admin/dashboard/kpis`, `GET/POST /admin/applicants`, `PATCH /admin/applicants/:id/status`, `GET/POST /admin/jobs`, `GET/POST /admin/interviews` |
| Candidate (2xx) | `GET /candidate/timeline`, `POST /candidate/interviews/schedule`, `POST /candidate/documents/:id/sign`, `GET/PUT /candidate/profile` |
| Client (3xx) | `GET /client/projects`, `GET /client/invoices`, `POST /client/files/upload`, `GET /client/time-entries`, `POST /client/tickets` |
| CRM (4xx) | `GET/POST /crm/contacts`, `GET/PATCH /crm/deals`, `GET /crm/analytics/channels`, `GET/POST /crm/templates`, `GET /crm/scores` |

### contracts/access-control.yaml

| Role | Auth | Admin | Candidate | Client | CRM |
|------|------|-------|-----------|--------|-----|
| `super_admin` | Full | Full | Read | Read | Full |
| `hr_admin` | Login only | Full | Read | None | None |
| `candidate` | Login + Register | None | Own data | None | None |
| `client` | Login only | None | None | Own projects | None |
| `sales_rep` | Login only | None | None | None | Full |
| `manager` | Login only | Read | Read | Own projects | Full |

### contracts/events.yaml

Unified system events:

| Domain | Event Types |
|--------|------------|
| Auth | `auth.login`, `auth.logout`, `auth.register`, `auth.mfa_verified`, `auth.password_reset` |
| Admin | `applicant.created`, `applicant.status_changed`, `job.published`, `interview.scheduled`, `evaluation.submitted` |
| Candidate | `application.submitted`, `interview.confirmed`, `document.signed`, `onboarding.step_completed` |
| Client | `project.created`, `invoice.paid`, `file.uploaded`, `ticket.opened`, `time_entry.logged` |
| CRM | `contact.created`, `deal.stage_changed`, `outreach.sent`, `template.used`, `score.updated` |

### contracts/interactions.yaml

State machines:

| Entity | States | Transitions |
|--------|--------|-------------|
| **Applicant** | Applied → Shortlisted → Interview → Selected → Joined (or Rejected/Future Hire at any stage) | `shortlist()`, `schedule_interview()`, `select()`, `reject()`, `mark_future()`, `join()` |
| **Job** | Draft → Live → Paused → Closed | `publish()`, `pause()`, `resume()`, `close()` |
| **Deal** | New Lead → Contacted → Meeting Set → Proposal → Won / Lost | `contact()`, `set_meeting()`, `propose()`, `win()`, `lose()` |
| **Invoice** | Draft → Due → Paid / Overdue | `issue()`, `pay()`, `mark_overdue()` |
| **Ticket** | Open → In Progress → Resolved | `assign()`, `resolve()`, `reopen()` |
| **Document** | Pending → Signed | `sign()` |

---

## Phase 4: Constitution

Single unified constitution covering:

| Section | Content |
|---------|---------|
| 1. Platform Identity | Dev8X Talent Management Platform — Candidate + Client + Admin + CRM |
| 2. Principles | P-01 through P-08 (tech-agnostic, append-only logs, single source of truth, etc.) |
| 3. Actors Matrix | 6 roles: super_admin, hr_admin, candidate, client, sales_rep, manager |
| 4. Applicant Lifecycle | 7 stages (Applied through Joined) |
| 5. Deal Pipeline | 5 stages (New Lead through Won/Lost) |
| 6. Project Lifecycle | 4 stages (Active, At Risk, Delayed, Completed) |
| 7. Global Data Vocabulary | Canonical field names, types, constraints |
| 8. Activity Log Events | All events from contracts/events.yaml |
| 9. Guardrails | Negative constraints: "Never mutate activity log", "Never expose admin endpoints to candidates" |

---

## Phase 5: ADR Strategy

| ADR | Decision | Source |
|-----|----------|--------|
| ADR-001 | Unified spec-kit consolidation | New |
| ADR-002 | Domain numbering (0xx–4xx) | From Burkes plan |
| ADR-003 | Centralized contracts vs per-module | From CRM innovation |
| ADR-004 | 13-file module standard | From Attorney pattern |
| ADR-005 | Technology-agnostic specs | Shared baseline |
| ADR-006 | Portal routing architecture | From auth.html extraction |
| ADR-007 | Pipeline kanban state machine | From admin-panel.html + crm-portal.html |
| ADR-008 | Clockify integration strategy | From client-portal.html |
| ADR-009 | Lead scoring model | From crm-portal.html |
| ADR-010 | Multi-portal authentication | From auth.html extraction |

---

## Execution Phases

### Phase A: Scaffold (Root + .github/ + Templates)

1. Create `unified-spec/` directory
2. Generate all 12 root documentation files
3. Create `.github/` with 5 workflows, 4 issue templates, CODEOWNERS, dependabot, PR template, AI prompts
4. Create unified templates directory (13 artifact templates + ADR template)
5. Create `contracts/` with empty YAML stubs
6. Create `schemas/` with empty schema stubs
7. Create `reference/` archive directory

### Phase B: Constitution & Decisions

1. Write unified constitution (9 sections)
2. Write 10 ADRs
3. Write 3 research files (personas, competitive analysis, security model)

### Phase C: Auth Domain (001–005) — 5 modules × 13 files = 65 files

### Phase D: Admin Domain (100–111) — 12 modules × 13 files = 156 files

### Phase E: Candidate Domain (200–207) — 8 modules × 13 files = 104 files

### Phase F: Client Domain (300–312) — 13 modules × 13 files = 169 files

### Phase G: CRM Domain (400–410) — 11 modules × 13 files = 143 files

### Phase H: Centralized Contracts & Schemas

1. Populate `contracts/api.yaml` from all per-module API contracts
2. Populate `contracts/access-control.yaml` from all RBAC matrices
3. Populate `contracts/events.yaml` from all activity-log-events
4. Populate `contracts/interactions.yaml` from all state-machines
5. Populate all `schemas/*.schema.json` with full JSON Schema definitions

### Phase I: Validation

1. Verify 13-file completeness in every module (39 modules × 13 = 507 files)
2. Run all 5 GitHub workflows locally
3. Cross-reference integrity check
4. Naming convention audit (all kebab-case)
5. No-UI check: grep for CSS, hex colors, px values — must return zero

---

## Module Summary

| Domain | Module Count | Files (13/module) | Source HTML |
|--------|-------------|-------------------|-------------|
| Foundation | 1 | 13 | All |
| Auth (0xx) | 5 | 65 | `auth.html` |
| Admin (1xx) | 12 | 156 | `admin-panel.html` |
| Candidate (2xx) | 8 | 104 | `candidate-portal.html` |
| Client (3xx) | 13 | 169 | `client-portal.html` |
| CRM (4xx) | 11 | 143 | `crm-portal.html` |
| **Total** | **50** | **650** | — |

---

## Open Questions

> [!IMPORTANT]
> **Burkes Group Integration**: Should the existing 7 Burkes Group spec-kits be folded into this same unified spec-kit (as Domains 5xx–13xx), or treated as a separate spec-kit repository? The prior implementation plan assumed consolidation — confirm if this still holds for the Dev8X files.

> [!IMPORTANT]
> **Execution Scope**: Generating 507 spec files is a large task. Should I execute all phases in one pass, or deliver domain-by-domain for incremental review?

---

## Verification Plan

### Automated Tests

1. **Structure validation**: Script verifying every module contains exactly 13 artifact files
2. **Naming audit**: All files/dirs follow kebab-case convention
3. **Cross-reference check**: All `FR-NN-NN` references resolve to valid modules
4. **Schema validation**: JSON Schema lint on all `.schema.json` files
5. **YAML validation**: YAML lint on all `.yaml` contract files
6. **Constitution sync**: Root `constitution.md` matches `.specify/memory/constitution.md`
7. **No-UI check**: Grep for design tokens, CSS, layout, color hex values → must return zero
8. **No empty modules**: Every module directory has ≥ 13 files

### Manual Verification

1. Walkthrough: Confirm domain isolation and correct functional mapping per HTML file
2. Module inventory: Cross-check every HTML functional component has been captured
3. No data loss: Verify no business logic was dropped during extraction
