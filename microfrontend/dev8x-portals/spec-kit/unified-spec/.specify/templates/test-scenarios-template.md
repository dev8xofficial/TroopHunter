# [Module Name] — Test Scenarios

> **Module ID**: `NNN-module-name`

---

## Test Coverage Matrix

| Requirement | Positive Test | Negative Test | Edge Case | Auth Test |
|-------------|--------------|---------------|-----------|-----------|
| FR-NNN-01 | TS-NNN-01 | TS-NNN-02 | TS-NNN-03 | TS-NNN-04 |

---

## Test Scenarios

### TS-NNN-01: [Scenario Name] (Positive)

**Requirement**: FR-NNN-01
**Preconditions**: [System state before test]
**Steps**:
1. [Action 1]
2. [Action 2]

**Expected Result**: [What should happen]
**Postconditions**: [System state after test]

### TS-NNN-02: [Scenario Name] (Negative)

**Requirement**: FR-NNN-01
**Preconditions**: [System state before test]
**Steps**:
1. [Invalid action]

**Expected Result**: [Error handling behavior]

### TS-NNN-03: [Scenario Name] (Edge Case)

**Requirement**: FR-NNN-01
**Preconditions**: [Unusual system state]
**Steps**:
1. [Boundary action]

**Expected Result**: [Correct behavior at boundary]

### TS-NNN-04: [Scenario Name] (Authorization)

**Requirement**: FR-NNN-01
**Preconditions**: [User with insufficient role]
**Steps**:
1. [Attempt restricted action]

**Expected Result**: 403 Forbidden returned, no data mutation
