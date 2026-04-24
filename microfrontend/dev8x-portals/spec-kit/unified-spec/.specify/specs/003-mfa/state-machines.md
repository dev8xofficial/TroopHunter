# MFA - State Machines

> **Module ID**: `003-mfa`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## MFA Challenge Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| issued | Challenge is active and waiting for verification. | No |
| verified | Challenge succeeded and may activate the session. | Yes |
| failed | Challenge exceeded retry limits. | Yes |
| expired | Challenge timed out. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| issued | verified | verify() | Submitted code is valid and unexpired | Emit auth.mfa.verified |
| issued | failed | verify() | Retry limit reached | Emit auth.mfa.failed |
| issued | expired | expire() | Expiry timestamp reached | Emit auth.mfa.expired |

### State Diagram

```
[issued] -- verify() --> [verified]
[issued] -- verify() --> [failed]
[issued] -- expire() --> [expired]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-003-01 | Verified and failed challenges are terminal. |
| INV-003-02 | Expired challenges cannot be promoted back to issued. |
