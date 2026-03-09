# Import Weekly Leads to beehiiv

Weekly lead import skill for Monday uploads.

## Usage
```
/import-leads [path-to-csv]
```

If no path is provided, defaults to the most recent `leads*.csv` in `~/Downloads/`.

## Steps

1. **Locate the CSV file**: Use the provided path or find the latest `leads*.csv` in `C:\Users\sango\Downloads\`
2. **Preview the CSV**: Show the first few rows and total count to confirm with the user
3. **Refresh existing subscribers**: Run `node scripts/fetch-beehiiv-emails.js` to update `beehiiv_all_emails.txt`
4. **Import new leads**: Run `node scripts/import-csv-subscribers.js "<path-to-csv>"`
5. **Report results**: Show the summary (new, existing, failed)
6. **Update logs**: Add entry to CHANGE_LOG.md with the import results

## Notes
- The CSV must have `Email` and `Name` columns (standard Mailchimp/CRM export format)
- Deduplication is automatic against existing beehiiv subscribers
- No welcome email is sent (configured in the script)
- UTM tags are set automatically: source=csv_import, medium=bulk_upload
