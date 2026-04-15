# Foundation Spec

## 1. Overview
The foundation module defines the core architectural contracts that cross-cut all client portal operations. This includes session structures, role enums, fundamental logging mechanisms, and the global transaction state machine.

## 2. Authentication & Session Contract
- **Session Scope**: The system requires a valid JWT reflecting an authenticated system user.
- **Token Claims**: Must include `sub` (user_id), `role`, and an array of `transaction_ids` the user has context for.
- **Lifetime**: Handled via standard short-lived access tokens and long-lived refresh tokens. Session expiry drops context.

## 3. Role Model
- `ROLE_CLIENT`: Owns their specific `transaction_id`. Fully owns `MortgageApplication`, `InsurancePolicy`. Reading privileges over transaction timeline and shared documents.
- `ROLE_AGENT`: Reading privileges over transaction progress. Read/write to purchase agreements.
- `ROLE_LENDER`: Read privilege over `MortgageApplication`. Read/write over `LoanEstimate`, `PreApprovalLetter`.
- `ROLE_ATTORNEY`: Read/write over `ClosingDisclosure`, `TitleCommitment`.
- `ROLE_CPA`: Limited read access to financial documents and transaction state.
- `ROLE_ADMIN`: Global read/support access.

## 4. Activity Log Contract
- **Trigger**: System state changes (e.g. `DOCUMENT_UPLOADED`, `MORTGAGE_SHARED`, `INSURANCE_UPDATED`, `STAGE_COMPLETED`).
- **Immutability**: Logs are strictly append-only.
- **Visibility**: Activity events specify an array of roles permitted to view them. For the client portal, all events targeting `ROLE_CLIENT` are grouped into the feed.

## 5. Transaction Lifecycle State Machine
Entity: `Transaction`

| From State | To State | Trigger | Guard Condition |
|------------|----------|---------|-----------------|
| `INITIAL_CONSULTATION` | `PROPERTY_SEARCH` | `COMPLETE_CONSULTATION` | Required fields captured |
| `PROPERTY_SEARCH` | `OFFER_NEGOTIATION` | `PROPERTY_IDENTIFIED` | Property address set |
| `OFFER_NEGOTIATION` | `UNDER_CONTRACT` | `OFFER_ACCEPTED` | Purchase Agreement signed |
| `UNDER_CONTRACT` | `MORTGAGE_APPLICATION` | `DOCUMENTS_COLLECTED` | Initial docs uploaded |
| `MORTGAGE_APPLICATION` | `INSURANCE_SETUP` | `APP_SUBMITTED` | Application 100% complete |
| `INSURANCE_SETUP` | `ATTORNEY_TITLE_REVIEW` | `INSURANCE_VERIFIED` | Policy details captured |
| `ATTORNEY_TITLE_REVIEW`| `INSPECTION_APPRAISAL`| `TITLE_APPROVED` | Title commitment uploaded |
| `INSPECTION_APPRAISAL` | `MORTGAGE_UNDERWRITING`| `APPRAISAL_APPROVED` | Inspection results synced |
| `MORTGAGE_UNDERWRITING`| `FINAL_WALKTHROUGH` | `LOAN_APPROVED` | Final loan approval |
| `FINAL_WALKTHROUGH` | `CLOSING_DAY` | `WALKTHROUGH_COMPLETE` | Final signing scheduled |
| `CLOSING_DAY` | `CLOSED` | `FUNDS_TRANSFERRED` | All docs signed |
