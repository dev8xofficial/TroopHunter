# User Personas

> Research document defining the target user personas for the Dev8X platform.

---

## Persona 1: Sarah — The Job Candidate

| Attribute | Value |
|-----------|-------|
| **Role** | `candidate` |
| **Portal** | Candidate Portal (2xx) |
| **Age** | 24–35 |
| **Tech Savvy** | Moderate — comfortable with web apps, uses mobile frequently |
| **Goals** | Track application status, prepare for interviews, complete onboarding quickly |
| **Frustrations** | Opaque hiring processes, unclear next steps, too many documents to sign |
| **Usage Frequency** | Daily during active application; drops to zero post-hire |

**Journey**:
1. Discovers job posting via LinkedIn/referral
2. Creates account (email or Google SSO)
3. Submits application
4. Receives AI screening result
5. Checks timeline daily for status updates
6. Schedules interview via time slot picker
7. Signs employment documents electronically
8. Completes onboarding checklist (accounts, software, first-day setup)

**Key Needs**:
- Clear progress visualization (timeline, progress bar)
- Single-tap interview scheduling
- Mobile-friendly document signing
- Deadline awareness (upcoming deadlines with priority indicators)

---

## Persona 2: Mike — The Client

| Attribute | Value |
|-----------|-------|
| **Role** | `client` |
| **Portal** | Client Portal (3xx) |
| **Age** | 35–55 |
| **Tech Savvy** | High — founder or CTO of a technology company |
| **Goals** | Monitor project progress, review invoices, track team working hours, manage files |
| **Frustrations** | Lack of visibility into team utilization, surprise invoices, scattered documents |
| **Usage Frequency** | 2–3 times per week |

**Journey**:
1. Receives provisioned account from Dev8X admin
2. Logs in (email or Google SSO)
3. Reviews project dashboard with KPIs
4. Checks Clockify working hours and budget burn
5. Downloads/reviews deliverable files
6. Approves invoices
7. Opens support tickets when issues arise
8. Messages team for quick questions

**Key Needs**:
- Budget burn tracking (how much of allocated budget has been consumed)
- Project-scoped file organization
- Invoice status at a glance (Paid/Due/Overdue)
- Working hours transparency (who worked on what, when)

---

## Persona 3: Priya — The HR Administrator

| Attribute | Value |
|-----------|-------|
| **Role** | `hr_admin` |
| **Portal** | Admin Panel (1xx) |
| **Age** | 28–45 |
| **Tech Savvy** | High — uses ATS, HRIS, and collaboration tools daily |
| **Goals** | Manage applicant pipeline, schedule interviews, evaluate candidates, onboard hires |
| **Frustrations** | Manual pipeline tracking, missed interview scheduling, inconsistent evaluation criteria |
| **Usage Frequency** | Multiple times daily |

**Journey**:
1. Logs in with email + password + TOTP (2FA required)
2. Reviews dashboard KPIs (applicants, active jobs, interviews this week, time-to-hire)
3. Works the pipeline kanban board — moving candidates through stages
4. Publishes/pauses/closes job postings
5. Schedules interviews with appropriate interviewers
6. Reviews evaluation scores and makes hiring decisions
7. Sends templated emails (rejection, offer, follow-up)
8. Triggers onboarding workflow for selected candidates

**Key Needs**:
- Kanban board with drag-drop for pipeline management
- Funnel metrics showing conversion rates per stage
- Bulk actions (reject multiple candidates, send batch emails)
- Email template library with variable substitution

---

## Persona 4: Alex — The Sales Representative

| Attribute | Value |
|-----------|-------|
| **Role** | `sales_rep` |
| **Portal** | CRM Platform (4xx) |
| **Age** | 25–40 |
| **Tech Savvy** | High — uses multiple SaaS tools (LinkedIn, email, WhatsApp) |
| **Goals** | Build pipeline, close deals, optimize outreach, track lead quality |
| **Frustrations** | Manual lead tracking, no outreach analytics, inconsistent messaging |
| **Usage Frequency** | Multiple times daily |

**Journey**:
1. Logs in (email + password)
2. Reviews dashboard — pipeline stats, hot leads, outreach feed
3. Works the deal pipeline kanban — moving opportunities through stages
4. Sends outreach using saved templates with variable substitution
5. Reviews channel performance analytics (which channels get best results)
6. Checks lead scoring cards to prioritize follow-ups
7. Reviews heatmap for optimal outreach timing
8. Archives won/lost deals for historical tracking

**Key Needs**:
- Multi-channel outreach management (LinkedIn, Email, WhatsApp, Upwork, Call)
- Template library with per-template reply rate metrics
- Lead scoring with actionable thresholds (Hot/Warm/Cool)
- Stale deal indicators (amber/red warning borders)
- Response heatmap for timing optimization

---

## Persona 5: David — The Super Administrator

| Attribute | Value |
|-----------|-------|
| **Role** | `super_admin` |
| **Portal** | Admin Panel (1xx) + cross-domain access |
| **Age** | 30–50 |
| **Tech Savvy** | Expert — responsible for platform configuration |
| **Goals** | System configuration, user management, cross-domain oversight |
| **Frustrations** | Lack of unified view across portals, security audit gaps |
| **Usage Frequency** | Weekly for config, on-demand for incidents |

**Key Needs**:
- Cross-domain read access (all portals)
- User provisioning for Client and CRM accounts
- System settings management
- Audit log review
- Security policy enforcement

---

## Persona 6: Rachel — The Manager

| Attribute | Value |
|-----------|-------|
| **Role** | `manager` |
| **Portal** | Admin (read) + Client (own projects) + CRM (full) |
| **Age** | 30–50 |
| **Tech Savvy** | High |
| **Goals** | Oversee team performance, manage client relationships, review hiring pipeline |
| **Frustrations** | Switching between multiple tools/views, no unified team dashboard |
| **Usage Frequency** | Daily |

**Key Needs**:
- Read access to HR pipeline (hiring progress for their team)
- Own project monitoring (client portal scoped to their projects)
- Full CRM access (deal pipeline, outreach, analytics)
- Evaluation submission for interview candidates
