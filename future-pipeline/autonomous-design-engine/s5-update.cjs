const fs = require('fs');
let content = fs.readFileSync('IMPLEMENTATION_PLAN.md', 'utf-8');

// Update C0.0
content = content.replace(
  /(\(c\) \*\*injection safety\*\*.+?bypass them\.)/,
  "$1\n  - The provider wrapper maintains cumulative `quota` counters (calls/tokens) and persists them per `RunRecord` (S5 amendment)."
);

// Update C0.13
content = content.replace(
  /re-baseline on any model change\./,
  "re-baseline on any model change. Report burn-rate vs S2 limits in `ade report` (S5 amendment)."
);

// Update Appendix A
content = content.replace(
  /("dist_tags": \{[^}]+\},)/,
  "$1\n    \"quota\": { \"calls_today\": 0, \"tokens_today\": 0, \"window_note\": \"string\" }, // S5 amendment"
);

fs.writeFileSync('IMPLEMENTATION_PLAN.md', content);
console.log('Done');
