# Integration API Audit

## Priority 1

| Integration | Phase 1 need | Spec implication |
| --- | --- | --- |
| Microsoft Outlook | Email and notification linkage | Inbox, compose, send, metadata sync |
| VOIP Provider | Calls, SMS, recording | Channel-agnostic message and call events |
| Arive | Mortgage context lookup | External reference IDs and status mapping |
| Follow Up Boss | Data import | Import endpoint and field mapping rules |

## Priority 2

| Integration | Planned role |
| --- | --- |
| HAR | Agent license verification |
| Vertafore / Agency Zoom | Temporary insurance sync while native workflow matures |
| DotLoop | Real-estate document and signature lifecycle |
| Google Calendar | Calendar sync alongside Outlook |

## Key audit notes

- Outlook should remain the system of record for mailbox storage.
- Arive identifiers should be stored as external references, not treated as CRM-native entities.
- Follow Up Boss import requires mapping and deduplication rules before migration begins.

