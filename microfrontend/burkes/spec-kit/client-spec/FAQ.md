# Frequently Asked Questions (FAQ)

---

## About the Spec-Kit & Process

### Q: What is the difference between a Spec, a Plan, and Tasks?

**A:**

- **Spec** (spec.md) answers "WHAT does the user do?" and "WHY?" It's user-centric, technology-agnostic, and defines requirements and success criteria.
- **Plan** (plan.md) answers "HOW do we build it?" It translates specs into technical architecture: components, phases, data design, integration points.
- **Tasks** (tasks.md) answers "WHO does what?" It breaks the plan into granular, assignable work items with acceptance criteria and dependencies.

**Example**:

- Spec says: "Client can upload an insurance document"
- Plan says: "UI component for drag-drop upload, validation service for file type/size, Document API endpoint for storage"
- Task says: "Build drag-drop upload zone component; validate PDF/JPG ≤ 20 MB; wire up to upload API"

---

### Q: Do I have to follow the templates exactly?

**A:**
Templates exist to ensure consistency and completeness. However:

- ✅ **Must include** all required sections (Overview, Goals, Functional Requirements, etc.)
- ✅ **May expand** sections if needed (break FR into sub-bullets, add more scenarios)
- ❌ **Don't remove** required sections or required fields (Status, Created date, Dependencies, etc.)

If a template doesn't fit your spec, flag this in a GitHub issue and propose a change to the template.

---

### Q: Who approves specs, and what's the process?

**A:**

1. **Product (PM/Designer)** writes the spec in a branch
2. **Product lead** reviews for clarity, business value, and alignment with constitution
3. **Technical architect** reviews for feasibility, consistency with existing specs, and data model compliance
4. **Both approve** → Status moves to "Approved"
5. Spec is merged to main

See [GOVERNANCE.md](GOVERNANCE.md) for detailed approval process and SLOs.

---

### Q: Can I propose changes to an existing spec?

**A:**
Yes. Open an issue using the [spec-update.md](.github/ISSUE_TEMPLATE/spec-update.md) template. Describe:

- Which spec and which section
- What should change and why
- Proposed new language (if applicable)

Product lead will triage and assign for updating. Spec version bumps accordingly (major, minor, or patch).

---

## Writing & Terminology

### Q: What's the difference between a "User Scenario" and an "Acceptance Criterion"?

**A:**

- **User Scenario** (in spec) is a narrative walkthrough of a complete flow. Example: "Client uploads insurance document, sees it in table, gets activity notification." Scenarios help everyone visualize the feature in action.
- **Acceptance Criterion** (in tasks) is a testable condition that must be true for a task to be "done." Example: "Document appears in table within 2 seconds" or "Activity log entry created with timestamp."

Scenarios are exploratory; acceptance criteria are verification points.

---

### Q: Should I include technical details (database, API, framework) in my spec?

**A:**
No. Specs are technology-agnostic. They define _what_ and _why_, not _how_.

❌ **Don't write**: "Store document metadata in PostgreSQL documents table with UUID primary key."
✅ **Do write**: "System stores document metadata (filename, upload timestamp, category, status) and makes it queryable by category and date range."

Implementation details belong in the **plan.md**, not the spec.

---

### Q: How do I reference canonical field names?

**A:**
All canonical field names are defined in [constitution.md](/.specify/memory/constitution.md) → Section 5: Global Data Vocabulary.

In specs, reference them in backticks with their canonical name, e.g.:

- `` `transaction_id` ``
- `` `document_status` ``
- `` `application_section_status` ``

Never invent new field names. If you need a field that doesn't exist, propose it in the constitution before the spec is approved.

---

## Portal Design & Terminology

### Q: What's the difference between a "Badge" and an "Alert Banner"?

**A:**

- **Badge**: Small, coloured label (6–12px, fits inline). Used to mark status on individual items. Example: "Approved" badge next to a document filename.
- **Alert Banner**: Large box (full width or near-full width) with left colour bar. Takes up the flow to announce important information. Example: "⚠️ Signature Required" banner at top of Documents screen.

