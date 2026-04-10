# Glossary: Burkes Portal Terminology

This glossary defines business and technical terms used throughout the specification kit. Always reference this when writing or reviewing specs.

---

## 👥 Roles

**Client (Buyer / CL)**
The homebuyer purchasing a property. Primary portal user. Can upload insurance and financial documents, complete mortgage and insurance forms, receive and send messages, view activity and documents. Cannot edit other roles' data or manage portal settings.

**Real Estate Agent (AG)**
The agent representing the buyer in the transaction. Uploads purchase & sale documents, communicates with client, provides services directory recommendations. Cannot upload financial documents or edit mortgage forms.

**Mortgage Lender (LN)**
The lender providing financing. Uploads mortgage documents and financial requirements, communicates underwriting status, requests additional financial documents. Cannot access insurance forms or SSN-level data.

**Closing Attorney (AT)**
The attorney handling document review and closing. Uploads legal and closing documents, reviews and approves documents for signature, communicates closing details. Cannot access mortgage application internals.

**CPA / Tax Advisor (CP)**
Optional professional providing tax guidance. Has read-only access to documents and can message the client. Cannot upload documents or modify any data. Is marked in portal as advisory-only.

**Transaction Coordinator (TC)**
Portal administrator for the transaction. Can upload documents in any category, manage permissions, broadcast announcements, approve/reject documents, edit forms as needed. Own avatar color is gold with navy text to distinguish from other roles.

---

## 📋 Transaction & Lifecycle Concepts

**Transaction**
A single real estate purchase event, from initial consultation through closing day. Identified by `transaction_id`. All documents, messages, and activity logs are scoped to a transaction.

**Stage (or Lifecycle Stage)**
One of 11 sequential steps in the home purchase journey (Initial Consultation → Closing Day). Each transaction has a `current_stage` and status for each stage. Specs reference stages by number (1–11). See constitution for full list.

**Stage Status**
The state of a particular stage within a transaction: `pending`, `in-progress`, or `completed`. Not all stages have all statuses (determined per spec).

---

## 📄 Document Concepts

**Document Category**
How documents are organized on the Documents screen:

- **Purchase & Sale**: Offer, purchase agreement, disclosures
- **Mortgage & Financial**: Application, pre-approval, financial statements
- **Legal & Closing**: Deed, closing disclosure, title commitment
- **Insurance**: Homeowner, title, warranty
- **Other**: Miscellaneous

**Document Status**
The state of a document:

- `needs-signature` — Client must sign before moving forward
- `under-review` — Professional reviewing (lender, attorney, etc.)
- `approved` — Document is final and accepted

**Uploader Role**
The role that uploaded a document: `client`, `agent`, `lender`, `attorney`, `cpa`, `tc`. Used to colour-code document rows and control edit/delete permissions.

**Signature Request**
A formal request for the client to sign a document. Includes deadline and status (unsigned, signed, overdue). Can be issued by attorney or transaction coordinator.

---

## 💬 Message Concepts

**Thread (or Message Thread)**
A conversation between the client and one professional role (e.g., "Client ↔️ Lender"). Identified by `thread_id`. Separate threads exist for each professional role; client does not see threads between professionals. Participants: always include client; one other role (agent, lender, attorney, cpa, or tc).

**Unread Status**
Whether a message has been read by its recipient. Per-role. When recipient opens the thread, mark all messages as read.

**Announcement**
A broadcast message sent by transaction coordinator to all roles or specific roles. Appears in chat history but not as a separate notification. Different visual styling from regular messages.

**Typing Indicator**
Real-time indication that the other participant is composing a message (text + animated dots, e.g., "Lender is typing...").

---

## 🎨 Design System Concepts

**Badge**
A small colored label indicating status:

