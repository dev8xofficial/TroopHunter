# Password Reset - State Machines

> **Module ID**: `004-password-reset`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Password Reset Token Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| issued | Reset token created and awaiting verification. | No |
| verified | Token validated and may complete reset. | No |
| consumed | Token used successfully. | Yes |
| expired | Token timed out. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| issued | verified | verify_token() | Token is valid and unexpired | Emit auth.password.token_verified |
| verified | consumed | reset_password() | Password meets policy | Emit auth.password.reset_completed and revoke sessions |
| issued | expired | expire() | Expiry timestamp reached | Close reset window |

### State Diagram

```
[issued] -- verify_token() --> [verified]
[verified] -- reset_password() --> [consumed]
[issued] -- expire() --> [expired]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-004-01 | Consumed tokens cannot return to any earlier state. |
| INV-004-02 | Only verified tokens may complete password reset. |
