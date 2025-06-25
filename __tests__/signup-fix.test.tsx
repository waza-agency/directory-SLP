import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import SignUp from '@/components/auth/SignUp';
import { useAuth } from '@/lib/supabase-auth';
import { useRouter } from 'next/router';

// Mock dependencies
jest.mock('@/lib/supabase-auth');
jest.mock('next/router');
jest.mock('react-toastify');
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockPush = jest.fn();
const mockSignUp = jest.fn();
const mockSupabase = {
  from: jest.fn(),
  auth: {
    resend: jest.fn(),
  },
};

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

(useAuth as jest.Mock).mockReturnValue({
  signUp: mockSignUp,
  supabase: mockSupabase,
});

describe('SignUp Component - 500 Error Fix', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (toast.success as jest.Mock) = jest.fn();
    (toast.error as jest.Mock) = jest.fn();
  });

  const fillAndSubmitForm = async (accountType = 'user') => {
    fireEvent.click(screen.getByDisplayValue(accountType));
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    if (accountType === 'business') {
      fireEvent.change(screen.getByLabelText(/business category/i), {
        target: { value: 'Technology' },
      });
    }

    fireEvent.click(screen.getByRole('button', { name: /sign_up/i }));
  };

  it('should handle successful signup with successful database operations', async () => {
    // Mock successful auth signup
    mockSignUp.mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    // Mock successful database operations
    const mockUpdate = jest.fn().mockResolvedValue({ error: null });
    const mockInsert = jest.fn().mockResolvedValue({ error: null });

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'users') {
        return { update: () => ({ eq: () => mockUpdate() }) };
      }
      if (table === 'business_profiles') {
        return { insert: mockInsert };
      }
    });

    render(<SignUp />);
    await fillAndSubmitForm('business');

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('signup_success');
    });

    expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should handle successful signup even when account type update fails', async () => {
    // Mock successful auth signup
    mockSignUp.mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    // Mock failed account type update but successful business profile creation
    const mockUpdate = jest.fn().mockResolvedValue({
      error: { message: 'Database error', code: 'PGRST116' }
    });
    const mockInsert = jest.fn().mockResolvedValue({ error: null });

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'users') {
        return { update: () => ({ eq: () => mockUpdate() }) };
      }
      if (table === 'business_profiles') {
        return { insert: mockInsert };
      }
    });

    render(<SignUp />);
    await fillAndSubmitForm('business');

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('signup_success');
    });

    // Should still show success even though account type update failed
    expect(toast.error).not.toHaveBeenCalled();
    expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should handle successful signup even when business profile creation fails', async () => {
    // Mock successful auth signup
    mockSignUp.mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    // Mock successful account type update but failed business profile creation
    const mockUpdate = jest.fn().mockResolvedValue({ error: null });
    const mockInsert = jest.fn().mockResolvedValue({
      error: { message: 'Business profile creation failed', code: 'PGRST116' }
    });

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'users') {
        return { update: () => ({ eq: () => mockUpdate() }) };
      }
      if (table === 'business_profiles') {
        return { insert: mockInsert };
      }
    });

    render(<SignUp />);
    await fillAndSubmitForm('business');

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('signup_success');
    });

    // Should still show success even though business profile creation failed
    expect(toast.error).not.toHaveBeenCalled();
    expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should handle successful signup even when all secondary operations fail', async () => {
    // Mock successful auth signup
    mockSignUp.mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    // Mock all database operations failing
    const mockUpdate = jest.fn().mockResolvedValue({
      error: { message: 'Database error', code: 'PGRST116' }
    });
    const mockInsert = jest.fn().mockResolvedValue({
      error: { message: 'Business profile creation failed', code: 'PGRST116' }
    });

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'users') {
        return { update: () => ({ eq: () => mockUpdate() }) };
      }
      if (table === 'business_profiles') {
        return { insert: mockInsert };
      }
    });

    render(<SignUp />);
    await fillAndSubmitForm('business');

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('signup_success');
    });

    // Should still show success even though all secondary operations failed
    expect(toast.error).not.toHaveBeenCalled();
    expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should handle auth signup failure correctly', async () => {
    // Mock failed auth signup
    mockSignUp.mockResolvedValue({
      data: null,
      error: { message: 'Email already exists' },
    });

    render(<SignUp />);
    await fillAndSubmitForm();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already exists');
    });

    expect(toast.success).not.toHaveBeenCalled();
  });

  it('should handle rate limiting gracefully', async () => {
    // Mock rate limit error
    mockSignUp.mockResolvedValue({
      data: null,
      error: { message: 'rate limit exceeded', status: 429 },
    });

    render(<SignUp />);
    await fillAndSubmitForm();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please wait a few minutes before trying to sign up again.');
    });
  });

  it('should show success screen after successful signup', async () => {
    // Mock successful auth signup
    mockSignUp.mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    mockSupabase.from.mockImplementation(() => ({
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      insert: () => Promise.resolve({ error: null }),
    }));

    render(<SignUp />);
    await fillAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText('Verify Your Email')).toBeInTheDocument();
    });

    expect(screen.getByText(/we've sent a verification email/i)).toBeInTheDocument();
  });
});