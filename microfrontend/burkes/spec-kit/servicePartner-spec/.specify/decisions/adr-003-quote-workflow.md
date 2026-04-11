# ADR-003: Quote Workflow Design

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-003

## Title

We WILL implement a structured quote workflow where partners create quotes with separate labor and materials costs, auto-calculated totals, and estimated completion times.

## Context

Partners need to provide homeowners with detailed, professional quotes. The quote must be traceable to a specific referral and include enough detail for the homeowner to make an informed decision.

## Decision

1. Quotes are linked to a specific referral (selected from a dropdown).
2. Labor and materials costs are entered separately.
3. Total quote amount is auto-calculated (labor + materials).
4. Estimated completion time is selected from predefined options.
5. Additional notes field for warranty info, payment terms, etc.
6. Quote statuses: Pending → Accepted / Declined.

## Rationale

- **Transparency**: Separating labor and materials builds homeowner trust.
- **Accuracy**: Auto-calculation prevents arithmetic errors.
- **Professionalism**: Structured quotes present the partner as a reliable professional.

## Consequences

1. Quote creation form has two numeric inputs with real-time total calculation.
2. Quote acceptance/decline triggers activity events and updates referral status.

---

**See Also**: 004-quotes spec, referral-model.json (quote object)
