# Tasks Prompt — The Burkes Group Admin Portal

## Purpose

Use this prompt to break down an approved implementation plan into developer-ready, dependency-ordered tasks. Each task must be independently assignable, have clear acceptance criteria, and reference the relevant spec functional requirement.

---

## Instructions for Use

1. Open this file in GitHub Copilot Chat.
2. Replace `[PLAN_FILE_PATH]` with the path to the target plan (e.g., `.specify/specs/007-partner-referrals/plan.md`).
3. Replace `[SPEC_FILE_PATH]` with the corresponding spec path.
4. Run the prompt.

---

## Portal Context

You are generating developer tasks for **The Burkes Group Admin Portal**. Tasks must be written for a frontend developer who is familiar with the portal's existing patterns but may not have deep context on the specific feature.

### Development Conventions to Reference in Tasks

When describing task work, refer to these established portal patterns so developers can match existing code style:

| Pattern | Where to find an example |
|---------|--------------------------|
| Screen shell (page-body, page-header) | Any screen in `agent.html` |
| Card component with card-header / card body | Dashboard sidebar cards |
| Badge rendering | Transaction table status column |
| Filter section | Documents screen filter bar |
| Form modal (form-overlay, form-modal) | Add Client modal |
| Stepped modal form | New Transaction modal |
| Upload zone | Dashboard / Documents upload sections |
| Table layout (table > thead > tbody) | Transactions screen tables |
| Stat card | Dashboard stats grid |
| Message list | Messages inbox |
| Appointment card | Calendar screen |
| Partner card | Partner Referrals directory |
| Progress bar | Reports area analytics |

### Task Granularity Rules

Tasks must be:
- **Independently completable**: One developer, one PR.
- **Small enough**: No task should take more than 2 days of focused work. Split larger tasks.
- **Specific enough**: Vague tasks like "Build the UI" are not acceptable. Reference specific components and spec requirement IDs (e.g., FR-07-03).
- **Dependency-ordered**: Task list must start with data/state work before UI, and UI before integration/testing.

### Task Naming Convention

`TASK-[FEATURE_NUM]-[NN] — [Verb] [Object]`

Examples:
- `TASK-007-01 — Define partner data model and state shape`
- `TASK-007-02 — Build PartnerCard component (FR-07-02)`
- `TASK-007-03 — Implement referral submission with activity log write`

---

## Template to Follow

Use the tasks template at `.specify/templates/tasks-template.md`. The output must include:

1. A dependency graph (text-based ASCII or Markdown list format).
2. One task block per task with: Status, Effort, Depends On, Blocks, Description, Acceptance Criteria, and Notes.
3. A completion checklist at the bottom.

---

## Inputs

> **Plan file**: `[PLAN_FILE_PATH]`
> **Spec file**: `[SPEC_FILE_PATH]`
>
> Read both files. Generate a complete, dependency-ordered task list following the template and the conventions above. All acceptance criteria must trace back to either a specific Functional Requirement (FR-XX-YY) from the spec or a Success Criterion.

