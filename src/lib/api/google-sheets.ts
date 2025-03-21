import { google } from 'googleapis';
import { Place } from '@/types';
import * as fs from 'fs';
import * as path from 'path';

// Initialize the Google Sheets API
const getGoogleSheets = () => {
  console.log('Initializing Google Sheets API...');
  
  // Check if we have a credentials file path
  if (process.env.GOOGLE_CREDENTIALS_PATH) {
    try {
      const credentialsPath = path.resolve(process.env.GOOGLE_CREDENTIALS_PATH);
      console.log(`Looking for credentials file at: ${credentialsPath}`);
      
      if (fs.existsSync(credentialsPath)) {
        console.log('Credentials file found, loading...');
        // Use service account credentials from file
        try {
          const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
          console.log(`Credentials loaded with client email: ${credentials.client_email}`);
          
          const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
          });
          
          const sheets = google.sheets({ version: 'v4', auth });
          console.log('Successfully initialized Google Sheets API with credentials file');
          return sheets;
        } catch (parseError: any) {
          console.error('Error parsing credentials file:', parseError);
          throw new Error('Failed to parse credentials file: ' + parseError.message);
        }
      } else {
        console.warn(`Credentials file not found at path: ${credentialsPath}`);
      }
    } catch (error) {
      console.error('Error loading credentials file:', error);
    }
  } else {
    console.log('No GOOGLE_CREDENTIALS_PATH provided, falling back to environment variables');
  }
  
  // Fallback to environment variables if file credentials not available
  console.log('Using environment variables for Google Sheets authentication');
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY environment variables');
    throw new Error('Missing Google API credentials. Please check your environment variables.');
  }
  
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Successfully initialized Google Sheets API with environment variables');
    return sheets;
  } catch (error: any) {
    console.error('Error initializing Google Sheets API with environment variables:', error);
    throw new Error('Failed to initialize Google Sheets API: ' + error.message);
  }
};

// Helper function to check if a string is a valid image URL
function isValidImageUrl(url: string): boolean {
  console.log('Validating image URL:', url);
  
  if (!url) {
    console.log('Empty URL provided');
    return false;
  }
  
  if (url === "No disponible") {
    console.log('URL is "No disponible"');
    return false;
  }
  
  // Clean the URL
  url = url.trim();
  
  // Check if it's a business hours string
  const hoursPatterns = [
    /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday):/i,
    /\|/,
    /(AM|PM)/i,
    /–/,
    /Closed/i,
    /^\d{1,2}:\d{2}/,
    /^\d{1,2}:\d{2}\s*(AM|PM)/i
  ];
  
  for (const pattern of hoursPatterns) {
    if (pattern.test(url)) {
      console.log('URL matches hours pattern:', pattern);
      return false;
    }
  }
  
  // Check if it's a valid URL
  try {
    new URL(url);
    console.log('Valid URL format:', url);
    return true;
  } catch (error) {
    console.log('Invalid URL format:', url);
    return false;
  }
}

/**
 * Fetches place data from Google Sheets
 */
