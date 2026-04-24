# Admin Email Templates - State Machines

> **Module ID**: `107-admin-email-templates`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Template Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| draft | Template is being authored. | No |
| approved | Template may be used for production workflows. | No |
| retired | Template is no longer used. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| draft | approved | approve() | Variables validated and copy reviewed | Template becomes available for production use |
| approved | retired | retire() | Template replaced or deprecated | Block future workflow use |

### State Diagram

```
[draft] -- approve() --> [approved]
[approved] -- retire() --> [retired]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-107-01 | Retired templates remain readable for audit. |
| INV-107-02 | Only approved templates may be used in live workflow sends. |
