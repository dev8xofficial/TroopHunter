# Portal Architecture Overview

This document provides a high-level view of The Burkes Group Client Portal's architecture: how screens connect, how data flows, where roles intersect, and how the system supports the 11-stage transaction lifecycle.

---

## 🏗️ Architectural Principles

The portal is designed around these architectural principles:

1. **Single-Page Application (SPA)** — All 6 screens run in a single browser session; no full-page reloads
2. **Role-Based Data Isolation** — Each role sees and can modify only their own data; audit trails track all changes
3. **Event-Driven Audit Trail** — Every meaningful action (upload, signature, save) produces an immutable activity log entry
4. **Progressive State Disclosure** — Client sees only what's relevant to their current stage; complexity is hidden
5. **Graceful Incompleteness** — Incomplete forms don't lock UI; status badges and warnings guide the user forward
6. **Technology-Agnostic Specifications** — Architecture decisions defer implementation choices to planning phase

---

## 📱 Screen Architecture

The portal consists of **6 screens** sharing a common **Foundation** layer:

```
┌─────────────────────────────── FOUNDATION LAYER ───────────────────────────────┐
│                                                                                  │
│  • Authenticated Session Context (user identity, active transaction)             │
│  • Sticky Top Navigation (six nav buttons, notification bell, user chip)        │
│  • Design Token System (colors, typography, shadows, spacing)                   │
│  • Role Colour System (avatar colors per professional role)                     │
│  • Badge & Alert Systems (canonical status badges and warning banners)          │
│  • Global Activity Log (append-only audit trail visible to all roles)           │
│                                                                                  │
│  Screen-Level Metadata: Screen ID, Active Navigation State, Scroll Position    │
└──────────────────────────────────────────────────────────────────────────────────┘

┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ Dashboard  │  │ Documents  │  │ Messages   │  │ Insurance  │  │ Mortgage   │  │ Services   │
│    001     │  │    002     │  │    003     │  │    004     │  │    005     │  │    006     │
└────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘
     │               │               │               │               │               │
     │               │               │               │               │               │
     └───────────────┴───────────────┴───────────────┴───────────────┴───────────────┘
                                      │
                              ACTIVITY LOG (Write)
                              DOCUMENT REPOSITORY (Read/Write)
                              MESSAGE THREADS (Read/Write)
                              TRANSACTION DATA (Read)
```

---

## 🎯 Screen Responsibilities

### 001 — Dashboard

**Purpose**: Single authoritative overview of entire transaction status  
**Primary Users**: Client (read-only for all dashboard content)  
**Stage Focus**: All stages at a glance

**Key Components**:

- Outstanding Action Alert (top priority)
- Transaction Progress (11-stage timeline visual)
- Stats Grid (4 key metrics: docs pending, mortgage progress, insurance status, services booked)
- Mortgage Mini-Card (progress bar, key dates, lender info)
- Insurance Mini-Card (coverage status, agent contact)
- Activity Feed (last 6 events)
- Quick-Action Buttons (navigate to in-progress screens)
- Recent Documents (last 3 uploaded docs)
- Transaction Team Roster (agent, lender, attorney, CPA with avatars)

**Data Sources**:

- Transaction metadata (ID, property address, estimated close date)
- Document status summary (count pending signature, under review, approved)
- Mortgage application progress (current section, % complete)
- Insurance status (not-started, pending, completed)
- Activity log (last 6 events)
- Professional contact info (name, role, avatar color, contact method)

**Data Writes**: None (read-only)

---

### 002 — Documents

**Purpose**: Centralized repository for all transaction documents, organized by role and category  
**Primary Users**: All roles (upload, download, organize; signature workflow)  
**Stage Focus**: All stages; peaks at stages 4, 7, 10

**Key Components**:

- Search & Filter Bar (search by filename or category; filter by uploader role)
- Category Tabs (Purchase & Sale, Mortgage & Financial, Legal & Closing, Insurance, Other)
- Upload Zone (drag-to-upload, file browser, size/type validation)
- Document Table (filename, category, uploaded by [role + avatar], status badge, download/preview/sign actions)
- Signature Request Alert (documents awaiting client signature)
- Permissions Legend (colour-coded by uploader role)

**Data Sources**:

- Document metadata (filename, category, upload timestamp, uploader role, file size, file type)
- Document status (needs-signature, under-review, approved)
- Document content (stored externally; portal shows metadata only)
- Signature requests (which docs, deadline, status)

**Data Writes**:

- Upload document (client, agent, lender, attorney, cpa)
- Request signature (transaction coordinator, attorney)
- Sign document (client only)
- Delete document (not-yet-signed only; transaction coordinator override)
- Add document notes/metadata (transaction coordinator)

---

### 003 — Messages

