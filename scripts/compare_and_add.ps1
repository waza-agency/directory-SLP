$headers = @{
    'Authorization' = 'Bearer TgB3ZLTS711n2DJjuVcRuwazjxcYPi2V5u3msS5LEho4Y015gLIoFGCcDpnznA1B'
    'Content-Type' = 'application/json'
}

# Load existing Beehiiv emails
$beehiivEmails = Get-Content "C:\Users\sango\Waza\San Luis Way\directory-SLP\beehiiv_all_emails.txt" | ForEach-Object { $_.Trim().ToLower() } | Where-Object { $_ -ne "" }
Write-Host "Beehiiv subscribers: $($beehiivEmails.Count)"

# Load CSV emails
$csvData = Import-Csv -Path "C:\Users\sango\Downloads\leads (13).csv"
$csvEmails = $csvData | Where-Object { $_.Email -and $_.Email.Trim() -ne "" } | ForEach-Object { $_.Email.Trim().ToLower() }
Write-Host "CSV leads: $($csvEmails.Count)"

# Find new emails (in CSV but not in Beehiiv)
$newEmails = $csvEmails | Where-Object { $beehiivEmails -notcontains $_ } | Select-Object -Unique

# Filter out invalid emails (no @ or obvious typos)
$validNewEmails = $newEmails | Where-Object { $_ -match '^[^@]+@[^@]+\.[^@]+$' -and $_ -notmatch '\.con$' -and $_ -notmatch '@gmail\.comy$' }

Write-Host "`nNew valid emails to add: $($validNewEmails.Count)"

# Save new emails list for reference
$validNewEmails | Out-File -FilePath "C:\Users\sango\Waza\San Luis Way\directory-SLP\new_emails_to_add.txt" -Encoding utf8

# Add each new subscriber
$added = 0
$failed = 0

foreach ($email in $validNewEmails) {
    $body = @{
        email = $email
        reactivate_existing = $false
        utm_source = "csv_import"
        utm_medium = "import"
        utm_campaign = "lead_import_jan2026"
        referring_site = "https://www.sanluisway.com"
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "https://api.beehiiv.com/v2/publications/pub_e94d7f88-c88d-49ec-833b-a54d9a2a96da/subscriptions" -Method POST -Headers $headers -Body $body
        $added++
        Write-Host "[$added] Added: $email"
    }
    catch {
        $failed++
        $errorMsg = $_.Exception.Message
        if ($errorMsg -match "already exists") {
            Write-Host "Skipped (exists): $email"
        } else {
            Write-Host "Failed: $email - $errorMsg"
        }
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Successfully added: $added"
Write-Host "Failed/Skipped: $failed"
Write-Host "Total processed: $($added + $failed)"
