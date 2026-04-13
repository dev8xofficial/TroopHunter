# Feature Specification: CRM Insurance

**Feature ID**: 011-insurance
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [003-pipeline](../003-pipeline/spec.md)
**Screen / Module**: Insurance - department workspace for quoting, binding, renewals, and policy visibility

---

## Overview

The Insurance feature gives Burkes Group a department-specific operations workspace built on the shared contact and pipeline model. It turns generic CRM leads into insurance-ready work by surfacing quote progress, missing intake data, renewal visibility, policy context, and legacy sync awareness in one screen.

---

## Problem Statement

Phase 1 delivers a shared pipeline and unified contacts, but insurance operations need richer context than a generic lead board can provide. Agents need to know whether a prospect is ready for quoting, what customer information is still missing, whether a policy has moved from quoted to bound or issued, and whether legacy systems still hold relevant data. Without a dedicated insurance workspace, the team would keep using disconnected systems or manual notes, slowing service and increasing compliance risk. Insurance solves that by making the shared CRM model insurance-operational without fragmenting the customer record.

---

## Goals

- Provide an insurance-specific workspace on top of the shared contact model.
- Surface quote, bind, issue, and renewal lifecycle visibility.
- Highlight missing intake data needed for insurance servicing.
- Expose legacy sync context while Burkes transitions away from prior tools.
- Preserve direct pivots into communications, activities, and contact detail.

---

## Non-Goals

- This feature does not implement carrier quoting engines inside the CRM.
- It does not replace policy administration or accounting systems.
- It does not allow departments to create a duplicate customer record outside the shared contact model.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Insurance Agent (IA) | Quotes prospects, updates policy progress, and follows renewal work |
| Department Owner (OW) | Reviews pipeline health, renewal risk, and team execution |
| Platform Administrator (PA) | Audits insurance workflows and legacy transition readiness |

---

## User Scenarios

### Scenario 1 - Agent prepares a prospect for quoting

**Actor**: Insurance Agent
**Precondition**: A contact has been tagged for insurance but has incomplete intake information.
**Flow**:
1. The agent opens the Insurance workspace.
2. The CRM highlights the missing fields needed for quote readiness.
3. The agent pivots to the contact, captures the missing details, and advances the record to quoted.

**Success**: The agent moves from lead review to quote readiness without leaving the CRM context.

---

### Scenario 2 - Owner reviews renewals at risk

**Actor**: Department Owner
**Precondition**: The insurance book contains upcoming renewals and some missing follow-up activity.
**Flow**:
1. The owner filters the workspace to renewal-related records.
2. The CRM shows renewal timing, assigned agent, and recent communication history.
3. The owner identifies at-risk renewals and pivots to the underlying contact or communication workflow.

**Success**: Renewal risk becomes visible early enough for intervention.

---

## Functional Requirements

### FR-11-01 - Insurance Workspace

The feature must present insurance-scoped queue, board, or list views that show insurance records without breaking the shared CRM data model.

### FR-11-02 - Quote and Bind Lifecycle

Operators must be able to distinguish records that are new, quoted, bound, issued, or renewal-oriented.

### FR-11-03 - Policy Summary Visibility

The workspace must surface policy summary information such as product line, carrier, premium range, effective date, and expiration where available.

### FR-11-04 - Missing Intake Guidance

The feature must highlight missing insurance intake data such as date of birth, address, driver details, VIN, or household information needed to progress the record.

### FR-11-05 - Legacy Sync Awareness

Records synchronized from Vertafore, Agency Zoom, or other interim insurance tools must show freshness and source context.

### FR-11-06 - Shared CRM Pivots

Operators must be able to open the linked contact, activity history, calls, SMS, or email context directly from the insurance workspace.

### FR-11-07 - Renewal Visibility

The feature must support upcoming renewal review and identify records lacking timely follow-up.

### FR-11-08 - Department-Scoped Editing

Insurance edits must respect role and department write scope while preserving read visibility for authorized roles.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `insurance_record.id` | string | Insurance workspace record identifier |
| `insurance_record.contact_id` | string | Linked unified contact |
| `insurance_record.line_of_business` | string | Auto, home, commercial, life, or umbrella context |
| `insurance_record.status` | string | New, quoted, bound, issued, renewal, lost |
| `insurance_record.carrier` | string | Carrier or quoting source |
| `insurance_record.missing_fields` | array | Required data still missing |
| `insurance_record.renewal_at` | string | Renewal review date if applicable |
| `insurance_record.sync_state` | object | Legacy provider source and freshness metadata |

---

## Edge Cases & Error States

- **Minimal-data lead**: The record remains actionable but clearly marked as not quote-ready.
- **Legacy source mismatch**: Conflicting source values are flagged rather than silently overwritten.
- **Expired policy data**: Historical visibility remains available even if the policy is no longer active.
- **Unauthorized editor**: Users outside insurance write scope can review but not modify insurance fields.

---

## Assumptions

1. The unified contact record remains the canonical customer identity.
2. Insurance-specific enrichment will happen progressively after initial intake.
3. Full carrier quoting automation may arrive later than the Phase 2 workspace.

---

## Success Criteria

1. Insurance operators can manage quoting and renewal work from one CRM workspace.
2. Missing intake data is visible before the team wastes effort on incomplete quoting.
3. Legacy sync context is visible enough to support the transition to standalone CRM workflows.

---

## Open Questions

1. Should renewal alerts live only in Insurance, or also appear on Dashboard and Reports by default?

---

## Dependencies

- **Depends on**: [002-contacts](../002-contacts/spec.md), [003-pipeline](../003-pipeline/spec.md), [004-activities](../004-activities/spec.md)
- **Required by**: 014-integrations, 015-reports
