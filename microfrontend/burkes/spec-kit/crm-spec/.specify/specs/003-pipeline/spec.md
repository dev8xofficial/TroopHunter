# Feature Specification: CRM Pipeline

**Feature ID**: 003-pipeline
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Pipeline - shared lead board, list, and forecast view

---

## Overview

The Pipeline feature provides the shared operational board for lead progress across insurance, mortgage, and real estate. It supports kanban, list, and forecast views, exposes the common six-stage lifecycle, and gives operators direct stage movement, ownership visibility, and transfer actions without breaking the unified contact model.

---

## Problem Statement

A unified contact record is not enough if operators cannot see where work stands across departments. Burkes Group needs one common pipeline model so teams can understand customer momentum and coordinate handoffs, but the same stage carries different meaning for each business line. That creates a design challenge: the pipeline must feel standardized enough to be learnable, while still expressing department context clearly. It must also support both operational board work and lightweight forecasting without forcing operators into a reporting product. Because transfers and communication follow-up often happen from the lead board, Pipeline must stay tightly connected to Contacts, Calls, SMS, and Email rather than becoming a standalone island.

---

## Goals

- Provide one shared six-stage pipeline surface across all departments.
- Support kanban, list, and forecast views for different operator tasks.
- Make stage, priority, ownership, and recent activity visible at a glance.
- Support transfer and communication launch actions directly from lead context.

---

## Non-Goals

- Pipeline does not replace the Contacts profile as the customer system of record.
- It does not implement full department-specific workspaces in Phase 1.
- It does not provide deep financial reporting beyond operational forecasting.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Monitors stage progression and reassigns work |
| Insurance Agent (IA) | Works insurance leads and updates stage progress |
| Real Estate Agent (RA) | Works transaction-oriented lead stages and closing preparation |
| Platform Administrator (PA) | Reviews pipeline health and bottlenecks across departments |

---

## User Scenarios

### Scenario 1 - Agent works the kanban board

**Actor**: Real Estate Agent
**Precondition**: The board contains active leads in multiple stages.
**Flow**:
1. The agent filters to Real Estate and Hot priority.
2. The board shows stage columns with current lead counts.
3. The agent opens a lead drawer, reviews history, and updates the stage.

**Success**: The agent can move active work forward from the pipeline without losing contact context.

---

### Scenario 2 - Owner transfers a lead from the pipeline

**Actor**: Department Owner
**Precondition**: A lead needs to change ownership.
**Flow**:
1. The owner opens the lead drawer from the board or list view.
2. The owner selects Transfer.
3. The CRM records the reassignment and notifies the new owner.

**Success**: Ownership changes are fast and visible without creating duplicate leads.

---

### Scenario 3 - Administrator reviews operational forecast

**Actor**: Platform Administrator
**Precondition**: Forecast summary data is available for the current period.
**Flow**:
1. The administrator switches to Forecast view.
2. The screen summarizes likely closes and at-risk work by department.
3. The administrator identifies where follow-up or intervention is needed.

**Success**: Forecast view informs operational planning without becoming a separate analytics product.

---

## Functional Requirements

### FR-03-01 - Shared Stage Model

The Pipeline feature must use the six canonical stages defined by the constitution and display department context without changing the shared labels.

### FR-03-02 - Multiple Views

The feature must support kanban, list, and forecast views over the same lead set.

### FR-03-03 - Filtering and Search

Operators must be able to filter by department, agent, priority, and search text.

### FR-03-04 - Lead Card Summary

Each lead card or row must show contact identity, department, current stage, priority, owner, and recent activity context.

### FR-03-05 - Stage Update Workflow

Operators with write access must be able to update lead stage from pipeline context.

### FR-03-06 - Transfer Lead Action

The Pipeline feature must expose transfer behavior that reassigns ownership while preserving lead history and notifications.

### FR-03-07 - Contact and Communication Shortcuts

Lead detail surfaces must provide direct paths to call, SMS, email, and contact detail workflows.

### FR-03-08 - Forecast Summary

The forecast view must summarize likely close volume, at-risk work, and stage conversion context at an operational level.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `lead.id` | string | Lead identifier |
| `lead.contact_id` | string | Linked contact identifier |
| `lead.department` | string | Department context |
| `lead.stage` | string | Canonical stage label |
| `lead.priority` | string | Hot, warm, or cool follow-up priority |
| `lead.assigned_agent` | object | Current owner for the lead |
| `lead.last_activity_at` | string | Recent action timestamp |
| `forecast_summary` | object | Operational forecast rollup |

---

## Edge Cases & Error States

- **No leads match filters**: The board or list shows a clear empty state with reset option.
- **Restricted operator opens another department lead**: The lead is viewable but stage-change controls are unavailable.
- **Stage update fails**: The lead remains in its prior state and the user receives an explicit error.
- **Forecast data unavailable**: The forecast panel degrades gracefully without blocking kanban or list use.

---

## Assumptions

1. A contact may have more than one active departmental lead state.
2. Forecasting in Phase 1 is operational, not accounting-grade.
3. Priority is a CRM-level follow-up aid, not a compliance or legal classification.

---

## Success Criteria

1. Operators can manage daily lead progression from a shared board.
2. Stage, ownership, and communication actions remain tightly connected.
3. Forecast summaries help planning without replacing the dedicated reports roadmap.
4. Department differences are visible without fragmenting the shared stage model.

---

## Open Questions

1. Should stage changes always write a required note for certain late-stage transitions?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [002-contacts](../002-contacts/spec.md)
- **Required by**: 006-calls, 007-sms, 008-email
