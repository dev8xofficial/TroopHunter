# Admin Settings - RBAC Matrix

> **Module ID**: `108-admin-settings`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View admin settings | Allow | Support | Deny | Deny | Deny | Deny |
| Update admin settings | Allow | Support | Deny | Deny | Deny | Deny |
| Provision admin user | Allow | Support | Deny | Deny | Deny | Deny |

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