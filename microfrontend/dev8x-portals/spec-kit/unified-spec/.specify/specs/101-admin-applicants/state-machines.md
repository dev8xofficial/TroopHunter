# Admin Applicants - State Machines

> **Module ID**: `101-admin-applicants`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Applicant Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| applied | Application submitted. | No |
| shortlisted | Applicant advanced to shortlist. | No |
| interview | Interview process active. | No |
| selected | Offer or selection decision reached. | No |
| joined | Applicant joined successfully. | Yes |
| rejected | Applicant rejected from current process. | Yes |
| future_hire | Applicant held for a future opportunity. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| applied | shortlisted | shortlist() | Initial screening passed | Emit admin.applicant.status_changed |
| shortlisted | interview | schedule_interview() | Interview capacity exists | Notify interview module |
| interview | selected | select() | Evaluation threshold met | Prepare offer readiness |
| selected | joined | confirm_joining() | Offer accepted and onboarding approved | Close recruiting workflow |
| applied | rejected | reject() | Reason supplied | Record rejection reason |
| shortlisted | future_hire | hold_for_future() | Reason supplied | Tag for future pipeline |

### State Diagram

```
[applied] -- shortlist() --> [shortlisted]
[shortlisted] -- schedule_interview() --> [interview]
[interview] -- select() --> [selected]
[selected] -- confirm_joining() --> [joined]
[applied] -- reject() --> [rejected]
[shortlisted] -- hold_for_future() --> [future_hire]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-101-01 | Joined, rejected, and future_hire are terminal states. |
| INV-101-02 | Applicant records retain a full timeline of all approved state changes. |
