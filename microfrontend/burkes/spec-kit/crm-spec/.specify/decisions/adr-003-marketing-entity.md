# Architecture Decision Record: Marketing Entity Owns the Platform

**ADR ID**: 003-marketing-entity
**Feature Spec**: [000-foundation](../specs/000-foundation/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

Mortgage and insurance stakeholders cannot directly co-own the customer platform because of compliance and legal boundary concerns.

## Decision

Burkes Group Marketing LLC is the platform owner and data owner for the CRM. Departments operate within the platform as subscribers and contributors.

## Rationale

- The operating structure creates a lawful bridge between departments.
- It simplifies platform billing, policy ownership, and data governance.
- It provides a stable owner for future SaaS packaging.

## Consequences

### Positive

- Clear legal ownership and accountability
- Cleaner compliance narrative across departments
- Easier future commercialization

### Tradeoffs

- Permission language and documentation must be precise
- Reporting and billing models must reflect platform-owner semantics

