import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the API calls
global.fetch = jest.fn();

// Mock the auth hook
jest.mock('@/lib/supabase-auth', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
    isLoading: false
  })
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/business/subscription'
  })
}));

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: { code: 'PGRST116' } }))
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: { id: 'test-business-id' },
            error: null
          }))
        }))
      }))
    }))
  }
}));

describe('Coupon Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('validates AMIGOSSLPWAY coupon successfully', async () => {
    // Mock successful coupon validation
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        message: 'Coupon is valid',
        coupon: {
          code: 'AMIGOSSLPWAY',
          name: 'Amigos SLP Way Discount',
          description: 'Special discount for SLP community members',
          discount_type: 'percent',
          discount_value: 100,
          duration: 'repeating',
          duration_in_months: 3
        }
      })
    });

    const SubscriptionPage = require('@/pages/business/subscription').default;
    render(<SubscriptionPage />);

    // Find the coupon input
    const couponInput = screen.getByPlaceholderText('Ingresa tu código');
    const applyButton = screen.getByText('Aplicar');

    // Enter the coupon code
    fireEvent.change(couponInput, { target: { value: 'AMIGOSSLPWAY' } });
    fireEvent.click(applyButton);

    // Wait for validation
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coupon_code: 'AMIGOSSLPWAY' }),
      });
    });

    // Check if coupon is applied
    await waitFor(() => {
      expect(screen.getByText('Amigos SLP Way Discount')).toBeInTheDocument();
      expect(screen.getByText('100% de descuento por 3 meses')).toBeInTheDocument();
    });
  });

  test('handles invalid coupon code', async () => {
    // Mock failed coupon validation
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({
        message: 'Invalid or inactive coupon code'
      })
    });

    const SubscriptionPage = require('@/pages/business/subscription').default;
    render(<SubscriptionPage />);

    const couponInput = screen.getByPlaceholderText('Ingresa tu código');
    const applyButton = screen.getByText('Aplicar');

    // Enter invalid coupon code
    fireEvent.change(couponInput, { target: { value: 'INVALID' } });
    fireEvent.click(applyButton);

    // Wait for validation error
    await waitFor(() => {
      expect(screen.getByText('Invalid or inactive coupon code')).toBeInTheDocument();
    });
  });

  test('includes coupon in subscription request', async () => {
    // Mock successful coupon validation
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          message: 'Coupon is valid',
          coupon: {
            code: 'AMIGOSSLPWAY',
            name: 'Amigos SLP Way Discount',
            discount_type: 'percent',
            discount_value: 100,
            duration: 'repeating',
            duration_in_months: 3
          }
        })
      })
      // Mock successful subscription creation
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          checkoutUrl: 'https://checkout.stripe.com/test'
        })
      });

    // Mock window.location.href
    delete (window as any).location;
    (window as any).location = { href: '' };

    const SubscriptionPage = require('@/pages/business/subscription').default;
    render(<SubscriptionPage />);

    // Apply coupon
    const couponInput = screen.getByPlaceholderText('Ingresa tu código');
    fireEvent.change(couponInput, { target: { value: 'AMIGOSSLPWAY' } });
    fireEvent.click(screen.getByText('Aplicar'));

    await waitFor(() => {
      expect(screen.getByText('Amigos SLP Way Discount')).toBeInTheDocument();
    });

    // Click subscribe
    const subscribeButton = screen.getByText('Suscribirse Ahora');
    fireEvent.click(subscribeButton);

    // Wait for subscription request
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/subscriptions/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          plan: 'monthly',
          business_id: 'test-business-id',
          user_id: 'test-user-id',
          coupon_code: 'AMIGOSSLPWAY',
        }),
      });
    });
  });

  test('allows removing applied coupon', async () => {
    // Mock successful coupon validation
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        message: 'Coupon is valid',
        coupon: {
          code: 'AMIGOSSLPWAY',
          name: 'Amigos SLP Way Discount',
          discount_type: 'percent',
          discount_value: 100,
          duration: 'repeating',
          duration_in_months: 3
        }
      })
    });

    const SubscriptionPage = require('@/pages/business/subscription').default;
    render(<SubscriptionPage />);

    // Apply coupon
    const couponInput = screen.getByPlaceholderText('Ingresa tu código');
    fireEvent.change(couponInput, { target: { value: 'AMIGOSSLPWAY' } });
    fireEvent.click(screen.getByText('Aplicar'));

    await waitFor(() => {
      expect(screen.getByText('Amigos SLP Way Discount')).toBeInTheDocument();
    });

    // Remove coupon
    fireEvent.click(screen.getByText('Remover'));

    // Check if coupon input is back
    expect(screen.getByPlaceholderText('Ingresa tu código')).toBeInTheDocument();
    expect(screen.queryByText('Amigos SLP Way Discount')).not.toBeInTheDocument();
  });
});