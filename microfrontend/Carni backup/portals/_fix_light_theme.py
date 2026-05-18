#!/usr/bin/env python3
"""
Fix Light Theme Glitch for Carini Group Portals
================================================
1. Adds data-theme="light" directly to <html> tag on every page (prevents FODT)
2. Injects a blocking (non-defer) <script> as first child of <head> that also
   sets data-theme="light" — this runs synchronously before CSS paints.
3. Strips all remaining dark-mode CSS override blocks from all HTML files.
"""

import os, re

PORTAL_DIR = r"d:\Dev8x\Primary\microfrontend\carini-group\portals"

FILES = [
    "index.html",
    "phase0_auth.html",
    "phase1_crm_pipeline.html",
    "phase2_admin_dashboard.html",
    "phase2_deal_room.html",
    "phase3_ai_generator.html",
    "phase3_dashboards.html",
    "phase3_property_search.html",
    "boutique-redesign.html",
    "international_hub.html",
    "investor_portfolio.html",
    "lead_capture.html",
    "neighbourhood_hub.html",
    "outreach_engine.html",
]

# The blocking inline script — runs BEFORE any CSS is applied
LIGHT_LOCK_SCRIPT = (
    '<script>document.documentElement.setAttribute("data-theme","light");</script>'
)

results = []

for fname in FILES:
    fpath = os.path.join(PORTAL_DIR, fname)
    if not os.path.exists(fpath):
        results.append(f"SKIP (not found): {fname}")
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # ── 1. Add data-theme="light" to <html> tag ──────────────────────────────
    # Replace <html ...> but only if it doesn't already have data-theme="light"
    def add_data_theme(m):
        tag = m.group(0)
        if 'data-theme' in tag:
            # Replace whatever value is there with "light"
            tag = re.sub(r'data-theme="[^"]*"', 'data-theme="light"', tag)
        else:
            # Insert before closing >
            tag = tag.rstrip('>') + ' data-theme="light">'
        return tag

    content = re.sub(r'<html[^>]*>', add_data_theme, content, count=1, flags=re.IGNORECASE)

    # ── 2. Inject blocking script as FIRST child of <head> ───────────────────
    if LIGHT_LOCK_SCRIPT not in content:
        content = re.sub(
            r'(<head[^>]*>)',
            r'\1\n  ' + LIGHT_LOCK_SCRIPT,
            content,
            count=1,
            flags=re.IGNORECASE
        )

    # ── 3. Remove ALL dark-mode CSS override blocks from inline <style> ──────
    # Pattern: matches from the comment header through a closing </style> 
    # capturing only the dark-mode section.
    # We target blocks starting with common dark override comment patterns.

    dark_patterns = [
        # /* ── DARK MODE OVERRIDES ── */ ... </style>  (only the dark lines)
        # Strategy: remove entire contiguous groups of html[data-theme="dark"] rules
        r'\n?\s*/\*[^\*]*DARK[^\*]*\*/\s*\n(?:html\[data-theme="dark"\][^}]*\}\s*\n?)+',
        r'\n?\s*/\*[^\*]*DARK[^\*]*\*/\s*\n(?:html\[data-theme="dark"\][^\n]*\n?)+',
        # Single-line html[data-theme="dark"] rules
        r'\nhtml\[data-theme="dark"\][^\n]+',
        # Multi-line html[data-theme="dark"] blocks
        r'\nhtml\[data-theme="dark"\]\s+[^{]+\{[^}]*\}',
    ]

    for pat in dark_patterns:
        content = re.sub(pat, '', content, flags=re.DOTALL)

    # ── 4. Remove leftover empty comment blocks  ──────────────────────────────
    content = re.sub(r'/\*[^\*]*DARK MODE OVERRIDES[^\*]*\*/', '', content)
    content = re.sub(r'/\*[^\*]*DARK THEME OVERRIDES[^\*]*\*/', '', content)
    content = re.sub(r'/\*\s*── DARK MODE OVERRIDES ──\s*\*/', '', content)
    content = re.sub(r'/\*\s*── DARK THEME OVERRIDES ──\s*\*/', '', content)

    # ── 5. Clean up leftover blank lines (max 2 consecutive) ─────────────────
    content = re.sub(r'\n{4,}', '\n\n\n', content)

    if content != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        results.append(f"FIXED: {fname}")
    else:
        results.append(f"NO CHANGE: {fname}")

print("\n".join(results))
print(f"\nDone. Processed {len(FILES)} files.")
