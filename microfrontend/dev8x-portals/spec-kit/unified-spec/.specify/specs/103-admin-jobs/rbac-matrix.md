# Admin Jobs - RBAC Matrix

> **Module ID**: `103-admin-jobs`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View job roster | Allow | Allow | Deny | Deny | Deny | Read |
| Create or edit job | Allow | Allow | Deny | Deny | Deny | Deny |
| Change job lifecycle state | Allow | Allow | Deny | Deny | Deny | Deny |

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