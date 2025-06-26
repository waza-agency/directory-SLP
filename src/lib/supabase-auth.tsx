import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSessionContext, Session } from '@supabase/auth-helpers-react';
import { User, AuthError } from '@supabase/supabase-js';

// Add debug logging to verify supabaseClient is available
// (We will log inside the component instead)

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ data: any | null; error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ data: any | null; error: AuthError | null }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ data: any | null; error: AuthError | null }>;
  resetPassword: (password: string) => Promise<{ data: any | null; error: AuthError | null }>;
  supabase: any | null; // Now will be supabaseClient
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signUp: async () => ({ error: null, data: null }),
  signIn: async () => ({ error: null, data: null }),
  signOut: async () => {},
  forgotPassword: async () => ({ error: null, data: null }),
  resetPassword: async () => ({ error: null, data: null }),
  supabase: null,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, isLoading, supabaseClient } = useSessionContext();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before doing any operations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Validate environment variables on mount - CLIENT SIDE ONLY
  useEffect(() => {
    if (!isClient) return;

    const validateEnvironment = () => {
      try {
        const requiredVars = {
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        };

        const missing = Object.entries(requiredVars)
          .filter(([key, value]) => !value)
          .map(([key]) => key);

        if (missing.length > 0) {
          const errorMsg = `Missing required environment variables: ${missing.join(', ')}`;
          console.error('AuthProvider:', errorMsg);
          setAuthError(errorMsg);
          return false;
        }

        if (!supabaseClient) {
          const errorMsg = 'Supabase client is not available';
          console.error('AuthProvider:', errorMsg);
          setAuthError(errorMsg);
          return false;
        }

        console.log('AuthProvider: Environment validation passed');
        setAuthError(null);
        return true;
      } catch (error) {
        console.error('AuthProvider: Error during environment validation:', error);
        setAuthError('Environment validation failed');
        return false;
      }
    };

    validateEnvironment();
  }, [supabaseClient, isClient]);

  // Session refresh - CLIENT SIDE ONLY
  useEffect(() => {
    if (!isClient || !session?.access_token || !supabaseClient) return;

    const checkAndRefreshSession = async () => {
      console.log('Session found, verifying user...');
      try {
        const { data: { user: currentUser }, error } = await supabaseClient.auth.getUser();
        if (error) {
          console.error('Error refreshing session:', error);

          // Check if we're in a payment flow - if so, be less aggressive
          const pathname = window.location.pathname;
          const isInPaymentFlow = pathname.includes('/subscription-success') ||
                                  pathname.includes('/checkout') ||
                                  pathname.includes('/payment') ||
                                  window.location.search.includes('session_id');

          if (isInPaymentFlow) {
            console.log('In payment flow, not immediately signing out - will retry session');
            // Give some time for the session to potentially recover
            setTimeout(async () => {
              try {
                const { data: { user: retryUser }, error: retryError } = await supabaseClient.auth.getUser();
                if (retryError || !retryUser) {
                  console.log('Session retry failed, proceeding with sign out');
                  await supabaseClient.auth.signOut();
                  if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
                    window.location.href = '/signin';
                  }
                }
              } catch (retryErr) {
                console.error('Retry session check failed:', retryErr);
                await supabaseClient.auth.signOut();
                if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
                  window.location.href = '/signin';
                }
              }
            }, 5000); // Wait 5 seconds before retrying
            return; // Don't immediately sign out
          }

          await supabaseClient.auth.signOut();
          // Only redirect to signin if we're not already on an auth page
          if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
            window.location.href = '/signin';
          }
        } else if (!currentUser) {
          console.error('No user found after refresh');

          // Check if we're in a payment flow
          const pathname = window.location.pathname;
          const isInPaymentFlow = pathname.includes('/subscription-success') ||
                                  pathname.includes('/checkout') ||
                                  pathname.includes('/payment') ||
                                  window.location.search.includes('session_id');

          if (isInPaymentFlow) {
            console.log('In payment flow with no user, delaying sign out');
            setTimeout(async () => {
              try {
                const { data: { user: retryUser } } = await supabaseClient.auth.getUser();
                if (!retryUser) {
                  await supabaseClient.auth.signOut();
                  if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
                    window.location.href = '/signin';
                  }
                }
              } catch (retryErr) {
                console.error('Retry session check failed:', retryErr);
                await supabaseClient.auth.signOut();
                if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
                  window.location.href = '/signin';
                }
              }
            }, 5000);
            return;
          }

          await supabaseClient.auth.signOut();
          // Only redirect to signin if we're not already on an auth page
          if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
            window.location.href = '/signin';
          }
        } else {
          console.log('Session verified successfully:', currentUser.id);
        }
      } catch (err) {
        console.error('Exception refreshing session:', err);

        // Check if we're in a payment flow
        const pathname = window.location.pathname;
        const isInPaymentFlow = pathname.includes('/subscription-success') ||
                                pathname.includes('/checkout') ||
                                pathname.includes('/payment') ||
                                window.location.search.includes('session_id');

        if (isInPaymentFlow) {
          console.log('Exception during payment flow, will retry before signing out');
          setTimeout(async () => {
            try {
              const { data: { user: retryUser } } = await supabaseClient.auth.getUser();
              if (!retryUser) {
                await supabaseClient.auth.signOut();
                if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
                  window.location.href = '/signin';
                }
              }
            } catch (retryErr) {
              console.error('Final retry failed:', retryErr);
              try {
                await supabaseClient.auth.signOut();
              } catch (signOutError) {
                console.error('Error signing out after final retry failure:', signOutError);
              }
              if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
                window.location.href = '/signin';
              }
            }
          }, 5000);
          return;
        }

        try {
          await supabaseClient.auth.signOut();
        } catch (signOutError) {
          console.error('Error signing out after session refresh failure:', signOutError);
        }
        // Only redirect to signin if we're not already on an auth page
        if (!pathname.includes('/signin') && !pathname.includes('/signup')) {
          window.location.href = '/signin';
        }
      }
    };

    if (!authError) {
      checkAndRefreshSession();
    }
  }, [session, supabaseClient, authError, isClient]);

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider signUp called with:', email);

    if (authError) {
      return { data: null, error: new Error(authError) as AuthError };
    }

    if (!supabaseClient || !supabaseClient.auth) {
      console.error('Supabase client or auth is not available in signUp function');
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (!error && data?.user) {
        console.log('Auth signup successful, user record will be created automatically by trigger');
        // User record is now created automatically by database trigger
        // No need to manually insert user record here
      }

      return { data, error };
    } catch (err: any) {
      console.error('Unexpected error in signUp:', err);
      return { data: null, error: err as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider signIn called with:', email);

    if (authError) {
      return { data: null, error: new Error(authError) as AuthError };
    }

    if (!supabaseClient || !supabaseClient.auth) {
      console.error('Supabase client or auth is not available in signIn function');
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }

    try {
      console.log('Attempting sign in with Supabase...');
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { data: null, error };
      }

      if (!data?.user) {
        console.error('No user returned from signIn');
        return { data: null, error: new Error('No user returned from sign in') as AuthError };
      }

      console.log('Sign in successful, user:', data.user.id);

      // Verify the session is established
      try {
        const { data: { session: currentSession }, error: sessionError } = await supabaseClient.auth.getSession();

        if (sessionError || !currentSession) {
          console.error('Failed to establish session:', sessionError);
          return { data: null, error: sessionError || new Error('Failed to establish session') as AuthError };
        }

        console.log('Session established successfully');
        return { data, error: null };
      } catch (sessionErr: any) {
        console.error('Exception when verifying session:', sessionErr);
        return { data, error: null }; // Still return success since user is signed in
      }
    } catch (err: any) {
      console.error('Unexpected error in signIn:', err);
      return { data: null, error: err as AuthError };
    }
  };

  const signOut = async () => {
    if (!supabaseClient) return;

    try {
      await supabaseClient.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const forgotPassword = async (email: string) => {
    if (!supabaseClient) {
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }

    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return { data, error };
    } catch (err: any) {
      console.error('Unexpected error in forgotPassword:', err);
      return { data: null, error: err as AuthError };
    }
  };

  const resetPassword = async (password: string) => {
    if (!supabaseClient) {
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }

    try {
      const { data, error } = await supabaseClient.auth.updateUser({ password });
      return { data, error };
    } catch (err: any) {
      console.error('Unexpected error in resetPassword:', err);
      return { data: null, error: err as AuthError };
    }
  };

  // Return early on server-side to avoid any issues
  if (!isClient) {
    return (
      <AuthContext.Provider value={{
        user: null,
        session: null,
        isLoading: true,
        signUp,
        signIn,
        signOut,
        forgotPassword,
        resetPassword,
        supabase: null,
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{
      user: session?.user || null,
      session,
      isLoading: isLoading || !isClient,
      signUp,
      signIn,
      signOut,
      forgotPassword,
      resetPassword,
      supabase: supabaseClient,
    }}>
      {children}
    </AuthContext.Provider>
  );
};