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
  How do I propose a new feature? Should I start with a GitHub issue,
  or should I create a draft spec.md file first?
  validations:
  required: true

- type: textarea
  id: context
  attributes:
  label: Context (Optional)
  description: Any background that would help answer your question?
  placeholder: |
  Example:
  I'm a new team member on the dev team, and I need to understand
  how to implement feature spec 002-documents in the Next.js frontend.

- type: input
  id: related-spec
  attributes:
  label: Related Spec(s) (Optional)
  description: If your question is about a specific spec(s)
  placeholder: "e.g., 002-documents"

- type: textarea
  id: what-i-tried
  attributes:
  label: What have you already tried?
  description: Have you checked any documentation or references?
  placeholder: |
  Example: - Read CONTRIBUTING.md - Searched FAQ.md - Looked at spec-template.md - Couldn't find the answer

- type: checkboxes
  id: sources-checked
  attributes:
  label: Documentation Checked
  description: Which resources have you already reviewed?
  options: - label: README.md" - label: CONTRIBUTING.md - label: GOVERNANCE.md - label: STANDARDS.md - label: FAQ.md - label: constitution.md - label: Relevant spec.md file(s) - label: Template files

- type: textarea
  id: additional-info
  attributes:
  label: Additional Information (Optional)
  description: Anything else that might help?
  placeholder: "Links, examples, related issues, screenshots, etc."

- type: markdown
  attributes:
  value: |
  ---
      ## Response Guidelines
      Community members may answer questions based on:
      - Official documentation (README, CONTRIBUTING, GOVERNANCE, etc.)
      - Constitution.md (roles, principles, vocabulary)
      - Existing specs and examples
      - Product expertise

      For **design decision questions** ("Why was...?"), tag @pm-team or @tech-lead for official guidance.
