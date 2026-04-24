# SSO - State Machines

> **Module ID**: `005-sso`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## SSO Handshake Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| initiated | Provider handshake has been created. | No |
| validated | Provider callback passed integrity checks. | No |
| linked | Identity is linked and session may be created. | Yes |
| failed | Provider callback failed validation. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| initiated | validated | validate_callback() | State and provider code are valid | Load provider subject |
| validated | linked | link_or_create() | Portal and role are eligible | Emit auth.sso.completed |
| initiated | failed | validate_callback() | State invalid or expired | Emit failure telemetry |

### State Diagram

```
[initiated] -- validate_callback() --> [validated]
[validated] -- link_or_create() --> [linked]
[initiated] -- validate_callback() --> [failed]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-005-01 | Only validated handshakes may create sessions. |
| INV-005-02 | A linked provider identity remains unique across all accounts. |
