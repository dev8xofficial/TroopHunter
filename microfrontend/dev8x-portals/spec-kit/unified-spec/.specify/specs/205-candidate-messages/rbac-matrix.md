# Candidate Messages - RBAC Matrix

> **Module ID**: `205-candidate-messages`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View own inbox | Read | Read | Own | Deny | Deny | Read |
| Reply in own thread | Support | Support | Own | Deny | Deny | Deny |
| Mark own thread as read | Support | Support | Own | Deny | Deny | Deny |

---

## Special Access Rules

| Rule | Description |
| --- | --- |
| Own-data model | `candidate` can only act on their own records. |
| Support roles | `hr_admin` and `super_admin` may assist or review but do not become the owning actor. |

---

## Data Visibility

| Data Scope | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| Own candidate record | Read | Read | Own | Deny | Deny | Read |
| Candidate exception handling | Allow | Allow | Deny | Deny | Deny | Deny |
| Peer candidate records | Read | Read | Deny | Deny | Deny | Deny |