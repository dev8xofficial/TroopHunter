# Rollout Plan — Foundation

## Phases

### Phase 1: Internal Testing

- **Audience**: Internal QA team
- **Feature Flag**: `FF_000_FOUNDATION`
- **Duration**: 1 week
- **Success Criteria**: Nav bar renders on all 8 screens; design tokens applied consistently; session context loads correctly

### Phase 2: Beta Partners

- **Audience**: 5 selected premium partners
- **Duration**: 1 week
- **Success Criteria**: No visual regressions reported; navigation works across all screens; responsive breakpoints function

### Phase 3: General Availability

- **Audience**: All service partners
- **Duration**: Ongoing
- **Rollback Plan**: Revert to previous nav/token set via feature flag; no data migration required