export async function fetchPlacesFromSheet(): Promise<Place[]> {
  try {
    // Make sure we have a Google Sheet ID
    if (!process.env.GOOGLE_SHEET_ID) {
      console.error('GOOGLE_SHEET_ID environment variable is not set');
      return [];
    }
    
    // Fallback credentials - for testing only
    if (!process.env.GOOGLE_CLIENT_EMAIL && !process.env.GOOGLE_PRIVATE_KEY && !process.env.GOOGLE_CREDENTIALS_PATH) {
      console.warn('Using hardcoded credentials for Google Sheets API - This should only be used for testing');
      // Set dummy credentials for the fallback
      process.env.GOOGLE_CLIENT_EMAIL = 'YOUR_SERVICE_ACCOUNT_EMAIL@example.com';
      process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMII...your_key_here...\n-----END PRIVATE KEY-----\n';
    }
    
    const sheets = getGoogleSheets();
    
    console.log("Fetching data from Google Sheets...");
    console.log(`Using Sheet ID: ${process.env.GOOGLE_SHEET_ID}`);
    
    // Get information about the spreadsheet to find available sheets
    let sheetName = "Places"; // Default sheet name
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
      });
      
      console.log("Available sheets:", sheetInfo.data.sheets?.map(s => s.properties?.title));
      
      // Get first sheet name if available
      if (sheetInfo.data.sheets && sheetInfo.data.sheets.length > 0) {
        const firstSheet = sheetInfo.data.sheets[0].properties?.title;
        
        // Check if "Places" exists in the available sheets
        const hasPlacesSheet = sheetInfo.data.sheets.some(
          s => s.properties?.title?.toLowerCase() === "places"
        );
        
        // If "Places" sheet doesn't exist, use the first sheet
        if (!hasPlacesSheet && firstSheet) {
          sheetName = firstSheet;
          console.log(`"Places" sheet not found, using first sheet: ${sheetName}`);
        }
      }
    } catch (sheetInfoError) {
      console.error("Error getting sheet info:", sheetInfoError);
      // Continue with default "Places" sheet name
    }
    
    // Use a wide range that includes column AC (Negocio Destacado)
    const range = `${sheetName}!A2:AD`;
    console.log(`Fetching data from range: ${range}`);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });

    const rows = response.data.values || [];
    console.log(`Fetched ${rows.length} rows from the sheet`);
    
    // Log column headers for reference (for debugging)
    console.log("Sheet structure - columns range: A-AD");
    try {
      const headersResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${sheetName}!A1:AD1`,
      });
      
      if (headersResponse.data.values && headersResponse.data.values.length > 0) {
        const headers = headersResponse.data.values[0];
        console.log("Column headers:", headers);
        
        // Find the column for "Negocio Destacado"
        let featuredColumnIndex = 28; // Default AC column (0-indexed: 28)
        const featuredColumnName = "Negocio Destacado";
        
        const foundIndex = headers.findIndex(
          h => typeof h === "string" && h.toLowerCase().includes("destacado")
        );
        
        if (foundIndex >= 0) {
          featuredColumnIndex = foundIndex;
          console.log(`Found featured column at index ${featuredColumnIndex} (column ${String.fromCharCode(65 + featuredColumnIndex)})`);
        } else {
          console.log(`Using default column AC (index ${featuredColumnIndex}) for featured businesses`);
        }
        
        // Map sheet rows to Place objects
        const places = rows.map((row: any, index: number) => {
          if (!row[0]) {
            // Skip empty rows
            console.log(`Skipping empty row ${index+2}`);
            return null;
          }

          // Get column values with proper cleaning
          const cleanText = (text?: string): string => {
            if (!text) return '';
            // Trim whitespace and convert to proper encoding if needed
            return text.trim();
          };

          const name = cleanText(row[0]);
          
          // Handle category - clean and normalize
          let category = cleanText(row[1]);
          // Extract primary category before any comma or ampersand
          if (category && category.includes(',')) {
            category = category.split(',')[0].trim();
          } else if (category && category.includes('&')) {
            category = category.split('&')[0].trim();
          }
          
          // Map complex categories to simpler ones
          if (category.toLowerCase().includes('café') || 
              category.toLowerCase().includes('cafe') ||
              category.toLowerCase().includes('coffee')) {
            category = 'cafe';
          } else if (category.toLowerCase().includes('restaurant')) {
            category = 'restaurant';
          } else if (category.toLowerCase().includes('hotel')) {
            category = 'hotel';
          } else if (category.toLowerCase().includes('bar')) {
            category = 'bar';
          } else if (category.toLowerCase().includes('museum')) {
            category = 'museum';
          } else if (category.toLowerCase().includes('tienda') || 
                    category.toLowerCase().includes('shop')) {
            category = 'shop';
          } else if (category.toLowerCase().includes('parque') || 
                    category.toLowerCase().includes('park')) {
            category = 'park';
          } else if (category.toLowerCase().includes('servicio') || 
                    category.toLowerCase().includes('service')) {
            category = 'service';
          } else {
            category = 'other';
          }
          
          // Default values for required fields
          const place: Place = {
            id: row[0] ? `place-${index}-${name.substring(0, 10).replace(/\s/g, '-')}` : `place-${Math.random().toString(36).substring(2, 9)}`,
            name: name,
            category: category,
            address: cleanText(row[2]),
            featured: false, // Default value
          };
          
          // City - if present
          if (row[3]) place.city = cleanText(row[3]);
          
          // Optional fields - shifted based on sheet structure
          // We're skipping some columns from the original mapping
          if (row[4]) place.phone = cleanText(row[4]);
          if (row[5]) place.website = cleanText(row[5]);
          if (row[6]) place.instagram = cleanText(row[6]);
          if (row[7] && !isNaN(parseFloat(row[7]))) place.latitude = parseFloat(row[7]);
          if (row[8] && !isNaN(parseFloat(row[8]))) place.longitude = parseFloat(row[8]);
          if (row[9]) place.description = cleanText(row[9]);
          
          // Image URL - handle various URL formats
          if (row[10] && typeof row[10] === 'string') {
            const imageUrl = cleanText(row[10]);
            console.log(`\nProcessing image URL for ${name}:`, imageUrl);
            
            if (isValidImageUrl(imageUrl)) {
              // Handle Google Drive links
              if (imageUrl.includes('drive.google.com')) {
                console.log(`Processing Google Drive URL for ${name}`);
                // Handle different Google Drive URL formats
                let fileId = null;
                
                // Format: /file/d/[ID]/view
                const fileIdMatch = imageUrl.match(/\/file\/d\/([-\w]{25,})/);
                if (fileIdMatch) {
                  fileId = fileIdMatch[1];
                  console.log(`Found file ID from /file/d/ format:`, fileId);
                }
                
                // Format: /open?id=[ID]
                const idParamMatch = imageUrl.match(/[?&]id=([-\w]{25,})/);
                if (!fileId && idParamMatch) {
                  fileId = idParamMatch[1];
                  console.log(`Found file ID from open?id format:`, fileId);
                }
                
                // Format: /uc?id=[ID]
                const ucIdMatch = imageUrl.match(/\/uc\?.*id=([-\w]{25,})/);
                if (!fileId && ucIdMatch) {
                  fileId = ucIdMatch[1];
                  console.log(`Found file ID from uc?id format:`, fileId);
                }
                
                if (fileId) {
                  place.imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                  console.log(`Converted Drive URL for ${name}:`, place.imageUrl);
                } else {
                  console.error(`Could not extract file ID from Google Drive URL for ${name}:`, imageUrl);
                }
              } else if (imageUrl.includes('blogger.googleusercontent.com')) {
                // Handle Blogger URLs - remove size restrictions
                place.imageUrl = imageUrl.split('=')[0];
                console.log(`Processed Blogger URL for ${name}:`, place.imageUrl);
              } else if (imageUrl.includes('tripadvisor.com')) {
                // Handle TripAdvisor URLs - keep as is
                place.imageUrl = imageUrl;
                console.log(`Using TripAdvisor URL for ${name}:`, place.imageUrl);
              } else {
                // For all other URLs, validate and use as is
                try {
                  new URL(imageUrl);
                  place.imageUrl = imageUrl;
                  console.log(`Using direct URL for ${name}:`, place.imageUrl);
                } catch (urlError) {
                  console.error(`Invalid URL format for ${name}:`, imageUrl);
                }
              }
            } else {
              console.log(`Invalid image URL format for ${name}:`, imageUrl);
            }
          }
          
          // Hours - check if the content looks like hours
          if (row[11] && typeof row[11] === 'string') {
            const hoursContent = cleanText(row[11]);
            if (hoursContent.includes('Monday') || 
                hoursContent.includes('Tuesday') || 
                hoursContent.includes('|') ||
                hoursContent.includes('AM') ||
                hoursContent.includes('PM')) {
              place.hours = hoursContent;
            }
          }
          
          // Featured status from detected column
          if (row.length > featuredColumnIndex) {
            const featuredValue = String(row[featuredColumnIndex] || '').toLowerCase().trim();
            const isFeatured = 
              featuredValue === 'true' || 
              featuredValue === 'verdadero' || 
              featuredValue === '1' || 
              featuredValue === 'si' || 
              featuredValue === 'sí' ||
              featuredValue === 'yes';
            
            place.featured = isFeatured;
            
            // Extra debug for featured places
            if (isFeatured) {
              console.log(`✓ FEATURED PLACE DETECTED: ${place.name} (value="${featuredValue}")`);
            }
          }
          
          return place;
        }).filter((place): place is Place => place !== null); // Type-safe filter to remove null entries
        
        // Log featured places count
        const featuredCount = places.filter(p => p.featured).length;
        console.log(`Total places: ${places.length}, Featured places: ${featuredCount}`);
        
        return places;
      } else {
        console.error("No headers found in the sheet");
        return [];
      }
    } catch (error) {
      console.error('Error fetching headers:', error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
} 