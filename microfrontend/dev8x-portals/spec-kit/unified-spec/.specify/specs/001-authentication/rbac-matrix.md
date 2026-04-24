# Authentication — RBAC Matrix

> **Module ID**: `001-authentication`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
|-----------|-------------|----------|-----------|--------|-----------|---------|
| Login (email/password) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Self-register | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Google SSO login | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Logout | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Logout all devices | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View own sessions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Revoke other user sessions | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Unlock locked account | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Provision user account | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

**Legend**: ✅ = Allowed | ❌ = Denied

---

## Special Access Rules

| Rule | Description |
|------|-------------|
| MFA Required | `super_admin` and `hr_admin` must complete TOTP verification to reach `authenticated` state |
| No Admin SSO | `super_admin`, `hr_admin`, and `sales_rep` cannot use Google SSO (ADR-010) |
| Self-Registration | Only `candidate` role supports self-registration; all others are provisioned by admin |
| Session Revocation | Only `super_admin` can forcibly revoke another user's sessions |

---

## Data Visibility

| Data Scope | super_admin | hr_admin | candidate | client | sales_rep | manager |
|-----------|-------------|----------|-----------|--------|-----------|---------|
| All user accounts | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Own account | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Own sessions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| All active sessions | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
