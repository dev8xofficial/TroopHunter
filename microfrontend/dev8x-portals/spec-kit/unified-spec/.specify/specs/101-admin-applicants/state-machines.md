# Admin Applicants - State Machines
> **Module ID**: `101-admin-applicants`

## Applicant Lifecycle

### States
| State | Terminal |
|-------|---------|
| applied | No |
| shortlisted | No |
| interview | No |
| selected | No |
| joined | Yes |
| rejected | Yes |
| future_hire | No |

### Transitions
| From | To | Trigger | Guard |
|------|----|---------|-------|
| applied | shortlisted | shortlist() | hr_admin or super_admin |
| applied | rejected | reject() | hr_admin or super_admin |
| applied | future_hire | mark_future() | hr_admin or super_admin |
| shortlisted | interview | schedule_interview() | Interview slot available |
| shortlisted | rejected | reject() | — |
| interview | selected | select() | Evaluation score >= threshold |
| interview | rejected | reject() | — |
| interview | future_hire | mark_future() | — |
| selected | joined | join() | Onboarding completed |
| selected | rejected | reject() | Offer declined |
| future_hire | applied | reapply() | New position opened |
