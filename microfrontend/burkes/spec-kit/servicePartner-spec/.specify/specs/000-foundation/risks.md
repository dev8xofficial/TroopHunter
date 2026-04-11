# Risks — Foundation

## Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|-----------|--------|------------|-------|
| R-00-01 | Design token inconsistency across portals | Medium | High | Shared token library with CI validation; cross-portal review | Design System Lead |
| R-00-02 | Nav bar breaks on mobile viewports | Medium | High | Responsive testing at all breakpoints; mobile-first CSS | Frontend Team |
| R-00-03 | Session context fails to load | Low | Critical | Graceful fallback UI; retry logic; monitoring alerts | Backend Team |
| R-00-04 | Activity log schema drift between portals | Low | Medium | Shared schema in monorepo; CI schema validation | Tech Lead |
| R-00-05 | Badge colour confusion (similar colours for different statuses) | Low | Medium | User testing with colour-blind participants; unique text labels | Design System Lead |
