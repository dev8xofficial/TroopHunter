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
  options: - "000-foundation" - "001-dashboard" - "002-documents" - "003-messages" - "004-insurance" - "005-mortgage" - "006-services" - "Other (please specify below)"
  validations:
  required: true

- type: textarea
  id: change-summary
  attributes:
  label: Summary of Changes
  description: What are you proposing to change and why?
  placeholder: |
  Example: - Add new role: CPA (CP) to insurance workflow - Clarify document status transitions in workflow diagram - Deprecate FR-001-03 in favor of FR-001-04
  validations:
  required: true

- type: textarea
  id: rationale
  attributes:
  label: Business Rationale
  description: Why is this change necessary? What problem does it solve?
  placeholder: |
  Example: - Customers requested ability to invite CPAs for tax planning - Current workflow lacks clarity on document rejection flow - New requirement from compliance team
  validations:
  required: true

- type: input
  id: impact-areas
  attributes:
  label: Affected Features
  description: List other specs this change impacts (e.g., 001-dashboard, 002-documents)
  placeholder: "001-dashboard, 003-messages"

- type: dropdown
  id: priority
  attributes:
  label: Priority Level
  options: - "P0 (Critical - blocks other work)" - "P1 (High - needed for next release)" - "P2 (Medium - nice to have)" - "P3 (Low - future consideration)"
  validations:
  required: true

- type: textarea
  id: proposed-text
  attributes:
  label: Proposed Spec Text
  description: If adding/modifying sections, provide the proposed markdown
  placeholder: | ## New Section Title
  Description here...
  render: markdown

- type: textarea
  id: additional-context
  attributes:
  label: Additional Context
  description: Links to related issues, customer requests, competitive analysis, etc.
  placeholder: | - Related issue: #123 - Customer request: Support ticket #ABC-456 - Competitive analysis: See Redfin's approach to...

- type: checkboxes
  id: agreements
  attributes:
  label: Acknowledgments
  options: - label: I have read CONTRIBUTING.md and STANDARDS.md
  required: true - label: This change doesn't break existing approved features
  required: true - label: I've checked for circular dependencies with other specs
  required: true
