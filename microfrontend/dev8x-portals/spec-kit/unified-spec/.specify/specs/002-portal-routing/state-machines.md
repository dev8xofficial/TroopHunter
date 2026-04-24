# Portal Routing - State Machines

> **Module ID**: `002-portal-routing`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Portal Resolution Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| selected | Portal was selected by the actor. | No |
| validated | Portal and role combination was validated. | No |
| resolved | Destination route returned to the caller. | Yes |
| blocked | Route request denied. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| selected | validated | validate() | Portal exists and role claims present | Load portal registry |
| validated | resolved | resolve() | Role allowed for portal | Emit auth.route.resolved |
| validated | blocked | resolve() | Role or route mismatch | Emit auth.route.blocked |

### State Diagram

```
[selected] -- validate() --> [validated]
[validated] -- resolve() --> [resolved]
[validated] -- resolve() --> [blocked]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-002-01 | A denied route cannot produce a destination URL. |
| INV-002-02 | The same portal and claims resolve to the same destination unless configuration changes. |
