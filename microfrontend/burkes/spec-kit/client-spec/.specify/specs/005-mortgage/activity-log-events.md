# Mortgage Activity Log Events

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|------------|------------------|----------------|------------------|-------------------|
| `MORTGAGE_DATA_SHARED` | `ROLE_CLIENT` | `application_id` | `ROLE_LENDER` | Permanent |

*Note: Interim saves (`IN_PROGRESS`) do not generate activity events. Only the final submission generates the formal event "Lender James Carter securely transmitted application data". (Wait, the UI says lender transmitted it to title company, but usually Client submits to Lender).*
*(Based on Dashboard HTML: "MORTGAGE_DATA_SHARED: Lender James Carter securely transmitted application data to title company"). The client submitting to lender also implies a formal event.* 