**Purpose**: Secure, role-based communication channel between client and professionals  
**Primary Users**: All roles (client receives/sends; professionals send to individual threads)  
**Stage Focus**: All stages

**Key Components**:

- Thread Sidebar (list of active conversations by contact name/role)
- Active Thread Indicator (unread count, last message preview)
- Chat Window (chronological message history)
- Message Input (textarea, send button, attachment button)
- Attachment Support (link to Documents screen or embedded file preview)
- Typing Indicator (show when professional is typing)
- Announcements (broadcast messages from transaction coordinator)
- Message Timestamps & Read Status

**Data Sources**:

- Message threads (thread ID, participants, created-at, last-message-at)
- Message history (sender role, timestamp, text content, attachments)
- Unread status (per thread, per message)
- Participant info (name, role, avatar color)

**Data Writes**:

- Send message (all roles)
- Mark thread as read (all roles)
- Attach document (all roles, if permission to share)

---

### 004 — Insurance

**Purpose**: Collect and track homeowner, title, and home warranty insurance information  
**Primary Users**: Client (primary form filler; lender, TC view/request)  
**Stage Focus**: Stage 6 (Insurance Information & Documentation)

**Key Components**:

- Insurance Info Cards (Homeowner, Title, Warranty) — each: provider, agent, contact info, coverage dates
- Edit Forms (modal or inline; client fills, TC or lender can request update)
- Document Upload Zone (client uploads insurance documents)
- Uploaded Documents Table (files uploaded, status, download/delete)
- Task Progress (Insurance status badge: not-started, in-progress, completed)
- Professional Request Alerts ("Lender requested: Update homeowner insurance by Feb 15")

**Data Sources**:

- Insurance forms (provider, agent contact, coverage dates)
- Document list (uploaded insurance documents and status)
- Request history (who requested update, when, deadline)
- Form completion status

**Data Writes**:

- Fill insurance forms (client, TC can edit as admin)
- Upload insurance document (client)
- Request update (lender, TC, attorney)
- Approve/reject forms (lender, TC)

---

### 005 — Mortgage

**Purpose**: Track mortgage application progress, pre-approval, underwriting, and document requirements  
**Primary Users**: Client (provides data), Lender (updates progress)  
**Stage Focus**: Stage 5 (Mortgage Application & Pre-Approval) and Stage 9 (Underwriting & Final Approval)

**Key Components**:

