# Feature Specification: CRM Dashboard

**Feature ID**: 001-dashboard
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Dashboard - default operational landing screen

---

## Overview

The Dashboard is the operator command center for the CRM. It combines lead and revenue KPIs, a cross-department pipeline snapshot, recent leads, activity feed, schedule, communications compliance status, integration health, and today's tasks so operators can understand the state of the business and act quickly without jumping between screens.

---

## Problem Statement

Burkes Group operators currently piece together daily priorities across several tools and disconnected inboxes. That creates blind spots around lead follow-up, communication activity, and compliance exposure. A pure reporting dashboard would not solve that problem because operators need action context, not just charts. The CRM Dashboard must therefore function as a triage surface: it should show what changed, what is blocked, what communications happened today, and where immediate action is needed. Because the platform spans three departments, the Dashboard also needs to balance a shared view of the business with department-aware emphasis and clear next steps into Contacts, Pipeline, Calls, or Email.

---

## Goals

- Surface the most important daily KPIs for leads, communications, and revenue.
- Give operators a shared pipeline view without replacing the dedicated Pipeline screen.
- Highlight recent work, urgent compliance signals, and integration state.
- Provide direct paths from the Dashboard into next actions.

---

## Non-Goals

- The Dashboard does not replace full contact management or pipeline editing.
- It does not provide full reporting exports or deep analytics.
- It does not host the complete activity timeline for a single contact.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Reviews daily business health and routes work |
| Platform Administrator (PA) | Monitors operational load, integrations, and compliance signals |
| Insurance Agent (IA) | Uses the Dashboard to find recent leads and pending communication work |
| Real Estate Agent (RA) | Uses the Dashboard to spot pipeline momentum and follow-up actions |

---

## User Scenarios

### Scenario 1 - Operator starts the day from the Dashboard

**Actor**: Department Owner
**Precondition**: The operator has an active CRM session and current dashboard data is available.
**Flow**:
1. The Dashboard loads with KPI cards and the live pipeline funnel.
2. The operator reviews recent leads and today's tasks.
3. The operator clicks into a contact or pipeline view to continue work.

**Success**: The operator understands the day's priorities in under one minute and can enter the next workflow in one click.

---

### Scenario 2 - Administrator checks communications and compliance risk

**Actor**: Platform Administrator
**Precondition**: Calls and provider integrations have generated activity today.
**Flow**:
1. The administrator opens the Calls & Compliance card.
2. The Dashboard shows recent calls, storage usage, and retention reminders.
3. The administrator reviews Connected Integrations for any degraded services.

**Success**: The administrator can identify communication or integration risk without leaving the Dashboard.

---

## Functional Requirements

### FR-01-01 - KPI Card Row

The Dashboard must display a KPI row summarizing active leads, calls today, policies quoted, transactions, and month-to-date revenue.

### FR-01-02 - Shared Pipeline Funnel

The Dashboard must show the six shared pipeline stages with cross-department counts and a department breakdown summary.

### FR-01-03 - Recent Leads Card

The Dashboard must display recently created or touched leads with department and stage context and a direct path to Contacts.

### FR-01-04 - Activity Feed Card

The Dashboard must display a condensed cross-department activity feed showing communication, stage, and intake events.

### FR-01-05 - Today's Schedule

The Dashboard must show the operator's near-term schedule with clear indication that Outlook and Google sync are future or linked sources.

### FR-01-06 - Calls & Compliance Panel

The Dashboard must surface communication storage usage, recent calls, and retention reminders in a dedicated panel.

### FR-01-07 - Connected Integrations Summary

The Dashboard must show the state of core integrations and provide a clear path to the integrations workspace when it exists.

### FR-01-08 - Today's Tasks

The Dashboard must show a short prioritized task list with due-time context and add-task action affordance.

### FR-01-09 - Contextual Navigation

Dashboard cards and list items must route operators into the correct next workflow without forcing them to manually search again.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `kpi_stats` | object | Top-level KPI values and deltas |
| `pipeline_summary` | object | Shared stage counts and department breakdowns |
| `recent_leads` | array | Latest leads or newly active contacts |
| `activity_feed` | array | Recent CRM events across departments |
| `todays_schedule` | array | Upcoming schedule items |
| `compliance_summary` | object | Storage and retention indicators |
| `integrations_status` | array | Core integration health |
| `tasks_today` | array | Operator-specific tasks due today |

---

## Edge Cases & Error States

- **No new activity**: The activity card shows a meaningful empty state instead of blank space.
- **Integration data unavailable**: The integration panel shows a degraded status and retry path.
- **No scheduled items**: The schedule card shows an explicit "Nothing scheduled" state.
- **Revenue not available**: The KPI card shows an unavailable value rather than misleading zeroes.

---

## Assumptions

1. Dashboard data is aggregated from multiple underlying services.
2. Operators value action-oriented summaries more than analytic depth on the landing screen.
3. Recent leads and activities can be limited to a small, digestible set.

---

## Success Criteria

1. Operators can identify priority work from the Dashboard without visiting more than one additional screen.
2. Dashboard summaries link directly into the relevant workflow.
3. Communication and integration health are visible enough to catch operational issues early.
4. The Dashboard remains useful for both department owners and platform administrators.

---

## Open Questions

1. Should mortgage-specific Arive exceptions appear in the main Dashboard or only in a future mortgage workspace?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md)
- **Required by**: 002-contacts, 003-pipeline, 006-calls
