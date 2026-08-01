#!/usr/bin/env bash
# Rebuild every cluster image from source and push it to the private registry.
#
#     ./kubernetes/build-images.sh                 # build + push everything, dated tag
#     ./kubernetes/build-images.sh -t 2026-08-01a  # a tag you choose
#     ./kubernetes/build-images.sh -s businesses   # just one service
#     ./kubernetes/build-images.sh -n              # build only, do not push
#
# ⚠ WHY THIS EXISTS. The registry holds ~25 GB of images with no backup, on a machine due to
# be wiped for Proxmox 9. Abdul's call (2026-07-31) was not to back them up but to make
# rebuilding repeatable: "We can rebuild them in mac and push them again. Rebuilding them
# must be more and more automatic."
#
# That is the right trade — images are derived artefacts. The source is the asset, and a
# build you can run on demand beats a backup of an output. This script is step one; GitHub
# Actions or similar is the eventual answer.
#
# ⚠ THE LIST IS NOT IN THIS FILE. It is in images.yaml, beside it. Adding a service is one
# line there. A script that carries its own list is a script that silently stops covering
# things — the same class of bug as the backup that only knew about three tables.

set -euo pipefail

# Resolve this script's own path BEFORE changing directory — `$0` is relative, so `-h`
# could not find itself once we had cd'd to the repo root.
SELF="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
cd "$(dirname "$SELF")/.."        # repo root; Dockerfiles expect it as build context
MANIFEST="kubernetes/images.yaml"

TAG=""; ONLY=""; PUSH=1
while getopts "t:s:nh" o; do
  case "$o" in
    t) TAG="$OPTARG" ;;
    s) ONLY="$OPTARG" ;;
    n) PUSH=0 ;;
    h) sed -n '2,12p' "$SELF"; exit 0 ;;
    *) exit 2 ;;
  esac
done

# ⚠ [[:space:]], NOT \s. BSD sed (macOS) does not understand \s — it silently matches
# nothing, so every value came back with its own key still attached ("push: 192.168...").
# GNU sed accepts \s, which is exactly why this kind of bug ships from a Linux machine and
# breaks on the Mac it was written for.
read_manifest () {
  grep -E "^[[:space:]]*$1:" "$MANIFEST" | head -1 \
    | sed -E "s/^[[:space:]]*$1:[[:space:]]*//; s/\"//g; s/[[:space:]]*#.*//" \
    | tr -d '[:space:]'
}

PUSH_HOST="$(read_manifest push)"
TARGET="$(read_manifest target)"

# ⚠ A DATED TAG, NEVER `:latest`. The cluster runs imagePullPolicy IfNotPresent, so pushing
# a new `:latest` deploys NOTHING — the node already has one cached and never re-fetches.
# A fresh tag is the only thing that reliably reaches a node.
if [ -z "$TAG" ]; then
  base="$(date +%Y-%m-%d)"; n=1
  while curl -sf "http://${PUSH_HOST}/v2/businesses-prod/manifests/${base}-${n}" >/dev/null 2>&1; do n=$((n+1)); done
  TAG="${base}-${n}"
fi

# ⚠ NO `mapfile` HERE. macOS ships bash 3.2, where it does not exist — the script died with
# "mapfile: command not found" on the very machine it is meant to be run from. `while read`
# works on both. Writing bash 4 syntax for a Mac is writing a script that cannot run.
SERVICES=(); DOCKERFILES=()
while IFS= read -r line; do SERVICES+=("$line"); done < <(grep -E "^[[:space:]]+- name:" "$MANIFEST" | sed -E 's/^[[:space:]]+- name:[[:space:]]*//')
while IFS= read -r line; do DOCKERFILES+=("$line"); done < <(grep -E "^[[:space:]]+dockerfile:" "$MANIFEST" | sed -E 's/^[[:space:]]+dockerfile:[[:space:]]*//')

echo "registry : $PUSH_HOST"
echo "tag      : $TAG"
echo "target   : $TARGET"
echo

built=(); failed=()
for i in "${!SERVICES[@]}"; do
  svc="${SERVICES[$i]}"; df="${DOCKERFILES[$i]}"
  [ -n "$ONLY" ] && [ "$svc" != "$ONLY" ] && continue

  image="${PUSH_HOST}/${svc}-prod:${TAG}"
  printf '  %-14s building ... ' "$svc"

  # ⚠ --platform linux/amd64 EXPLICITLY. This is built on an Apple Silicon Mac and runs on
  # x86 nodes. Without it a silently-arm64 image pushes fine and then fails to start with an
  # exec-format error that names nothing useful.
  if docker build --platform linux/amd64 -q -t "$image" -f "$df" --target "$TARGET" . >/dev/null 2>"/tmp/build-$svc.err"; then
    arch="$(docker image inspect "$image" --format '{{.Os}}/{{.Architecture}}')"
    if [ "$arch" != "linux/amd64" ]; then
      echo "WRONG ARCH ($arch)"; failed+=("$svc: built $arch, cluster needs linux/amd64"); continue
    fi
    if [ "$PUSH" -eq 1 ]; then
      printf 'pushing ... '
      if docker push -q "$image" >/dev/null 2>&1; then echo "ok"; built+=("$svc")
      else echo "PUSH FAILED"; failed+=("$svc: push"); fi
    else
      echo "ok (not pushed)"; built+=("$svc")
    fi
  else
    echo "BUILD FAILED"; failed+=("$svc: build — see /tmp/build-$svc.err")
  fi
done

echo
echo "built: ${#built[@]}   failed: ${#failed[@]}"
for f in "${failed[@]:-}"; do [ -n "$f" ] && echo "  ✗ $f"; done

if [ "${#failed[@]}" -eq 0 ] && [ "$PUSH" -eq 1 ]; then
  cat <<EOF

Deploy these by setting the tag on each deployment:

  kubectl set image deployment/<service>-prod <service>-prod=$(read_manifest pull)/<service>-prod:${TAG}

⚠ Update kubernetes/k8s/<service>/prod/<service>-deployment.yaml to the same tag, or the
next \`kubectl apply\` silently reverts to whatever is written there.
EOF
fi

[ "${#failed[@]}" -eq 0 ]
