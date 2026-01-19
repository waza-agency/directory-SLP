# Fix email typos and add corrected emails to Beehiiv
# Requires: $env:BEEHIIV_API_KEY environment variable
# Usage: .\fix_typos.ps1 -CsvPath "path\to\leads.csv" -CorrectionsPath "path\to\corrections.json"
#
# corrections.json format:
# {
#   "typo@example.con": "typo@example.com",
#   "another@gmail.comy": "another@gmail.com"
# }

param(
    [Parameter(Mandatory=$true)]
    [string]$CsvPath,

    [Parameter(Mandatory=$false)]
    [string]$CorrectionsPath
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

# Load CSV and find emails with typos
$csvData = Import-Csv -Path $CsvPath

# Find emails with common typos (fixed grouping for -and/-or)
$typoEmails = $csvData | Where-Object {
    $_.Email -and (
        $_.Email -match '\.con$' -or
        $_.Email -match '\.comy$' -or
        $_.Email -match '@hotmal\.com$' -or
        ($_.Email -match '\d$' -and $_.Email -match '@gmail\.com\d+$')
    )
} | Select-Object Name, Email

Write-Host "=== Emails with typos found ===" -ForegroundColor Yellow
$typoEmails | ForEach-Object { Write-Host "$($_.Name): $($_.Email)" }

# Load corrections from external file if provided
$corrections = @{}
if ($CorrectionsPath -and (Test-Path $CorrectionsPath)) {
    $corrections = Get-Content $CorrectionsPath -Raw | ConvertFrom-Json -AsHashtable
    Write-Host "`n=== Corrections loaded from file ===" -ForegroundColor Cyan
} else {
    Write-Host "`nNo corrections file provided. Create a JSON file with typo->correct mappings." -ForegroundColor Yellow
    Write-Host "Example format:"
    Write-Host '{ "typo@example.con": "typo@example.com" }'
    exit 0
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
        utm_campaign = "lead_import_fixed"
        referring_site = "https://www.sanluisway.com"
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "https://api.beehiiv.com/v2/publications/pub_e94d7f88-c88d-49ec-833b-a54d9a2a96da/subscriptions" -Method POST -Headers $headers -Body $body -ErrorAction Stop
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
