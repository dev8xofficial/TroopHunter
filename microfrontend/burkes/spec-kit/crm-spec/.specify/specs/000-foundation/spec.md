# Feature Specification: CRM Foundation

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [constitution.md](../../memory/constitution.md)
**Screen / Module**: Global - applies to all CRM screens

---

## Overview

The Foundation spec defines the shared shell, operator session model, navigation system, design tokens, role-aware quick actions, notification behavior, PWA installability expectations, and immutable activity contract that every CRM screen depends on. It is the baseline that keeps all CRM screens consistent while preserving compliance, department visibility rules, and mobile-ready shell behavior.

---

## Problem Statement

Without a clear foundation layer, every CRM feature would risk inventing its own navigation rules, communication shortcuts, role checks, activity semantics, and mobile-shell behavior. That would be especially damaging in this product because operators move rapidly between contacts, pipeline work, and communication channels, including on the go. A fragmented shell would create training cost, duplicate logic, and compliance risk. The CRM also sits beside six portals, so the internal layer must be explicit about how identity, notifications, portal intake, and installable PWA behavior appear in the operator experience. This foundation eliminates ambiguity by defining the global shell once and making all downstream features inherit the same session, access, audit, and installability expectations.

---

## Goals

- Define the authenticated operator shell and shared navigation model.
- Establish the global quick-action and notification contract for communication-heavy workflows.
- Define the immutable activity event structure used across all Phase 1 features.
- Standardize design tokens, badges, drawers, and tables for consistent implementation.
- Encode department-scoped access rules that every screen must obey.
- Define installable PWA shell behavior for mobile and tablet operators in Phase 2.

---

## Non-Goals

- This spec does not define sign-in, password reset, or identity-provider implementation details.
- It does not define the full content of individual screens such as Dashboard or Contacts.
- It does not finalize a specific VOIP vendor selection.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Platform Administrator (PA) | Uses global access across departments and sees all admin tools |
| Department Owner (OW) | Uses the shared shell to work across contacts, pipeline, and communications |
| Insurance Agent (IA) | Uses department-scoped quick actions and communication workflows |
| Mortgage Liaison (ML) | Uses the shell with mortgage-specific write restrictions |
| Real Estate Agent (RA) | Uses the shell for lead management and customer communication |

---

## User Scenarios

### Scenario 1 - Operator lands in the CRM after sign-in

**Actor**: Department Owner
**Precondition**: The operator has an active authenticated session.
**Flow**:
1. The CRM resolves the operator's identity, department context, and unread notification state.
2. The sidebar renders grouped navigation for Main, Communications, Departments, and Tools & Admin.
3. The sticky top bar shows search, quick actions, notification bell, and user chip.
4. The content area loads the operator's default landing screen.

**Success**: The operator understands where to act next and can reach any core workflow without hunting for controls.

---

### Scenario 2 - Operator launches a communication action from anywhere

**Actor**: Real Estate Agent
**Precondition**: The operator is working in the CRM on any Phase 1 screen.
**Flow**:
1. The operator clicks a top-bar quick action such as Dial, SMS, or Email.
2. The CRM opens the relevant drawer or compose surface without losing the current page context.
3. The action inherits the active contact if one is already selected, otherwise it prompts for contact selection.

**Success**: Communication actions are available globally and behave consistently across screens.

---

### Scenario 3 - A portal intake event appears inside the CRM

**Actor**: Platform Administrator
**Precondition**: A client portal submission has created or enriched a CRM contact.
**Flow**:
1. The CRM receives the intake event from the portal bridge.
2. A notification appears in the shell and the activity contract records the event.
3. The assigned internal user can open the contact or lead directly from the notification surface.

**Success**: Portal-created work enters the CRM as a first-class operational event rather than a hidden integration side effect.

---

## Functional Requirements

### FR-00-01 - Authenticated Session Context

The CRM must provide every screen with a shared session context containing operator identity, role, department access, unread notification count, and active organization ownership metadata.

