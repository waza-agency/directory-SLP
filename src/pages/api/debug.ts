import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPlacesFromSheet } from '@/lib/api/google-sheets';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Debug environment variables
    const envDebug = {
      GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID || 'not set',
      GOOGLE_CREDENTIALS_PATH: process.env.GOOGLE_CREDENTIALS_PATH || 'not set',
      GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL ? 'set' : 'not set',
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? 'set' : 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set',
    };
    
    console.log('Debug API called - Environment variables:', envDebug);
    
    // Check if credentials file exists
    let credentialsFileExists = false;
    let credentialsContent = null;
    if (process.env.GOOGLE_CREDENTIALS_PATH) {
      const credentialsPath = path.resolve(process.env.GOOGLE_CREDENTIALS_PATH);
      credentialsFileExists = fs.existsSync(credentialsPath);
      console.log(`Credentials file path: ${credentialsPath}, exists: ${credentialsFileExists}`);
      
      if (credentialsFileExists) {
        try {
          // Read credentials file but only show partial content for security
          const rawCredentials = fs.readFileSync(credentialsPath, 'utf8');
          const credentials = JSON.parse(rawCredentials);
          credentialsContent = {
            type: credentials.type,
            project_id: credentials.project_id,
            client_email: credentials.client_email,
            private_key_id: credentials.private_key_id ? 
              credentials.private_key_id.substring(0, 5) + '...' : 'not found',
            private_key: credentials.private_key ? 'present (hidden)' : 'not found',
          };
          console.log('Successfully parsed credentials file');
        } catch (error) {
          console.error('Error reading/parsing credentials file:', error);
          credentialsContent = {error: 'Failed to parse credentials file'};
        }
      }
    }
    
    // Try to fetch from Google Sheets
    console.log('Attempting to fetch places from Google Sheets...');
    
    try {
      const places = await fetchPlacesFromSheet();
      console.log(`Fetched ${places.length} places from Google Sheets`);
      
      // Return debug info
      res.status(200).json({
        success: true,
        environmentVariables: envDebug,
        credentialsFileExists,
        credentialsContent,
        placesCount: places.length,
        featuredPlacesCount: places.filter(p => p.featured).length,
        firstPlaceSample: places.length > 0 ? {
          name: places[0].name,
          featured: places[0].featured,
          category: places[0].category
        } : null
      });
    } catch (fetchError) {
      console.error('Error fetching from Google Sheets:', fetchError);
      res.status(200).json({
        success: false,
        environmentVariables: envDebug,
        credentialsFileExists,
        credentialsContent,
        error: fetchError instanceof Error ? fetchError.message : 'Unknown fetch error',
        stack: fetchError instanceof Error ? fetchError.stack : undefined
      });
    }
  } catch (error) {
    console.error('Debug API error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV !== 'production' && error instanceof Error ? error.stack : undefined
    });
  }
} 