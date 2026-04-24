# Demo Migration Mapping

> **Phase 1 artefact.** Maps legacy single-file HTML prototypes to the organised `demo/` surface structure.  
> Last updated: 2026-04-24

---

## Source Files

| Legacy File | Location | Surface Target |
|-------------|----------|----------------|
| `auth.html` | `spec-kit/reference/` (source HTML archive) | `demo/auth/` |
| `admin-panel.html` | `spec-kit/reference/` | `demo/admin/` |
| `candidate-portal.html` | `spec-kit/reference/` | `demo/candidate/` |
| `client-portal.html` | `spec-kit/reference/` | `demo/client/` |
| `crm-portal.html` | `spec-kit/reference/` | `demo/crm/` |

> The legacy files are retained at their original locations for parity checking. They are not modified or deleted.

---

## Module-to-Surface Assignment

### Authentication & Identity (0xx) → `demo/auth/`

| Module ID | Module Title | Screen Slug | Screen File |
|-----------|-------------|-------------|-------------|
| `001-authentication` | Authentication | portal-select | `auth/screens/001-portal-select.html` |
| `001-authentication` | Authentication | login | `auth/screens/001-login.html` |
| `001-authentication` | Authentication | register | `auth/screens/001-register.html` |
| `001-authentication` | Authentication | locked | `auth/screens/001-locked.html` |
| `002-portal-routing` | Portal Routing | routing | `auth/screens/002-routing.html` |
| `003-mfa` | MFA | mfa-challenge | `auth/screens/003-mfa-challenge.html` |
| `004-password-reset` | Password Reset | forgot-password | `auth/screens/004-forgot-password.html` |
| `004-password-reset` | Password Reset | reset-password | `auth/screens/004-reset-password.html` |
| `005-sso` | SSO | sso-callback | `auth/screens/005-sso-callback.html` |

### HR Admin Panel (1xx) → `demo/admin/`

| Module ID | Module Title | Screen Slug | Screen File |
|-----------|-------------|-------------|-------------|
| `100-admin-dashboard` | Admin Dashboard | dashboard | `admin/screens/100-dashboard.html` |
| `101-admin-applicants` | Admin Applicants | applicants-list | `admin/screens/101-applicants-list.html` |
| `101-admin-applicants` | Admin Applicants | applicant-detail | `admin/screens/101-applicant-detail.html` |
| `102-admin-pipeline` | Admin Pipeline | pipeline-board | `admin/screens/102-pipeline-board.html` |
| `103-admin-jobs` | Admin Jobs | jobs-list | `admin/screens/103-jobs-list.html` |
| `103-admin-jobs` | Admin Jobs | job-detail | `admin/screens/103-job-detail.html` |
| `104-admin-interviews` | Admin Interviews | interview-calendar | `admin/screens/104-interview-calendar.html` |
| `105-admin-evaluations` | Admin Evaluations | evaluation-form | `admin/screens/105-evaluation-form.html` |
| `106-admin-documents` | Admin Documents | documents-list | `admin/screens/106-documents-list.html` |
| `107-admin-email-templates` | Admin Email Templates | templates-list | `admin/screens/107-templates-list.html` |
| `108-admin-settings` | Admin Settings | settings | `admin/screens/108-settings.html` |

### Candidate Portal (2xx) → `demo/candidate/`

| Module ID | Module Title | Screen Slug | Screen File |
|-----------|-------------|-------------|-------------|
| `200-candidate-dashboard` | Candidate Dashboard | dashboard | `candidate/screens/200-dashboard.html` |
| `201-candidate-application` | Candidate Application | application-timeline | `candidate/screens/201-application-timeline.html` |
| `202-candidate-interviews` | Candidate Interviews | interview-slots | `candidate/screens/202-interview-slots.html` |
| `203-candidate-documents` | Candidate Documents | documents | `candidate/screens/203-documents.html` |
| `204-candidate-onboarding` | Candidate Onboarding | onboarding-checklist | `candidate/screens/204-onboarding-checklist.html` |
| `205-candidate-messages` | Candidate Messages | inbox | `candidate/screens/205-inbox.html` |
| `205-candidate-messages` | Candidate Messages | thread | `candidate/screens/205-thread.html` |
| `206-candidate-profile` | Candidate Profile | profile | `candidate/screens/206-profile.html` |

