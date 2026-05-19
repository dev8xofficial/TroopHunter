import os
import re

portal_dir = r"d:\Dev8x\Primary\microfrontend\carini-group\portals"

targets = [
    "index.html",
    "phase0_auth.html",
    "phase1_crm_pipeline.html",
    "phase2_deal_room.html",
    "phase3_ai_generator.html",
    "phase3_dashboards.html",
    "phase3_property_search.html",
    "boutique-redesign.html",
    "international_hub.html",
    "investor_portfolio.html",
    "lead_capture.html",
    "neighbourhood_hub.html",
    "outreach_engine.html"
]

dark_override_replacement = """
    /* ── DARK THEME OVERRIDES ── */
    html[data-theme="dark"] nav {
      background: rgba(6, 5, 10, 0.97) !important;
      backdrop-filter: blur(28px) saturate(2) !important;
      border-bottom-color: rgba(212, 168, 67, 0.28) !important;
    }
    html[data-theme="dark"] .nav-logo { color: #d4a843 !important; letter-spacing: .10em !important; }
    html[data-theme="dark"] .nav-links a { color: rgba(240, 235, 224, 0.55) !important; }
    html[data-theme="dark"] .nav-links a:hover,
    html[data-theme="dark"] .nav-links a.active { color: #d4a843 !important; }
    html[data-theme="dark"] .topbar { background: rgba(6, 5, 10, 0.95) !important; border-bottom-color: rgba(212, 168, 67, 0.22) !important; backdrop-filter: blur(20px) !important; }
    html[data-theme="dark"] .topbar-title { color: #f5efe3 !important; }
    html[data-theme="dark"] .sb { background: #0d0c10 !important; border-right-color: rgba(212, 168, 67, 0.18) !important; }
    html[data-theme="dark"] .sb-head { border-bottom-color: rgba(212, 168, 67, 0.18) !important; }
    html[data-theme="dark"] .sb-logo { color: #d4a843 !important; }
    html[data-theme="dark"] .sb-sub { color: rgba(240, 235, 224, 0.42) !important; }
    html[data-theme="dark"] .sidebar { background: #0d0c10 !important; border-right-color: rgba(212, 168, 67, 0.20) !important; }
    html[data-theme="dark"] .module-card { background: #0d0c10 !important; border-color: rgba(212, 168, 67, 0.22) !important; }
    html[data-theme="dark"] .module-card .card-top { border-bottom-color: rgba(212, 168, 67, 0.16) !important; }
    html[data-theme="dark"] .module-card .card-name { color: #f5efe3 !important; }
    html[data-theme="dark"] .module-card .card-phase { color: #d4a843 !important; }
    html[data-theme="dark"] .module-card .card-desc { color: rgba(240, 235, 224, 0.60) !important; }
    html[data-theme="dark"] .module-card:hover { border-color: #d4a843 !important; }
    html[data-theme="dark"] .hero-title { color: #f5efe3 !important; }
    html[data-theme="dark"] .hero-sub { color: rgba(240, 235, 224, 0.68) !important; }
    html[data-theme="dark"] .hero-badge { color: #d4a843 !important; border-color: rgba(212, 168, 67, 0.30) !important; }
    html[data-theme="dark"] .hero-stat-val { color: #d4a843 !important; }
    html[data-theme="dark"] .hero-stat-label { color: rgba(240, 235, 224, 0.55) !important; }
    html[data-theme="dark"] .hero-divider { background: rgba(212, 168, 67, 0.22) !important; }
    html[data-theme="dark"] .section-label { color: #d4a843 !important; }
    html[data-theme="dark"] .section-title { color: #f5efe3 !important; }
    html[data-theme="dark"] .section-sub { color: rgba(240, 235, 224, 0.60) !important; }
    html[data-theme="dark"] .kpi { background: #0d0c10 !important; border-color: rgba(212, 168, 67, 0.20) !important; }
    html[data-theme="dark"] .kpi-val { color: #d4a843 !important; }
    html[data-theme="dark"] .kpi-lbl { color: rgba(240, 235, 224, 0.55) !important; }
    html[data-theme="dark"] .delta-up { color: #3fd68a !important; }
    html[data-theme="dark"] .delta-down { color: #f05252 !important; }
    html[data-theme="dark"] .panel { background: #0d0c10 !important; border-color: rgba(212, 168, 67, 0.18) !important; }
    html[data-theme="dark"] .panel-header, html[data-theme="dark"] .ph { border-bottom-color: rgba(212, 168, 67, 0.14) !important; }
    html[data-theme="dark"] .panel-title, html[data-theme="dark"] .ph-title { color: #f5efe3 !important; }
    html[data-theme="dark"] .s-card { background: #0d0c10 !important; border-color: rgba(212, 168, 67, 0.18) !important; }
    html[data-theme="dark"] .s-card-head { border-bottom-color: rgba(212, 168, 67, 0.14) !important; }
    html[data-theme="dark"] .s-card-title { color: #f5efe3 !important; font-weight: 500 !important; }
    html[data-theme="dark"] .pill-g { background: rgba(63, 214, 138, 0.14) !important; color: #3fd68a !important; border-color: rgba(63, 214, 138, 0.28) !important; }
    html[data-theme="dark"] .pill-b { background: rgba(77, 200, 255, 0.13) !important; color: #4dc8ff !important; border-color: rgba(77, 200, 255, 0.28) !important; }
    html[data-theme="dark"] .pill-r { background: rgba(240, 82, 82, 0.14) !important; color: #f05252 !important; border-color: rgba(240, 82, 82, 0.28) !important; }
    html[data-theme="dark"] .pill-y { background: rgba(245, 166, 35, 0.14) !important; color: #f5a623 !important; border-color: rgba(245, 166, 35, 0.28) !important; }
    html[data-theme="dark"] .pill-a { background: rgba(232, 178, 74, 0.13) !important; color: #e8b24a !important; }
    html[data-theme="dark"] .data-table th { color: rgba(240, 235, 224, 0.50) !important; letter-spacing: .10em !important; }
    html[data-theme="dark"] .data-table td { color: #f0ebe0 !important; }
    html[data-theme="dark"] .data-table tr:hover td { background: rgba(212, 168, 67, 0.06) !important; }
    html[data-theme="dark"] .build-bar { background: #0d0c10 !important; border-color: rgba(212, 168, 67, 0.22) !important; }
    html[data-theme="dark"] .build-pct { color: #d4a843 !important; }
    html[data-theme="dark"] .build-track { background: rgba(212, 168, 67, 0.10) !important; }
    html[data-theme="dark"] .build-fill { background: linear-gradient(90deg, #d4a843, #f0c55a) !important; }
    html[data-theme="dark"] .flow-dot { background: #0d0c10 !important; border-color: rgba(212, 168, 67, 0.28) !important; }
    html[data-theme="dark"] .flow-dot.gold { border-color: #d4a843 !important; background: rgba(212, 168, 67, 0.14) !important; }
    html[data-theme="dark"] .flow-dot:hover { border-color: #d4a843 !important; background: rgba(212, 168, 67, 0.16) !important; }
    html[data-theme="dark"] .flow-step-name { color: rgba(240, 235, 224, 0.58) !important; }
    html[data-theme="dark"] .flow-step-name strong { color: #f0ebe0 !important; }
    html[data-theme="dark"] .ph-action, html[data-theme="dark"] .panel-action { color: rgba(240, 235, 224, 0.55) !important; border-color: rgba(212, 168, 67, 0.22) !important; }
    html[data-theme="dark"] .ph-action:hover, html[data-theme="dark"] .panel-action:hover { color: #d4a843 !important; border-color: #d4a843 !important; }
    html[data-theme="dark"] footer { border-top-color: rgba(212, 168, 67, 0.22) !important; }
    html[data-theme="dark"] .footer-logo { color: #d4a843 !important; }
    html[data-theme="dark"] .footer-note { color: rgba(240, 235, 224, 0.38) !important; }
    html[data-theme="dark"] .footer-links a { color: rgba(240, 235, 224, 0.45) !important; }
    html[data-theme="dark"] .footer-links a:hover { color: #d4a843 !important; }
    html[data-theme="dark"] .card-fr { color: rgba(212, 168, 67, 0.55) !important; }
    html[data-theme="dark"] .card-arrow { color: rgba(240, 235, 224, 0.35) !important; }
    html[data-theme="dark"] .module-card:hover .card-arrow { color: #d4a843 !important; }
"""

