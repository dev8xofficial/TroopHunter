# Admin Applicants
> **Module ID**: `101-admin-applicants`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0

---

## Overview

Manages the full applicant lifecycle: CRUD operations, filterable/sortable table view, detailed profile with evaluation scores, document inventory, and application timeline.

---

## Functional Requirements

### FR-101-01: Applicant Table
- [ ] Filterable by status: Applied, Shortlisted, Interview, Selected, Rejected, Future Hire, Joined
- [ ] Sortable by name, position, applied_date, status
- [ ] Paginated (20 per page)
- [ ] Displays: name, email, position, status badge, applied_date, source, department

### FR-101-02: Applicant Detail View
- [ ] Profile card with evaluation star ratings
- [ ] Document inventory list
- [ ] Application timeline with expandable steps (done/current/pending/skipped)

### FR-101-03: Applicant CRUD
- [ ] Create new applicant (manual entry or import)
- [ ] Update applicant info
- [ ] Change applicant status (triggers state machine transition)
- [ ] Delete/archive applicant

---

## Data Model

### Applicant
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | uuid | Yes | Primary key |
| name | string | Yes | Full name |
| email | string | Yes | Email (unique per active applicants) |
| position | string | Yes | Applied position |
| status | enum | Yes | Applied, Shortlisted, Interview, Selected, Rejected, Future Hire, Joined |
| applied_date | date | Yes | Application date |
| source | string | No | Referral, LinkedIn, Website, etc. |
| department | string | Yes | Target department |

---

## State Machine

See [state-machines.md](state-machines.md) — Applicant lifecycle (7 states).
