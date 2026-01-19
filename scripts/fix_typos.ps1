$headers = @{
    'Authorization' = 'Bearer TgB3ZLTS711n2DJjuVcRuwazjxcYPi2V5u3msS5LEho4Y015gLIoFGCcDpnznA1B'
    'Content-Type' = 'application/json'
}

# Load CSV and find emails with typos
$csvData = Import-Csv -Path "C:\Users\sango\Downloads\leads (12).csv"

# Find emails with common typos
$typoEmails = $csvData | Where-Object {
    $_.Email -and (
        $_.Email -match '\.con$' -or
        $_.Email -match '\.comy$' -or
        $_.Email -match '@hotmal\.com$' -or
        $_.Email -match '\d$' -and $_.Email -match '@gmail\.com\d+$'
    )
} | Select-Object Name, Email

Write-Host "=== Emails with typos found ===" -ForegroundColor Yellow
$typoEmails | ForEach-Object { Write-Host "$($_.Name): $($_.Email)" }

# Define corrections
$corrections = @{
    'pichardo38@hotmail.con' = 'pichardo38@hotmail.com'
    'mariacossio11@gmail.con' = 'mariacossio11@gmail.com'
    'yiyis1505@gmail.comy' = 'yiyis1505@gmail.com'
    'Muro.md@hotmail.con' = 'Muro.md@hotmail.com'
    'serranopablo@hotmal.com' = 'serranopablo@hotmail.com'
    'soteloisaac76@gmail.com8' = 'soteloisaac76@gmail.com'
    'albertoyubaile@gmail.com.mx' = 'albertoyubaile@gmail.com'
}

Write-Host "`n=== Corrections to apply ===" -ForegroundColor Cyan
$corrections.GetEnumerator() | ForEach-Object {
    Write-Host "$($_.Key) -> $($_.Value)"
}

# Add corrected emails
Write-Host "`n=== Adding corrected emails ===" -ForegroundColor Green
$added = 0

foreach ($entry in $corrections.GetEnumerator()) {
    $correctedEmail = $entry.Value.ToLower()

    $body = @{
        email = $correctedEmail
        reactivate_existing = $false
        utm_source = "csv_import"
        utm_medium = "import"
        utm_campaign = "lead_import_jan2026_fixed"
        referring_site = "https://www.sanluisway.com"
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "https://api.beehiiv.com/v2/publications/pub_e94d7f88-c88d-49ec-833b-a54d9a2a96da/subscriptions" -Method POST -Headers $headers -Body $body
        $added++
        Write-Host "Added: $correctedEmail (was: $($entry.Key))"
    }
    catch {
        $errorBody = $_.ErrorDetails.Message
        if ($errorBody -match "already exists" -or $errorBody -match "duplicate") {
            Write-Host "Already exists: $correctedEmail"
        } else {
            Write-Host "Failed: $correctedEmail - $($_.Exception.Message)"
        }
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Magenta
Write-Host "Corrected and added: $added emails"
