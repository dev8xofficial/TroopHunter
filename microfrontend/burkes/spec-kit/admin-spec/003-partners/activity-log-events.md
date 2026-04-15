# Partners Activity Log Events

## Audit Events Catalogue

| Event Type | Triggering Actor | Payload Schema | Visibility | Immutability Rule |
| --- | --- | --- | --- | --- |
| `partner_status_changed` | `admin` | `{ previous_status, new_status }` | `admin` | Retained indefinitely |
| `service_area_modified` | `admin` | `{ added_zips: [], removed_zips: [] }` | `admin` | Retained indefinitely |
