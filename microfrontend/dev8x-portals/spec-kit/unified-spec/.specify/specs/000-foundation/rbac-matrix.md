# Foundation - RBAC Matrix

> **Module ID**: `000-foundation`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View domain registry | Read | Read | Deny | Deny | Read | Read |
| View role definitions | Read | Read | Deny | Deny | Read | Read |
| Publish registry revision | Allow | Read | Deny | Deny | Deny | Deny |

---

## Special Access Rules

| Rule | Description |
| --- | --- |
| Registry edits | Only `super_admin` may publish or supersede canonical registries. |
| Shared visibility | `hr_admin`, `sales_rep`, and `manager` consume read-only registry views. |

---

## Data Visibility

| Data Scope | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| Canonical registries | Read | Read | Deny | Deny | Read | Read |
| Contract publication history | Allow | Read | Deny | Deny | Read | Read |
| Governance changes | Allow | Read | Deny | Deny | Deny | Deny |