- `bdg-green` (#d1fae5 bg, #065f46 text): Complete / Approved
- `bdg-yellow` (#fef3c7 bg, #92400e text): Pending / In Progress
- `bdg-blue` (#dbeafe bg, #1e40af text): Action Required
- `bdg-red` (#fee2e2 bg, #991b1b text): Error / Overdue
- `bdg-gray` (neutral-100 bg, neutral-600 text): Not Started
- `bdg-navy` (#e0eaf1 bg, navy text): Informational

Reference by colour name, not hex code.

**Alert Banner**
A message box with left border:

- **Warning** (amber border): Action required; includes CTA button
- **Info** (blue border): Informational; no action required

**Card Component**
Standard white container with optional header, body padding, border, and shadow. Used for: stats, documents, form sections, activity items, etc.

**Design Token**
A named value (colour, typography, spacing, shadow) used consistently across the portal. Examples:

- Colour: `primary-navy`, `success-green`, `warning-orange`
- Typography: `font-display` (Archivo), `font-body` (Manrope)
- Shadow: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

Reference tokens by name in specs; never use raw hex values.

**Role Colour**
Avatar colour for each professional role:

- Agent: `#6366f1` (indigo)
- Lender: `#3b82f6` (blue)
- Attorney: `#7c3aed` (purple)
- CPA: `#059669` (emerald)
- TC: `#fdb913` (gold)
- Client: `#10b981` (green)

---

## ⚙️ Data & State Concepts

**Activity Log**
Append-only audit trail of all meaningful state changes. Each entry has: `actor_role`, `timestamp`, `label`, `icon`, `description`, `metadata`. Visible to all roles; client sees it on Dashboard. Cannot be deleted or edited.

**Application Section Status**
State of each section within a multi-section form (Mortgage, Insurance):

- `not-started` — User hasn't opened
- `in-progress` — User has started filling
- `complete` — User has submitted

**Session Context**
Authenticated user information available to all screens:

- Client name & initials
- Active transaction ID
- Client's role
- List of assigned professionals (name, role, avatar colour)

**Notification**
Passive alert in the notification bell; when clicked, shows a panel of recent notifications. Includes: message received, document uploaded, stage status changed, signature request, professional comment, etc.

---

## 🔒 Security & Audit Concepts

**Audit Trail**
Complete history of who did what and when. Enabled by:

- Activity log (visible actions)
- Document signature tracking (who signed, when, confirmation)
- Message timestamps and read status
- Form submission history (who filled, when, what changed)

**Role-Scoped Access**
Each role can read all shared data but can only modify their own data:

- Client writes insurance & mortgage forms, uploads personal documents
- Lender writes mortgage form, uploads financial documents
- Attorney writes legal documents, requests signatures
- No role can overwrite another role's uploaded documents without audit trail

**Data Ownership**
Each document, form section, and message has an owner (the uploading/creating role). Ownership controls who can delete or modify it.

---

## 🎯 UX & Interaction Concepts

**Progressive Disclosure**
Showing complexity only when relevant. Example: Mortgage screen shows only the current section; completed/future sections are collapsed. User doesn't see full form at once.

**Graceful Incompleteness**
Allowing the user to navigate freely even if data is incomplete. Incomplete state indicated via badges/banners, not hard locks. Example: Client can navigate away from an incomplete mortgage section; the section shows `in-progress` badge on Dashboard.

**Single Source of Truth (Portal)**
All transaction data lives in the portal. Clients should not need to check email, external lender portal, or attorney messages to know their status. Everything visible in portal.

**Client-First Clarity**
Every screen designed to answer "What do I need to do right now?" within 60 seconds. Outstanding actions highlighted at top; completed tasks collapsed.

---

## 🌐 Technical Vocabulary (Implementation-Agnostic)

**Port / Portal**
The web application as a whole. Referred to as "the portal" or "the Client Portal."

**Screen**
One of 6 main views (Dashboard, Documents, Messages, Insurance, Mortgage, Services). Tabs in top navigation.

**Section**
A subset of a screen, usually a card or form area. Example: "Mortgage Application section," "Insurance information section."

**Modal**
A dialog box that overlays the screen and requires dismissal. Used for: edit forms, confirmations, alerts.

**Form**
A collection of input fields for data entry. Can span one section or multiple sections. Examples: Insurance Info Form, Mortgage Application Form.

**Field (or Data Field)**
A single input within a form: text input, select dropdown, checkbox, date picker, etc. Example: `application_section_status`, `document_status`, `provider_name`.

**Dropdown / Select**
A form control for choosing one value from a predefined list. Often used for status fields, role selection, date ranges.

**Table / Data Table**
Tabular view of records (documents, messages, services). Columns are fields; rows are records. Has header row (bold, colour-coded), body rows, and hover effects.

**Input Validation**
Rules applied to user input: required vs optional, min/max length, email format, file size/type, etc. Defined in `validation-schema.json` for each feature.

---

## 📊 Measurement & Performance Concepts

**KPI (Key Performance Indicator)**
A measurable goal indicating success. Examples:

- "% of clients reach Mortgage screen within 24 hours of offer acceptance"
- "Average time to complete Insurance section: < 10 minutes"
- "% of documents signed within deadline"

**Success Criteria**
Observable outcomes that must be true for a spec to be "done." Defined in each spec. Example: "Client can complete mortgage application in under 30 minutes; 90% of clients complete without errors."

**Metric**
A measurable data point used to track KPIs. Examples: completion time, error rate, upload latency, screen load time.

**Latency**
Time it takes for an operation to complete. Examples: "Document upload latency < 5 sec", "Screen navigation latency < 200 ms".

---

## 🚀 Workflow & Process Concepts

**Spec-Driven Development (SDD)**
A development methodology where specifications are the source of truth, and code is generated from specs. Changes to requirements start in specs, not in code.

**Feature Specification**
A detailed description of what a feature does, who uses it, what workflows it supports, and what acceptance criteria define "done." Technology-agnostic.

**Implementation Plan**
A technical translation of a spec: architecture, phased delivery, data design, integration points. Bridges specs and development tasks.

**Developer Tasks**
Granular, assignable work items with acceptance criteria. Ordered by dependency (data → UI → integration → testing).

**Architecture Decision Record (ADR)**
A document explaining why a non-obvious design choice was made: context, decision, consequences, alternatives considered.

**Changelog**
Version history of a spec or the spec-kit. Documents what changed, when, and why. Enables tracing rationale over time.

---

## 🔗 Cross-Reference Format

When referencing vocabulary terms in specs, use inline definition or link:

✅ **Good**:

- "The client uploads an _insurance document_ (a PDF containing homeowner or title insurance information)."
- "Update the `document_status` field to "approved" (see Glossary for status values)."

✅ **Also Good**:

- "The document status badge (see Glossary: Badge) indicates the current state."

❌ **Avoid** (too vague):

- "Update the status." (which status? what values?)

---

**Version**: 1.0  
**Last Updated**: April 10, 2026  
**Authority**: Product Architecture Team

---

See also: [constitution.md](/.specify/memory/constitution.md) (canonical data field names, principles, timeline)
