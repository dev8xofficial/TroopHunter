# Architecture Decision Record: [TITLE]

**ADR ID**: [001-short-name]  
**Feature Spec**: [Link to spec.md, e.g., 001-dashboard]  
**Status**: Proposed | Accepted | Deprecated  
**Decision Date**: [YYYY-MM-DD]  
**Revised Date**: [If applicable]

---

## Context

[Describe the problem, constraint, or context that led to this decision. Why was this decision necessary? What alternatives could have been chosen?]

**Example**: "The Activity Log must be visible to all roles in a transaction (client, agent, lender, attorney, cpa, coordinator). We needed to decide whether entries are modifiable/deletable or immutable (append-only)."

---

## Decision

[State the decision clearly and concisely. What did we choose?]

**Example**: "The Activity Log is append-only. Once an entry is created, it cannot be deleted, edited, or hidden. All roles can read the full log; only the system and transaction coordinator can append entries."

---

## Rationale

[Explain why this decision was made. What are the benefits? What makes this better than alternatives?]

**Example**:

- **Audit Trail**: Immutability ensures we have a complete, trustworthy audit trail for compliance and dispute resolution
- **Client Trust**: Clients can rely that the activity log won't be tampered with to hide transactions
- **Operational Simplicity**: No need for "undo" logic, version history, or complex permissions on log entries
- **Legal Guard**: If a client later claims they didn't receive a notification, we have proof in the audit log

---

## Consequences

[What are the downstream impacts of this decision? Benefits and drawbacks.]

### Positive Consequences

- ✅ Complete, tamper-proof audit trail
- ✅ Simplified implementation (no update/delete logic for Activity)
- ✅ Legal defensibility

### Negative Consequences / Tradeoffs

- ❌ Cannot fix typos or correct mistakes in activity log entries (misspelled name, wrong emoji, etc.)
  - _Mitigation_: Establish a separate "Corrections" entry or allow TC to append a corrective entry, but don't modify the original
- ❌ Activity log grows indefinitely (no archival or deletion)
  - _Mitigation_: Implement data retention policies; archive old entries to cold storage; implement pagination/infinite scroll UI

---

## Alternatives Considered

### Alternative 1: Fully Editable Activity Log

- **Pros**: Easy to correct mistakes; clients can curate their narrative
- **Cons**: Destroys audit trail integrity; legal liability; clients might hide evidence of problems
- **Why Not Chosen**: Violates principle P-07 (Audit-Visible Activity); creates compliance risk

### Alternative 2: Append-Only for Clients, Editable for Coordinators

- **Pros**: Balance between auditability (for clients) and operational flexibility (for staff)
- **Cons**: Complex permissions model; special-case logic; still not a true audit trail if TC can hide entries
- **Why Not Chosen**: Violates P-07; less trustworthy to client

### Alternative 3: Soft Delete (Mark as "Removed" but Retain Original)

- **Pros**: Audit trail preserved; can still correct obvious errors
- **Cons**: UI complexity (show removed entries? hide them? show tombstone?); still not truly immutable
- **Why Not Chosen**: Adds complexity without clear benefit; append-only is cleaner

---

## Implementation Notes

- **Data Model**: Activity log table/collection has no UPDATE or DELETE endpoints; only INSERT
- **Validation**: At write time, ensure all activity entries have required fields (timestamp, actor, label, etc.); log schema enforced
- **Corrections**: If errors occur, transaction coordinator appends a correction entry (e.g., "📝 Correction: Previous entry typo corrected")
- **API Contract**: Document that activity endpoints do not support DELETE or PATCH
- **Testing**: Test that attempts to update/delete log entries are rejected at API level

---

## Related Decisions

- [ADR-004](./adr-004-role-scoped-writes.md) — Role-Scoped Data Ownership: How data ownership interacts with audit trails
- Foundation Spec [FR-00-10](../../specs/000-foundation/spec.md#fr-00-10--activity-log-contract) — Activity Log Contract definition

---

## References

- [Principle P-07](../../memory/constitution.md#p-07--audit-visible-activity) — Audit-Visible Activity
- Event Sourcing Pattern (related architectural pattern: append-only ledgers)
- CQRS (Command Query Responsibility Segregation): Audit logs as immutable event source

---

## Status & History

| Date       | Status     | Notes                                                                 |
| ---------- | ---------- | --------------------------------------------------------------------- |
| 2026-04-XX | Proposed   | Initial ADR written during 001-Dashboard spec review                  |
| 2026-04-XX | Accepted   | Approved by Tech Architect and PM Lead                                |
| [Future]   | Deprecated | If ever superseded (e.g., new legal requirement allows editable logs) |

---

**Decision Owner**: @tech-architect  
**Stakeholders**: Product Lead, Engineering Lead, Legal/Compliance  
**Review Frequency**: Annual (or when spec updates warrant re-evaluation)

---

## Questions?

For questions about this decision, engage the decision owner or see the related spec: [destination](../../specs/000-foundation/spec.md)
