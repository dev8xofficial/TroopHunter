$names = @('zeeshan-b','ali-hamza','kumail-r','tariq-s','amish-m','tayyab-rashid','jawad-a','abdullah-l','ilyas-karim','muhammad-shoaib','jan-schwa','johnnie-r','chris-l','assif-v','cody-r','sabrina-d','herman-k','gregory-r','david-m','lucas-r','roberto-o','emory-r','samarth-m','christa-d','chadwick-m','muhammad-h','kirk-c','brenden-l','chris-h','len-k','kirill-g')
$src = 'D:\Ali Mohsin\Dev8x\Primary\TroopHunter\freelancers\kumail-raza'
$base = 'D:\Ali Mohsin\Dev8x\Primary\TroopHunter\freelancers'
foreach ($n in $names) {
    $dest = Join-Path $base $n
    if (Test-Path $dest) {
        Write-Output "Skipping $n (already exists)"
        continue
    }

    New-Item -ItemType Directory -Path $dest | Out-Null
    Copy-Item -Path (Join-Path $src '*') -Destination $dest -Recurse -Force -ErrorAction Stop
    Write-Output "Copied $n"
}
