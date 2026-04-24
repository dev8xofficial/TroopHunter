# Candidate Application - State Machines

> **Module ID**: `201-candidate-application`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Candidate Application Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| applied | Application submitted. | No |
| screening | Initial screening in progress. | No |
| shortlisted | Candidate shortlisted. | No |
| interview | Interview process active. | No |
| hr_review | Final HR review in progress. | No |
| offer | Offer issued. | Yes |
| not_selected | Candidate not selected. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| applied | screening | screen() | Initial review begins | Timeline updates for candidate |
| screening | shortlisted | shortlist() | Screening passes | Candidate can expect interview scheduling |
| shortlisted | interview | schedule_interview() | Interview reservation exists | Timeline shows scheduling step |
| interview | hr_review | complete_interview() | Interview cycle complete | Await final decision |
| hr_review | offer | issue_offer() | Candidate selected | Offer action becomes available |
| hr_review | not_selected | close_as_not_selected() | Candidate not selected | Timeline enters terminal outcome |

### State Diagram

```
[applied] -- screen() --> [screening]
[screening] -- shortlist() --> [shortlisted]
[shortlisted] -- schedule_interview() --> [interview]
[interview] -- complete_interview() --> [hr_review]
[hr_review] -- issue_offer() --> [offer]
[hr_review] -- close_as_not_selected() --> [not_selected]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-201-01 | Offer and not_selected are terminal candidate-visible outcomes. |
| INV-201-02 | Candidate acknowledgements do not alter the recruiting lifecycle on their own. |
