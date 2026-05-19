# Fix Carini Group portals — wrap v2.0 MODERNIZATION OVERRIDES in html[data-theme="dark"]
# This restores the theme toggle to properly work

$files = Get-ChildItem -Path . -Filter "*.html" | Select-Object -ExpandProperty Name
$fixed = 0

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Pattern: find "/* ── v2.0 MODERNIZATION OVERRIDES ── */" comment up to </style>
    # We need to wrap from the comment start through the end of the block
    # (just before </style>) in html[data-theme="dark"] { }
    
    # Check if file has the override block AND is not already wrapped
    if ($content -match '/\*\s*── v2\.0 MODERNIZATION OVERRIDES ──\s*\*/' -and 
        $content -notmatch 'html\[data-theme="dark"\]\s*\{[^}]*v2\.0') {
        
        # Find the override comment and wrap everything from it to end of <style> block
        # Strategy: replace the comment + following CSS with a dark-mode wrapped version
        
        # Use regex to find from the comment to immediately before </style>
        $pattern = '(/\*\s*── v2\.0 MODERNIZATION OVERRIDES ──\s*\*/.+?)(\s*</style>)'
        
        if ($content -match '(?s)' + $pattern) {
            $overrideBlock = $matches[1]
            $closeStyle = $matches[2]
            
            # Find any page-specific enhancement comments and blocks that follow
            # Wrap the entire override block in html[data-theme="dark"]
            $wrapped = "`n    /* ── DARK MODE OVERRIDES (theme-aware) ── */`n    html[data-theme=""dark""] {`n$overrideBlock`n    }`n"
            
            # Replace the original with the wrapped version
            $newContent = $content -replace ('(?s)' + [regex]::Escape($overrideBlock) + '(\s*</style>)'), ($wrapped + '$1')
            
            if ($newContent -ne $content) {
                Set-Content $file -Value $newContent -Encoding UTF8 -NoNewline
                Write-Host "FIXED: $file"
                $fixed++
            } else {
                Write-Host "SKIP (no change): $file"
            }
        } else {
            Write-Host "SKIP (pattern not matched): $file"
        }
    } else {
        Write-Host "SKIP (no override block or already wrapped): $file"
    }
}

Write-Host "`nTotal files fixed: $fixed"
