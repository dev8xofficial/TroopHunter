# Fix Carini Group portals: scope "v2.0 MODERNIZATION OVERRIDES" to dark theme only.
# Uses exact string matching — safe and predictable.

Set-Location $PSScriptRoot

# The shared override block that appears in all portal files (verbatim)
# We'll detect files that have the "v2.0 MODERNIZATION OVERRIDES" comment
# and replace the entire block with a properly-scoped version.

$darkOverrideReplacement = @'
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
'@

$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "phase2_admin_dashboard.html" }
$fixed = 0

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    
    if ($content -notmatch '\/\* ── v2\.0 MODERNIZATION OVERRIDES ── \*\/') {
        Write-Host "SKIP (no block): $($f.Name)"
        continue
    }

    # Find where the override block starts
    $startPattern = '/* ── v2.0 MODERNIZATION OVERRIDES ── */'
    $startIdx = $content.IndexOf($startPattern)
    if ($startIdx -lt 0) { Write-Host "SKIP (not found): $($f.Name)"; continue }

    # Find the </style> closing tag after this block
    $endTag = '</style>'
    $endIdx = $content.IndexOf($endTag, $startIdx)
    if ($endIdx -lt 0) { Write-Host "SKIP (no end style): $($f.Name)"; continue }

    # Check for page-specific enhancement section (e.g., "/* ── INDEX PAGE ENHANCEMENTS ── */")
    # We need to detect if there's page-specific CSS AFTER the shared block
    # Pattern: look for another /* ── comment after the override block
    $blockContent = $content.Substring($startIdx, $endIdx - $startIdx)
    
    # Find the second comment section if any (page-specific enhancements)
    $pageSpecificPattern = '\s*\/\* ──(?! v2\.0)'
    $psMatch = [regex]::Match($blockContent, $pageSpecificPattern)
    
    $pageSpecificBlock = ''
    $sharedBlockEnd = $endIdx
    
    if ($psMatch.Success) {
        $psStart = $startIdx + $psMatch.Index
        $pageSpecificBlock = "`n" + $content.Substring($psStart, $endIdx - $psStart).TrimEnd()
        $sharedBlockEnd = $psStart
    }

    # Build new content: replace from startIdx to endIdx
    $before = $content.Substring(0, $startIdx)
    $after = $content.Substring($endIdx)
    
    $newContent = $before + $darkOverrideReplacement.TrimStart() + $pageSpecificBlock + "`n  " + $after.TrimStart()
    
    if ($newContent -ne $content) {
        [System.IO.File]::WriteAllText($f.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "FIXED: $($f.Name)"
        $fixed++
    } else {
        Write-Host "NO CHANGE: $($f.Name)"
    }
}

Write-Host "`nDone. Fixed $fixed files."
