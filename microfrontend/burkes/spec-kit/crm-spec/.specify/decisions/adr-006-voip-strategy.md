# Architecture Decision Record: Provider-Agnostic VOIP Strategy

**ADR ID**: 006-voip-strategy
**Feature Spec**: [006-calls](../specs/006-calls/spec.md)
**Status**: Accepted
**Decision Date**: 2026-04-13

---

## Context

The business needs calling, SMS, and recording, but the specific VOIP provider is still under evaluation.

## Decision

The CRM will define provider-agnostic call and SMS contracts. Integration adapters may vary by vendor, but the CRM data model, events, and UI workflow remain stable.

## Rationale

- Vendor evaluation is still open.
- The product cannot wait for a final commercial decision before specification work begins.
- Stable internal contracts reduce migration risk if the first provider changes later.

## Consequences

### Positive

- Clear product behavior independent of vendor branding
- Easier future provider replacement
- Better separation between operator workflow and telephony plumbing

### Tradeoffs

- Lowest-common-denominator assumptions must be explicit
- Provider-specific capabilities may need later extensions

