# Compare CSV leads with Beehiiv subscribers and add new ones
# Requires: $env:BEEHIIV_API_KEY environment variable
# Usage: .\compare_and_add.ps1 -CsvPath "path\to\leads.csv"

param(
    [Parameter(Mandatory=$true)]
    [string]$CsvPath
)

if (-not $env:BEEHIIV_API_KEY) {
    Write-Error "BEEHIIV_API_KEY environment variable is not set. Please set it before running this script."
    exit 1
}

if (-not (Test-Path $CsvPath)) {
    Write-Error "CSV file not found: $CsvPath"
    exit 1
}

$headers = @{
    'Authorization' = "Bearer $env:BEEHIIV_API_KEY"
    'Content-Type' = 'application/json'
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir

# Load existing Beehiiv emails
$beehiivPath = Join-Path $projectDir "beehiiv_all_emails.txt"
if (-not (Test-Path $beehiivPath)) {
    Write-Error "Beehiiv emails file not found. Run fetch_beehiiv.ps1 first."
    exit 1
}

$beehiivEmails = Get-Content $beehiivPath | ForEach-Object { $_.Trim().ToLower() } | Where-Object { $_ -ne "" }
Write-Host "Beehiiv subscribers: $($beehiivEmails.Count)"

# Load CSV emails
$csvData = Import-Csv -Path $CsvPath
$csvEmails = $csvData | Where-Object { $_.Email -and $_.Email.Trim() -ne "" } | ForEach-Object { $_.Email.Trim().ToLower() }
Write-Host "CSV leads: $($csvEmails.Count)"

# Find new emails (in CSV but not in Beehiiv)
$newEmails = $csvEmails | Where-Object { $beehiivEmails -notcontains $_ } | Select-Object -Unique

# Filter out invalid emails (no @ or obvious typos)
$validNewEmails = $newEmails | Where-Object { $_ -match '^[^@]+@[^@]+\.[^@]+$' -and $_ -notmatch '\.con$' -and $_ -notmatch '@gmail\.comy$' }

Write-Host "`nNew valid emails to add: $($validNewEmails.Count)"

# Save new emails list for reference
$outputPath = Join-Path $projectDir "new_emails_to_add.txt"
$validNewEmails | Out-File -FilePath $outputPath -Encoding utf8

# Add each new subscriber
$added = 0
$failed = 0

foreach ($email in $validNewEmails) {
    $body = @{
        email = $email
        reactivate_existing = $false
        utm_source = "csv_import"
        utm_medium = "import"
        utm_campaign = "lead_import"
        referring_site = "https://www.sanluisway.com"
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "https://api.beehiiv.com/v2/publications/pub_e94d7f88-c88d-49ec-833b-a54d9a2a96da/subscriptions" -Method POST -Headers $headers -Body $body -ErrorAction Stop
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
