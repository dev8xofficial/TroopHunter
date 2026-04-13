# Feature Specification: CRM Email Blast

**Feature ID**: 009-email-blast
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [008-email](../008-email/spec.md)
**Screen / Module**: Email Blast - targeted campaign creation and send review

---

## Overview

The Email Blast feature provides controlled one-to-many outbound messaging for Burkes Group operators. It uses CRM audience data, content templates, send review, and provider-linked delivery so teams can run renewals, reminders, and nurture communication without exporting contacts into disconnected tooling.

---

## Problem Statement

Phase 1 delivered one-to-one email operations, but Burkes Group also needs campaign-style communication for renewals, reminders, and follow-up at scale. Without a dedicated campaign workflow, the team would rely on manual exports or external tools, weakening targeting, visibility, and CRM history. Email Blast solves that by turning CRM contact data into a managed campaign workflow with exclusions, previews, and outcome visibility.

---

## Goals

- Build audiences from CRM contact data and lifecycle context.
- Provide content composition and pre-send review.
- Respect exclusions and messaging restrictions before send.
- Show summary campaign performance and CRM history linkage.

---

## Non-Goals

- This feature does not replace one-to-one email.
- It does not provide complex marketing automation journeys.
- It does not self-host delivery or mailbox storage.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Creates department campaigns and reviews results |
| Insurance Agent (IA) | Uses campaigns for renewals and quote reminders |
| Platform Administrator (PA) | Reviews audience safety and send integrity |

---

## User Scenarios

### Scenario 1 - Owner builds and sends a renewal campaign

**Actor**: Department Owner
**Precondition**: Contacts have policy or lifecycle metadata suitable for targeting.
**Flow**:
1. The owner defines the audience filters.
2. The CRM previews included and excluded recipients.
3. The owner selects or edits campaign content.
4. The owner confirms the send and later reviews summary metrics.

**Success**: A targeted campaign is launched from CRM data without manual export.

---

### Scenario 2 - Administrator reviews a campaign after delivery

**Actor**: Platform Administrator
**Precondition**: A campaign has completed sending.
**Flow**:
1. The administrator opens the campaign record.
2. The CRM shows send totals, exclusions, and engagement summary.
3. Contact history reflects campaign involvement for affected recipients.

**Success**: Campaign behavior is visible and auditable in the CRM.

---

## Functional Requirements

### FR-09-01 - Audience Builder

The feature must support audience selection by department, lifecycle state, tags, and required data completeness.

### FR-09-02 - Template and Content Workflow

Operators must be able to create, edit, preview, and reuse campaign content.

### FR-09-03 - Send Review and Exclusions

The CRM must show included, excluded, and blocked recipients before send.

### FR-09-04 - Provider-Linked Delivery

Campaign sending must use the approved external email delivery model rather than CRM-owned mailbox behavior.

### FR-09-05 - Campaign Summary Metrics

The feature must show high-level send, delivery, and engagement summary where available.

### FR-09-06 - CRM History Linkage

Campaign send history must be visible in CRM context for affected recipients.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `campaign.id` | string | Campaign identifier |
| `campaign.department` | string | Department context |
| `campaign.status` | string | Draft, scheduled, sending, sent, cancelled |
| `campaign.audience_count` | number | Included recipients |
| `campaign.excluded_count` | number | Excluded or blocked recipients |
| `campaign.metrics` | object | Summary performance values |

---

## Edge Cases & Error States

- **Empty audience**: Send is blocked until a valid audience exists.
- **Blocked recipients**: Exclusions are shown before send rather than silently skipped.
- **Provider failure**: Campaign state reflects failed or degraded delivery explicitly.

---

## Assumptions

1. Campaign analytics may remain summary-level in Phase 2.
2. Audience rules depend on CRM contact integrity.
3. Campaign history should enrich contact context without replacing one-to-one email history.

---

## Success Criteria

1. Operators can create and send targeted campaigns from CRM data.
2. Exclusions and send restrictions are visible before launch.
3. Campaign results are visible in both campaign and contact context.

---

## Open Questions

1. Should some campaigns require approval before send?

---

## Dependencies

- **Depends on**: [002-contacts](../002-contacts/spec.md), [008-email](../008-email/spec.md)
- **Required by**: 015-reports
