# Feature Specification: CRM Integrations

**Feature ID**: 014-integrations
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Integrations - connector management, health monitoring, and sync governance

---

## Overview

The Integrations feature is the operator and administrator control plane for CRM-connected systems. It provides connector inventory, health visibility, sync freshness, ownership context, retry or reconnect actions, and dependency mapping across Outlook, VOIP, Arive, HAR, Vertafore, Google Calendar, Teams, Google Meet, and future services.

---

## Problem Statement

As Burkes moves more workflows into the CRM, third-party integrations become operational dependencies rather than hidden background services. When email, calendar, Arive, HAR, or legacy insurance syncs degrade, operators need to understand what is impacted, who owns the connection, how stale the data is, and what to do next. Without an Integrations screen, failures surface only as symptoms inside other features, which slows diagnosis and damages trust. Integrations solves that by making connector state, scope, and remediation visible in one place.

---

## Goals

- Provide a single inventory of all CRM-connected providers.
- Show connector health, sync freshness, and degraded-state impact clearly.
- Identify credential ownership, scope, and dependency relationships.
- Support test, reconnect, retry, and remediation workflows where appropriate.
- Preserve audit visibility for connector changes and failures.

---

## Non-Goals

- This feature does not replace provider-specific admin consoles.
- It does not expose secrets or raw credential values to standard operators.
- It does not promise that every provider supports direct reconnect from the CRM UI.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Platform Administrator (PA) | Manages connector health, permissions, and remediation |
| Department Owner (OW) | Reviews provider impact on department workflows |
| Mortgage Liaison (ML) | Checks Arive health when mortgage records degrade |
| Insurance Agent (IA) | Checks insurance sync state during transition from legacy tools |

---

## User Scenarios

### Scenario 1 - Administrator diagnoses a degraded provider

**Actor**: Platform Administrator
**Precondition**: One provider is failing or stale.
**Flow**:
1. The administrator opens Integrations.
2. The CRM highlights the degraded connector, last successful sync, and impacted features.
3. The administrator reviews ownership and attempts the supported remediation action.

**Success**: The administrator can diagnose the issue without hunting across multiple screens.

---

### Scenario 2 - Department owner checks workflow dependency

**Actor**: Department Owner
**Precondition**: A feature is behaving unexpectedly for the team.
**Flow**:
1. The owner opens the relevant integration card.
2. The CRM shows which screens and workflows depend on that provider.
3. The owner understands whether the issue is local, provider-wide, or role-scoped.

**Success**: Business users can understand provider impact without seeing privileged configuration detail.

---

## Functional Requirements

### FR-14-01 - Connector Inventory

The feature must list all active, planned, and degraded CRM integrations with provider name, category, priority, and current status.

### FR-14-02 - Health and Freshness Visibility

Each connector must show last successful sync or verification time, current health, and stale or degraded indicators.

### FR-14-03 - Ownership and Scope Context

The screen must identify credential owner, department relevance, and the CRM features affected by the connector.

### FR-14-04 - Supported Remediation Actions

Where supported, administrators must be able to test a connection, retry a sync, or launch a reconnect workflow.

### FR-14-05 - Dependency Mapping

The feature must show which screens or workflows depend on a connector so degraded states are easier to interpret.

### FR-14-06 - Alert and Audit Visibility

Connector failures, reconnect attempts, and significant state changes must be visible in activity or audit context.

### FR-14-07 - Privileged Detail Protection

Sensitive connection details must be restricted to authorized roles and never exposed broadly.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `connector.id` | string | Integration identifier |
| `connector.provider` | string | Provider or platform name |
| `connector.status` | string | Healthy, degraded, disconnected, pending, planned |
| `connector.priority` | string | Priority tier for roadmap and operations |
| `connector.last_synced_at` | string | Last successful sync or verification time |
| `connector.owner` | string | Owning team or service account context |
| `connector.affected_features` | array | CRM screens or modules impacted |
| `connector.actions` | array | Supported remediation operations |

---

## Edge Cases & Error States

- **Provider partial outage**: Some workflows remain available and others degrade; both states must be clear.
- **Credential unknown**: The connector can still appear, but ownership is flagged as incomplete.
- **Reconnect unsupported**: The screen shows guidance and status rather than a misleading action button.
- **Planned integration**: Planned connectors appear distinctly from live integrations.

---

## Assumptions

1. Integration trust is critical once multiple Phase 2 features depend on external services.
2. Not every provider will support the same remediation workflow.
3. Department owners need impact visibility even when they cannot manage credentials directly.

---

## Success Criteria

1. Administrators can diagnose integration problems from one screen.
2. Department users can understand which provider issues affect their work.
3. Connector changes and failures remain auditable.

---

## Open Questions

1. Should some connector failures create blocking banners directly in dependent screens, or only route through Integrations and Notifications?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [005-calendar](../005-calendar/spec.md), [011-insurance](../011-insurance/spec.md), [012-mortgage](../012-mortgage/spec.md), [013-real-estate](../013-real-estate/spec.md)
- **Required by**: 015-reports, 016-admin-settings
