# Partners Domain Risks

## 1. Dispatch Leakage
- **Probability**: Low
- **Impact**: Critical
- **Risk**: A newly registered partner is temporarily persisted in the DB as `active` before the admin explicitly clicks approve due to a default enum mapping error on intake. This causes uncredentialed vendors to be dispatched.
- **Mitigation Strategy**: The database schema must explicitly enforce `DEFAULT 'pending_approval'` on insertion at the data layer, and `UpdatePartnerState` API must strictly require Administrative auth claims to transition values.

## 2. Invalid Zip Code Propagation
- **Probability**: Medium
- **Impact**: Medium
- **Risk**: An Admin fat-fingers spatial data, inserting 4-digit or text into the `service_areas` array, breaking the geospatial routing algorithms downstream.
- **Mitigation Strategy**: Enforce strict Regex `^[0-9]{5}$` inside the JSON schema validation layer before persistence.
