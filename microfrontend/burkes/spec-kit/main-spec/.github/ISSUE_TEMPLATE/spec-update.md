name: Spec Update
description: Propose changes to an existing feature specification
title: "[SPEC UPDATE] "
labels: ["spec-update", "needs-review"]
body:

- type: markdown
  attributes:
  value: | # Spec Update Proposal
  Use this template to propose changes to an existing feature specification.

- type: dropdown
  id: spec-id
  attributes:
  label: Which spec are you updating?
  options: - "000-foundation" - "001-dashboard" - "002-transactions" - "003-documents" - "004-clients" - "005-messages" - "006-calendar" - "007-partner-referrals" - "008-reports" - "Other (please specify below)"
  validations:
  required: true

- type: textarea
  id: change-summary
  attributes:
  label: Summary of Changes
  description: What are you proposing to change and why?
  placeholder: |
  Example:
  - Add "divorce-asset-split" as a new transaction type in the Transactions spec
  - Update stage dropdown in New Transaction modal to include all 12 stages
  - Add FR-02-08 for bulk transaction export
  validations:
  required: true

- type: textarea
  id: rationale
  attributes:
  label: Business Rationale
  description: Why is this change necessary? What problem does it solve?
  placeholder: |
  Example:
  - Agent feedback: "I handle divorce asset splits but can't categorise them"
  - Current "Other" workaround loses data for reporting
  - New transaction type enables accurate commission tracking
  validations:
  required: true

- type: input
  id: impact-areas
  attributes:
  label: Affected Features
  description: List other specs this change impacts
  placeholder: "001-dashboard, 008-reports"

- type: dropdown
  id: priority
  attributes:
  label: Priority Level
  options: - "P0 (Critical - blocks other work)" - "P1 (High - needed for next release)" - "P2 (Medium - nice to have)" - "P3 (Low - future consideration)"
  validations:
  required: true

- type: checkboxes
  id: agreements
  attributes:
  label: Acknowledgments
  options: - label: I have read CONTRIBUTING.md and STANDARDS.md
  required: true - label: This change doesn't break existing approved features
  required: true - label: I've checked for circular dependencies with other specs
  required: true
