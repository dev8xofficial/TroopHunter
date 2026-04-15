# Risks: Documents

## Data Integrity Risks
* **Probability:** Medium
* **Impact:** Critical
* **Risk:** Uploading malware or overly large files bypassing `multipart` parsers, leading to infinite streams.
* **Mitigation Strategy:** Enforce absolute 25MB limits at the API Gateway level. Run asynchronous virus-scan pipelines before making the S3 pointer accessible downstream.

## Access Control Risks
* **Probability:** Low
* **Impact:** High
* **Risk:** URL guessing for S3 downloads.
* **Mitigation Strategy:** Backend issues short-lived (5 minute) AWS pre-signed URLs explicitly linked to the authorized requestor's credential validation. Keys should be randomly generated UUIDs.
