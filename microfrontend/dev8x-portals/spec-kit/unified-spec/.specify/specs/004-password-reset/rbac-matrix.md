# Password Reset - RBAC Matrix

> **Module ID**: `004-password-reset`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| Request password reset | Allow | Allow | Allow | Allow | Allow | Allow |
| Complete own password reset | Own | Own | Own | Own | Own | Own |
| Invalidate another user reset token | Allow | Deny | Deny | Deny | Deny | Deny |

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