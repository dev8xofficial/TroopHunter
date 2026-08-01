# Shared app configuration — SEC-S7 step 2

⚠ **These manifests are step 2 of the sequence in `forge/infrastructure/architecture/security-layer.md` §9,
and applying them changes nothing on its own. That is the point.**

The five services currently read their configuration from a `.env.production` file **baked into
the image** — 12 variables each (17 for auth). `.dockerignore` puts them there deliberately, via
`!microservices/*/.env.production`.

Removing that file is one line. The migration is not: strip it today and `auth-prod` loses its
JWT signing key and mail credentials and stops working. So the order is:

| Step | What | Safe? |
|---|---|---|
| 1 | (done) measure what each image actually carries | read-only |
| **2** | **apply these manifests** — the pods gain the variables in their environment | ✅ **provably safe: the app still reads the baked file, nothing changes behaviour** |
| 3 | verify every pod's env holds all 12/17 | read-only |
| 4 | remove the `!` lines from `.dockerignore`, rebuild, redeploy | the first risky step |
| 5 | **rotate `JWT_SECRET` across all five together** | needs a chosen window |

## ⚠ Why step 5 is not optional and not routine

`JWT_SECRET` is the **same value in all five services** — it has to be, or a token minted by
`auth` would not validate in `businesses`. So it is one key copied into five anonymously
pullable images. It must be assumed known to anyone who has been on the LAN, and with it a
token can be forged as any user.

Rotating it invalidates every live session at that moment, and all five services must deploy
together or tokens signed by the others stop validating. Pick a window.

## ⚠ No real values live in this directory

`app-secrets.example.yaml` is a template. The real Secret is created from the vault and never
committed — the whole point of S7 is that secrets stop travelling inside artefacts, and a
secret in git travels further than one in an image.
