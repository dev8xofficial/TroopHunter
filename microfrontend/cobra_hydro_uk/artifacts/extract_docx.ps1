Add-Type -AssemblyName System.IO.Compression.FileSystem

function Extract-DocxText($path) {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
    $entry = $zip.Entries | Where-Object { $_.FullName -eq "word/document.xml" }
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = [xml]$reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()
    
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    
    $paragraphs = $xml.SelectNodes("//w:p", $ns)
    $text = @()
    foreach ($p in $paragraphs) {
        $runs = $p.SelectNodes(".//w:t", $ns)
        $line = ""
        foreach ($r in $runs) {
            $line += $r.InnerText
        }
        if ($line.Trim() -ne "") {
            $text += $line
        }
    }
    return $text -join "`n"
}

$text1 = Extract-DocxText "d:\Arham\Dev8X\TroopHunter\microfrontend\cobra_hydro_uk\artifacts\p4b_Cobra_hydro_uk_Company_Report.md.docx"
Set-Content -Path "d:\Arham\Dev8X\TroopHunter\microfrontend\cobra_hydro_uk\artifacts\p4b_extracted.txt" -Value $text1 -Encoding UTF8

$text2 = Extract-DocxText "d:\Arham\Dev8X\TroopHunter\microfrontend\cobra_hydro_uk\artifacts\p4a_Business_Operations_Manual.docx.docx"
Set-Content -Path "d:\Arham\Dev8X\TroopHunter\microfrontend\cobra_hydro_uk\artifacts\p4a_extracted.txt" -Value $text2 -Encoding UTF8

Write-Host "Done extracting both files."
