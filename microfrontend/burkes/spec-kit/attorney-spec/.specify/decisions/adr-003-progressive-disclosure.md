# ADR-003: Progressive Disclosure in Modal Forms

**Status**: Accepted
**Date**: 2026-04-12
**Decision**: Complex workflows use overlay modals with focused content and clear CTAs.

## Context
The attorney deals with multiple complex workflows: verification confirmation, discrepancy flagging, document rejection, report generation, and client management. Presenting all options at once would be overwhelming.

## Decision
All data-entry and confirmation workflows use overlay modals following a consistent pattern: header (title + close button), body (focused content), footer (action buttons). Each modal presents only the information needed for that specific action. Clicking outside the modal dismisses it; ESC key also dismisses.

## Consequences
- Modals prevent context loss — the attorney stays on their current screen
- Focused content reduces cognitive load and error rates
- Consistent modal pattern makes the portal learnable
- All modals follow the same structural pattern from Foundation spec (000)
