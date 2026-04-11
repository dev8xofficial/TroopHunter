# ADR-004: Document Review Authority Chain

**Status**: Accepted
**Date**: 2026-04-12
**Decision**: The attorney has full review authority over all document types but limited upload authority.

## Context
Multiple parties upload documents to a transaction: agents (purchase agreements), lenders (mortgage docs, closing disclosures), and title companies (title commitments). The attorney must review all of these but should not be the primary uploader for most document types.

## Decision
The attorney can review, approve, reject, and comment on all document types across their assigned transactions. Upload authority is limited to: court orders, settlement agreements, and closing verifications. This creates a clear separation between document submission (agent/lender responsibility) and document validation (attorney responsibility).

## Consequences
- Clear separation of document submission vs. validation responsibilities
- Attorney review is a gate — documents cannot be considered final until attorney approves
- Document rejection includes a required reason field and returns the document to the uploader
- All review actions produce activity log events
