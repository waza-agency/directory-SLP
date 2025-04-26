import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Path to the robots.txt file
    const robotsFile = path.resolve('./robots.txt');
    
    // Read the robots.txt file
    const robotsContent = fs.readFileSync(robotsFile, 'utf8');
    
    // Get host from request for dynamic sitemap URL
    const host = req.headers.host || 'yourdomain.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    // Replace placeholder with actual domain
    const updatedContent = robotsContent.replace(
      'https://yourdomain.com/sitemap.xml',
      `${protocol}://${host}/sitemap.xml`
    );
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day (24 hours)
    
    // Send the robots.txt content
    res.status(200).send(updatedContent);
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    res.status(500).json({ error: 'Failed to serve robots.txt' });
  }
} 