# Authentication - RBAC Matrix

> **Module ID**: `001-authentication`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| Login with email and password | Allow | Allow | Allow | Allow | Allow | Allow |
| Self-register candidate account | Deny | Deny | Allow | Deny | Deny | Deny |
| Logout current session | Own | Own | Own | Own | Own | Own |
| Logout all active sessions | Own | Own | Own | Own | Own | Own |
| Unlock another user account | Allow | Deny | Deny | Deny | Deny | Deny |
| Provision non-candidate account | Allow | Allow | Deny | Deny | Deny | Deny |

---

## Special Access Rules

| Rule | Description |
| --- | --- |
| Admin MFA | `super_admin` and `hr_admin` cannot complete admin authentication without MFA. |
| Candidate registration | Only `candidate` supports self-registration. |
| Portal scoping | Authenticated sessions remain bound to the selected portal. |

---

## Data Visibility

| Data Scope | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| Own account | Own | Own | Own | Own | Own | Own |
| Own active sessions | Own | Own | Own | Own | Own | Own |
| All active sessions | Allow | Deny | Deny | Deny | Deny | Deny |