# Admin Evaluations - RBAC Matrix

> **Module ID**: `105-admin-evaluations`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View evaluation summary | Allow | Allow | Deny | Deny | Deny | Read |
| Submit evaluation | Allow | Allow | Deny | Deny | Deny | Deny |
| Finalize evaluation decision | Allow | Allow | Deny | Deny | Deny | Deny |

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