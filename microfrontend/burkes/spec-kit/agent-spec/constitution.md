# System Constitution

## Core Architectural Axioms
1. **API-First Exclusivity:** All system interactions must occur strictly through deterministic API boundaries.
2. **UI-Agnostic Processing:** Backend states have zero knowledge of front-end implementation, device constraints, or style tokens.
3. **Pessimistic Access Control:** Default deny. Access is explicitly granted via defined RBAC policies.
4. **Immutable Audit Trails:** State mutations emit append-only logs natively.

## Transaction Lifecycle Standard
Enforces a linear path progression logic:
1. Intake Registration
2. Inspection Validation
3. Appraisal Escrow
4. Final Closing Operations
