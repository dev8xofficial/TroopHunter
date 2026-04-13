# Feature Specification: CRM Calls

**Feature ID**: 006-calls
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Calls - VOIP dialer, call log, and recordings

---

## Overview

The Calls feature provides the CRM's internal calling workspace. It combines a dialer, active-call controls, call log, contact-linked history, recording access, retention metadata, and post-call notes so Burkes Group can centralize business calling in a compliance-aware workflow instead of personal phones or disconnected call tools.

---

## Problem Statement

Calling is one of the three non-negotiable CRM capabilities defined in the planning material, and it carries the heaviest compliance burden. Burkes Group needs a system where business calls happen through the CRM, recordings are retained according to department rules, and call history stays attached to the same contact record that powers pipeline and communication follow-up. Without that, operators would keep using personal devices or external telephony tools that leave the CRM blind to crucial customer interactions. The Calls feature therefore has to balance speed and operational simplicity with clear recording visibility, retention dates, unknown-number handling, and reliable post-call logging.

---

## Goals

- Provide a CRM-native calling workflow tied to contacts and leads.
- Capture call recordings and retention metadata for compliance.
- Make outbound and inbound calls visible in one searchable log.
- Support post-call notes and dispositions as part of the same workflow.

---

## Non-Goals

- Calls does not finalize vendor procurement or pricing.
- It does not provide advanced call-center queueing or workforce management.
- It does not replace the future video meetings capability.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Insurance Agent (IA) | Places and receives business calls tied to customer records |
| Real Estate Agent (RA) | Uses calling for lead follow-up and transaction updates |
| Department Owner (OW) | Reviews call history and recordings for coaching or compliance |
| Platform Administrator (PA) | Monitors recording retention and provider health |

---

## User Scenarios

### Scenario 1 - Agent places an outbound call from a contact

**Actor**: Real Estate Agent
**Precondition**: The agent has a contact open in the CRM.
**Flow**:
1. The agent clicks Call from Contacts or Pipeline.
2. The dialer opens with the contact preselected.
3. The agent completes the call and adds a note or disposition.
4. The CRM writes the activity and recording reference to the contact history.

**Success**: Calling feels native to the CRM and produces a complete audit trail.

---

### Scenario 2 - Unknown inbound caller is resolved to a contact

**Actor**: Insurance Agent
**Precondition**: An inbound call arrives from a number not confidently matched to a contact.
**Flow**:
1. The Calls feature shows the incoming number and unmatched state.
2. The agent can search for an existing contact or create a minimal contact.
3. The call log entry is linked after the call is resolved.

**Success**: Inbound calls do not remain detached from the CRM data model.

---

### Scenario 3 - Administrator reviews a recording near expiration

**Actor**: Platform Administrator
**Precondition**: A recording is approaching its retention limit.
**Flow**:
1. The administrator opens the call log and filters by retention window.
2. The relevant recording shows expiry context.
3. The administrator reviews or exports the reference according to policy.

**Success**: Compliance-sensitive recordings are visible before they age out.

---

## Functional Requirements

### FR-06-01 - Dialer Workspace

The Calls feature must provide a dialer that supports contact-linked outbound calling and active-call controls.

### FR-06-02 - Contact and Lead Linkage

Every call log entry must resolve to a contact and, when relevant, the active lead or department context.

### FR-06-03 - Call Log

The Calls feature must provide a searchable log of inbound and outbound calls with timestamps, ownership, department, and outcome context.

### FR-06-04 - Recording Visibility

When recording is enabled or required, the call log must show recording state and provide access to the recording reference.

### FR-06-05 - Retention Metadata

Each recorded call must display the relevant retention window or expiration date according to department policy.

### FR-06-06 - Post-Call Notes and Disposition

Operators must be able to capture notes or disposition outcomes immediately after a call.

### FR-06-07 - Unknown Number Resolution

Inbound or outbound calls that do not match a known contact must support fast lookup or minimal contact creation.

### FR-06-08 - Degraded Provider State

The Calls workspace must show clear degraded-state messaging when telephony service is unavailable.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `call.id` | string | Call identifier |
| `call.contact_id` | string | Linked contact |
| `call.department` | string | Department context |
| `call.direction` | string | Inbound or outbound |
| `call.started_at` | string | Call start timestamp |
| `call.duration_seconds` | number | Call duration |
| `call.recorded` | boolean | Recording state |
| `call.recording_reference` | object | Provider reference and storage metadata |
| `call.recording_expires_at` | string | Retention cutoff |
| `call.disposition` | string | Outcome summary |

---

## Edge Cases & Error States

- **Provider unavailable**: The dialer shows degraded state and prevents broken call attempts.
- **Recording fails**: The call log marks the failure explicitly so compliance review can follow up.
- **Unknown number remains unresolved**: The log entry is preserved in an unmatched state for later review.
- **Restricted role playback**: Users without proper scope cannot play recordings tied to protected contexts.

---

## Assumptions

1. Recording is required for business calls where department policy demands it.
2. Phone number matching is the primary first-pass contact resolution strategy.
3. Recording playback may rely on provider-hosted media references.

---

## Success Criteria

1. Operators can place and receive business calls from inside the CRM.
2. Recordings and retention metadata remain visible and reviewable.
3. Post-call notes and outcomes are written without leaving the call workflow.
4. Unknown numbers can be resolved into the unified contact model.

---

## Open Questions

1. Should all departments enforce recording on every call, or only on business-routed lines tied to the CRM?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [002-contacts](../002-contacts/spec.md), [003-pipeline](../003-pipeline/spec.md)
- **Required by**: 007-sms
