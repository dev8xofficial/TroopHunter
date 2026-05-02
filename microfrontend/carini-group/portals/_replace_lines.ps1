param([string]$FilePath, [int]$StartLine, [int]$EndLine, [string]$ReplacementText)

$lines = Get-Content $FilePath -Encoding UTF8
$before = $lines[0..($StartLine - 2)]
$after = $lines[$EndLine..($lines.Length - 1)]

$newLines = $before + $ReplacementText.Split("`n") + $after
Set-Content $FilePath $newLines -Encoding UTF8
Write-Host "Done: $FilePath (replaced lines $StartLine-$EndLine)"
