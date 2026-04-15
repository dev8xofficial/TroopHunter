# The Burkes Group Admin System Constitution

## 1. Core Business Principles
- **Centralized Oversite**: The Admin domain acts as the global control plane for all inter-departmental workflows, overriding local node constraints when necessary.
- **Strict Role Boundaries**: Identity is non-fungible across business domains. A user acts strictly within the bounds of their authenticated role context.
- **Audit Completeness**: Every state mutation across users, partners, transactions, and documents must be immutably recorded with the causative actor's identity.
- **Workflow Isolation**: Domain operations (e.g., attorney verification and partner approval) exist as discrete, asynchronous workflows rather than synchronous UI sequences.

## 2. Canonical Role Definitions
- **Administrator**: The super-user context. Has global read access and scoped write access to override system states (e.g., force approval, suspend partner).
- **Client**: The homeowner or primary buyer/seller. Owns personal data and can read transaction progress.
- **Real Estate Agent**: A licensed broker. Owns listings and initiates real estate transactions.
- **Attorney**: A legal practitioner (closing or divorce). Owns legal verifications, escrow status, and final document validations.
- **Mortgage Lender**: The financial underwriter. Owns loan origination data and mortgage document statuses.
- **CPA**: A certified public accountant. Owns financial reviews and tax documentation.

## 3. Transaction Lifecycle Stages
Transactions follow a strict, unidirectional 12-stage state machine:
1. `initial_consultation`
2. `property_search_listing`
3. `offer_negotiation`
4. `under_contract`
5. `mortgage_application_pre_approval`
6. `insurance_information_documentation`
7. `attorney_title_review`
8. `inspection_appraisal`
9. `closing_preparation`
10. `mortgage_underwriting_final_approval`
11. `final_walkthrough_document_signing`
12. `completed`

## 4. Global Data Vocabulary
- **User Reference**: `user_id` (UUID), `status` (Enum: `active`, `pending_approval`, `suspended`, `inactive`).
- **Partner Reference**: `partner_id` (UUID), `category` (Enum: `plumbing`, `roofing`, `electrical`, `credit_repair`, `hvac`, `other`).
- **Transaction Reference**: `transaction_id` (String: `TRX-[0-9]{5}`), `transaction_type` (Enum: `purchase`, `sale`, `refinance`, `divorce`).
- **Document Reference**: `document_id` (UUID), `document_status` (Enum: `needs_review`, `under_review`, `approved`, `rejected`).

## 5. Immutability Rules
- **Activity Logs**: Once written, audit events cannot be mutated or deleted by any system actor, including Administrators.
- **Completed Transactions**: Transitions into the `completed` state lock all associated transaction attributes and document vertices. No further updates are permitted.

## 6. Cross-Cutting Invariants
- A User entity cannot hold multiple distinct platform roles simultaneously within the same session.
- A Document entity must be bound to exactly one explicit Transaction entity or one explicit User profile entity.
- Stage progression on a Transaction requires all mandatory Documents for the current stage to possess an `approved` status.
