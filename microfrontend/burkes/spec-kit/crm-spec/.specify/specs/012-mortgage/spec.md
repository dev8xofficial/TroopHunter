# Feature Specification: CRM Mortgage

**Feature ID**: 012-mortgage
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [003-pipeline](../003-pipeline/spec.md)
**Screen / Module**: Mortgage - department workspace for pre-approval, loan progress, and Arive-linked visibility

---

## Overview

The Mortgage feature gives Burkes Group a lender-facing department workspace that turns shared contacts and pipeline leads into mortgage-operational work. It emphasizes pre-approval progress, loan milestones, missing documentation, Arive synchronization, and customer communication context in one place.

---

## Problem Statement

Mortgage work has a different rhythm than insurance or general lead management. The team needs visibility into pre-approval status, application readiness, lender coordination, milestone progress, and exceptions coming from Arive. A generic pipeline can show stage movement, but it cannot explain whether a loan is stuck for documentation, awaiting lender response, or nearing clear-to-close. Without a dedicated mortgage workspace, operators would keep relying on Arive alone and lose the advantage of the CRM's shared contact history. Mortgage solves that by making loan progress visible inside the CRM while respecting Arive as a critical integration point.

---

## Goals

- Provide a mortgage-specific workspace on the shared CRM foundation.
- Surface pre-approval and loan milestone progress clearly.
- Highlight missing documents or intake information that block progress.
- Expose Arive-linked sync state and exception visibility.
- Keep contact, activity, and communication pivots close to mortgage work.

---

## Non-Goals

- This feature does not replace Arive as the lender platform of record.
- It does not implement underwriting decisioning or loan origination logic inside the CRM.
- It does not duplicate customer identity or communications outside the shared contact model.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Mortgage Liaison (ML) | Tracks loan progress, requests missing data, and coordinates next steps |
| Department Owner (OW) | Reviews pipeline health and stalled mortgage records |
| Platform Administrator (PA) | Audits sync state, access controls, and lifecycle integrity |

---

## User Scenarios

### Scenario 1 - Liaison reviews a loan stalled on documents

**Actor**: Mortgage Liaison
**Precondition**: A contact has a mortgage record in process but missing documents.
**Flow**:
1. The liaison opens the Mortgage workspace.
2. The CRM shows milestone status, missing items, and recent communication history.
3. The liaison opens the contact and sends a follow-up request.

**Success**: The liaison can move stalled mortgage work forward from one screen.

---

### Scenario 2 - Owner monitors pre-approval to close readiness

**Actor**: Department Owner
**Precondition**: The mortgage pipeline contains records at different stages.
**Flow**:
1. The owner filters by stage or lender.
2. The CRM shows pre-approval, processing, underwriting, and clear-to-close progress.
3. The owner identifies bottlenecks and pivots into the linked record for action.

**Success**: Mortgage throughput becomes visible without depending on an external system alone.

---

## Functional Requirements

### FR-12-01 - Mortgage Workspace

The feature must provide mortgage-scoped queue, board, or list views built on the shared CRM customer model.

### FR-12-02 - Loan Milestone Visibility

The workspace must show milestone states such as inquiry, pre-approval, application, processing, underwriting, clear-to-close, and funded.

### FR-12-03 - Arive-Linked Summary

Operators must see Arive-linked identifiers, sync freshness, and source context for mortgage records where applicable.

### FR-12-04 - Missing Data and Document Guidance

The feature must highlight missing intake information, documents, or actions needed to move the loan forward.

### FR-12-05 - Contact and Activity Pivots

Users must be able to open the shared contact, activity timeline, and communications context directly from mortgage records.

### FR-12-06 - Exception Visibility

Stale syncs, unresolved lender responses, or invalid milestone transitions must be explicitly visible.

### FR-12-07 - Closing Readiness

The feature must support clear-to-close and funded visibility so operators can distinguish active processing from completed mortgage work.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `mortgage_record.id` | string | Mortgage record identifier |
| `mortgage_record.contact_id` | string | Linked unified contact |
| `mortgage_record.loan_stage` | string | Mortgage lifecycle stage |
| `mortgage_record.lender` | string | Lender or originating source |
| `mortgage_record.arive_id` | string | Linked Arive identifier |
| `mortgage_record.missing_items` | array | Required docs or data still missing |
| `mortgage_record.clear_to_close_at` | string | Clear-to-close timestamp if reached |
| `mortgage_record.sync_state` | object | Arive sync freshness and error details |

---

## Edge Cases & Error States

- **Arive unavailable**: The mortgage record remains visible with explicit degraded sync state.
- **Partial application**: Operators can review progress even if only minimal intake exists.
- **Stage mismatch**: Conflicting stage data is flagged instead of silently accepted.
- **Role restriction**: Read access stays available while edits remain limited by mortgage scope.

---

## Assumptions

1. Arive remains a required integration for mortgage operations.
2. Mortgage teams need faster exception review than a generic pipeline offers.
3. Missing documents are often the primary blocker to stage progression.

---

## Success Criteria

1. Mortgage operators can manage loan progress from inquiry through funded inside the CRM context.
2. Missing data and sync issues are visible early enough to prevent silent stalls.
3. Arive dependence is acknowledged without giving up CRM-centric customer visibility.

---

## Open Questions

1. Should lender-specific milestone labels be standardized globally or remain configurable per lender relationship?

---

## Dependencies

- **Depends on**: [002-contacts](../002-contacts/spec.md), [003-pipeline](../003-pipeline/spec.md), [004-activities](../004-activities/spec.md)
- **Required by**: 014-integrations, 015-reports
