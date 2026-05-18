$c = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)
$idx = $c.IndexOf('v2.0 MODERNIZATION')
Write-Host "Found at index: $idx"
if ($idx -gt 0) {
    $snippet = $c.Substring([Math]::Max(0,$idx-20), 80)
    Write-Host "Context: $snippet"
    # Show hex values of chars around the comment
    $chars = $c.ToCharArray()
    for ($i = $idx - 5; $i -lt $idx + 5; $i++) {
        Write-Host "Char[$i]: $([int]$chars[$i]) = '$($chars[$i])'"
    }
}