See [Foundation spec](/.specify/specs/000-foundation/spec.md) for canonical badge colours and alert styles.

---

### Q: What does "Progressive Disclosure" mean?

**A:**
Showing the user complexity only when it's relevant.

Example: On the Mortgage screen, show only the _current_ section (Personal Info). Once completed, that section collapses. The user navigates forward and sees the next section (Employment Info). This way, a 10-section mortgage app doesn't feel overwhelming—the user sees 1 section at a time.

It's different from "hiding" features; the complexity is still there, but revealed progressively.

---

### Q: What does "Graceful Incompleteness" mean?

**A:**
Allowing users to navigate freely and return later without data blocking their progress.

Example: Client starts filling out Mortgage Application but doesn't finish. Without Graceful Incompleteness, the portal would lock navigation (hard error). With Graceful Incompleteness, the client can:

- Navigate to other screens
- Return to Mortgage later
- See a yellow "In Progress" badge indicating incomplete state

The portal never says "you can't go there until you finish this."

---

### Q: How many roles are there, and what can each do?

**A:**
**6 roles** with distinct permissions:

| Role     | Uploads               | Messages  | Edits Forms | Admin |
| -------- | --------------------- | --------- | ----------- | ----- |
| Client   | Insurance, financials | Yes       | Own forms   | No    |
| Agent    | Purchase docs         | Yes       | No          | No    |
| Lender   | Mortgage, financials  | Yes       | No          | No    |
| Attorney | Legal, closing        | Yes       | No          | No    |
| CPA      | Read-only             | Yes       | No          | No    |
| TC       | All                   | Broadcast | Yes (all)   | Yes   |

Full details in [GLOSSARY.md](GLOSSARY.md).

---

### Q: What's the 11-stage transaction lifecycle?

**A:**

1. Initial Consultation
2. Property Search & Selection
3. Offer Submitted & Accepted
4. Under Contract — Document Collection
5. Mortgage Application & Pre-Approval
6. Insurance Information & Documentation
7. Attorney & Title Company Review
8. Home Inspection & Appraisal
9. Mortgage Underwriting & Final Approval
10. Final Walkthrough & Document Signing
11. Closing Day

See [constitution.md](/.specify/memory/constitution.md) → Section 4 for full definitions and status variants.

---

## Portal Functionality

### Q: Can the client see other clients' data?

**A:**
No. Each transaction is isolated. Clients always see only their own transaction data:

- Their documents
- Their messages (with their professionals)
- Their activity log
- Their mortgage/insurance info

Professionals (agent, lender, etc.) may work with multiple transactions and can see data from transactions they're assigned to.

---

### Q: Can the client edit documents uploaded by the lender?

**A:**
No. Each role owns their uploaded documents. Clients can:

- ✅ Download/preview lender documents
- ❌ Edit or delete lender-uploaded documents

Only the originating role (or TC as admin) can delete or modify uploads. All changes are audit-logged.

---

### Q: What happens if a document needs signature?

**A:**

1. Attorney or TC uploadsthe document and marks it `needs-signature`
2. Client sees a signature request alert with deadline
3. Client clicks "Sign" button (implementation detail: portal may open signing tool or request confirmation)
4. Document status changes to `approved` or `signed`
5. Activity log shows "Document Signed"
6. Signature deadline is cleared

See [002-documents spec](/.specify/specs/002-documents/spec.md) for full signature workflow.

---

### Q: Can clients and professionals message each other?

**A:**
Yes, but with **separate threads per role**:

- Client ↔️ Agent (one thread, they message each other)
- Client ↔️ Lender (separate thread)
- Client ↔️ Attorney (separate thread)
- etc.

