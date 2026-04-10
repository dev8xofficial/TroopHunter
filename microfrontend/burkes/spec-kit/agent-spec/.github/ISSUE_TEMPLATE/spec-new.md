name: New Feature Specification
description: Propose a new feature for the Agent Portal
title: "[NEW SPEC] "
labels: ["new-spec", "needs-research"]
body:

- type: markdown
  attributes:
  value: | # New Feature Specification
  Use this template to propose a new feature for the Agent Portal spec-kit.

      **Note:** This issue will be converted to a formal spec.md file in `.specify/specs/` after approval.

- type: input
  id: feature-name
  attributes:
  label: Feature Name
  description: What is this feature called? (e.g., "Notification Preferences", "Admin Panel")
  placeholder: "Feature name"
  validations:
  required: true

- type: textarea
  id: elevator-pitch
  attributes:
  label: Elevator Pitch (1 paragraph)
  description: What is this feature in 2-3 sentences?
  placeholder: |
  Example:
  An admin panel that allows Transaction Coordinators (TC) to view all agent transactions, approve or reject stage update requests, and manage portal settings. This centralises admin workflows that are currently handled via email.
  validations:
  required: true

- type: textarea
  id: problem-statement
  attributes:
  label: Problem Statement
  description: What pain point does this feature solve?
  placeholder: |
  Currently, stage update approvals happen via email, leading to:
  - Delayed responses and lost approval requests
  - No audit trail of who approved what and when
  - Agents unsure of approval status
  validations:
  required: true

- type: textarea
  id: goals
  attributes:
  label: Goals
  description: What should this feature accomplish? (List 3-5 goals)
  placeholder: |
  - Provide TC admin with a centralised approval queue
  - Enable real-time notifications for new stage update requests
  - Create audit trail of all approvals/rejections
  - Reduce average approval time from 24 hours to 2 hours
  validations:
  required: true

- type: textarea
  id: user-scenarios
  attributes:
  label: User Scenarios
  description: Describe 2-3 key user flows
  placeholder: |
  **Scenario 1: TC Approves Stage Update**
  TC opens Admin Panel, sees pending requests, reviews details, clicks "Approve"

      **Scenario 2: Agent Gets Notification**
      Agent submits stage update, receives notification when approved/rejected
  validations:
  required: true

- type: dropdown
  id: actors
  attributes:
  label: Which roles are involved?
  multiple: true
  options: - "AG (Agent)" - "TC (Coordinator/Admin)" - "CL (Client)" - "LN (Lender)" - "AT (Attorney)" - "CP (CPA)"
  validations:
  required: true

- type: input
  id: dependencies
  attributes:
  label: Spec Dependencies
  description: Which existing specs must be complete first?
  placeholder: "000-foundation, 002-transactions"

- type: dropdown
  id: priority
  attributes:
  label: Priority
  description: How important is this for the product roadmap?
  options: - "P0 (Critical - must have)" - "P1 (High - next release)" - "P2 (Medium - nice to have)" - "P3 (Low - future roadmap)"
  validations:
  required: true

- type: textarea
  id: success-metrics
  attributes:
  label: How will we measure success?
  description: What KPIs indicate this feature is working?
  placeholder: |
  - 90% of stage updates approved within 4 hours
  - Zero approvals lost or untracked
  - 100% audit trail of approval decisions
  validations:
  required: true

- type: checkboxes
  id: agreements
  attributes:
  label: Acknowledgments
  options: - label: I have read constitution.md and understand the 6 roles
  required: true - label: This feature aligns with core principles (P-01 through P-07)
  required: true - label: I've checked for conflicts with existing specs
  required: true
