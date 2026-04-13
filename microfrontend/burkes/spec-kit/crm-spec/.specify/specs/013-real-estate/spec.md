# Feature Specification: CRM Real Estate

**Feature ID**: 013-real-estate
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [003-pipeline](../003-pipeline/spec.md)
**Screen / Module**: Real Estate - department workspace for listings, transactions, closings, and external contract readiness

---

## Overview

The Real Estate feature provides a department-specific workspace for active buyers, sellers, listings, transactions, and closing progress. It enriches the shared CRM contact and pipeline model with property context, milestone visibility, HAR-linked data awareness, and DotLoop-ready transaction references so real estate operators can manage deals from one workspace.

---

## Problem Statement

Real estate operations rely on property context, contract progress, closing dates, and communication timing that are not visible in a generic CRM pipeline alone. Agents need to see which deals are tied to properties, which records are under contract or pending close, which closing tasks remain open, and whether external transaction tooling is linked. Without a dedicated real estate workspace, the team would continue splitting work between spreadsheets, MLS tools, and transaction platforms, weakening the CRM's value as the operational center. Real Estate solves that by turning unified contacts and shared pipeline stages into a deal-ready departmental view.

---

## Goals

- Provide a real-estate-specific workspace built on the shared contact model.
- Surface property, transaction, and closing milestone context clearly.
- Highlight buyer, seller, and listing workflow needs without duplicating records.
- Expose HAR-linked reference visibility and DotLoop readiness.
- Keep communication and activity pivots close to transaction work.

---

## Non-Goals

- This feature does not replace MLS systems or transaction platforms as external systems of record.
- It does not implement full e-signature or contract authoring inside the CRM.
- It does not fork customer identity or communication history outside the shared contact model.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Real Estate Agent (RA) | Tracks active buyers, sellers, listings, contracts, and closings |
| Department Owner (OW) | Reviews transaction pipeline health, agent performance, and deal risk |
| Platform Administrator (PA) | Audits stage changes, external-link state, and retention requirements |

---

## User Scenarios

### Scenario 1 - Agent reviews a deal approaching closing

**Actor**: Real Estate Agent
**Precondition**: A contact is linked to an active transaction nearing the closing date.
**Flow**:
1. The agent opens the Real Estate workspace.
2. The CRM shows property, contract status, closing date, and remaining milestones.
3. The agent opens the linked contact, calendar, or communication workflow to complete follow-up.

**Success**: The agent can manage closing readiness from one real-estate-focused surface.

---

### Scenario 2 - Owner checks listing and contract risk

**Actor**: Department Owner
**Precondition**: Several deals are in offer, under-contract, or pending-close stages.
**Flow**:
1. The owner filters the workspace by stage, agent, or closing window.
2. The CRM highlights overdue milestones, stale follow-up, or missing external link context.
3. The owner pivots into the record needing intervention.

**Success**: Deal risk is visible before closings slip unexpectedly.

---

## Functional Requirements

### FR-13-01 - Real Estate Workspace

The feature must provide real-estate-scoped queue, board, or list views built on the shared CRM record model.

### FR-13-02 - Property and Transaction Summary

The workspace must show property address, transaction type, primary parties, closing target, and commission context where available.

### FR-13-03 - Closing Milestone Visibility

Operators must be able to see milestone progress from inquiry through contract, pending close, and closed state.

### FR-13-04 - HAR and Listing Context

The feature must expose HAR-linked listing or license-reference context where that data is available to the CRM.

### FR-13-05 - External Contract Readiness

Records must show whether external transaction tooling such as DotLoop is linked, pending, or intentionally deferred.

### FR-13-06 - Communication and Activity Pivots

Users must be able to pivot from real estate records into contacts, calendar events, calls, SMS, email, and activities.

### FR-13-07 - Risk and Delay Visibility

The workspace must identify stale follow-up, overdue milestones, or closing-date risk.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `transaction_record.id` | string | Real estate transaction identifier |
| `transaction_record.contact_id` | string | Linked unified contact |
| `transaction_record.property_address` | string | Primary property context |
| `transaction_record.stage` | string | Real estate lifecycle stage |
| `transaction_record.closing_date` | string | Planned close date |
| `transaction_record.agent_id` | string | Assigned real estate agent |
| `transaction_record.external_link_state` | object | HAR or DotLoop linkage visibility |
| `transaction_record.risk_flags` | array | Delay or follow-up risk indicators |

---

## Edge Cases & Error States

- **Buyer and seller overlap**: The same contact can appear in multiple transaction roles without duplication.
- **External link absent**: The record remains operational even if HAR or DotLoop linkage is missing.
- **Closing date changes**: History remains visible through activity events rather than silent replacement.
- **Read-only user**: Cross-department readers can review deal state without editing real estate data.

---

## Assumptions

1. Real estate workflows need richer milestone and property context than the shared pipeline alone provides.
2. HAR adds value mainly as reference data rather than a full CRM-owned workflow.
3. Phase 2 should make DotLoop linkage visible and ready, while deeper automation can evolve later with the integrations roadmap.

---

## Success Criteria

1. Real estate operators can review transaction and closing readiness from one dedicated workspace.
2. Property and milestone context reduce the need to cross-reference external spreadsheets.
3. External-link state is visible enough to support contract workflow coordination.

---

## Open Questions

1. Should closing checklists live fully inside Real Estate, or remain partly in linked external transaction tooling?

---

## Dependencies

- **Depends on**: [002-contacts](../002-contacts/spec.md), [003-pipeline](../003-pipeline/spec.md), [005-calendar](../005-calendar/spec.md)
- **Required by**: 014-integrations, 015-reports
