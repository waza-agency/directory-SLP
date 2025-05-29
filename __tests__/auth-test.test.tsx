import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthTest from '../auth-test';
import { useAuth } from '@/lib/supabase-auth';

jest.mock('@/lib/supabase-auth', () => ({
  useAuth: jest.fn().mockReturnValue({
    signIn: jest.fn().mockResolvedValue({ error: null }),
    user: null,
    session: null,
    isLoading: false
  })
}));

describe('AuthTest Page', () => {
  it('renders auth state correctly', () => {
    render(<AuthTest />);
    expect(screen.getByText('Auth Test Page')).toBeInTheDocument();
    const authStatePre = screen.getByText(/"user": null/);
    expect(authStatePre).toBeInTheDocument();
  });

  it('handles sign in with custom auth', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ error: null });
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      user: null,
      session: null,
      isLoading: false
    });

    render(<AuthTest />);

    // Get the inputs directly
    const emailInput = screen.getAllByRole('textbox')[0];
    const passwordInput = screen.getByDisplayValue('password123');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(passwordInput, {
      target: { value: 'password123' }
    });

    const signInButton = screen.getByText('Sign In (Custom)');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
    });
  });
});