# Foundation - State Machines

> **Module ID**: `000-foundation`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Specification Registry Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| draft | Registry version is being prepared. | No |
| validated | Registry version passed structural review. | No |
| published | Registry version is the active canonical definition. | No |
| superseded | Registry version has been replaced. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| draft | validated | validate() | All required modules and roles are present | Store review evidence |
| validated | published | publish() | Approver signs off | Emit foundation.registry.published |
| published | superseded | supersede() | New published version exists | Retain immutable history |

### State Diagram

```
[draft] -- validate() --> [validated]
[validated] -- publish() --> [published]
[published] -- supersede() --> [superseded]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-000-01 | Only one registry version may remain in published state at a time. |
| INV-000-02 | Superseded records remain readable for audit and historical traceability. |
