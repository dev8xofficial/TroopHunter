# Architecture Decision Record: Build a Custom CRM

**ADR ID**: 001-custom-crm
**Feature Spec**: [000-foundation](../specs/000-foundation/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

Burkes Group currently relies on multiple tools that divide customer context across departments. The business wants a single operational system, stronger compliance behavior, and a future path to productizing the platform.

## Decision

The platform will use a custom CRM as the internal operational layer rather than extending a third-party CRM as the primary system of record.

## Rationale

- The business needs one customer profile shared by three departments.
- Compliance and ownership requirements are specific to Burkes Group Marketing LLC.
- The long-term SaaS direction requires control over workflow, branding, and data contracts.

## Consequences

### Positive

- Full control over workflow, schema, and compliance behavior
- Stronger alignment with the portal ecosystem
- Cleaner future path to tenantization and white-labeling

### Tradeoffs

- Higher upfront specification and implementation cost
- More internal responsibility for integration maturity

