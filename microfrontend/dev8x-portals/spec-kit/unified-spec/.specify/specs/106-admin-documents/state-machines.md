# Admin Documents - State Machines

> **Module ID**: `106-admin-documents`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Applicant Document Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| requested | Document requested but not yet uploaded. | No |
| uploaded | Document uploaded and awaiting review. | No |
| verified | Document accepted and complete. | Yes |
| rejected | Document rejected and requires replacement. | No |
| archived | Document retained only for history. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| requested | uploaded | upload() | Candidate submits a file | Increment version and notify reviewers |
| uploaded | verified | verify() | Admin approves the file | Emit admin.document.reviewed |
| uploaded | rejected | reject() | Admin rejects the file | Require candidate resubmission |
| verified | archived | archive() | Retention or workflow close criteria met | Preserve immutable history |

### State Diagram

```
[requested] -- upload() --> [uploaded]
[uploaded] -- verify() --> [verified]
[uploaded] -- reject() --> [rejected]
[verified] -- archive() --> [archived]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-106-01 | Verified documents satisfy the current request. |
| INV-106-02 | Archived documents remain readable but not editable. |
