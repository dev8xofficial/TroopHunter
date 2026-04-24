# Authentication - State Machines

> **Module ID**: `001-authentication`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Authentication Session Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| unauthenticated | No active portal session. | No |
| credentials_validated | Credentials valid and awaiting MFA for admin portal. | No |
| authenticated | Session active and usable by downstream domains. | No |
| expired | Session timed out. | Yes |
| revoked | Session manually revoked. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| unauthenticated | credentials_validated | login() | Admin credentials valid | Issue partial auth context |
| unauthenticated | authenticated | login() | Non-admin credentials valid | Emit auth.session.login |
| credentials_validated | authenticated | verify_mfa() | Valid MFA challenge | Mark session mfa_verified=true |
| authenticated | expired | timeout() | Session TTL exceeded | Emit auth.session.logout with timeout reason |
| authenticated | revoked | logout() | User or admin revocation requested | Invalidate token |

### State Diagram

```
[unauthenticated] -- login() --> [credentials_validated]
[unauthenticated] -- login() --> [authenticated]
[credentials_validated] -- verify_mfa() --> [authenticated]
[authenticated] -- timeout() --> [expired]
[authenticated] -- logout() --> [revoked]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-001-01 | Admin portal access never reaches authenticated without MFA. |
| INV-001-02 | Expired and revoked sessions require a fresh authentication flow. |
