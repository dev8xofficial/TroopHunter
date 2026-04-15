# Insurance RBAC Matrix

| Resource | `ROLE_CLIENT` | `ROLE_AGENT` | `ROLE_LENDER` | `ROLE_ATTORNEY` | `ROLE_CPA` |
|----------|---------------|--------------|---------------|-----------------|------------|
| `InsurancePolicy (HOME)` | R, U | None | R | R | None |
| `InsurancePolicy (AUTO)` | R, U | None | R | None | None |
| `InsurancePolicy (WARRANTY)`| R, U | None | None | R | None |

*(R = Read, U = Update data payload)*

## Field-Level Rules
- `ROLE_CLIENT` has exclusive Update rights to their own policies.
- `ROLE_LENDER` strictly needs Home and Auto.
- `ROLE_ATTORNEY` strictly needs Home and Warranty.
- `ROLE_AGENT` and `ROLE_CPA` have no business accessing insurance forms natively.
