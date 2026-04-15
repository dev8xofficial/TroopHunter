# Burkes Group Client Portal Constitution

## Core Business Principles
1. **Centralised Transaction Command**: The Client Portal serves as the single source of truth for the client's real estate transaction, aggregating data across domains (mortgage, insurance, legal, property).
2. **Strict Discretionary Access**: System data is siloed based on role constraints. A Lender accesses mortgage data; an Attorney accesses closing data. They intercept securely at the Client level.
3. **Immutable Activity Logging**: Every state transition, document upload, and role-based interaction is permanently logged to an audit trail.

## Canonical Role Definitions
- `ROLE_CLIENT`: The primary consumer. Has read/write access to their own personal data, mortgage application, insurance details, and read access to documents shared by professionals.
- `ROLE_AGENT`: Real estate agent guiding the transaction. Has read/write access to property-related documents and read access to the transaction progress timeline. 
- `ROLE_LENDER`: Mortgage lender representing the bank. Has read/write access to loan estimates, pre-approval letters, and the client's mortgage application payload.
- `ROLE_ATTORNEY`: Closing attorney. Has read/write access to legal documents (Closing Disclosure, Title Commitment).
- `ROLE_CPA`: Certified Public Accountant. Has read-only access to specific financial and transaction documents for tax planning.
- `ROLE_ADMIN`: Internal Burkes Group transaction coordinator. Has overarching support access to facilitate the transaction process.

## 11-Stage Transaction Lifecycle
1. `INITIAL_CONSULTATION`: Requirements and budget discussion.
2. `PROPERTY_SEARCH`: Property identification and matching.
3. `OFFER_NEGOTIATION`: Offer acceptance and purchase agreement execution.
4. `UNDER_CONTRACT`: Initial paperwork and document collection.
5. `MORTGAGE_APPLICATION`: Personal, property, and financial data submission.
6. `INSURANCE_SETUP`: Processing home, auto, and warranty insurance details.
7. `ATTORNEY_TITLE_REVIEW`: Legal review of closing disclosure and title commitment.
8. `INSPECTION_APPRAISAL`: Property inspection and professional appraisal.
9. `MORTGAGE_UNDERWRITING`: Verification of employment and final loan approval.
10. `FINAL_WALKTHROUGH`: Document signing and final property inspection.
11. `CLOSING_DAY`: Execution of final documents, fund transfer, and transaction completion.

## Global Data Vocabulary
- `transaction_id`: UUID acting as the primary key binding all domain data (mortgage, insurance, documents).
- `user_id`: UUID of the authenticated actor.
- `document_id`: UUID for any uploaded file linked to the transaction.
- `event_id`: UUID for activity log events.

## Immutability Rules
- Submitted mortgage application payloads that are "Shared" cannot be modified without a formal revision request state transition.
- Documents marked `APPROVED` cannot be deleted; they may only be archived or supplanted by a superior document version.
- Activity log entries are strictly append-only.

## Cross-Cutting Invariants
- A `Document` must be associated with exactly one `transaction_id`.
- The `transaction_stage` cannot advance to `MORTGAGE_UNDERWRITING` (Stage 9) until `MORTGAGE_APPLICATION` (Stage 5) is 100% complete.
