# Authentication — State Machines

> **Module ID**: `001-authentication`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Authentication Session Lifecycle

### States

| State | Description | Entry Condition | Terminal |
|-------|-------------|-----------------|---------|
| `unauthenticated` | No active session | Initial state / logout / session expiry | No |
| `credentials_validated` | Email/password verified, MFA pending | Correct credentials submitted for Admin portal | No |
| `authenticated` | Full session active | MFA verified (Admin) or credentials valid (non-Admin) | No |
| `expired` | Session timed out | Inactivity timeout reached | Yes |
| `revoked` | Session manually terminated | User logout or admin revocation | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
|------|----|---------|-------|--------------|
| `unauthenticated` | `credentials_validated` | `validate_credentials()` | Admin/Super Admin portal AND valid email+password | Emit EVT-001-01 (partial), increment session count |
| `unauthenticated` | `authenticated` | `validate_credentials()` | Non-admin portal AND valid email+password | Emit EVT-001-01, create session record, issue JWT |
| `unauthenticated` | `unauthenticated` | `validate_credentials()` | Invalid credentials | Emit EVT-001-03, increment failed_login_attempts |
| `credentials_validated` | `authenticated` | `verify_mfa()` | Valid TOTP code | Emit EVT-003-01, set mfa_verified=true in JWT |
| `credentials_validated` | `unauthenticated` | `verify_mfa()` | Invalid TOTP code (3 attempts) | Emit EVT-003-02, reset to login |
| `authenticated` | `revoked` | `logout()` | User-initiated | Emit EVT-001-02, invalidate JWT |
| `authenticated` | `expired` | `timeout()` | Session inactivity exceeds TTL | Auto-expire, no event (silent) |
| `authenticated` | `revoked` | `admin_revoke()` | Super admin action | Emit EVT-001-02, invalidate all user sessions |

### State Diagram

```
                                 [Admin Portal]
[unauthenticated] ──validate()──► [credentials_validated] ──verify_mfa()──► [authenticated]
       │                                    │                                      │
       │ [Non-Admin]                        │ MFA failed (3x)                      │
       └──validate()──► [authenticated]     └──► [unauthenticated]                 │
       │                      │                                                    │
       │ Invalid               ├──logout()──► [revoked]                            │
       └──► [unauthenticated]  └──timeout()──► [expired]                           │
                                                                                   │
                                              admin_revoke()──► [revoked] ◄────────┘
```

### Invariants

| Invariant | Description |
|-----------|-------------|
| INV-AUTH-01 | A user cannot reach `authenticated` state without valid credentials |
| INV-AUTH-02 | Admin portal users cannot reach `authenticated` state without MFA verification |
| INV-AUTH-03 | `expired` and `revoked` are terminal — re-authentication required |
| INV-AUTH-04 | A locked user cannot transition from `unauthenticated` regardless of credential validity |

---

## Account Status Lifecycle

### States

| State | Description | Terminal |
|-------|-------------|---------|
| `inactive` | Account created, email not verified | No |
| `active` | Email verified, account usable | No |
| `locked` | Temporarily locked due to failed attempts | No |

### Transitions

| From | To | Trigger | Guard | Side Effects |
|------|----|---------|-------|--------------|
| `inactive` | `active` | `verify_email()` | Valid verification token | Clear inactive flag |
| `active` | `locked` | `exceed_attempts()` | Failed attempts ≥ threshold | Emit EVT-001-05, set locked_until |
| `locked` | `active` | `unlock()` | Lockout duration expired OR manual unlock | Reset failed_login_attempts to 0 |
