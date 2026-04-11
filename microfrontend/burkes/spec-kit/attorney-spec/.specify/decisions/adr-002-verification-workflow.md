# ADR-002: Verification Workflow Design

**Status**: Accepted
**Date**: 2026-04-12
**Decision**: Verification uses a 5-step pipeline with modal confirmations and discrepancy flagging.

## Context
The attorney's primary function is verifying closing amounts. The workflow needs to be thorough (legal compliance) yet efficient (deadline pressure). A balance between rigor and speed is required.

## Decision
The verification workflow follows a 5-step pipeline (Docs Received → Agent Reviewed → Attorney Review → Title Company → Closing). Each verification requires modal confirmation with attorney signature. Discrepancies trigger a flag modal that pauses the closing process and notifies all parties.

## Consequences
- Verification is explicit and auditable — every verification is recorded with timestamp and attorney signature
- Flagging is a serious action — it pauses the entire closing process
- The 5-step pipeline is visible on each verification panel, giving attorneys clear context of where each transaction stands
- All verifications produce activity log events for audit trail
