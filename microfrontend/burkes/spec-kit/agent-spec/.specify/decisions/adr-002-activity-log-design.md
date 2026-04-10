# ADR-002: Append-Only Activity Log Design

**Status**: Accepted (April 2026)
**Decision ID**: ADR-002

## Title

We WILL use an append-only, immutable activity log for all state changes in the Agent Portal.

## Context

The portal manages sensitive real estate transaction data. Regulatory requirements (Fannie Mae, state real estate boards) mandate clear audit trails of who did what, when.

## Decision

1. Every meaningful state change writes an activity log event
2. Events are immutable — no UPDATE or DELETE operations permitted
3. Events include: actor_role, actor_id, event_type, timestamp, description
4. The Dashboard displays the 10 most recent events as a sidebar feed
5. Agent-specific event types include: stage_update_submitted, stage_update_approved, referral_sent, appointment_scheduled

## Consequences

- Storage grows monotonically (requires retention policy planning)
- Queries on large event tables need indexing (transaction_id, timestamp)
- No "undo" mechanism — corrections create new events

---

**See Also**: `.specify/schemas/activity-log-event.json`, 000-foundation spec (Activity Log Contract)
