# Feature Specification: CRM Contacts

**Feature ID**: 002-contacts
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Contacts - unified customer directory and profile entry point

---

## Overview

The Contacts feature is the authoritative operator-facing directory for customers in the CRM. It provides search, filtering, minimal-data intake, cumulative profile enrichment, department tagging, source tracking, lead transfer entry points, and migration-aware import support. Every other Phase 1 workflow depends on Contacts because calls, SMS, email, and pipeline work all start from or resolve back to the unified contact record.

---

## Problem Statement

Burkes Group currently works from fragmented customer records spread across legacy CRMs, email threads, phone histories, and department-specific notes. That fragmentation makes it difficult to know whether a customer already exists, which department owns the active relationship, or what information has been collected so far. It also increases compliance risk because consent, recordings, and communication history can become detached from the actual person record. The Contacts feature solves this by creating one operator-facing directory that accepts incomplete intake, enriches over time, and keeps source, consent, and cross-department context visible. It must handle both manual entry and portal-created intake while also supporting legacy import from Follow Up Boss.

---

## Goals

- Provide one searchable directory for all CRM contacts.
- Support minimal-data contact creation without blocking the workflow.
- Preserve cumulative cross-department enrichment on a single record.
- Make source, consent, and transfer state visible to operators.
- Support migration and import from legacy sources.

---

## Non-Goals

- Contacts does not replace the dedicated Pipeline board for stage management.
- It does not implement full campaign or vCard sharing workflows in Phase 1.
- It does not handle every department-specific sub-workspace as a separate screen.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Reviews and enriches contact records across departments |
| Insurance Agent (IA) | Creates, updates, and transfers insurance-relevant contact context |
| Real Estate Agent (RA) | Uses contacts as the entry point to pipeline and communication workflows |
| Platform Administrator (PA) | Oversees imports, merges, and cross-department data integrity |

---

## User Scenarios

### Scenario 1 - Agent creates a minimal contact during a call

**Actor**: Insurance Agent
**Precondition**: The agent has only a customer's name and phone number.
**Flow**:
1. The agent opens New Contact.
2. The CRM accepts the minimum required identity fields and department assignment.
3. The contact is created with a visible Missing Data state.
4. The agent can continue with call, SMS, email, or pipeline work immediately.

**Success**: The workflow continues without forcing the agent to complete a long form up front.

---

### Scenario 2 - Portal intake creates or enriches a contact

**Actor**: Platform Administrator
**Precondition**: A client submitted a portal form with consent.
**Flow**:
1. The CRM receives the intake payload.
2. The contact is created or matched against an existing record.
3. The contact card shows portal source and consent metadata.
4. The assigned internal team can open the contact from a notification or directory row.

**Success**: Portal-generated work appears as a trusted, visible CRM contact event.

---

### Scenario 3 - Owner transfers a contact to another agent

**Actor**: Department Owner
**Precondition**: The contact exists and is active in a department pipeline.
**Flow**:
1. The owner opens the Transfer Lead action from the contact row or profile.
2. The owner selects the target agent and target department context.
3. The CRM records the transfer and updates the assigned agent.
4. The recipient receives a notification and sees the full history.

**Success**: Ownership changes without losing the accumulated customer record.

---

## Functional Requirements

### FR-02-01 - Unified Contact Directory

The Contacts screen must display all CRM contacts in one directory with department, stage, source, owner, and recent-activity context.

### FR-02-02 - Search and Filter

Operators must be able to search by name, email, or phone and filter by department, stage, assigned agent, and missing-data state.

### FR-02-03 - Minimal Contact Creation

The CRM must allow a new contact to be created with minimum identity information and department assignment.

### FR-02-04 - Cumulative Profile Enrichment

The contact profile must support progressive enrichment of personal, departmental, and compliance fields over time without replacing prior history.

### FR-02-05 - Department Tags and Ownership

Each contact must show which departments are active and who owns the current departmental relationship.

### FR-02-06 - Source and Consent Visibility

The contact profile must display source, portal-origin flag, consent metadata, and created-by context.

### FR-02-07 - Missing Data State

The feature must visibly mark contacts that are operationally active but still missing key enrichment fields.

### FR-02-08 - Transfer Lead Action

The contact feature must expose a transfer action that updates departmental ownership without creating a duplicate contact.

### FR-02-09 - Import and Migration Support

The Contacts surface must support import workflows for legacy CRM data, including Follow Up Boss and structured file upload.

### FR-02-10 - Duplicate Awareness

The feature must warn operators when incoming or manual data appears to match an existing contact by phone, email, or other strong identifiers.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `contact.id` | string | Canonical contact identifier |
| `contact.identity` | object | Name, email, phone, created metadata |
| `contact.personal` | object | Address, date of birth, family, vehicle data |
| `contact.departments` | array | Active department contexts |
| `contact.assigned_agents` | object | Department-to-agent ownership map |
| `contact.pipeline_stage` | object | Department-to-stage map |
| `contact.source` | string | Portal, referral, import, manual, partner |
| `contact.consent` | object | Consent state and proof metadata |
| `contact.missing_data` | boolean | Derived enrichment state |

---

## Edge Cases & Error States

- **Partial duplicate match**: The CRM warns the operator and offers review before creating another record.
- **Legacy import row incomplete**: The import captures the row as flagged rather than failing the entire batch silently.
- **No consent on portal intake**: The contact is held in a reviewable exception state.
- **Cross-department read-only access**: The operator can view the contact but cannot edit restricted departmental fields.

---

## Assumptions

1. Email and phone are the strongest Phase 1 duplicate signals.
2. Not every contact will have data for all three departments.
3. The contact profile can safely reference department-specific sub-records without splitting the person record.

---

## Success Criteria

1. Operators can create and act on a contact with minimal data.
2. Portal-created contacts are visible and attributable inside the directory.
3. Transfers preserve the full contact history while changing ownership cleanly.
4. Imports support migration without undermining the unified contact model.

---

## Open Questions

1. Should import-time duplicates be auto-merged when both email and phone match, or always require operator confirmation?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md)
- **Required by**: 003-pipeline, 006-calls, 007-sms, 008-email
