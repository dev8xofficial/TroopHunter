# ADR-001: Attorney Role Scoping Model

**Status**: Accepted
**Date**: 2026-04-12
**Decision**: The Attorney Portal scopes all data access to the AT (Closing Attorney) role.

## Context
Multiple roles interact with transaction data across the Burkes Group platform. The attorney needs access to verify amounts and review documents but should not have agent-level transaction management capabilities.

## Decision
The attorney role (AT) is scoped to: view assigned transactions, verify closing amounts, approve/reject documents, flag discrepancies, and manage client cases. Transaction creation, stage updates, and listing management remain exclusive to the AG role.

## Consequences
- Attorney sees only transactions where they are the assigned closing attorney
- Document uploads are limited to legal documents (court orders, settlement agreements, closing verifications)
- Verification actions are exclusive to the AT role — no other role can verify or flag amounts
