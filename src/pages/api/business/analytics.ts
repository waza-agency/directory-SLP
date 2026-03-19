import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export type AnalyticsData = {
  totalListings: number;
  activeListings: number;
  totalInquiries: number;
  newInquiries: number;
  totalRevenue: number;
  totalTransactions: number;
  avgRating: number;
  reviewCount: number;
  recentInquiries: {
    id: string;
    customer_name: string;
    subject: string;
    status: string;
    created_at: string;
  }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createPagesServerClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id, business_name')
      .eq('user_id', session.user.id)
      .single();

    if (!profile) {
      return res.status(404).json({ error: 'No business profile found' });
    }

    // Fetch listings
    const { data: listings } = await supabase
      .from('business_listings')
      .select('id, status, sales_count')
      .eq('business_id', profile.id);

    const totalListings = listings?.length ?? 0;
    const activeListings = listings?.filter(l => l.status === 'active').length ?? 0;

    // Fetch contact inquiries by business email
    const userEmail = session.user.email;
    let totalInquiries = 0;
    let newInquiries = 0;
    let recentInquiries: AnalyticsData['recentInquiries'] = [];

    if (userEmail) {
      const { data: inquiries } = await supabase
        .from('contact_inquiries')
        .select('id, customer_name, subject, status, created_at')
        .eq('business_email', userEmail)
        .order('created_at', { ascending: false })
        .limit(5);

      if (inquiries) {
        recentInquiries = inquiries;
        totalInquiries = inquiries.length;
        newInquiries = inquiries.filter(i => i.status === 'new').length;
      }

      // Get full count
      const { count } = await supabase
        .from('contact_inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('business_email', userEmail);

      totalInquiries = count ?? totalInquiries;
    }

    // Fetch transaction data
    let totalRevenue = 0;
    let totalTransactions = 0;

    if (listings && listings.length > 0) {
      const listingIds = listings.map(l => l.id);
      const { data: transactions } = await supabase
        .from('marketplace_transactions')
        .select('total_amount, seller_payout, status')
        .in('listing_id', listingIds)
        .eq('status', 'completed');

      if (transactions) {
        totalTransactions = transactions.length;
        totalRevenue = transactions.reduce(
          (sum, t) => sum + (t.seller_payout || t.total_amount || 0), 0
        );
      }
    }

    // Fetch review stats (from places linked to this business)
    let avgRating = 0;
    let reviewCount = 0;

    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .in('place_id', listings?.map(l => l.id) ?? []);

    if (reviews && reviews.length > 0) {
      reviewCount = reviews.length;
      avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      avgRating = Math.round(avgRating * 10) / 10;
    }

    const analytics: AnalyticsData = {
      totalListings,
      activeListings,
      totalInquiries,
      newInquiries,
      totalRevenue,
      totalTransactions,
      avgRating,
      reviewCount,
      recentInquiries,
    };

    return res.status(200).json(analytics);
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
