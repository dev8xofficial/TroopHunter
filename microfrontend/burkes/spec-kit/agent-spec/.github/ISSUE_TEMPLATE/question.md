name: Question / Discussion
description: Ask a question about the spec-kit or start a discussion
title: "[QUESTION] "
labels: ["question", "discussion"]
body:

- type: markdown
  attributes:
  value: | # Question / Discussion
  Have a question about how specs work, need clarification, or want to discuss something?

- type: dropdown
  id: question-type
  attributes:
  label: Question Type
  description: What kind of help do you need?
  options: - "How do I...? (process question)" - "Why was...? (design decision question)" - "What does this mean? (clarification)" - "Can we...? (capability question)" - "Should we...? (discussion/opinion)" - "Where do I find...? (navigation help)"
  multiple: false
  validations:
  required: true

- type: textarea
  id: question
  attributes:
  label: Your Question
  description: What would you like to know?
  placeholder: |
  Example:
  How do I add a new transaction type (e.g., "lease") to the portal?
  Should I update constitution.md first, or start with a spec update?
  validations:
  required: true

- type: textarea
  id: context
  attributes:
  label: Context (Optional)
  description: Any background that would help answer your question?
  placeholder: |
  Example:
  I'm working on implementing the Transactions screen and need to understand
  whether the stage update approval flow works for all transaction types.

- type: input
  id: related-spec
  attributes:
  label: Related Spec(s) (Optional)
  description: If your question is about a specific spec(s)
  placeholder: "e.g., 002-transactions"

- type: checkboxes
  id: sources-checked
  attributes:
  label: Documentation Checked
  description: Which resources have you already reviewed?
  options: - label: README.md - label: CONTRIBUTING.md - label: GOVERNANCE.md - label: STANDARDS.md - label: FAQ.md - label: constitution.md - label: Relevant spec.md file(s) - label: Template files
