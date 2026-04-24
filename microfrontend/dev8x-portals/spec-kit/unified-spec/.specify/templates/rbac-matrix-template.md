# [Module Name] — RBAC Matrix

> **Module ID**: `NNN-module-name`
> References: [contracts/access-control.yaml](../../../contracts/access-control.yaml)

---

## Permissions

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
|-----------|-------------|----------|-----------|--------|-----------|---------|
| Create | ✅ | — | — | — | — | — |
| Read (all) | ✅ | — | — | — | — | — |
| Read (own) | ✅ | — | — | — | — | — |
| Update (own) | ✅ | — | — | — | — | — |
| Update (any) | ✅ | — | — | — | — | — |
| Delete | ✅ | — | — | — | — | — |

**Legend**: ✅ = Allowed | Own = Own data only | ❌ = Denied | — = Not applicable

---

## Special Access Rules

| Rule | Description |
|------|-------------|
| [Rule name] | [When and why special access applies] |

---

## Data Visibility

| Data Scope | super_admin | hr_admin | candidate | client | sales_rep | manager |
|-----------|-------------|----------|-----------|--------|-----------|---------|
| All records | ✅ | — | — | — | — | — |
| Own records | ✅ | — | — | — | — | — |
| Team records | ✅ | — | — | — | — | — |
