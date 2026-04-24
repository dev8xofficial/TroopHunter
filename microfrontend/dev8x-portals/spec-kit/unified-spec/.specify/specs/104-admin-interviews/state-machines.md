# Admin Interviews - State Machines
> **Module ID**: `104-admin-interviews`

## Interview Lifecycle

| From | To | Trigger |
|------|----|---------|
| draft | scheduled | confirm() |
| scheduled | completed | complete() |
| scheduled | cancelled | cancel() |
| scheduled | no_show | mark_no_show() |
