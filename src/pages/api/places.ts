import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'credenciales.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Hoja 1!A:Z'; // Adjust based on your sheet's structure

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json({ success: true, places: [] });
    }

    // Get headers from first row
    const headers = rows[0];
    
    // Convert rows to places
    const places = rows.slice(1).map((row, index) => {
      const place: any = {
        id: (index + 1).toString(),
      };

      headers.forEach((header: string, i: number) => {
        const value = row[i];
        switch(header.toLowerCase()) {
          case 'nombre del lugar':
            place.name = value;
            break;
          case 'categoría (ej. restaurante, tienda, barbería, etc.)':
            // Convert category to match our PlaceCategory type
            place.category = value?.toLowerCase().split[0].trim() || 'other';
            break;
          case 'dirección':
            place.address = value;
            break;
          case 'ciudad':
            place.city = value;
            break;
          case 'negocio destacado':
            place.featured = value?.toLowerCase() === 'si' || value?.toLowerCase() === 'sí' || value === '1' || value === 'true';
            break;
          // Add more fields as needed
        }
      });

      return place;
    });

    return res.status(200).json({
      success: true,
      places,
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch places',
    });
  }
} 