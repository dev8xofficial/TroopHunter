# Documents RBAC Matrix

| Document Category | `ROLE_CLIENT` | `ROLE_AGENT` | `ROLE_LENDER` | `ROLE_ATTORNEY` | `ROLE_CPA` |
|-------------------|---------------|--------------|---------------|-----------------|------------|
| `PURCHASE` | R, Sign | C, R, U, D | None | R | None |
| `FINANCIAL` | C, R | None | C, R, U, D | None | R |
| `LEGAL` | R | R | None | C, R, U, D | R |
| `OTHER` | C, R | R | R | R | None |

*(C = Create/Upload, R = Read/Download, U = Update metadata, D = Delete before approved, Sign = Execute document)*

## Field-Level Rules
- Deletion (`D`) is only allowed if document `status != APPROVED`.
- `ROLE_CLIENT` has cross-category visibility but restricted upload domains.
- Context is strictly isolated to the specified `transaction_id`.
