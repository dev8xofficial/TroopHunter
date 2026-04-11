# ADR 001: Admin Role & Privilege Model

## Status
Accepted

## Context
The Burkes Group platform requires robust oversight. While agents only have scope over their own transactions, the organization needs a global viewpoint that allows management to intervene. We must clearly define the separation of powers.

## Decision
We establish two distinct administrative personas for this portal:
1. **Transaction Coordinator (TC)**: Has global read access to all real estate transactions, clients, and documents. Has specific write privileges for approving/rejecting transaction stage update requests and document submissions.
2. **System Administrator (Admin)**: A superset of TC privileges, adding the ability to manage user accounts (creating/suspending agents), defining partner zip code coverage, and overriding system locks.

We are strictly separating the Agent (AG) scope from the TC/Admin scope. An AG cannot access this Admin Portal; they use the Agent Portal exclusively. 

## Consequences
- **Positive**: Strict data compartmentalization prevents agents from modifying data without central oversight.
- **Negative**: Increases UI complexity as we must build a dedicated Admin UI for oversight.
- **Negative**: TC bottlenecks can form if the approval queue is not highly optimized.
