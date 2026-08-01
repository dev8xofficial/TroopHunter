#!/usr/bin/env python3
"""Refuse to let this repo's inventory drift from the fleet's node registry.

⚠ WHY THIS IS A CHECK AND NOT AN IMPORT.

The addresses of the Proxmox nodes are declared once, in the infrastructure repo:

    forge/infrastructure/desired-state/nodes/registry.yaml

This repo keeps its OWN copy in ansible/inventories/ -- `dell3 ansible_host=192.168.1.30`,
`pve ansible_host=192.168.1.125`. That is a fourth independent copy of a fact that already has
an owner, and nothing kept them in step.

The obvious fix -- have this repo READ the other repo's file -- is worse than the problem.
These are two separate git repositories. A relative path into a sibling checkout works on one
laptop and breaks on every CI runner, container, and colleague's machine, and it fails at the
moment you can least debug it. Coupling two repos' filesystems to avoid duplicating three
numbers is a bad trade.

So: the duplication stays, and DIVERGENCE becomes loud. If the registry is not present, this
skips cleanly rather than failing -- a check that cannot run is not a check that failed.

    python3 ansible/check-node-registry.py           # report
    python3 ansible/check-node-registry.py --strict  # non-zero exit on drift (for CI)
"""
import os
import re
import sys
import pathlib

# Searched in order. The env var wins so CI can point at wherever it checked the repo out.
CANDIDATES = [
    os.environ.get("DEV8X_NODE_REGISTRY", ""),
    "../../forge/infrastructure/desired-state/nodes/registry.yaml",
    "../../../forge/infrastructure/desired-state/nodes/registry.yaml",
]

HERE = pathlib.Path(__file__).resolve().parent


def find_registry():
    for c in CANDIDATES:
        if not c:
            continue
        p = (HERE / c).resolve() if not os.path.isabs(c) else pathlib.Path(c)
        if p.is_file():
            return p
    return None


def registry_addresses(path):
    """Parse `node: { address: x.x.x.x }` without requiring PyYAML.

    ⚠ Deliberately dumb. Pulling in a YAML dependency so a drift CHECK can run is how a
    check stops being run at all.
    """
    out, node = {}, None
    for line in path.read_text().splitlines():
        m = re.match(r"^  ([a-z0-9_-]+):\s*$", line)
        if m:
            node = m.group(1)
        elif node:
            a = re.match(r"^\s+address:\s*([0-9.]+)\s*$", line)
            if a:
                out[node] = a.group(1)
                node = None
    return out


def inventory_addresses():
    out = {}
    inv = HERE / "inventories"
    if not inv.is_dir():
        return out
    for f in inv.rglob("*"):
        if not f.is_file():
            continue
        for line in f.read_text(errors="ignore").splitlines():
            m = re.match(r"^\s*([a-z0-9_-]+)\s+ansible_host=([0-9.]+)", line)
            if m:
                out.setdefault(m.group(1), set()).add((m.group(2), f.name))
    return out


def main():
    strict = "--strict" in sys.argv
    reg_path = find_registry()
    if not reg_path:
        print("  node registry not found alongside this repo — skipping (this is not a failure).")
        print("  set DEV8X_NODE_REGISTRY to check it explicitly.")
        return 0

    reg = registry_addresses(reg_path)
    inv = inventory_addresses()
    print(f"  registry: {reg_path}")

    drift = []
    for host, entries in sorted(inv.items()):
        if host not in reg:
            continue                      # not a Proxmox node; the registry does not own it
        for addr, fname in sorted(entries):
            if addr != reg[host]:
                drift.append((host, addr, fname, reg[host]))
            else:
                print(f"  ✓ {host:<8} {addr:<15} matches the registry   ({fname})")

    for host, addr, fname, want in drift:
        print(f"  ⚠ DRIFT {host}: inventory says {addr} ({fname}), registry says {want}")

    if drift:
        print("\n  The registry is the source. Fix it there first, then this inventory.")
        return 1 if strict else 0
    print("  no drift")
    return 0


if __name__ == "__main__":
    sys.exit(main())
