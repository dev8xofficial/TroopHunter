# Architecture Decision Record: PWA-First Delivery

**ADR ID**: 005-pwa-first
**Feature Spec**: [000-foundation](../specs/000-foundation/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

Burkes Group needs mobile-friendly access quickly, but a native app would extend cost and timeline before the core CRM backbone is proven.

## Decision

Phase 1 and Phase 2 target responsive web and PWA readiness first. Native mobile remains a future option only if web delivery proves insufficient.

## Rationale

- Most operator workflows are forms, communications, and lists that work well on the web.
- Browser APIs support install prompts, camera access, and notifications.
- PWA delivery keeps engineering focused on the core CRM experience.

## Consequences

### Positive

- Faster time to operational value
- Shared implementation path with the portal ecosystem
- Lower delivery and maintenance cost

### Tradeoffs

- Device-specific native capabilities remain limited
- Push and install behavior may vary across platforms

