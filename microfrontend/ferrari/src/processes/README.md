# Processes

Cross-feature orchestration layer following **Feature-Sliced Design**.

## Purpose

Processes handle complex workflows that span multiple features.
Examples: authentication flows, onboarding sequences, checkout processes.

## Structure

```
process-name/
├── ui/             # Orchestration UI (wizards, multi-step flows)
├── model/          # Process logic, state machines
└── index.ts        # Public API
```

## Rules

1. Processes can import from `features/`, `entities/`, and `shared/`
2. Use processes sparingly — most logic belongs in features
3. Processes coordinate, they don't own business logic
