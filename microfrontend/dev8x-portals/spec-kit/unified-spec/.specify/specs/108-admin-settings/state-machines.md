# Admin Settings - State Machines

> **Module ID**: `108-admin-settings`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Administrative Setting Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| proposed | Setting change drafted but not approved. | No |
| approved | Setting change approved and ready to apply. | No |
| applied | Setting change is effective. | No |
| rolled_back | Setting reverted to the prior value. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| proposed | approved | approve() | Approver present when required | Store approval metadata |
| approved | applied | apply() | Validation passed | Emit admin.setting.updated |
| applied | rolled_back | rollback() | Rollback supported for the setting | Restore previous value |

### State Diagram

```
[proposed] -- approve() --> [approved]
[approved] -- apply() --> [applied]
[applied] -- rollback() --> [rolled_back]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-108-01 | Applied settings remain the effective truth until rolled back or superseded. |
| INV-108-02 | Role changes always write an audit event. |
