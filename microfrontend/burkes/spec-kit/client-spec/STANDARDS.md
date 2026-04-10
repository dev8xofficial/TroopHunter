# Specification Writing Standards

This document defines writing standards for all specifications in the Burkes Client Portal spec-kit. Every spec must adhere to these standards to ensure consistency, clarity, and discoverability.

---

## 📐 Spec Structure & Format

All feature specifications must follow the structure defined in `.specify/templates/spec-template.md`:

1. **Metadata** (top of file)
   - Feature ID (e.g., `001-dashboard`)
   - Status (`Draft`, `Ready`, `Approved`)
   - Created date (YYYY-MM-DD)
   - Parent Spec (if applicable)
   - Screen / Module name

2. **Overview** (2–4 sentences)
   - What does this feature do?
   - Why does it exist?
   - Written for non-technical stakeholders

3. **Problem Statement**
   - What gap or friction does this address?
   - Specific to the screen/module

4. **Goals**
   - Measurable outcomes (3–5 goals)
   - User-facing or business outcomes

5. **Non-Goals**
   - What this spec explicitly does NOT cover
   - Related features deferred to other specs

6. **Actors**
   - Who participates in this feature?
   - Table: Actor | Role in Feature

7. **User Scenarios**
   - 2–4 scenarios covering main flows
   - Format: Actor, Precondition, Flow (numbered steps), Success (observable outcome)

8. **Functional Requirements**
   - Numbered requirements (FR-NN-XX)
   - Must be testable and unambiguous
   - Reference canonical data vocab from constitution

9. **Data & State**
   - Key fields this feature reads/writes
   - Table: Field Name | Type | Description
   - Always use canonical names from constitution

10. **Edge Cases & Error States**
    - Boundary conditions and failure modes
    - Expected behaviour in each case

11. **Assumptions**
    - What we're assuming to be true
    - Feature-specific assumptions (not global ones—those go in constitution)

12. **Success Criteria**
    - Measurable, user-facing outcomes
    - How do we know this spec is fully implemented?

13. **Open Questions**
    - Product decisions still needed
    - Dependencies on other decisions

14. **Dependencies**
    - Specs this feature depends on
    - Specs affected by this feature

---

## 🎨 Tone & Voice

Specifications should be written in **clear, precise, professional language**:

### ✅ DO

- Use active voice: "The client uploads their insurance document"
- Be specific: "The badge shows 'Pending Signature'" (not "The document needs something")
- Reference canonical terms: Use `document_status`, `application_section_status` (from constitution)
- Write for clarity: Prefer simple sentences over complex prose
- Use examples: "For example, an agent might upload a PDF of the Purchase Agreement"
- Number requirements: FR-01-01, FR-01-02, etc. (even if only 1 requirement)

### ❌ DON'T

- Use framework names or tech jargon: "React component", "API endpoint", "GraphQL query"
- Make vague statements: "The system should be fast" (use specific metrics in separate metrics.md)
- Assume implementation details: "Store in PostgreSQL", "Use JWT tokens"
- Mix roles and responsibilities: Each actor's action should be crystal clear
- Leave ambiguities: Every requirement must be testable

### Example: ✅ Good vs ❌ Bad

**❌ BAD**: "The dashboard displays the transaction status in real-time so users can see updates."

- Vague (what is "real-time"?), unclear (which updates?), implementation-aware (real-time suggests tech choice)

**✅ GOOD**: "The Dashboard displays a 6-item stage progress timeline showing: (1) completed stages (blue checkmark), (2) current stage (yellow highlight), (3) future stages (greyed). When a stage status changes (e.g., mortgage moves from 'in-progress' to 'completed'), the Dashboard updates within the same browser session without requiring a page reload."

- Specific outcomes, testable, technology-agnostic

---

## 📋 Naming Conventions

### Feature IDs

- Format: `NNN-short-name`
- Examples: `000-foundation`, `001-dashboard`, `002-documents`
- Fixed 3-digit prefix (000–999), auto-incremented per feature
- Hyphenated slug, lowercase, no spaces

### Functional Requirements

- Format: `FR-NN-XX`
- First `NN` = Feature ID (e.g., `01` for 001-dashboard)
- Second `XX` = Requirement number (e.g., `01`, `02`, `03`)
- Example: `FR-01-03` = Functional Requirement 3 of feature 001-dashboard

### File Names

- Feature spec: `spec.md` (per feature directory, never `spec-001.md`)
- Implementation plan: `plan.md`
- Developer tasks: `tasks.md`
- Supporting artifacts: `changelog.md`, `decisions.md`, `validation-schema.json`, `test-scenarios.md`, `rollout.md`, `metrics.md`, `risks.md`

