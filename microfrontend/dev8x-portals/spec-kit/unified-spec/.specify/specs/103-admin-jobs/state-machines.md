# Admin Jobs - State Machines
> **Module ID**: `103-admin-jobs`

## Job Posting Lifecycle

| From | To | Trigger |
|------|----|---------|
| draft | live | publish() |
| live | paused | pause() |
| paused | live | resume() |
| live | closed | close() |
| paused | closed | close() |
