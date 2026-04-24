# Admin Pipeline - State Machines
> **Module ID**: `102-admin-pipeline`

Uses Applicant Lifecycle from `101-admin-applicants`.
See [101-admin-applicants/state-machines.md](../101-admin-applicants/state-machines.md).

### Kanban-Specific Rules
| Rule | Description |
|------|-------------|
| Stale Warning | Card border turns amber after 7 days in same stage |
| Stale Critical | Card border turns red after 14 days in same stage |
| Drag Guard | Only valid state transitions allowed via drag-drop |
