import os
import re

portal_dir = r"d:\Dev8x\Primary\microfrontend\carini-group\portals"

targets = [
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
    "outreach_engine.html"
]

fixed = 0

for filename in targets:
    filepath = os.path.join(portal_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Search for the block starting with DARK THEME OVERRIDES
    match = re.search(r'\s*/\*\s*──\s*DARK THEME OVERRIDES\s*──\s*\*/', content)
    if not match:
        # Also try to match the old v2.0 MODERNIZATION OVERRIDES just in case
        match = re.search(r'\s*/\*.*?v2\.0 MODERNIZATION OVERRIDES.*?\*/', content)
        if not match:
            print(f"SKIP: No override block found in {filename}")
            continue
        
    start_idx = match.start()
    
    # Find the closing </style>
    end_tag = "</style>"
    end_idx = content.find(end_tag, start_idx)
    if end_idx < 0:
        continue
        
    # See if there's a page-specific section we should preserve
    block_content = content[start_idx:end_idx]
    
    ps_match = re.search(r'\s*/\*[^*]*ENHANCEMENTS.*?\*/', block_content)
    
    page_specific_block = ""
    if ps_match:
        ps_start = start_idx + ps_match.start()
        page_specific_block = "\n" + content[ps_start:end_idx].rstrip()
        
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_content = before + page_specific_block + "\n  " + after.lstrip()
    
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"FIXED: {filename}")
        fixed += 1
    else:
        print(f"NO CHANGE: {filename}")
        
print(f"Removed dark mode overrides in {fixed} files.")
