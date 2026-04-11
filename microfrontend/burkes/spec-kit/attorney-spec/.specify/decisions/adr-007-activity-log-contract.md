# ADR-007 — Activity Log as an Append-Only Audit Contract

**Status**: Accepted
**Date**: 2026-04-12
**Deciders**: Architecture Lead, Legal/Compliance Advisor, Product Lead
**Spec Context**: 000-foundation (FR-00-05 — Activity Log Contract), P-07 (Audit-Visible Activity)

---

## Context

The Attorney Portal serves a legal compliance function. Every verification, approval, rejection, and flag is a professional action taken by a closing attorney that may be referenced in legal disputes, title insurance claims, or regulatory audits.

We needed to define the contract for how these actions are recorded to satisfy:
1. **Legal auditability**: Can we prove exactly who did what, and when, with a non-repudiable record?
2. **Dashboard visibility**: The attorney needs to see recent activity to orient after any absence.
3. **Cross-screen consistency**: All five screens write events without duplicating the logging logic.
4. **Technology-agnostic spec**: The spec cannot mandate a specific database or event bus.

---

## Decision

The activity log is defined as an **append-only, schema-validated event stream**. It has the following constraints:

1. **Append-only**: Events are never updated or deleted. If a state change was recorded in error, a compensating event is written — the original event remains.

2. **Schema-validated before write**: Every event must pass validation against `activity-log-event.json` before it is accepted. Invalid events are rejected, not silently dropped.

3. **Seven canonical event types**: The spec defines exactly seven event types for the Attorney Portal scope. New event types require a spec update and ADR amendment — they cannot be added ad-hoc in implementation.

   | Event Type | Trigger |
   |-----------|---------|
   | document_reviewed | Attorney opens a document for review |
   | document_approved | Attorney approves a document |
   | document_rejected | Attorney rejects/returns a document |
   | transaction_verified | Attorney completes Verify Confirm modal |
   | discrepancy_flagged | Attorney submits Flag Discrepancy modal |
   | client_created | Attorney adds a new client via Add Client modal |
   | report_generated | Attorney generates and downloads a report |

4. **Required fields on every event**: eventId (unique), eventType, actorId, actorRole, timestamp (ISO 8601). All optional fields (transactionId, documentId, clientId, description) are event-type-specific.

5. **Attorney signature captured on verification events**: `transaction_verified` events must include the `attorneySignature` field — the attorney's typed full name. This provides the non-repudiable record of professional sign-off.

---

## Alternatives Considered

### Option A: Mutable action log (update-in-place)
Allow events to be corrected or deleted. Simpler for handling mistakes.

**Rejected**: A mutable audit log has no legal value. The attorney, a counterparty, or their counsel could dispute whether an action occurred. Immutability is the requirement.

### Option B: Per-screen logs
Each screen maintains its own event log. Simpler per-screen, but the Dashboard activity feed would need to aggregate from 5 separate sources.

**Rejected**: Cross-screen aggregation becomes a complex join query. A single event stream is the correct architectural choice for an audit log.

### Option C: Free-form log entries (no canonical event types)
Allow any string as the event type.

**Rejected**: Free-form event types make programmatic filtering unreliable and produce inconsistent dashboard feeds. Canonical types are a contract.

---

## Consequences

**Positive**:
- Every professional action by the attorney has a non-repudiable, timestamped, immutable record.
- The Dashboard activity feed always has a consistent, typed event stream to render from.
- Legal/compliance audits can be satisfied by exporting the raw event log.

**Negative**:
- The seven canonical event types must be decided upfront. Adding new types requires a spec-level change — this creates friction if new event types are needed in future features.
- Append-only storage grows indefinitely. Archival/retention policies must be defined at the infrastructure level (not in this spec-kit).

**Mitigations**:
- New event types are added via the spec-update issue template + ADR amendment process.
- Infrastructure retention policy is noted as an out-of-scope concern in the Foundation non-goals.
