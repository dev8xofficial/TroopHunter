# Architecture Decision Record: SaaS-Ready from Day One

**ADR ID**: 008-saas-ready
**Feature Spec**: [000-foundation](../specs/000-foundation/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

Burkes Group wants to use the CRM internally first and later commercialize it as a broader operational platform.

## Decision

The CRM will keep tenant-aware boundaries in its contracts and information architecture from Phase 1 onward, without forcing full multi-tenant UI or billing in the first release.

## Rationale

- Retrofitting multi-tenant concepts later is costly.
- Early separation of owner, department, and brand metadata preserves future options.
- Burkes Group can act as the first tenant while validating the product.

## Consequences

### Positive

- Cleaner future productization path
- Better discipline around shared contracts and branding tokens
- Reduced later migration risk

### Tradeoffs

- Some metadata exists before the commercial workflow needs it
- Teams must avoid accidental single-tenant assumptions in shared contracts

