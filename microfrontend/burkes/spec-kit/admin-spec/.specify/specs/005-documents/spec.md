---
title: 005 Documents Spec
description: Global document review queue, attachment mapping, and approval workflows.
schema_version: 1.0.0
---

# 1. Module Overview
The Documents module serves as the central file registry and compliance review queue across the platform. Documents are tied to entities (Users, Transactions, Partners) but managed holistically here by Admins for approvals.

# 2. Core Data Models

### 2.1 Document Entity (`Document`)
* **id**: `uuid` (Primary Key)
* **entity_type**: `enum` [ `transaction`, `user`, `partner` ]
* **entity_id**: `uuid` (Foreign Key referencing the above type)
* **uploader_id**: `uuid` (Foreign Key -> User.id)
* **file_name**: `string`
* **s3_object_key**: `string`
* **category**: `enum` [ 
   `purchase_sale_agreement`, `closing_disclosure`, `mortgage_docs`,
   `insurance_docs`, `title_docs`, `divorce_agreement`, `inspection_report` 
  ]
* **status**: `enum` [ `needs_review`, `under_review`, `approved`, `rejected` ]
* **rejection_reason**: `string` (Nullable)
* **uploaded_at**: `timestamp`
* **reviewed_at**: `timestamp` (Nullable)

# 3. API Design & Endpoints

### 3.1 Document Search Queue
#### `GET /api/v1/documents`
Aggregated document queue for Administrator compliance checks.
* **Query Parameters**:
  * `category`: `enum`
  * `status`: `enum`
* **Response**: Paginated `Document` entities decorated with relational data (Transaction ID slug, Uploader Name).

### 3.2 Review Decision (Approve / Reject)
#### `POST /api/v1/documents/:id/decision`
Executes an approval or rejection state transition on the document.
* **Payload Outline (Approve)**:
  ```json
  { "decision": "approved" }
  ```
* **Payload Outline (Reject)**:
  ```json
  { "decision": "rejected", "rejection_reason": "string(min:10)" }
  ```
* **Business Logic & Side Effects**: 
  * Approving a `closing_disclosure` type document might automatically unblock a dependent `Transaction` stage transition.
  * Rejection inherently requires `rejection_reason` and dispatches an email notification to the `uploader_id` via a system event (`DOCUMENT_REJECTED`).

# 4. Access & RBAC Rules
* **Read Scope (Admins/Attorneys)**: Full read access to the global queue based on assigned transactions.
* **Write Scope**: `admin` has exhaustive rights to inject a `decision`. `attorney` users have decision authority scoped strictly to the transactions they are mapped to.

# 5. File Upload Infrastructure Validation
* Backend intercepts raw byte uploads validating Content-Type strictly against `.pdf`, `.jpg`, `.jpeg`, `.png`.
* Payload constraints dynamically evaluated limits (typically 10MB per object).
