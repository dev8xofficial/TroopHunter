# Candidate Onboarding - RBAC Matrix

> **Module ID**: `204-candidate-onboarding`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
| --- | --- | --- | --- | --- | --- | --- |
| View own onboarding checklist | Read | Read | Own | Deny | Deny | Read |
| Complete own onboarding item | Support | Support | Own | Deny | Deny | Deny |
| Assist onboarding issue | Allow | Allow | Deny | Deny | Deny | Read |

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