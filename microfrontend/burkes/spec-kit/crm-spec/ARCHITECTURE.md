# Architecture Overview - CRM Platform

This document describes the high-level architecture of The Burkes Group CRM Platform, the Phase 1 boundary, and the contracts that connect the CRM to the existing portal layer.

---

## 1. System Context

The CRM is the internal operational layer for Burkes Group staff. It serves insurance, mortgage, real estate, and platform administration users while sharing a backend API and data platform with the six external portals.

The architecture must satisfy four hard requirements:

1. One cumulative contact record across all departments
2. Compliance-safe communication capture for calls, SMS, and email
3. Department-scoped writes with cross-department visibility
4. SaaS-ready structure without forcing premature multi-tenant implementation complexity

---

## 2. Two-Layer Platform

```text
+---------------------------------------------------------------+
|                       CRM LAYER                               |
| Dashboard | Contacts | Pipeline | Calls | SMS | Email        |
| Operators: OW, IA, ML, RA, PA                                 |
+--------------------------+------------------------------------+
                           |
                           | Shared backend API + shared data model
                           v
+---------------------------------------------------------------+
|                     PORTAL LAYER                              |
| Main | Client | Agent | Attorney | Admin | Service Partner   |
| External users create, update, or consume customer context   |
+---------------------------------------------------------------+
```

The CRM owns the operational workflow. The portals contribute intake, document, note, and transaction context into the same customer data platform.

---

## 3. Phase 1 Capability Boundary

Phase 1 delivers the operational backbone required to replace Follow Up Boss and centralize day-to-day work.

### Included in Phase 1

| Capability | Primary Artifacts |
| --- | --- |
| Foundation, navigation, session shell, role model | `000-foundation`, `layout.yaml`, `design.tokens.yaml`, `access_control.yaml` |
| Executive dashboard | `001-dashboard`, `screens/dashboard.yaml` |
| Unified contacts and customer profile intake | `002-contacts`, `schemas/contact.schema.json`, `screens/contacts.yaml` |
| Shared pipeline and lead transfer | `003-pipeline`, `schemas/lead.schema.json`, `screens/pipeline.yaml` |
| VOIP calling and call recording | `006-calls`, `schemas/call-recording.schema.json`, `screens/calls.yaml` |
| SMS threads and conversation logging | `007-sms`, `events.yaml`, `screens/sms.yaml` |
| Outlook email inbox, compose, and auto-log | `008-email`, `api.yaml`, `screens/email.yaml` |
| CRM-to-portal intake bridge | `api.yaml`, `events.yaml`, `interactions.yaml`, `002-contacts` |

### Deferred beyond Phase 1

- Email blast campaigns
- Full activities screen
- Calendar screen and Google sync UI
- Insurance, mortgage, and real-estate dedicated workspaces
- Reports, integrations admin center, SaaS billing, white-labeling UI

---

## 4. Core Domains

### 4.1 Unified Contact Domain

The contact record is the platform's canonical customer profile. It begins with identity and consent, then accumulates department-specific data over time.

### 4.2 Lead and Pipeline Domain

Each contact can have one or more active departmental lead contexts. The CRM exposes a shared six-stage lifecycle while preserving department-specific interpretation of each stage.

### 4.3 Activity and Audit Domain

Every meaningful action creates an immutable activity event. Activities capture communication events, state changes, transfers, and uploads.

### 4.4 Communication Domain

Calls, SMS, and email form the primary communication layer. Each communication channel must:

- associate interactions to a contact
- create activity entries
- support compliance retention metadata
- expose actionable follow-up context inside the CRM

---

## 5. Data Flow

### 5.1 New Intake from a Portal

1. A client submits a form through the client-facing portal.
2. The portal sends a normalized intake payload to the CRM intake endpoint.
3. The CRM creates or matches a contact record.
4. The CRM creates a lead in `New Inquiry` for the relevant department(s).
5. Consent metadata is persisted at contact creation time.
6. The assigned internal users receive a notification and an activity entry.

### 5.2 Lead Transfer

1. An internal user selects `Transfer Lead`.
2. The CRM writes a transfer event and updates the assigned agent for the target department.
3. The previous owner remains visible in the activity trail.
4. The new owner receives an in-app notification and an Outlook-linked notification payload.

### 5.3 Communication Logging

1. Calls, SMS, or emails are initiated from inside the CRM or captured by a connected provider.
2. The communication is matched to a contact.
3. The CRM stores channel metadata and retention dates.
4. An immutable activity entry is appended to the contact timeline.

---

## 6. Integration Boundary

### Priority 1 integrations

| Integration | Role in Phase 1 | Contract Surface |
| --- | --- | --- |
| Microsoft Outlook | Email, calendar presence, notifications | `api.yaml`, `008-email`, `events.yaml` |
| VOIP provider | Calling, SMS, recording | `006-calls`, `007-sms`, `schemas/call-recording.schema.json` |
| Arive | Mortgage context lookup and pipeline linkage | `api.yaml`, `schemas/mortgage.schema.json` |
| Follow Up Boss | Contact migration import | `002-contacts`, `api.yaml` |

### Internal contracts

| Contract | Purpose |
| --- | --- |
| `access_control.yaml` | Role and department permission matrix |
| `api.yaml` | API resources and cross-system routes |
| `events.yaml` | Domain events for notifications and audit triggers |
| `interactions.yaml` | Modal, drawer, and confirmation flow definitions |

---

## 7. Security and Compliance Model

- Burkes Group Marketing LLC owns the platform and all customer data.
- Cross-department visibility is read-first; write authority is scoped by department role.
- Call recording retention is calculated per department context.
- Consent capture is mandatory for portal-created contacts.
- Email and SMS storage leverage external provider hosting where possible; the CRM stores metadata, linkage, and retrieval references.
- Activity history is append-only and must not support destructive edits in Phase 1.

---

## 8. SaaS Readiness Without Phase 1 Overreach

Phase 1 remains single-tenant for Burkes Group operations, but the architecture already separates:

- tenant ownership metadata
- role-based access control
- branded design tokens
- departmental data policies
- provider integration adapters

This allows future tenant onboarding without reworking the fundamental data model.

---

## 9. Phase 1 Exit Criteria

Phase 1 architecture is considered implementation-ready when:

1. The root contracts (`index.yaml`, `layout.yaml`, `design.tokens.yaml`, `api.yaml`, `access_control.yaml`, `events.yaml`, `interactions.yaml`) are complete and internally consistent.
2. The seven Phase 1 feature directories include approved specs, plans, tasks, and supporting artifacts.
3. Core schemas exist for contact, lead, activity, user, recording, and departmental sub-records.
4. The CRM-to-portal bridge is defined through intake APIs, events, and assignment rules.
5. Compliance retention logic is explicit for calls, documents, and recordings.

---

**Version**: 1.0
**Last Updated**: 2026-04-13