### FR-00-02 - Sidebar Navigation Groups

The shell must group navigation into Main, Communications, Departments, and Tools & Admin so operators can predict where work belongs.

### FR-00-03 - Sticky Top Navigation

The top bar must remain visible while scrolling and expose global search, New Lead, Dial, SMS, Email, Meet, notifications, and user context.

### FR-00-04 - Quick Actions Preserve Context

Global quick actions must preserve the current page state and, when possible, carry the active contact into the new communication workflow.

### FR-00-05 - VOIP Status Bar

The shell must display a persistent communication-status surface that indicates recording/compliance state and provides access to the call log or current call state.

### FR-00-06 - Shared Design Tokens

All screens must use the same token system for brand colors, department colors, typography, spacing, badges, borders, and elevation.

### FR-00-07 - Department-Scoped Access

The shell must expose read visibility across departments while enforcing write restrictions by role and department assignment.

### FR-00-08 - Immutable Activity Contract

Every meaningful action in Phase 1 must be able to emit an activity event containing actor, entity, department, event type, timestamp, and optional compliance metadata.

### FR-00-09 - Notification Contract

The shell must support in-app notifications for intake events, lead transfers, new inbound communications, and integration failures.

### FR-00-10 - Standard Interaction Patterns

The CRM must standardize drawers, modals, confirmation prompts, and empty/error states so communication-heavy workflows behave consistently.

### FR-00-11 - Portal Bridge Visibility

Portal-created contacts and leads must be visibly marked as portal-originated inside the shell and activity history.

### FR-00-12 - PWA Installability and Mobile Shell

The CRM shell must define install prompt eligibility, installed-session behavior, and degraded offline messaging for supported mobile and tablet devices.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `session.user_id` | string | Current operator identifier |
| `session.role` | string | Operator role such as `OW`, `IA`, `RA`, `PA` |
| `session.department_access` | array | Departments the operator can write to |
| `session.organization` | string | Platform owner entity |
| `shell.active_route` | string | Current route identifier |
| `shell.unread_notifications` | number | Count of unread notifications |
| `shell.active_contact_id` | string | Selected contact context, if any |
| `activity_event` | object | Shared append-only event payload |
| `notification_event` | object | Shared notification payload |

---

## Edge Cases & Error States

- **Session expires mid-workflow**: The CRM preserves recoverable draft state and redirects to re-authentication.
- **Operator lacks write access in a department**: The shell shows the workflow in read mode and blocks restricted actions.
- **VOIP provider unavailable**: Communication quick actions display degraded-state messaging without crashing the shell.
- **Portal intake arrives for an existing contact**: The shell surfaces a merge-safe notification rather than silently creating a duplicate.

---

## Assumptions

1. Authentication is shared with the Burkes portal ecosystem.
2. Portal intake events can be normalized into a contact-and-lead payload.
3. Notification and activity writing are synchronous enough to feel immediate for internal operators.

---

## Success Criteria

1. All Phase 1 screens share one shell, one token set, and one activity contract.
2. Operators can launch Dial, SMS, Email, and New Lead from any primary screen.
3. Role and department restrictions are visible and enforceable at the shell level.
4. Portal-originated work appears as a visible CRM notification and activity entry.
5. Eligible users can discover and install the CRM as a supported PWA shell in Phase 2.

---

## Open Questions

1. Which operators should be allowed to use Meet from Phase 1 versus later phases?
2. Should the default landing screen vary by role, or remain Dashboard for all operators?

---

## Dependencies

- **Depends on**: [constitution.md](../../memory/constitution.md)
- **Required by**: 001-dashboard, 002-contacts, 003-pipeline, 004-activities, 005-calendar, 006-calls, 007-sms, 008-email, 009-email-blast, 010-video-meetings, 011-insurance, 012-mortgage, 013-real-estate, 014-integrations, 015-reports, 016-admin-settings
