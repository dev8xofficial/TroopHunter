# Demo Migration Mapping

> Updated for the completed Phase 2, Phase 3, and Phase 4 demo structure.

## Legacy Source to Demo Surface

| Legacy File | Current Demo Surface |
| --- | --- |
| `auth.html` | `demo/auth/` |
| `admin-panel.html` | `demo/admin/` |
| `candidate-portal.html` | `demo/candidate/` |
| `client-portal.html` | `demo/client/` |
| `crm-portal.html` | `demo/crm/` |

## Auth Screens

| Route | Screen File | Module |
| --- | --- | --- |
| `portal-select` | `auth/screens/portal-select.html` | `002-portal-routing` |
| `login` | `auth/screens/login.html` | `001-authentication` |
| `signup` | `auth/screens/signup.html` | `001-authentication` |
| `forgot-password` | `auth/screens/forgot-password.html` | `004-password-reset` |
| `mfa` | `auth/screens/mfa.html` | `003-mfa` |
| `sso` | `auth/screens/sso.html` | `005-sso` |

## Admin Screens

| Route | Screen File | Module |
| --- | --- | --- |
| `dashboard` | `admin/screens/dashboard.html` | `100-admin-dashboard` |
| `applicants` | `admin/screens/applicants.html` | `101-admin-applicants` |
| `pipeline` | `admin/screens/pipeline.html` | `102-admin-pipeline` |
| `jobs` | `admin/screens/jobs.html` | `103-admin-jobs` |
| `interviews` | `admin/screens/interviews.html` | `104-admin-interviews` |
| `evaluations` | `admin/screens/evaluations.html` | `105-admin-evaluations` |
| `documents` | `admin/screens/documents.html` | `106-admin-documents` |
| `templates` | `admin/screens/templates.html` | `107-admin-email-templates` |
| `settings` | `admin/screens/settings.html` | `108-admin-settings` |

## Candidate Screens

| Route | Screen File | Module |
| --- | --- | --- |
| `dashboard` | `candidate/screens/dashboard.html` | `200-candidate-dashboard` |
| `timeline` | `candidate/screens/timeline.html` | `201-candidate-application` |
| `interviews` | `candidate/screens/interviews.html` | `202-candidate-interviews` |
| `documents` | `candidate/screens/documents.html` | `203-candidate-documents` |
| `onboarding` | `candidate/screens/onboarding.html` | `204-candidate-onboarding` |
| `messages` | `candidate/screens/messages.html` | `205-candidate-messages` |
| `profile` | `candidate/screens/profile.html` | `206-candidate-profile` |

## Client Screens

| Route | Screen File | Module |
| --- | --- | --- |
| `dashboard` | `client/screens/dashboard.html` | `300-client-dashboard` |
| `projects` | `client/screens/projects.html` | `301-client-projects` |
| `invoices` | `client/screens/invoices.html` | `302-client-invoices` |
| `files` | `client/screens/files.html` | `303-client-files` |
| `working-hours` | `client/screens/working-hours.html` | `304-client-working-hours` |
| `messaging` | `client/screens/messaging.html` | `305-client-messaging` |
| `support` | `client/screens/support.html` | `306-client-support` |
| `contracts` | `client/screens/contracts.html` | `307-client-contracts` |

## CRM Screens

| Route | Screen File | Module |
| --- | --- | --- |
| `dashboard` | `crm/screens/dashboard.html` | `400-crm-dashboard` |
| `contacts` | `crm/screens/contacts.html` | `401-crm-contacts` |
| `pipeline` | `crm/screens/pipeline.html` | `402-crm-pipeline` |
| `analytics` | `crm/screens/analytics.html` | `403-crm-outreach-analytics` |
| `templates` | `crm/screens/templates.html` | `404-crm-templates` |
| `lead-stacks` | `crm/screens/lead-stacks.html` | `405-crm-lead-stacks` |
| `scoring` | `crm/screens/scoring.html` | `406-crm-scoring` |
| `archive` | `crm/screens/archive.html` | `407-crm-archive` |
| `settings` | `crm/screens/settings.html` | `408-crm-settings` |

## Shared Asset Mapping

| Concern | Target |
| --- | --- |
| Design tokens | `shared/css/tokens.css` |
| Shell chrome and layout | `shared/css/shell.css` + `shared/js/shell.js` |
| Reusable UI pieces | `shared/css/components.css` |
| Route handling | `shared/js/router.js` |
| Portal and role access rules | `shared/js/auth-guard.js` + `shared/data/*.json` |
| Session + mock data loading | `shared/js/mock-data.js` |
| Generic portal bootstrap | `shared/js/surface-app.js` |

## Preferred Path

The organized demo path under `demo/` is the preferred implementation target for future portal work. The legacy root HTML files remain in place only as historical reference and should not be extended further.
