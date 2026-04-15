# Attorney Portal Constitution

## Core Business Principles
1. **Closing Certainty:** The system guarantees absolute agreement between the attorney-verified figures, the title commitments, and the final loan amounts before moving to a completed state.
2. **Document Immutability:** Any document uploaded by any party is immutable upon upload. Revisions require a new document version or a complete rejection/re-upload workflow.
3. **Strict Liability & Review Checks:** Only authorized Attorneys can approve asset split distributions, verify closing balances, and confirm the final accuracy of figures.
4. **Data Silos by Case:** A user can only access client details, transaction amounts, and documents mapped explicitly to transactions they own or are assigned to.

## Canonical Role Definitions
* **closing_attorney:** Can read/write transactions, approve/reject documents, verify closing balances, flag discrepancies, and manage asset split distributions.
* **real_estate_agent:** Can read transactions, upload purchase agreements.
* **mortgage_lender:** Can read transactions, upload loan documents, and closing disclosures.
* **client:** Can upload ID documents, view their case progress. Can be messaged directly.
* **title_company:** Can upload title commitments, view closing balances, cannot verify.

## Transaction Lifecycle Stages
1. **document_gathering**: Initial open phase for gathering paperwork.
2. **agent_review**: Preliminary real estate agent confirmations.
3. **under_attorney_review**: Required documents received; attorney review needed.
4. **split_pending**: Awaiting asset split verification (specific to divorce cases).
5. **flagged**: Discrepancy discovered; processing is paused until resolved.
6. **title_review**: Sent to title company for final commitment.
7. **verified**: Cleared for closing execution.
8. **completed**: Transaction fully closed and funds dispersed.

## Global Data Vocabulary
* `transaction_id`: A unique UUID tracing a property exchange.
* `client_id`: UUID for individuals taking part in a transaction.
* `case_type`: Enum [`purchase_closing`, `sale_closing`, `divorce_asset_split`].
* `contract_amount`: Number representing the base contracted property sale standard.
* `document_category`: String grouping documents like `purchase_agreement`, `closing_disclosure`, etc.

## Immutability Rules
* A transaction transitioned to `completed` state cannot be manually modified.
* All activity log events are strictly insert-only and cannot be updated.
* Documents cannot be deleted or mutated; only soft-deleted via rejection workflows.

## Cross-Cutting Invariants
* Closing Date must be logically in the future when a transaction transitions into `in_progress`.
* Modifying an asset split automatically transitions the case to `needs_verification`.
* Discrepancy flagging pauses any state transition out of `under_attorney_review` until the flag is cleared.
