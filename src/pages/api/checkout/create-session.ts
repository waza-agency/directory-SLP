import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// CORS middleware
function cors(req: NextApiRequest, res: NextApiResponse) {
  // Get the origin from the request headers
  const origin = req.headers.origin || '';

  // Allow the actual origin in production, or localhost in development
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// Initialize Stripe with better error handling
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // MARKETPLACE DISABLED - Return error message
  return res.status(503).json({
    success: false,
    error: {
      message: 'El marketplace está temporalmente desactivado. Solo funcionan las suscripciones de perfiles de negocio.',
      code: 'MARKETPLACE_DISABLED'
    }
  });
}