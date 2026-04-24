# Foundation — Activity Log Events

> **Module ID**: `000-foundation`

Foundation defines the canonical event schema. Domain-specific events are defined in each module''s activity-log-events.md and centralized in [contracts/events.yaml](../../../contracts/events.yaml).

## Canonical Event Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | string | Yes | Unique event type identifier (EVT-DDD-NN) |
| event_name | string | Yes | Dotted name (domain.entity.action) |
| timestamp | datetime | Yes | ISO-8601 event time |
| actor.user_id | uuid | Yes | Acting user (null for anonymous/system) |
| actor.role | string | Yes | Actor role at time of event |
| entity.type | string | Yes | Entity type affected |
| entity.id | uuid | Yes | Entity instance affected |
| payload | object | Yes | Event-specific data |
| metadata.ip_address | string | No | Client IP |
| metadata.user_agent | string | No | Client browser |
| metadata.session_id | uuid | No | Active session |
