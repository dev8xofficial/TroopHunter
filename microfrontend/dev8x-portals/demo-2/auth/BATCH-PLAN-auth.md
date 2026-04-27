# BATCH-PLAN: auth (Modules 001–005)

## Module Summary

- 001-authentication: Login, Register, Logout (3 endpoints, 5 events, 2 models)
- 002-portal-routing: Portal selector, route resolution (3 endpoints, 3 events, 2 models)
- 003-mfa: TOTP/recovery challenge (3 endpoints, 4 events, 1 model)
- 004-password-reset: Token-based recovery (3 endpoints, 3 events, 1 model)
- 005-sso: Google OAuth handshake (3 endpoints, 3 events, 1 model)

## Component Inventory

Total files: 20 → 10 batches (max 2 per batch)

| #   | File                             | Module(s) | Status  |
| --- | -------------------------------- | --------- | ------- |
| 1   | css/tokens.css                   | all       | ✅ DONE |
| 2   | css/shell.css                    | all       | ✅ DONE |
| 3   | css/screen.css                   | all       | ✅ DONE |
| 4   | css/components.css               | all       | ✅ DONE |
| 5   | screens/auth-portal-select.html  | 002       | ✅ DONE |
| 6   | screens/auth-login.html          | 001       | ✅ DONE |
| 7   | screens/auth-register.html       | 001       | ✅ DONE |
| 8   | screens/auth-mfa.html            | 003       | ✅ DONE |
| 9   | screens/auth-password-reset.html | 004       | ✅ DONE |
| 10  | screens/auth-sso-callback.html   | 005       | ✅ DONE |
| 11  | js/components/portal-selector.js | 002       | ✅ DONE |
| 12  | js/components/auth-form.js       | 001       | ✅ DONE |
| 13  | js/components/mfa-challenge.js   | 003       | PENDING |
| 14  | js/components/password-reset.js  | 004       | PENDING |
| 15  | js/components/sso-handler.js     | 005       | PENDING |
| 16  | js/router.js                     | 001-005   | PENDING |
| 17  | js/app.js                        | 001-005   | PENDING |
| 18  | js/mock-data.js                  | 001-005   | PENDING |
| 19  | main.html                        | all       | PENDING |
| 20  | manifest.json                    | all       | PENDING |

## Batch Sequence

- Batch 1: css/tokens.css + css/shell.css → ✅ DONE
- Batch 2: css/screen.css + css/components.css → ✅ DONE
- Batch 3: screens/auth-portal-select.html + screens/auth-login.html → ✅ DONE
- Batch 4: screens/auth-register.html + screens/auth-mfa.html → ✅ DONE
- Batch 5: screens/auth-password-reset.html + screens/auth-sso-callback.html → ✅ DONE
- Batch 6: js/components/portal-selector.js + js/components/auth-form.js → ✅ DONE
- Batch 7: js/components/mfa-challenge.js + js/components/password-reset.js → ✅ DONE
- Batch 8: js/components/sso-handler.js + js/router.js → ✅ DONE
- Batch 9: js/app.js + js/mock-data.js
- Batch 10: main.html + manifest.json

## Design Direction

Theme: Refined Executive Dark

- Background: #080d1a (deep navy)
- Surface: #0f1729 (card bg) with 1px #1e2d4a borders
- Accent: #00c8a0 (electric teal) — portal CTA, interactive states
- Gold: #d4a843 — premium/admin indicators
- Text: #f0f4ff (primary), #6b7a99 (muted)
- Font Display: "Fraunces" (Google Fonts) — serif, distinctive
- Font Body: "DM Sans" — clean, geometric
- Font Mono: "DM Mono" — data, codes