This keeps conversations focused and prevents confusion (e.g., lender doesn't see messages to agent). Professionals don't message each other directly in the portal; they use their own systems.

---

### Q: Can the client attach documents to messages?

**A:**
Yes. Messages can reference documents from the client's portal. The system embeds a link or preview so the recipient can access the document without leaving the message thread.

---

### Q: What's the 11-stage timeline on the Dashboard?

**A:**
A visual progress tracker showing all 11 stages:

- ✅ **Completed stages**: Blue checkmark
- 🟨 **Current stage**: Yellow highlight
- ⚪ **Future stages**: Greyed out

Helps the client visualize where they are in the process and what's ahead. Stages update as professionals mark them complete.

---

## Technical Questions

### Q: What happens if the client's browser goes offline?

**A:**
This is an implementation detail (deferred to plan.md), but the spec ensures:

- User data is saved before submission
- Error messages are clear (e.g., "Connection lost; click Retry")
- No data is lost due to connectivity issues

---

### Q: Is the portal mobile-responsive?

**A:**
Yes. The Foundation spec defines responsive breakpoints:

- Full layout: ≥ 1100 px
- Tablet: 768–1099 px (2-column → 1-column layout)
- Mobile: < 768 px (1-column, stacked)

See [000-foundation spec](/.specify/specs/000-foundation/spec.md) for responsive design details.

---

### Q: How fast should the portal be?

**A:**
Performance targets are in [ARCHITECTURE.md](ARCHITECTURE.md):

- Page load: < 2 seconds
- Screen navigation: < 200 ms
- Document upload (10 MB): < 5 seconds
- Message send: < 1 second

---

### Q: Can professionals see the portal's activity log?

**A:**
Yes, but **only for their transaction**. A lender can see the activity log for transactions they're assigned to, but not transactions they're not part of.

---

## Contributing & Reviews

### Q: How do I propose a new feature spec?

**A:**

1. Open an issue using [spec-new.md](.github/ISSUE_TEMPLATE/spec-new.md)
2. Describe the feature, user problem, and why it matters
3. Product lead triages and may ask clarifying questions
4. Once approved, create a feature branch
5. Use the `/speckit.specify` command to scaffold the spec
6. Write the spec, get reviewed, merge

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

---

### Q: How long does spec review take?

**A:**
SLA: 2 business days for product lead, 2 business days for tech lead (can overlap). See [GOVERNANCE.md](GOVERNANCE.md) for full SLO details.

---

### Q: What if my spec is rejected?

**A:**
Reviewers will provide specific feedback on why (clarity, consistency, scope, feasibility, etc.). You revise, they re-review, and iterate until approved or you decide to close.

---

### Q: Can I work on multiple specs in parallel?

**A:**
Yes. Each spec is in its own branch, so multiple people can draft different specs simultaneously. Just ensure feature IDs don't collide (auto-numbering in `/speckit.specify` prevents this).

---

## General Questions

### Q: Where do I find inspiration for writing specs?

**A:**

- **Look at existing specs** (001–006) for structure and tone
- **Reference STANDARDS.md** for writing guidelines
- **Check ARCHITECTURE.md** for context on how your feature fits
- **Read the constitution** to understand principles and roles
- **Check example specs** (this repo has several fully fleshed-out specs)

---

### Q: How often do specs change?

**A:**
Specs evolve as products do. Frequently:

- Minor updates (clarifications, new edge cases)
- Occasional major updates (new requirements discovered post-launch)

All changes are versioned in `changelog.md` and tracked as "Approved" spec updates.

---

### Q: Who is the spec-kit for?

**A:**

- **Product managers** — Clarify and capture feature ideas
- **Designers** — Understand requirements and constraints
- **Architects** — Plan technical implementation
- **Developers** — Implement features with precise acceptance criteria
- **QA** — Test against defined scenarios and edge cases
- **New team members** — Onboard into product vision and standard practices

---

### Q: Can I suggest improvements to the spec-kit itself?

**A:**
Absolutely. Open an issue or PR proposing changes to:

- Templates
- Standards
- Process
- Documentation

(These are "meta" specs—for the spec-kit itself, not portal features.)

---

**Can't find an answer?**

- Check [GLOSSARY.md](GLOSSARY.md) for terminology
- See [CONTRIBUTING.md](CONTRIBUTING.md) for process details
- Review [GOVERNANCE.md](GOVERNANCE.md) for approval gates
- Open a question issue via [.github/ISSUE_TEMPLATE/question.md](.github/ISSUE_TEMPLATE/question.md)

---

**Version**: 1.0  
**Last Updated**: April 10, 2026
