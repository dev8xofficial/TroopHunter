# Architecture Decision Record: Unified Contact Record

**ADR ID**: 002-unified-contact
**Feature Spec**: [002-contacts](../specs/002-contacts/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

Separate tools create duplicate contacts, fragmented histories, and lost cross-sell visibility. Burkes Group needs every department to operate from the same customer context.

## Decision

The CRM will maintain one cumulative contact record per customer. Department-specific details are modeled as scoped sub-records and activities, not duplicate contacts.

## Rationale

- A unified record reduces manual re-entry and ownership confusion.
- Cross-department history is essential for service continuity.
- Compliance and audit review are simpler when all context is connected.

## Consequences

### Positive

- Single search and lookup experience
- Easier activity auditing and contact enrichment
- Better long-term analytics and SaaS portability

### Tradeoffs

- Requires careful department-scoped write controls
- Matching and deduplication logic must be explicit

