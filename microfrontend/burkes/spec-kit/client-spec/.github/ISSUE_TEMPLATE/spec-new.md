name: New Feature Specification
description: Propose a new feature for the Burkes portal
title: "[NEW SPEC] "
labels: ["new-spec", "needs-research"]
body:

- type: markdown
  attributes:
  value: | # New Feature Specification
  Use this template to propose a new feature for the Burkes portal spec-kit.

      **Note:** This issue will be converted to a formal spec.md file in `.specify/specs/` after approval.

- type: input
  id: feature-name
  attributes:
  label: Feature Name
  description: What is this feature called? (e.g., "Insurance Management", "Document Signing")
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
  A portal screen allowing clients to upload, track, and manage all required insurance policies. Agents can request policies, clients upload proof of insurance, attorneys verify coverage, and the system tracks dates and status.
  validations:
  required: true

- type: textarea
  id: problem-statement
  attributes:
  label: Problem Statement
  description: What pain point does this feature solve?
  placeholder: |
  Currently, insurance coordination happens via email, leading to: - Lost documents and requests - Unclear deadlines and completion status - Difficulty auditing what's been collected - Duplicate requests to clients
  validations:
  required: true

- type: textarea
  id: goals
  attributes:
  label: Goals
  description: What should this feature accomplish? (List 3-5 goals)
  placeholder: | - Provide single source of truth for insurance status - Enable automated reminders for missing insurance - Create audit trail of all insurance requests - Reduce client frustration by showing clear status
  validations:
  required: true

- type: textarea
  id: user-scenarios
  attributes:
  label: User Scenarios
  description: Describe 2-3 key user flows
  placeholder: |
  **Scenario 1: Agent Requests Insurance**
  Agent opens Insurance screen, clicks "Request Homeowners", system sends email to client with deadline

      **Scenario 2: Client Uploads Policy**
      Client opens email link, uploads PDF/image, portal confirms receipt and shows status "In Review"

      **Scenario 3: Attorney Reviews**
      Attorney views insurance tab, verifies coverage is adequate, marks "Approved"

  validations:
  required: true

- type: dropdown
  id: actors
  attributes:
  label: Which roles are involved?
  multiple: true
  options: - "CL (Client)" - "AG (Agent)" - "LN (Lender)" - "AT (Attorney)" - "CP (CPA)" - "TC (Coordinator)"
  validations:
  required: true

- type: input
  id: dependencies
  attributes:
  label: Spec Dependencies
  description: Which existing specs must be complete first? (e.g., 000-foundation, 001-dashboard)
  placeholder: "000-foundation, 001-dashboard"

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
  placeholder: | - 90% of insurance requests submitted within 24 hours - Average insurance collection time < 3 days - Zero duplicate requests sent to same client - 100% audit trail of who requested/reviewed what/when
  validations:
  required: true

- type: textarea
  id: risks-constraints
  attributes:
  label: Known Risks & Constraints
  description: What could go wrong? What are the limits?
  placeholder: | - Clients may not recognize security of upload mechanism - Some agents may continue using email instead of portal - Mobile uploads may be slow on slower connections - Integration with insurance company APIs limited

- type: textarea
  id: research-notes
  attributes:
  label: Research & Rationale
  description: What did you learn from customers, competitors, or other sources?
  placeholder: | - Competitive analysis: Redfin uses in-portal uploads, Zillow uses email integration - Customer feedback: Multiple clients mentioned confusion about what's been provided - Industry standard: Title companies expect digital proof of insurance

- type: checkboxes
  id: agreements
  attributes:
  label: Acknowledgments
  options: - label: I have read constitution.md and understand the 6 roles
  required: true - label: This feature aligns with core principles (P-01 through P-07)
  required: true - label: I've checked for conflicts with existing specs
  required: true
