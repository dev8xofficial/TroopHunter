# Architecture Decision Record: Append-Only Activity Log

**ADR ID**: 007-append-only-log
**Feature Spec**: [000-foundation](../specs/000-foundation/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

The CRM needs trustworthy communication and workflow history for compliance review, training, and dispute resolution.

## Decision

Activity events are append-only. The platform may add corrective entries, but it does not delete or rewrite historical activity entries.

## Rationale

- Compliance review requires a durable history.
- Operators need visibility into transfers, messages, and stage changes.
- Immutability reduces ambiguity about what happened and when.

## Consequences

### Positive

- Stronger audit integrity
- Simpler permission model
- Better legal defensibility

### Tradeoffs

- Errors are corrected by new entries, not by editing old ones
- Activity growth requires pagination and retention-aware storage planning

