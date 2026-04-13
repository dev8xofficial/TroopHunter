# Role Routing — Test Scenarios

## 1. Destination Mapping Validation
- **Given** my identified role is 'Service Partner'
- **When** the routing screen loads
- **Then** the `page-7-service` container is set to active
- **And** the primary navigational link directs to `servicePartner.html`.

## 2. Hard Redirect Constraint
- **Given** I review my permissions
- **When** I click the primary action button
- **Then** a full window redirect triggers, terminating the Main Portal session and passing the handoff token.
