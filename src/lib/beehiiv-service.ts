/**
 * Beehiiv API Service
 * Handles subscriber management and newsletter distribution via Beehiiv
 */

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';

interface BeehiivSubscriber {
  id?: string;
  email: string;
  status?: 'active' | 'inactive' | 'validating';
  created?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referring_site?: string;
  referral_code?: string;
  custom_fields?: Array<{ name: string; value: string }>;
}

interface BeehiivPost {
  id?: string;
  title: string;
  subtitle?: string;
  content: {
    free: {
      web?: string;
      email?: string;
      rss?: string;
    };
  };
  status?: 'draft' | 'confirmed' | 'archived';
  publish_date?: string;
  displayed_date?: string;
  audience?: 'all' | 'premium' | 'free';
}

interface BeehiivResponse<T> {
  data: T;
  page?: number;
  limit?: number;
  total_results?: number;
  total_pages?: number;
}

function getHeaders(): HeadersInit {
  return {
    'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
    'Content-Type': 'application/json',
  };
}

function getPublicationId(): string {
  return process.env.BEEHIIV_PUBLICATION_ID || '';
}

/**
 * Add a subscriber to Beehiiv
 */
export async function addSubscriber(
  email: string,
  options?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referringSite?: string;
    sendWelcomeEmail?: boolean;
  }
): Promise<{ success: boolean; subscriber?: BeehiivSubscriber; error?: string }> {
  try {
    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${getPublicationId()}/subscriptions`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: options?.sendWelcomeEmail ?? false,
          utm_source: options?.utmSource || 'sanluisway',
          utm_medium: options?.utmMedium || 'website',
          utm_campaign: options?.utmCampaign,
          referring_site: options?.referringSite || 'https://www.sanluisway.com',
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Beehiiv addSubscriber error:', result);
      return { success: false, error: result.message || 'Failed to add subscriber' };
    }

    return { success: true, subscriber: result.data };
  } catch (error) {
    console.error('Beehiiv addSubscriber exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get subscriber by email from Beehiiv
 */
export async function getSubscriberByEmail(
  email: string
): Promise<{ success: boolean; subscriber?: BeehiivSubscriber; error?: string }> {
  try {
    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${getPublicationId()}/subscriptions?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );

    const result: BeehiivResponse<BeehiivSubscriber[]> = await response.json();

    if (!response.ok) {
      return { success: false, error: result.toString() };
    }

    if (result.data && result.data.length > 0) {
      return { success: true, subscriber: result.data[0] };
    }

    return { success: true, subscriber: undefined };
  } catch (error) {
    console.error('Beehiiv getSubscriber exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * List all subscribers from Beehiiv
 */
export async function listSubscribers(options?: {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'validating';
}): Promise<{ success: boolean; subscribers?: BeehiivSubscriber[]; total?: number; error?: string }> {
  try {
    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.status) params.append('status', options.status);

    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${getPublicationId()}/subscriptions?${params}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );

    const result: BeehiivResponse<BeehiivSubscriber[]> = await response.json();

    if (!response.ok) {
      return { success: false, error: 'Failed to list subscribers' };
    }

    return {
      success: true,
      subscribers: result.data,
      total: result.total_results
    };
  } catch (error) {
    console.error('Beehiiv listSubscribers exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Remove/unsubscribe a subscriber from Beehiiv
 */
export async function removeSubscriber(
  subscriberId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${getPublicationId()}/subscriptions/${subscriberId}`,
      {
        method: 'DELETE',
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to remove subscriber' };
    }

    return { success: true };
  } catch (error) {
    console.error('Beehiiv removeSubscriber exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Create a newsletter post in Beehiiv (draft)
 */
export async function createPost(
  title: string,
  htmlContent: string,
  options?: {
    subtitle?: string;
    audience?: 'all' | 'premium' | 'free';
  }
): Promise<{ success: boolean; post?: BeehiivPost; error?: string }> {
  try {
    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${getPublicationId()}/posts`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          subtitle: options?.subtitle,
          status: 'draft',
          content: {
            free: {
              web: htmlContent,
              email: htmlContent,
            },
          },
          audience: options?.audience || 'all',
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Beehiiv createPost error:', result);
      return { success: false, error: result.message || 'Failed to create post' };
    }

    return { success: true, post: result.data };
  } catch (error) {
    console.error('Beehiiv createPost exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get publication stats from Beehiiv
 */
export async function getPublicationStats(): Promise<{
  success: boolean;
  stats?: {
    total_subscribers: number;
    active_subscribers: number;
  };
  error?: string
}> {
  try {
    const response = await fetch(
      `${BEEHIIV_API_BASE}/publications/${getPublicationId()}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: 'Failed to get publication stats' };
    }

    return {
      success: true,
      stats: {
        total_subscribers: result.data?.total_subscriptions || 0,
        active_subscribers: result.data?.active_subscriptions || 0,
      }
    };
  } catch (error) {
    console.error('Beehiiv getPublicationStats exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Bulk import subscribers to Beehiiv
 */
export async function bulkImportSubscribers(
  emails: string[]
): Promise<{ success: boolean; imported: number; failed: number; errors: string[] }> {
  const results = { success: true, imported: 0, failed: 0, errors: [] as string[] };

  // Process in batches of 10 to avoid rate limiting
  const batchSize = 10;
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    const promises = batch.map(email => addSubscriber(email, { sendWelcomeEmail: false }));
    const batchResults = await Promise.allSettled(promises);

    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        results.imported++;
      } else {
        results.failed++;
        const errorMsg = result.status === 'fulfilled'
          ? result.value.error
          : result.reason?.message;
        results.errors.push(`${batch[index]}: ${errorMsg}`);
      }
    });

    // Small delay between batches to respect rate limits
    if (i + batchSize < emails.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  results.success = results.failed === 0;
  return results;
}
