# Risks: Clients

## Data Integrity Risks
* **Probability:** Low
* **Impact:** Low
* **Risk:** Phone numbers formatted incorrectly failing SMS dispatch.
* **Mitigation Strategy:** Backend schema enforces E.164 string format regex verification upon write.

## Access Control Risks
* **Probability:** Low
* **Impact:** High
* **Risk:** Data leakage via sequential sweeping of `/api/v1/clients/{client_id}`.
* **Mitigation Strategy:** Utilize UUIDv4 for `client_id` and strict SQL JOIN evaluation verifying the calling user shares an active transaction record with the requested UUID.
