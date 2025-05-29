import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // MARKETPLACE DISABLED - Return error message
  return res.status(503).json({
    success: false,
    error: {
      message: 'El marketplace está temporalmente desactivado. Los listings solo pueden anunciar servicios, no venderlos.',
      code: 'MARKETPLACE_DISABLED'
    }
  });
}