import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get credentials
    const credentialsPath = path.resolve(process.env.GOOGLE_CREDENTIALS_PATH || 'credenciales.json');
    const credentialsExist = fs.existsSync(credentialsPath);
    console.log(`Credentials file path: ${credentialsPath}, exists: ${credentialsExist}`);
    
    // Direct Google Sheets test
    if (!credentialsExist) {
      return res.status(400).json({
        success: false,
        error: 'Credentials file not found'
      });
    }
    
    // Read credentials
    try {
      const rawCredentials = fs.readFileSync(credentialsPath, 'utf8');
      const credentials = JSON.parse(rawCredentials);
      
      // Authenticate directly
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
      
      // Initialize sheets API
      const sheets = google.sheets({
        version: 'v4',
        auth: auth
      });
      
      // Get sheet ID from env or use a default
      const spreadsheetId = process.env.GOOGLE_SHEET_ID || '1xZY2TRiXNOczzbE9AxeRRMzgPIMG4lepOG1ywl4milo';
      
      // Try to access the sheet directly
      console.log(`Accessing sheet: ${spreadsheetId}`);
      
      try {
        // First just get the spreadsheet info
        const sheetInfo = await sheets.spreadsheets.get({
          spreadsheetId
        });
        
        console.log('Sheet info retrieved successfully');
        console.log('Available sheets:', sheetInfo.data.sheets?.map(sheet => sheet.properties?.title));
        
        // Get the first sheet name if available
        const firstSheetName = sheetInfo.data.sheets && 
                              sheetInfo.data.sheets.length > 0 && 
                              sheetInfo.data.sheets[0].properties?.title;
        
        // Try three sheet name possibilities: Places, Sheet1, or the first sheet name
        const possibleSheetNames = ['Places', 'Sheet1', firstSheetName].filter(Boolean);
        
        let successfulSheet = null;
        let successfulData = null;
        
        // Try each sheet name
        for (const sheetName of possibleSheetNames) {
          try {
            console.log(`Trying to access sheet named "${sheetName}"`);
            const testResponse = await sheets.spreadsheets.values.get({
              spreadsheetId,
              range: `${sheetName}!A1:D5`, // Just get the first few cells
            });
            
            if (testResponse.data.values && testResponse.data.values.length > 0) {
              console.log(`Successfully got data from sheet "${sheetName}"`);
              successfulSheet = sheetName;
              successfulData = testResponse.data.values;
              break;
            }
          } catch (e) {
            console.log(`Error accessing sheet "${sheetName}":`, e);
          }
        }
        
        // Now try with the successful sheet or the first sheet again for more data
        if (successfulSheet) {
          try {
            // Try to get cell AC1 to see if it contains "Negocio Destacado"
            const headerResponse = await sheets.spreadsheets.values.get({
              spreadsheetId,
              range: `${successfulSheet}!AC1:AC1`,
            });
            
            const column29Header = headerResponse.data.values?.[0]?.[0] || 'Not found';
            
            return res.status(200).json({
              success: true,
              sheetTitle: sheetInfo.data.properties?.title,
              sheetCount: sheetInfo.data.sheets?.length,
              sheetNames: sheetInfo.data.sheets?.map(sheet => sheet.properties?.title),
              workingSheetName: successfulSheet,
              featuredColumnHeader: column29Header,
              rowsRetrieved: successfulData?.length || 0,
              sampleData: successfulData,
              credentials: {
                type: credentials.type,
                client_email: credentials.client_email,
                project_id: credentials.project_id
              }
            });
          } catch (columnError: any) {
            console.error('Error checking column header:', columnError);
            // Continue with regular response
          }
        }
        
        // Regular response if we couldn't check the column header
        return res.status(200).json({
          success: true,
          sheetTitle: sheetInfo.data.properties?.title,
          sheetCount: sheetInfo.data.sheets?.length,
          sheetNames: sheetInfo.data.sheets?.map(sheet => sheet.properties?.title),
          workingSheetName: successfulSheet,
          rowsRetrieved: successfulData?.length || 0,
          sampleData: successfulData,
          credentials: {
            type: credentials.type,
            client_email: credentials.client_email,
            project_id: credentials.project_id
          }
        });
      } catch (sheetError: any) {
        console.error('Error accessing sheet:', sheetError);
        return res.status(500).json({
          success: false,
          error: `Error accessing sheet: ${sheetError.message}`,
          details: sheetError.errors || []
        });
      }
    } catch (credError: any) {
      console.error('Error with credentials:', credError);
      return res.status(500).json({
        success: false,
        error: `Error with credentials: ${credError.message}`
      });
    }
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
} 