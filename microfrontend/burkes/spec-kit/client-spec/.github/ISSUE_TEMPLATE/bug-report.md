name: Bug Report
description: Report an error or inconsistency in the spec-kit
title: "[BUG] "
labels: ["bug", "needs-investigation"]
body:

- type: markdown
  attributes:
  value: | # Bug Report
  Found an error, contradiction, or inconsistency in the spec-kit? Let us know!

- type: dropdown
  id: bug-type
  attributes:
  label: Bug Type
  description: What category does this bug fall into?
  options: - "Incorrect information (factually wrong)" - "Contradictory statements (specs conflict)" - "Missing information (spec incomplete)" - "Confusing wording (unclear language)" - "Broken link or reference" - "Invalid example or code" - "Process/workflow issue"
  multiple: false
  validations:
  required: true

- type: input
  id: affected-spec
  attributes:
  label: Affected Spec(s)
  description: Which specs does this bug affect?
  placeholder: "e.g., 001-dashboard, 004-insurance"
  validations:
  required: true

- type: textarea
  id: bug-description
  attributes:
  label: What's the bug?
  description: Describe the issue clearly
  placeholder: |
  Example:
  The "transaction_status" field enum in transaction-model.json includes "inspection_scheduled",
  but the Dashboard spec (001) never transitions to this state. Actors go directly from
  "offer_accepted" to "inspection_completed".
  validations:
  required: true

- type: textarea
  id: location
  attributes:
  label: Location in Spec
  description: Provide the section/heading and line reference
  placeholder: |
  File: .specify/specs/001-dashboard/spec.md
  Section: ## Data & State
  Line: approx. 204

      File: .specify/schemas/transaction-model.json
      Field: transaction_status enum, line 18

- type: textarea
  id: impact
  attributes:
  label: Impact
  description: How does this bug affect users or developers?
  placeholder: |
  Developers will be confused about valid transaction states.
  Implementation may create invalid state combinations.
  Tests may fail because schema and spec don't match.
  validations:
  required: true

- type: textarea
  id: suggested-fix
  attributes:
  label: Suggested Fix (Optional)
  description: Do you have a proposed solution?
  placeholder: |
  Example:
  Remove "inspection_scheduled" from the enum, or
  update Dashboard spec to include this state with a dedicated viewing section.

- type: dropdown
  id: severity
  attributes:
  label: Severity
  options: - "🔴 Critical (breaks implementation)" - "🟠 High (causes confusion)" - "🟡 Medium (minor inconsistency)" - "🟢 Low (documentation/clarity only)"
  validations:
  required: true

- type: checkboxes
  id: agreements
  attributes:
  label: Acknowledgments
  options: - label: I've checked existing bugs to avoid duplicates
  required: true - label: I've read the spec(s) in full context
  required: true
