import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import SimpleSignUp from '@/components/auth/SimpleSignUp';
import SimpleSignIn from '@/components/auth/SimpleSignIn';
import { supabase } from '@/lib/supabase';
import { simpleAuth } from '@/lib/simple-auth';

// Mock dependencies
jest.mock('next/router');
jest.mock('react-toastify');
jest.mock('@/lib/supabase');
jest.mock('@/lib/simple-auth');
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
  }),
}));

const mockRouter = {
  push: jest.fn(),
  query: {},
};

const mockSupabase = {
  auth: {
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn(),
    getUser: jest.fn(),
  },
};

const mockSimpleAuth = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getCurrentSession: jest.fn(),
  getCurrentUser: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (supabase as any).auth = mockSupabase.auth;
  Object.assign(simpleAuth, mockSimpleAuth);
});

describe('SimpleSignUp Component', () => {
  it('renders signup form correctly', () => {
    render(<SimpleSignUp />);

    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<SimpleSignUp />);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when passwords do not match', async () => {
    render(<SimpleSignUp />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'different' },
    });

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('handles successful signup', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: { id: 'test-user-id', email: 'test@example.com' } },
      error: null,
    });

    render(<SimpleSignUp />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(toast.success).toHaveBeenCalledWith(
        'Account created successfully! Please check your email to verify your account.'
      );
    });

    // Should show success state
    expect(screen.getByText('Account Created!')).toBeInTheDocument();

    // Should redirect after timeout
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/signin?message=check-email');
    }, { timeout: 3000 });
  });

  it('handles signup errors', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: null,
      error: { message: 'Email already in use' },
    });

    render(<SimpleSignUp />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already in use');
    });
  });
});

describe('SimpleSignIn Component', () => {
  it('renders signin form correctly', () => {
    render(<SimpleSignIn />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows email verification message when query parameter is present', () => {
    mockRouter.query = { message: 'check-email' };

    render(<SimpleSignIn />);

    expect(screen.getByText(/please check your email and click the verification link/i)).toBeInTheDocument();
  });

  it('handles successful signin', async () => {
    mockSimpleAuth.signIn.mockResolvedValue({
      success: true,
      user: { id: 'test-user-id', email: 'test@example.com' },
    });

    render(<SimpleSignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSimpleAuth.signIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(toast.success).toHaveBeenCalledWith('Signed in successfully!');
      expect(mockRouter.push).toHaveBeenCalledWith('/account');
    });
  });

  it('handles signin errors', async () => {
    mockSimpleAuth.signIn.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    render(<SimpleSignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  it('redirects to custom redirect URL when provided', async () => {
    mockRouter.query = { redirect: '/custom-page' };
    mockSimpleAuth.signIn.mockResolvedValue({
      success: true,
      user: { id: 'test-user-id' },
    });

    render(<SimpleSignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/custom-page');
    });
  });
});

describe('simpleAuth utility', () => {
  beforeEach(() => {
    // Reset mocks for isolated testing
    jest.clearAllMocks();
  });

  it('successfully signs up a user', async () => {
    const mockAuthResponse = {
      data: { user: { id: 'test-user-id', email: 'test@example.com' } },
      error: null,
    };
    mockSupabase.auth.signUp.mockResolvedValue(mockAuthResponse);

    // Call the actual implementation
    const actualSimpleAuth = jest.requireActual('@/lib/simple-auth').simpleAuth;
    const result = await actualSimpleAuth.signUp('test@example.com', 'password123');

    expect(result.success).toBe(true);
    expect(result.user).toEqual(mockAuthResponse.data.user);
    expect(result.error).toBeUndefined();
  });

  it('handles signup errors', async () => {
    const mockAuthResponse = {
      data: null,
      error: { message: 'Email already registered' },
    };
    mockSupabase.auth.signUp.mockResolvedValue(mockAuthResponse);

    const actualSimpleAuth = jest.requireActual('@/lib/simple-auth').simpleAuth;
    const result = await actualSimpleAuth.signUp('test@example.com', 'password123');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Email already registered');
    expect(result.user).toBeUndefined();
  });

  it('successfully signs in a user', async () => {
    const mockAuthResponse = {
      data: { user: { id: 'test-user-id', email: 'test@example.com' } },
      error: null,
    };
    mockSupabase.auth.signInWithPassword.mockResolvedValue(mockAuthResponse);

    const actualSimpleAuth = jest.requireActual('@/lib/simple-auth').simpleAuth;
    const result = await actualSimpleAuth.signIn('test@example.com', 'password123');

    expect(result.success).toBe(true);
    expect(result.user).toEqual(mockAuthResponse.data.user);
    expect(result.error).toBeUndefined();
  });

  it('handles signin errors', async () => {
    const mockAuthResponse = {
      data: null,
      error: { message: 'Invalid credentials' },
    };
    mockSupabase.auth.signInWithPassword.mockResolvedValue(mockAuthResponse);

    const actualSimpleAuth = jest.requireActual('@/lib/simple-auth').simpleAuth;
    const result = await actualSimpleAuth.signIn('test@example.com', 'wrongpassword');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid credentials');
    expect(result.user).toBeUndefined();
  });
});