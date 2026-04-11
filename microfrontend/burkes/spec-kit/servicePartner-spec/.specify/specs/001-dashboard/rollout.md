# Rollout Plan — Dashboard

## Phases

### Phase 1: Internal Testing
- **Audience**: Internal QA team
- **Feature Flag**: `FF_001_DASHBOARD`
- **Duration**: 1 week
- **Success Criteria**: All KPI cards render; referral cards display; quick actions navigate correctly

### Phase 2: Beta Partners
- **Audience**: 10% of active partners
- **Duration**: 2 weeks
- **Success Criteria**: Dashboard load time <2s; no visual regressions; partners confirm KPIs are accurate

### Phase 3: General Availability
- **Audience**: All service partners
- **Duration**: Ongoing
- **Rollback Plan**: Revert to previous dashboard version via feature flag
