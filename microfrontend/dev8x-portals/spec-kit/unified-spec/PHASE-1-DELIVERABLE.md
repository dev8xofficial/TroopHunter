# Phase 1 Deliverable

> Delivery scope: Authentication + HR Admin + Candidate Portal domains.

---

## Scope

| Domain | Modules | Count |
|--------|---------|-------|
| Foundation | `000-foundation` | 1 |
| Authentication (0xx) | `001-authentication` through `005-sso` | 5 |
| HR Admin (1xx) | `100-admin-dashboard` through `108-admin-settings` | 9 |
| Candidate (2xx) | `200-candidate-dashboard` through `206-candidate-profile` | 7 |
| **Total** | | **22 modules × 13 artifacts = 286 files** |

---

## Prerequisites

- Unified constitution finalized
- Centralized contracts stubbed (api.yaml, access-control.yaml, events.yaml, interactions.yaml)
- All 14 templates available
- GitHub automation active

---

## Delivery Checklist

### Authentication Domain (0xx)

- [ ] `001-authentication`: Credential validation, session management, login/logout flows
- [ ] `002-portal-routing`: Portal selector, role → destination mapping
- [ ] `003-mfa`: Admin-required TOTP, future MFA expansion hooks
- [ ] `004-password-reset`: Token-based recovery with email verification
- [ ] `005-sso`: Google OAuth 2.0, extensible provider framework

### HR Admin Domain (1xx)

- [ ] `100-admin-dashboard`: KPI aggregation, funnel metrics, pipeline summary
- [ ] `101-admin-applicants`: Applicant CRUD, status lifecycle, detail view
- [ ] `102-admin-pipeline`: Kanban board, stage transitions, business rules
- [ ] `103-admin-jobs`: Job posting lifecycle (Draft → Live → Paused → Closed)
- [ ] `104-admin-interviews`: Scheduling, time slots, interviewer assignment
- [ ] `105-admin-evaluations`: Multi-dimension scoring, checklists
- [ ] `106-admin-documents`: Document upload, viewing, per-applicant association
- [ ] `107-admin-email-templates`: Template CRUD, variable substitution
- [ ] `108-admin-settings`: System configuration, user management

### Candidate Domain (2xx)

- [ ] `200-candidate-dashboard`: Application overview, progress tracker, deadlines
- [ ] `201-candidate-application`: Timeline, step flow, AI screening results
- [ ] `202-candidate-interviews`: Time slot selection, confirmation flow
- [ ] `203-candidate-documents`: E-signature, categorized document list
- [ ] `204-candidate-onboarding`: Account provisioning, software setup, first-day checklist
- [ ] `205-candidate-messages`: Inbox, threads, read/unread
- [ ] `206-candidate-profile`: Personal info, editable profile

---

## Success Criteria

1. All 22 modules have complete 13-artifact sets
2. All cross-references between Auth ↔ Admin ↔ Candidate resolve correctly
3. Centralized contracts reflect all Phase 1 endpoints, roles, events, and state machines
4. JSON schemas validate cleanly
5. Zero UI/design content in any artifact
