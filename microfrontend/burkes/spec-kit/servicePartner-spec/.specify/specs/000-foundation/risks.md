# Risks — 000 Foundation

## RISK-F-001 · Session Hijacking via Stale Token

| Attribute | Value |
|---|---|
| **Category** | Access Control |
| **Probability** | Medium |
| **Impact** | High |
| **Mitigation** | Short token lifetime (≤8h); server-side session invalidation on account status change; refresh token rotation on each use |

---

## RISK-F-002 · Activity Log Tampering

| Attribute | Value |
|---|---|
| **Category** | Data Integrity |
| **Probability** | Low |
| **Impact** | Critical |
| **Mitigation** | Database user for activity log table has INSERT-only privileges; no UPDATE/DELETE grants; separate audit schema; periodic hash-chain verification |

---

## RISK-F-003 · Role Escalation via Token Manipulation

| Attribute | Value |
|---|---|
| **Category** | Access Control |
| **Probability** | Low |
| **Impact** | Critical |
| **Mitigation** | Role claims are server-resolved from database on each token issuance; tokens are signed and verified server-side; role field is not user-mutable |

---

## RISK-F-004 · Routing Priority Score Manipulation

| Attribute | Value |
|---|---|
| **Category** | Data Integrity |
| **Probability** | Low |
| **Impact** | Medium |
| **Mitigation** | Score is computed exclusively by `system` role; no API endpoint exposes score writes to partners; admin can only read, not write |

---

## RISK-F-005 · Notification Delivery Failure for Critical Events

| Attribute | Value |
|---|---|
| **Category** | Integration Failure |
| **Probability** | Medium |
| **Impact** | Medium |
| **Mitigation** | Transactional notifications queued with at-least-once delivery semantics; delivery_status tracked; failed notifications retried with exponential backoff; admin alert after N failures |
