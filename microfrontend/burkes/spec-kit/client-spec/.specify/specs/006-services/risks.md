# Services Risks

## Integration Risks
- **Underpopulated Zip Codes**: Querying a rural zip code returns 0 providers, reducing user trust in the portal.
  - **Probability**: High
  - **Impact**: Low
  - **Mitigation Strategy**: The backend service must compute a radial geographic search (e.g., 25-mile radius) rather than performing an exact string match on postal codes.
