# Fetch all Beehiiv subscribers
# Requires: $env:BEEHIIV_API_KEY environment variable

if (-not $env:BEEHIIV_API_KEY) {
    Write-Error "BEEHIIV_API_KEY environment variable is not set. Please set it before running this script."
    exit 1
}

$headers = @{
    'Authorization' = "Bearer $env:BEEHIIV_API_KEY"
}

$allEmails = @()
$cursor = $null
$page = 1

do {
    $url = "https://api.beehiiv.com/v2/publications/pub_e94d7f88-c88d-49ec-833b-a54d9a2a96da/subscriptions?limit=100"
    if ($cursor) {
        $url += "&cursor=$cursor"
    }

    try {
        $response = Invoke-RestMethod -Uri $url -Headers $headers -ErrorAction Stop
    }
    catch {
        Write-Error "Failed to fetch subscribers: $($_.Exception.Message)"
        exit 1
    }

    $emails = $response.data | Where-Object { $_.email -and $_.email.Trim() -ne "" } | ForEach-Object { $_.email.ToLower() }
    $allEmails += $emails

    Write-Host "Page $page : $($emails.Count) emails (Total so far: $($allEmails.Count))"

    $cursor = $response.next_cursor
    $page++

} while ($response.has_more -eq $true)

Write-Host "`nTotal subscribers in Beehiiv: $($allEmails.Count)"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputPath = Join-Path (Split-Path -Parent $scriptDir) "beehiiv_all_emails.txt"
$allEmails | Out-File -FilePath $outputPath -Encoding utf8
Write-Host "Saved to beehiiv_all_emails.txt"