### Client Portal (3xx) → `demo/client/`

| Module ID | Module Title | Screen Slug | Screen File |
|-----------|-------------|-------------|-------------|
| `300-client-dashboard` | Client Dashboard | dashboard | `client/screens/300-dashboard.html` |
| `301-client-projects` | Client Projects | projects-list | `client/screens/301-projects-list.html` |
| `301-client-projects` | Client Projects | project-detail | `client/screens/301-project-detail.html` |
| `302-client-invoices` | Client Invoices | invoices-list | `client/screens/302-invoices-list.html` |
| `302-client-invoices` | Client Invoices | invoice-detail | `client/screens/302-invoice-detail.html` |
| `303-client-files` | Client Files | files | `client/screens/303-files.html` |
| `304-client-working-hours` | Client Working Hours | working-hours | `client/screens/304-working-hours.html` |
| `305-client-messaging` | Client Messaging | messages | `client/screens/305-messages.html` |
| `306-client-support` | Client Support | tickets-list | `client/screens/306-tickets-list.html` |
| `306-client-support` | Client Support | ticket-detail | `client/screens/306-ticket-detail.html` |
| `307-client-contracts` | Client Contracts | contracts | `client/screens/307-contracts.html` |

### CRM / Sales (4xx) → `demo/crm/`

| Module ID | Module Title | Screen Slug | Screen File |
|-----------|-------------|-------------|-------------|
| `400-crm-dashboard` | CRM Dashboard | dashboard | `crm/screens/400-dashboard.html` |
| `401-crm-contacts` | CRM Contacts | contacts-list | `crm/screens/401-contacts-list.html` |
| `401-crm-contacts` | CRM Contacts | contact-detail | `crm/screens/401-contact-detail.html` |
| `402-crm-pipeline` | CRM Pipeline | pipeline-board | `crm/screens/402-pipeline-board.html` |
| `403-crm-outreach-analytics` | CRM Outreach Analytics | analytics | `crm/screens/403-analytics.html` |
| `404-crm-templates` | CRM Templates | templates-list | `crm/screens/404-templates-list.html` |
| `405-crm-lead-stacks` | CRM Lead Stacks | lead-stacks | `crm/screens/405-lead-stacks.html` |
| `406-crm-scoring` | CRM Scoring | scoring-queue | `crm/screens/406-scoring-queue.html` |
| `407-crm-archive` | CRM Archive | archive | `crm/screens/407-archive.html` |
| `408-crm-settings` | CRM Settings | settings | `crm/screens/408-settings.html` |

---

## Shared Asset Mapping

The following categories of content are extracted from legacy files into `demo/shared/`:

| Content Category | Legacy Location | Target in `shared/` |
|-----------------|-----------------|---------------------|
| CSS custom properties / design tokens | Inline `<style>` in each HTML | `shared/css/tokens.css` |
| App chrome (nav, header, sidebar) | Repeated across all HTML files | `shared/css/shell.css` |
| Common UI components (cards, badges, tables) | Inline across HTML files | `shared/css/components.css` |
| Navigation / routing logic | Inline JS in each HTML | `shared/js/router.js` + `nav.js` |
| Role-based access guard | Inline JS in each HTML | `shared/js/auth-guard.js` |
| Mock data loader | Ad-hoc JS in each HTML | `shared/js/mock-loader.js` |
| Platform role definitions | Hard-coded in auth logic | `shared/data/roles.json` |
| Portal config (routes, labels) | Hard-coded in auth logic | `shared/data/portals.json` |

---

## Cross-Surface Contract References

| Demo Concern | Spec-Kit Contract File |
|-------------|------------------------|
| RBAC / role permissions | `contracts/access-control.yaml` |
| API endpoint shapes | `contracts/api.yaml` |
| Audit / activity events | `contracts/events.yaml` |
| State machine transitions | `contracts/interactions.yaml` |
| Platform roles & vocabulary | `.specify/memory/constitution.md` |
| Module data models | `.specify/specs/<module>/spec.md` |
| Validation rules | `.specify/specs/<module>/validation-schema.json` |