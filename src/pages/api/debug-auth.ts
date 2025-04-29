import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all cookies and session data
  const cookies = req.cookies;
  
  // Clear any problematic cookies
  if (req.query.clear === 'true') {
    Object.keys(cookies).forEach(cookie => {
      res.setHeader('Set-Cookie', `${cookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; HttpOnly;`);
    });
    
    return res.status(200).json({ 
      message: 'All cookies cleared. Please try logging in again.',
      clearedCookies: Object.keys(cookies)
    });
  }
  
  // Just return the debug information
  return res.status(200).json({
    cookies,
    headers: req.headers,
    query: req.query
  });
} 