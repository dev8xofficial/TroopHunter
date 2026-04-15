# Mortgage RBAC Matrix

| Resource | `ROLE_CLIENT` | `ROLE_AGENT` | `ROLE_LENDER` | `ROLE_ATTORNEY` | `ROLE_CPA` |
|----------|---------------|--------------|---------------|-----------------|------------|
| `MortgageApplication` | R, U | None | R | None | None |

*(R = Read, U = Update)*

## Field-Level Rules
- `ROLE_CLIENT` has full update permissions ONLY if `status != SUBMITTED`.
- `ROLE_LENDER` cannot read the application payload while `status == IN_PROGRESS` (they only see that it is pending). They only gain full read access when `status == SUBMITTED`.
- The real estate agent, attorney, and CPA have absolutely zero access to this private financial data.
