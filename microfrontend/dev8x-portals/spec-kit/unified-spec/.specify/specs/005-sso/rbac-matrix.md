# SSO - RBAC Matrix

> **Module ID**: `005-sso`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| Start Google SSO | Deny | Deny | Allow | Allow | Deny | Deny |
| Complete own SSO callback | Deny | Deny | Allow | Allow | Deny | Deny |
| Disable linked provider identity | Own | Own | Own | Own | Own | Own |

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