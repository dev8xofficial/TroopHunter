# Admin Pipeline - RBAC Matrix

> **Module ID**: `102-admin-pipeline`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View recruiting board | Allow | Allow | Deny | Deny | Deny | Read |
| Move applicant card | Allow | Allow | Deny | Deny | Deny | Deny |
| Acknowledge stale-card alert | Allow | Allow | Deny | Deny | Deny | Deny |

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