### Data Field Names

- Use canonical names from constitution (e.g., `transaction_id`, `document_status`, `application_section_status`)
- Never invent new field names without first adding them to constitution
- Reference as backtick code: `` `transaction_id` ``

### Roles

- Client (Buyer): `Client` or `CL`
- Real Estate Agent: `Agent` or `AG`
- Mortgage Lender: `Lender` or `LN`
- Closing Attorney: `Attorney` or `AT`
- CPA / Tax Advisor: `CPA` or `CP`
- Transaction Coordinator: `Coordinator` or `TC`
- Always capitalize role names

---

## 🎯 Specification Completeness Checklist

Before marking a spec as `Ready` or `Approved`:

- [ ] Feature ID, Status, Created date are filled in
- [ ] Overview is 2–4 sentences and explains "what" and "why"
- [ ] Problem Statement is specific and user-centric
- [ ] Goals are measurable and user-facing
- [ ] Non-Goals explicitly scope what's excluded
- [ ] Actors table includes all participants
- [ ] At least 2 user scenarios with clear preconditions and success outcomes
- [ ] All functional requirements are numbered (FR-NN-XX format)
- [ ] Data fields use canonical names from constitution
- [ ] Edge cases cover failure modes and boundary conditions
- [ ] Assumptions are explicit and feature-specific
- [ ] Success criteria are measurable and testable
- [ ] Open questions are resolved before moving to "Approved" status
- [ ] Dependencies section lists blocking specs (if any)
- [ ] No framework, library, or database names appear anywhere
- [ ] No implementation details (e.g., "store in cache", "use JWT")
- [ ] All cross-references link to valid files
- [ ] Spec is signed off by Product (owner) and Architecture (tech lead)

---

## 📐 Tables & Formatting

### Actor Table

```markdown
| Actor  | Role in This Feature                                 |
| ------ | ---------------------------------------------------- |
| Client | Completes their insurance application; sees progress |
| Lender | Receives insurance info request; sends follow-up     |
```

### Data Table

```markdown
| Field              | Type     | Description                                           |
| ------------------ | -------- | ----------------------------------------------------- |
| `document_status`  | enum     | One of: `needs-signature`, `under-review`, `approved` |
| `upload_timestamp` | datetime | When the document was uploaded (ISO 8601)             |
```

### Dependency Table

```markdown
| Dependency     | Type         | Reason                                       |
| -------------- | ------------ | -------------------------------------------- |
| 000-foundation | Blocking     | Requires global nav and design tokens        |
| 002-documents  | Blocking     | Insurance uploads stream to Documents screen |
| 003-messages   | Non-blocking | Insurance reminders can trigger messages     |
```

---

## 🔗 Cross-References & Links

### Within Spec Files

- Reference requirements: "See **FR-01-02** for signature handling"
- Reference related specs: "Per [001-dashboard](../001-dashboard/spec.md), activity events must persist"
- Reference constitution: "Per the constitution, role colours use [canonical role color system](../../memory/constitution.md#role-colour-system)"

### Within Templates & Decisions

- Reference spec sections: "See [spec.md](./spec.md#functional-requirements) for full requirement list"
- Reference architecture: "See [ARCHITECTURE.md](../../ARCHITECTURE.md) for data flow diagram"

### Format

- Use relative paths for internal links
- Use Markdown links: `[Display Text](path/to/file.md)` or `[Display Text](path/to/file.md#anchor)`
- Avoid absolute URLs (`https://...`) unless linking externally

---

## 🗂️ Supporting Artifacts

Each feature spec should have 7 supporting files (in the same directory as `spec.md`):

1. **changelog.md** — Version history of this spec
   - Format: [v1.0] Created → [v1.1] Added FR-XX → [v1.2] Refined acceptance criteria
   - Use semantic versioning per-feature

2. **decisions.md** (or `adr/` subdirectory) — Architecture Decision Records
   - Format: Title | Context | Decision | Consequences | Alternatives
   - 1–3 key decisions specific to this feature

3. **validation-schema.json** — Data structures and validation rules
   - JSON Schema format
   - Define all data objects used by this feature
   - Include constraints (required fields, string length, enum values)

4. **test-scenarios.md** — Test matrix and edge cases
   - Test matrix: role × action × expected outcome
   - Edge cases: boundary conditions, error states
   - Data fixtures: sample transaction IDs, dates, document types for QA

5. **rollout.md** — Feature flag and phased release plan
   - Canary release strategy (e.g., "5% → 25% → 100%")
   - Feature flag name and default state
   - Metrics to monitor during rollout
   - Rollback criteria