fixed = 0

for filename in targets:
    filepath = os.path.join(portal_dir, filename)
    if not os.path.exists(filepath):
        print(f"SKIP: Not found {filename}")
        continue
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Search using regex to match any weird characters in the comment
    # e.g., "/* ── v2.0 MODERNIZATION OVERRIDES ── */"
    match = re.search(r'/\*.*?v2\.0 MODERNIZATION OVERRIDES.*?\*/', content)
    if not match:
        print(f"SKIP: No override block found in {filename}")
        continue
        
    start_idx = match.start()
    
    # Find the closing </style>
    end_tag = "</style>"
    end_idx = content.find(end_tag, start_idx)
    if end_idx < 0:
        print(f"SKIP: No closing </style> found in {filename}")
        continue
        
    # See if there's a page-specific section
    block_content = content[start_idx:end_idx]
    # Find another /* ── something ── */ that is NOT v2.0
    # E.g. /* ── INDEX PAGE ENHANCEMENTS ── */
    # Be careful not to match standard comments, look for capital letters and ENHANCEMENTS
    ps_match = re.search(r'\s*/\*[^*]*ENHANCEMENTS.*?\*/', block_content)
    
    page_specific_block = ""
    if ps_match:
        ps_start = start_idx + ps_match.start()
        page_specific_block = "\n" + content[ps_start:end_idx].rstrip()
        
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_content = before + dark_override_replacement.lstrip() + page_specific_block + "\n  " + after.lstrip()
    
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"FIXED: {filename}")
        fixed += 1
    else:
        print(f"NO CHANGE: {filename}")
        
print(f"\\n✓ Fixed {fixed} files.")
