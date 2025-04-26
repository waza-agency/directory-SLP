import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Path to the sitemap file
    const sitemap = path.resolve('./public/sitemap.xml');
    
    // Read the sitemap file
    const sitemapContent = fs.readFileSync(sitemap, 'utf8');
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day (24 hours)
    
    // Send the sitemap content
    res.status(200).send(sitemapContent);
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).json({ error: 'Failed to serve sitemap' });
  }
} 