- Progress Overview (section completion: application form, financial docs, pre-approval, underwriting)
- Application Form Sections (personal info, employment, assets, liabilities — client submission)
- Document Checklist (which financial docs lender requires; what's been uploaded)
- Pre-Approval Status Card (approved/conditional/denied, amount, rate lock date)
- Underwriting Status (submitted, in-review, conditional approval, final approval)
- Lender Info Card (lender name, loan officer contact, rate, closing cost estimate)
- Uploaded Documents (financial docs, bank statements, pay stubs, tax returns)
- Conditional Approval Request Alerts ("Lender requests updated pay stubs by Feb 10")

**Data Sources**:

- Mortgage application form data (borrower info, employment, assets, liabilities)
- Financial documents (bank statements, pay stubs, tax returns, credit report)
- Pre-approval letter (status, amount, rate, lock date)
- Underwriting status (submitted-at, current-decision, conditions-list, estimated-completion)
- Required documents checklist (document type, required, submitted, approved)

**Data Writes**:

- Complete application sections (client)
- Upload financial documents (client)
- Update pre-approval status (lender)
- Submit to underwriting (lender)
- Update underwriting conditions (lender)
- Request document updates (lender)

---

### 006 — Services

**Purpose**: Directory and task list for optional partner services (inspectors, appraisers, movers, utilities)  
**Primary Users**: Agent (recommends/books), Client (views/schedules)  
**Stage Focus**: Stage 8 (Home Inspection & Appraisal) and beyond

**Key Components**:

- Location Context (property address, coordinates for service lookup)
- Service Category Cards (Home Inspector, Appraiser, Utilities, Movers, Title Company)
- Recommended Partners (agent's preferred providers, ratings, contact info)
- Service Booking UI (pick provider, select date/time, confirm booking)
- Service Status Timeline (scheduled, in-progress, completed, results available)
- Inspector Reports (embedded if available, or link to external report)
- Task Checklist (which services completed, which optional)

**Data Sources**:

- Service directory (provider name, contact, category, ratings, location)
- Agent recommendations (preferred providers per service type)
- Scheduled services (date, time, provider, status)
- Service results (completed-at, report-url, notes)
- Optional vs required service status

**Data Writes**:

- Schedule service (client)
- Book service (agent, TC)
- Update service status (service provider, agent, TC)
- Upload service results (service provider, agent)
- Cancel service (client, agent, TC)

---

## 🔄 Data Flow

### Scenario 1: Client Uploads Insurance Document

```
Client Action (Insurance Screen)
    │
    └─► File Upload Handler
         │
         ├─► Validate file (type, size ≤ 20 MB)
         │
         ├─► Write Document Metadata
         │   ├─ document_id (auto-generated)
         │   ├─ upload_timestamp
         │   ├─ uploader_role = "client"
         │   ├─ document_status = "under-review"
         │   └─ category = "insurance"
         │
         ├─► Write Activity Log Entry
         │   ├─ label = "📄 Insurance Document Uploaded"
         │   ├─ actor_role = "client"
         │   ├─ timestamp = now
         │   ├─ description = "filename.pdf"
         │   └─ metadata = {document_category: "insurance"}
         │
         ├─► Update Insurance Screen
         │   └─ New file appears in "Uploaded Documents" table
         │
         ├─► Update Dashboard
         │   └─ Activity feed shows new entry; document count updates
         │
         └─► Notify Professionals
             └─ Lender, Attorney, TC receive activity notification
```

### Scenario 2: Lender Updates Mortgage Pre-Approval Status

```
Lender Action (via Admin Portal or API)
    │
    └─► Update Pre-Approval Record
         │
         ├─► Write Mortgage Data
         │   ├─ pre_approval_status = "approved"
         │   ├─ loan_amount = 400000
         │   ├─ interest_rate = 6.5
         │   ├─ rate_lock_date = 2026-05-10
         │   └─ updated_at = now
         │
         ├─► Write Activity Log Entry
         │   ├─ label = "✅ Mortgage Pre-Approval Granted"
         │   ├─ actor_role = "lender"
         │   ├─ timestamp = now
         │   ├─ description = "Pre-approved for $400,000"
         │   └─ metadata = {loan_amount: 400000, rate: 6.5}
         │
         ├─► Update Dashboard
         │   ├─ Mortgage mini-card shows "Approved" badge
         │   ├─ Stats grid shows mortgage progress = 50%
         │   └─ Activity feed shows new entry
         │
         ├─► Update Mortgage Screen
         │   └─ Pre-approval card updates with new status/amount
         │
         └─► Notify Client
             └─ Activity notification appears; client sees progress
```

### Scenario 3: Client Sends Message with Document Attachment

```
Client Action (Messages Screen)
    │
    └─► Compose Message
         │
         ├─► Attach Document
         │   ├─ Fetch document metadata from Documents screen
         │   ├─ Embed document link in message metadata
         │   └─ Display preview in compose area
         │
         ├─► Send Message
         │   │
         │   ├─► Write Message Record
         │   │   ├─ message_id
         │   │   ├─ thread_id
         │   │   ├─ sender_role = "client"
         │   │   ├─ content = message text
         │   │   ├─ attachments = [document_id]
         │   │   ├─ timestamp = now
         │   │   └─ read_status = false (for recipient)
         │   │
         │   ├─► Update Thread Metadata
         │   │   ├─ last_message_at = now
         │   │   └─ last_message_preview = first 50 chars
         │   │
         │   ├─► Write Activity Log Entry
         │   │   ├─ label = "💬 Message Sent"
         │   │   ├─ actor_role = "client"
         │   │   ├─ description = "Sent message to [professional]"
         │   │   └─ metadata = {thread_id, attachment_count: 1}
         │   │
         │   ├─► Update Messages Screen
         │   │   ├─ New message appears in chat
         │   │   ├─ Message timestamp and read status
         │   │   └─ Document preview in message thread
         │   │
         │   └─► Notify Recipient
         │       └─ Message notification in sidebar; unread indicator
         │
         └─► Update Dashboard
             └─ Activity feed shows message sent
```

---

## 🗂️ Core Data Model (Conceptual)

The portal manages these primary entities:

### Transaction

```
{
  transaction_id: string (unique identifier)
  client_name: string
  property_address: string
  purchase_price: number (USD)
  estimated_close_date: date
  current_stage: enum (1-11)
  stage_statuses: { stage_num: status }
  created_at: datetime
  updated_at: datetime
}
```

### Document

```
{
  document_id: string
  transaction_id: string
  category: enum (purchase-sale, mortgage-financial, legal-closing, insurance, other)
  filename: string
  file_size: number (bytes)
  file_type: string (pdf, docx, jpg, etc.)
  uploader_role: enum (client, agent, lender, attorney, cpa, tc)
  document_status: enum (needs-signature, under-review, approved)
  upload_timestamp: datetime
  signature_deadline: datetime (if needs-signature)
  signature_timestamp: datetime (if signed)
  notes: string (optional)
}
```

### Activity

```
{
  activity_id: string
  transaction_id: string
  timestamp: datetime
  actor_role: enum (client, agent, lender, attorney, cpa, tc)
  label: string (max 80 chars, e.g., "📄 Document Uploaded")
  icon: enum (from design system)
  description: string (max 200 chars)
  metadata: object (context-specific data, e.g., {document_id, filename})
}
```

### Message

```
{
  message_id: string
  thread_id: string
  transaction_id: string
  sender_role: enum (client, agent, lender, attorney, cpa, tc)
  timestamp: datetime
  content: string
  attachments: [document_id] (optional)
  read_by: { role: datetime_read } (tracks who's read it)
}
```

### MessageThread

```
{
  thread_id: string
  transaction_id: string
  participants: [role] (e.g., [client, lender])
  created_at: datetime
  last_message_at: datetime
  unread_count: number (per role)
}
```

---

## 🔐 Access Control & Data Isolation

Each role has specific read/write permissions:

| Entity               | Client | Agent | Lender | Attorney | CPA | TC  |
| -------------------- | ------ | ----- | ------ | -------- | --- | --- |
| Transaction metadata | R      | R     | R      | R        | R   | R   |
| Documents (own)      | R/W    | R/W   | R/W    | R/W      | R   | R   |
| Documents (others')  | R      | R     | R      | R        | R   | R   |
| Activity log         | R      | R     | R      | R        | R   | R   |
| Insurance form       | R/W    | -     | R      | -        | R   | R   |
| Mortgage form        | R/W    | -     | R/W    | -        | -   | R   |
| Messages             | R/W    | R/W   | R/W    | R/W      | R/W | R/W |
| Settings             | -      | -     | -      | -        | -   | R/W |

**Legend**: R = Read, W = Write, R/W = Read + Write, - = No access

---

## 📡 Integration Points

### With External Systems

1. **Authentication Provider**
   - Portal receives authenticated user context
   - Session token validates all API requests
   - Sign-out clears session

2. **Lender Portal (Loan Management System)**
   - Mortgage application data may sync bidirectionally
   - Pre-approval status updates trigger portal activity log
   - Document requirements flow from lender to Document screen

3. \*\*Document Storage (Cloud)
   - Portal stores document metadata only
   - Actual files stored in external cloud storage (S3, Google Drive, etc.)
   - Portal generates secure download/preview links

4. **Email/Notification System**
   - Document signature requests sent via email
   - Professional notifications (new message, document uploaded)
   - Conditional approval alerts

5. **Service Provider Directory**
   - Services screen integrates with partner directory
   - Inspector/appraiser booking is either via portal or external link

---

## 🔄 State Transitions & Workflows

### Transaction Lifecycle (11 Stages)

```
Stage 1: Initial Consultation
    ↓ (consultant identifies property)
Stage 2: Property Search & Selection
    ↓ (client selects property)
Stage 3: Offer Submitted & Accepted
    ↓ (offer accepted)
Stage 4: Under Contract — Document Collection
    ↓ (documents gathered)
Stage 5: Mortgage Application & Pre-Approval
    ↓ (pre-approval obtained)
Stage 6: Insurance Information & Documentation
    ↓ (insurance info collected)
Stage 7: Attorney & Title Company Review
    ↓ (legal review completed)
Stage 8: Home Inspection & Appraisal
    ↓ (inspection/appraisal done)
Stage 9: Mortgage Underwriting & Final Approval
    ↓ (final approval obtained)
Stage 10: Final Walkthrough & Document Signing
    ↓ (documents signed)
Stage 11: Closing Day
    ↓ (transaction closed)
[END]
```

### Document Status Lifecycle

```
[NOT UPLOADED]
    ↓ (uploaded by client/professional)
UNDER REVIEW
    ↓ (requires signature)
NEEDS SIGNATURE
    ↓ (client signs)
APPROVED
    [END]
```

---

## 📊 Performance & Scale Targets

| Metric                           | Target      |
| -------------------------------- | ----------- |
| Page load time                   | < 2 seconds |
| Screen navigation                | < 200 ms    |
| Document upload (10 MB)          | < 5 seconds |
| Activity log append              | < 500 ms    |
| Message send                     | < 1 second  |
| Search / filter response         | < 500 ms    |
| Concurrent users per transaction | 6–10        |
| Transactions per portal instance | 1,000–5,000 |
| Total documents per transaction  | 50–200      |

---

## 🚀 Future Extensibility

The architecture supports future additions:

- **Additional Screens** (e.g., 007-closing-checklist, 008-post-closing)
- **New Roles** (e.g., title company rep, inspector)
- **Advanced Workflows** (e.g., task delegations, workflow approvals)
- **Analytics & Reporting** (portal usage, stage completion times)
- **Mobile App** (responsive portal or native app consuming same APIs)
- **API Access** (professionals can access portal data programmatically)

---

**Version**: 1.0  
**Last Updated**: April 10, 2026  
**Authority**: Product Architecture Team
