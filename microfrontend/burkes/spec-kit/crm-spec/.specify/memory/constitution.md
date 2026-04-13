# Project Constitution - The Burkes Group CRM Platform

**Version**: 1.0
**Last Updated**: 2026-04-13
**Scope**: All artifacts under `.specify/`, root contracts, and screen definitions

---

## 1. Product Identity

**Product Name**: The Burkes Group CRM Platform
**Platform Owner**: Burkes Group Marketing LLC
**Primary Users**: Department owners, insurance agents, mortgage liaisons, real estate agents, and platform administrators
**Product Scope**: Internal CRM for communications, contact management, pipeline tracking, compliance recording, and cross-system orchestration with the Burkes portal layer

---

## 2. Core Principles

### P-01 - Operator-First Clarity

Every primary screen must answer "What do I need to act on right now?" within 60 seconds.

### P-02 - Single Source of Truth

The CRM is the authoritative customer record for internal operations. External tools may remain providers of communication transport or specialized workflows, but not the canonical owner of customer state.

### P-03 - Unified Customer Record

A customer exists once. Departments enrich the same contact rather than creating parallel records.

### P-04 - Department-Scoped Access

Cross-department read access is allowed by default for internal operators. Create, edit, reassignment, and compliance actions are scoped by role and department.

### P-05 - Compliance by Default

Consent capture, retention tagging, and activity logging are automatic platform behaviors, not optional operator choices.

### P-06 - Progressive Disclosure

Complex workflows such as new lead creation, transfer, and communication composition use guided drawers, modals, or step-based forms rather than dense single-surface data entry.

### P-07 - Graceful Incompleteness

Minimal contacts are allowed. Missing information is surfaced through badges, prompts, and queues instead of blocking the workflow outright.

### P-08 - Technology-Agnostic Specs

Feature specifications describe the operator experience and business rules, not implementation frameworks.

### P-09 - Audit-Visible Activity

Every meaningful state change produces a visible, immutable activity entry tied to actor, timestamp, and affected entity.

### P-10 - SaaS-Ready Architecture

Phase 1 serves Burkes Group only, but contracts and data models must not block future tenant isolation, white-labeling, or subscription packaging.

---

## 3. Operating Departments

| Department | Code | Color Token | Primary Need | Key Constraint |
| --- | --- | --- | --- | --- |
| Insurance | `insurance` | `department.insurance` | Quote and policy lifecycle | 18-month call retention |
| Mortgage | `mortgage` | `department.mortgage` | Mortgage coordination with Arive | Arive remains required |
| Real Estate | `real_estate` | `department.real_estate` | Transaction and closing workflow | 4-year call retention |

---

## 4. Roles and Access Model

| Role | Abbrev | Read Access | Write Access | Transfer Leads | Admin Access |
| --- | --- | --- | --- | --- | --- |
| Department Owner | OW | All departments | Own department + approvals | Yes | Limited |
| Insurance Agent | IA | All departments | Insurance only | Yes | No |
| Mortgage Liaison | ML | All departments | Mortgage only | No | No |
| Real Estate Agent | RA | All departments | Real estate only | Yes | No |
| Platform Administrator | PA | All departments | All departments | Yes | Yes |

---

## 5. Canonical Pipeline Lifecycle

| Stage | Canonical Meaning | Real Estate | Insurance | Mortgage |
| --- | --- | --- | --- | --- |
| New Inquiry | Fresh intake awaiting first action | Buyer or seller lead | Prospect for quote | Pre-approval request |
| Contacted | First meaningful outreach completed | First contact made | Quote discussion opened | Lender introduction |
| Quoted / Offer | First commercial proposal exists | Offer submitted | Policy quoted | Pre-approval issued |
| Under Contract | Customer has committed to a formal process | Contract executed | - | Loan processing |
| Pending Close | Final approvals and closing steps are active | Closing scheduled | Policy bound | Clear to close |
| Closed | Work for the current motion is complete | Transaction closed | Policy issued | Loan funded |

---

## 6. Communication Pillars

Phase 1 always includes:

1. VOIP calling with recording support
2. Two-way SMS messaging
3. Outlook-linked email in and out

All other operational behavior is designed around these three channels.

---

## 7. Retention and Compliance Rules

| Data Type | Insurance | Mortgage | Real Estate |
| --- | --- | --- | --- |
| Customer record | Indefinite | Indefinite | Indefinite |
| Documents | 2-3 years | 2 years | 4 years |
| Call recordings | 18 months | 24 months | 4 years |
| Video meeting recordings | 90 days | 90 days | 90 days |
| Emails | Outlook-hosted | Outlook-hosted | Outlook-hosted |
| SMS metadata | Provider-hosted with CRM linkage | Provider-hosted with CRM linkage | Provider-hosted with CRM linkage |

---

## 8. Canonical Data Vocabulary

| Term | Meaning |
| --- | --- |
| `contact` | Unified customer profile |
| `lead` | Departmental commercial motion for a contact |
| `activity` | Immutable audit or communication event |
| `assigned_agent` | Current owner of departmental action |
| `source` | Intake origin such as portal, referral, import, manual |
| `consent` | Stored proof of communication and data-processing authorization |
| `recording_expires_at` | Calculated disposal date for a recording reference |
| `missing_data` | Derived state indicating required enrichment is incomplete |

---

## 9. Reference Users

| Name | Role | Department |
| --- | --- | --- |
| Jaquarian Bonilla | Department Owner | Insurance |
| Tom Burke | Department Owner | Real Estate |
| Platform Administrator | Platform Administrator | Shared |
| Mortgage Liaison | Mortgage Liaison | Mortgage |

---

## 10. Intake and Lead Ownership Rules

1. The first internal operator to create or accept a contact becomes the default primary owner for the originating department.
2. Departments may assign different owners for the same contact within their own workflows.
3. A transfer never deletes prior ownership history.
4. Portal intake creates a contact and a lead together unless the CRM matches to an existing active contact.

---

## 11. Guardrails

- Never describe mortgage and insurance teams as direct co-owners of customer data.
- Never treat the activity log as mutable.
- Never duplicate contacts to represent department context.
- Never block contact creation when only minimum intake data exists.
- Never make compliance toggles optional for call recording where the department requires it.

---

## 12. Phase 1 Definition of Ready

Phase 1 is ready to implement when the repository contains:

- approved specs for foundation, dashboard, contacts, pipeline, calls, SMS, and email
- implementation plans and task breakdowns for each Phase 1 feature
- schemas for contacts, leads, activities, users, and recordings
- contracts for API, RBAC, events, interactions, layout, and design tokens
- explicit CRM-to-portal intake behavior
