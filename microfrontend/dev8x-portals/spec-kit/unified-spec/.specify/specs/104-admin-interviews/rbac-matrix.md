# Admin Interviews - RBAC Matrix

> **Module ID**: `104-admin-interviews`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View interview calendar | Allow | Allow | Deny | Deny | Deny | Read |
| Schedule interview | Allow | Allow | Deny | Deny | Deny | Deny |
| Update interview status | Allow | Allow | Deny | Deny | Deny | Deny |

---

## Special Access Rules

| Rule | Description |
| --- | --- |
| Manager access | `manager` stays read-only across admin modules unless explicitly escalated elsewhere. |
| Administrative changes | Mutating operations require `hr_admin` or `super_admin`. |

---

## Data Visibility

| Data Scope | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| All recruiting records | Allow | Allow | Deny | Deny | Deny | Read |
| Configuration and user management | Allow | Support | Deny | Deny | Deny | Deny |
| Audit exports | Allow | Allow | Deny | Deny | Deny | Read |