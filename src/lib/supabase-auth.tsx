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

  // Validate environment variables on mount
  useEffect(() => {
    const validateEnvironment = () => {
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
    };

    validateEnvironment();
  }, [supabaseClient]);

  useEffect(() => {
    const checkAndRefreshSession = async () => {
      if (session?.access_token && supabaseClient) {
        console.log('Session found, verifying user...');
        try {
          const { data: { user: currentUser }, error } = await supabaseClient.auth.getUser();
          if (error) {
            console.error('Error refreshing session:', error);
            await supabaseClient.auth.signOut();
            if (!window.location.pathname.includes('/signin') && !window.location.pathname.includes('/signup')) {
              window.location.href = '/signin';
            }
          } else if (!currentUser) {
            console.error('No user found after refresh');
            await supabaseClient.auth.signOut();
            if (!window.location.pathname.includes('/signin') && !window.location.pathname.includes('/signup')) {
              window.location.href = '/signin';
            }
          } else {
            console.log('Session verified successfully:', currentUser.id);
          }
        } catch (err) {
          console.error('Exception refreshing session:', err);
          await supabaseClient.auth.signOut();
          if (!window.location.pathname.includes('/signin') && !window.location.pathname.includes('/signup')) {
            window.location.href = '/signin';
          }
        }
      }
    };

    if (!authError && session?.access_token) {
      checkAndRefreshSession();
    }
  }, [session, supabaseClient, authError]);

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
        try {
          const { error: insertError } = await supabaseClient.from('users').insert([
            {
              id: data.user.id,
              email: data.user.email,
              account_type: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

          if (insertError) {
            console.error('Error creating user record:', insertError);
            // Don't fail signup if user record creation fails - user is still created in auth
          } else {
            console.log('User record created successfully');
          }
        } catch (insertErr) {
          console.error('Exception when creating user record:', insertErr);
          // Don't fail signup if user record creation fails - user is still created in auth
        }
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

        // Instead of using window.location.href, return success and let the component handle redirect
        // This prevents server-side rendering issues
        return { data, error: null };

      } catch (sessionErr: any) {
        console.error('Exception checking session:', sessionErr);
        return { data: null, error: sessionErr as AuthError };
      }

    } catch (err: any) {
      console.error('Unexpected error in signIn:', err);
      return { data: null, error: err as AuthError };
    }
  };

  const signOut = async () => {
    if (supabaseClient && supabaseClient.auth) {
      await supabaseClient.auth.signOut();
      // Only redirect to signin if we're not already on an auth page
      if (!window.location.pathname.includes('/signin') && !window.location.pathname.includes('/signup')) {
        window.location.href = '/signin';
      }
    } else {
      console.error('Cannot sign out: Supabase auth is not available');
    }
  };

  const forgotPassword = async (email: string) => {
    if (authError) {
      return { data: null, error: new Error(authError) as AuthError };
    }

    if (!supabaseClient || !supabaseClient.auth) {
      console.error('Supabase client or auth is not available in forgotPassword function');
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }

    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return { data, error };
  };

  const resetPassword = async (password: string) => {
    if (authError) {
      return { data: null, error: new Error(authError) as AuthError };
    }

    if (!supabaseClient || !supabaseClient.auth) {
      console.error('Supabase client or auth is not available in resetPassword function');
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }

    const { data, error } = await supabaseClient.auth.updateUser({
      password,
    });

    return { data, error };
  };

  const value = {
    user: session?.user || null,
    session,
    isLoading: isLoading || !!authError,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    supabase: supabaseClient,
  };

  // If there's an auth error, show it
  if (authError) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Configuration Error</h3>
              <div className="mt-1 text-sm text-gray-500">
                <p>{authError}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};