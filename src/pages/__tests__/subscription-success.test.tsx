import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import SubscriptionSuccessPage from '@/pages/business/subscription-success';
import { useAuth } from '@/lib/supabase-auth';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the auth hook
jest.mock('@/lib/supabase-auth', () => ({
  useAuth: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  query: {},
  pathname: '/business/subscription-success',
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('SubscriptionSuccessPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter as any);
    (global.fetch as jest.Mock).mockClear();
  });

  it('should not redirect immediately when user is not available but auth is loading', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: true,
      session: null,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    render(<SubscriptionSuccessPage />);

    // Should show loading state
    expect(screen.getByText(/Verificando tu suscripción/)).toBeInTheDocument();

    // Should not redirect immediately
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should show benefits page when user is authenticated and subscription is active', async () => {
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      session: { user: mockUser, access_token: 'token' } as any,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    // Mock API responses - the component calls /api/user/me first, then business-profile
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 'test-user-id' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          business_name: 'Test Business',
          subscription_status: 'active',
        }),
      });

    render(<SubscriptionSuccessPage />);

    // Wait for the subscription check to complete
    await waitFor(() => {
      expect(screen.getByText(/¡Suscripción Confirmada!/)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Should show business name
    await waitFor(() => {
      expect(screen.getByText(/¡Bienvenido Test Business!/)).toBeInTheDocument();
    });

    // Should show benefits
    expect(screen.getByText(/Beneficios de tu Suscripción/)).toBeInTheDocument();
    expect(screen.getByText(/Perfil de Negocio/)).toBeInTheDocument();
    expect(screen.getByText(/10 Listados de Servicios/)).toBeInTheDocument();
    expect(screen.getByText(/Visibilidad/)).toBeInTheDocument();

    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should handle session_id in URL and check payment status', async () => {
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      session: { user: mockUser, access_token: 'token' } as any,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    // Mock router with session_id
    mockUseRouter.mockReturnValue({
      ...mockRouter,
      query: { session_id: 'test-session-id' },
    } as any);

    // Mock API responses
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 'test-user-id' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          business_name: 'Test Business',
          subscription_status: 'pending',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          status: 'active',
          payment_status: 'paid',
        }),
      });

    render(<SubscriptionSuccessPage />);

    // Wait for all checks to complete
    await waitFor(() => {
      expect(screen.getByText(/¡Suscripción Confirmada!/)).toBeInTheDocument();
    }, { timeout: 5000 });

    // Should have called the session check API
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/subscriptions/check-session?session_id=test-session-id',
      expect.any(Object)
    );
  });

  it('should retry failed session checks and handle errors gracefully', async () => {
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      session: { user: mockUser, access_token: 'token' } as any,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    mockUseRouter.mockReturnValue({
      ...mockRouter,
      query: { session_id: 'test-session-id' },
    } as any);

    // Mock API responses - first calls succeed, session check fails then succeeds
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 'test-user-id' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          business_name: 'Test Business',
          subscription_status: 'pending',
        }),
      })
      // First session check fails
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      })
      // Second retry succeeds
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          status: 'active',
          payment_status: 'paid',
        }),
      });

    render(<SubscriptionSuccessPage />);

    // Wait for retries to complete
    await waitFor(() => {
      expect(screen.getByText(/¡Suscripción Confirmada!/)).toBeInTheDocument();
    }, { timeout: 15000 });

    // Should have retried the session check
    expect(global.fetch).toHaveBeenCalledTimes(4);
  }, 20000); // Increase timeout for this test

  it('should show error state when session checks fail completely', async () => {
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      session: { user: mockUser, access_token: 'token' } as any,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    mockUseRouter.mockReturnValue({
      ...mockRouter,
      query: { session_id: 'test-session-id' },
    } as any);

    // Mock all API calls to fail
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 'test-user-id' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Profile not found' }),
      })
      .mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      });

    render(<SubscriptionSuccessPage />);

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText(/Estado de Suscripción/)).toBeInTheDocument();
    }, { timeout: 15000 });

    // Should show error message and refresh button
    await waitFor(() => {
      expect(screen.getByText(/Si acabas de completar el pago/)).toBeInTheDocument();
      expect(screen.getByText(/Actualizar Estado/)).toBeInTheDocument();
    });
  }, 20000); // Increase timeout for this test

  it('should only redirect after delay when user is clearly not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      session: null,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    render(<SubscriptionSuccessPage />);

    // Should not redirect immediately
    expect(mockPush).not.toHaveBeenCalled();

    // Wait for the timeout (3 seconds)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3100));
    });

    // Should redirect after delay
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/signin?redirect=/business/subscription');
    });
  });

  it('should show pending state when subscription is still processing', async () => {
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      session: { user: mockUser, access_token: 'token' } as any,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
      supabase: null,
    });

    // Mock API responses showing pending status
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 'test-user-id' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          business_name: 'Test Business',
          subscription_status: 'pending',
        }),
      });

    render(<SubscriptionSuccessPage />);

    // Should show pending state
    await waitFor(() => {
      expect(screen.getByText(/Procesando Tu Suscripción/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Tu pago está siendo procesado/)).toBeInTheDocument();
    });

    // Should still show benefits section
    expect(screen.getByText(/Beneficios de tu Suscripción/)).toBeInTheDocument();

    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled();
  });
});