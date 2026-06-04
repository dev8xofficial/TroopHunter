$names = @('zeeshan-b','ali-hamza','kumail-r','tariq-s','amish-m','tayyab-rashid','jawad-a','abdullah-l','ilyas-karim','muhammad-shoaib','jan-schwa','johnnie-r','chris-l','assif-v','cody-r','sabrina-d','herman-k','gregory-r','david-m','lucas-r','roberto-o','emory-r','samarth-m','christa-d','chadwick-m','muhammad-h','kirk-c','brenden-l','chris-h','len-k','kirill-g')
$base = 'D:\Ali Mohsin\Dev8x\Primary\TroopHunter\freelancers'
$expected = @('p1a_Website.md','p1b_Upwork.md','p1c_Linkedin_Owner.md','.gitkeep')
$all_ok = $true
foreach ($n in $names) {
    $raw = Join-Path $base (Join-Path $n 'raw')
    if (!(Test-Path $raw)) { Write-Output ($n + ': MISSING raw folder'); $all_ok = $false; continue }
    foreach ($f in $expected) {
        $p = Join-Path $raw $f
        if (!(Test-Path $p)) { Write-Output ($n + ': MISSING ' + $f); $all_ok = $false }
    }
    if ((Test-Path $raw) -and (($expected | ForEach-Object { Test-Path (Join-Path $raw $_) } | Where-Object { $_ -eq $false } | Measure-Object).Count -eq 0)) { Write-Output ($n + ': OK') }
}
if ($all_ok) { Write-Output 'ALL OK' } else { Write-Output 'SOME MISSING'; exit 1 }
