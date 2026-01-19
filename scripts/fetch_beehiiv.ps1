$headers = @{
    'Authorization' = 'Bearer TgB3ZLTS711n2DJjuVcRuwazjxcYPi2V5u3msS5LEho4Y015gLIoFGCcDpnznA1B'
}

$allEmails = @()
$cursor = $null
$page = 1

do {
    $url = "https://api.beehiiv.com/v2/publications/pub_e94d7f88-c88d-49ec-833b-a54d9a2a96da/subscriptions?limit=100"
    if ($cursor) {
        $url += "&cursor=$cursor"
    }

    $response = Invoke-RestMethod -Uri $url -Headers $headers
    $emails = $response.data | ForEach-Object { $_.email.ToLower() }
    $allEmails += $emails

    Write-Host "Page $page : $($emails.Count) emails (Total so far: $($allEmails.Count))"

    $cursor = $response.next_cursor
    $page++

} while ($response.has_more -eq $true)

Write-Host "`nTotal subscribers in Beehiiv: $($allEmails.Count)"

$allEmails | Out-File -FilePath "C:\Users\sango\Waza\San Luis Way\directory-SLP\beehiiv_all_emails.txt" -Encoding utf8
Write-Host "Saved to beehiiv_all_emails.txt"