6. **metrics.md** — Success KPIs and measurement
   - KPI definitions (e.g., "% clients reach Insurance screen within 48 hours")
   - How to measure (query, dashboard, tool)
   - Target value and alert threshold

7. **risks.md** — Risk register and mitigations
   - Risk condition, probability, impact, and mitigation strategy
   - Owner and review cadence

---

## ✅ Review Checklist (for Spec Reviewers)

Before approving a spec, reviewers should verify:

1. **Completeness**
   - All required sections present and filled
   - No TODOs or placeholders remaining
   - Open questions resolved

2. **Clarity**
   - Overview explains purpose in plain English
   - Requirements are specific and testable
   - No ambiguous pronouns ("it", "this")
   - Examples are provided where helpful

3. **Consistency**
   - Actor names match constitution
   - Data field names are canonical (from constitution)
   - Status badges reference canonical badge system
   - Functional requirements are properly numbered
   - Cross-references are valid and relative

4. **Scope**
   - Non-Goals section clearly excludes related features
   - Dependencies section is complete
   - Feature doesn't overlap with other specs

5. **Compliance**
   - No framework/database/API names
   - No implementation details
   - No assumptions about code structure
   - Adheres to principles (P-01 through P-07 from constitution)

6. **Governance**
   - Status field is appropriate
   - Dependencies are resolved (blocking specs are approved)
   - Signed off by product owner and tech lead

---

## 📝 Examples

### Well-Written Requirement

> **FR-01-03 — Activity Log Entry Schema**
>
> Every meaningful state change (document upload, form save, message sent, signature applied, stage status update) must append an entry to the activity log. Each entry must contain: `timestamp` (ISO 8601), `actor_role` (from canonical role list), `label` (human-readable action, max 80 chars), `icon` (emoji or icon code from design system), `description` (optional, max 200 chars), `metadata` (JSON object with context, e.g., `{document_name: "...", file_type: "..."}`). The entry must persist across browser sessions and be visible to the client immediately after the action completes.

**Why this is good**:

- Specific: Defines exactly what triggers an entry, what it contains
- Testable: Can verify each field exists with correct type and constraints
- No tech: Doesn't say "append to Postgres", "use UUID", etc.
- Clear: Defines constraints (max lengths, types)
- Traceable: References canonical terms (actor_role, icon from design system)

### Well-Written Scenario

> **Scenario: Client Uploads Insurance Document**
>
> **Actor**: Client  
> **Precondition**: Client is on the Insurance screen; insurance section shows status `not-started`  
> **Flow**:
>
> 1. Client clicks "Upload Insurance Document" button
> 2. Browser file picker opens
> 3. Client selects a PDF file (max 20 MB)
> 4. File upload begins; progress bar shows 0–100%
> 5. Upon completion, the file appears in the uploaded documents table with: filename, upload timestamp, status badge (`under-review`), and a delete button
> 6. An activity log entry is created: "📄 Insurance Document Uploaded" with timestamp and file name
>
> **Success**: Document appears in table within 2 seconds; activity log entry visible on Dashboard within same session; client can see file is under review

**Why this is good**:

- Specific precondition (what state must be true first)
- Clear, numbered flow steps
- Observable success criteria (can verify with testing/user observation)
- Includes constraints (max 20 MB, 2 second latency)
- No tech details (hidden in implementation)

---

## 🔄 Versioning Specs

Each spec has its own version (separate from portal version):

- **Major (v1.0 → v2.0)**: Breaking changes to requirements or data structures
- **Minor (v1.0 → v1.1)**: New features/ requirements added (backward compatible)
- **Patch (v1.0 → v1.0.1)**: Clarifications, typo fixes, no new requirements

Document changes in `changelog.md` with:

```
## v1.1 (2026-04-15)
- Added FR-01-08 (Export document as PDF)
- Refined FR-01-03 (activity log timestamps now require millisecond precision)
- Clarified Scenario 2 (file size limit now 20 MB, was 10 MB)
```

---

## 🚀 Next Steps

1. **Before writing**: Read [constitution.md](/.specify/memory/constitution.md) for roles, principles, data vocab
2. **While writing**: Reference [spec-template.md](/.specify/templates/spec-template.md) and check this standards doc frequently
3. **Before submitting**: Use the [Spec Completeness Checklist](#-specification-completeness-checklist) above
4. **For review**: Use the [Review Checklist](#-review-checklist-for-spec-reviewers)

Questions? See [FAQ.md](../../FAQ.md) or open an issue via [spec-update.md](../../.github/ISSUE_TEMPLATE/spec-update.md).

---

**Version**: 1.0  
**Last Updated**: April 10, 2026  
**Authority**: Product Architecture Team
