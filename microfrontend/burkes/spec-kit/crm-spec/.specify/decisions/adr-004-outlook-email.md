# Architecture Decision Record: Outlook as the Email System of Record

**ADR ID**: 004-outlook-email
**Feature Spec**: [008-email](../specs/008-email/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

The CRM must support inbound and outbound email without taking on the cost and operational burden of self-hosting email storage.

## Decision

Microsoft Outlook remains the email system of record. The CRM manages composition, linking, activity logging, and retrieval metadata around Outlook interactions.

## Rationale

- Outlook already exists in the business workflow.
- External storage reduces platform cost and operational complexity.
- The CRM still gains the visibility it needs through metadata linkage.

## Consequences

### Positive

- Faster Phase 1 delivery
- Lower infrastructure burden
- Cleaner integration with notifications and calendar context

### Tradeoffs

- Email capability depends on provider integration health
- Some advanced email workflows remain constrained by provider APIs

