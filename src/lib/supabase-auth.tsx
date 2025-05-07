import React, { createContext, useContext, useEffect } from 'react';
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

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, isLoading, supabaseClient } = useSessionContext();

  useEffect(() => {
    const checkAndRefreshSession = async () => {
      if (session?.access_token) {
        console.log('Session found, verifying user...');
        try {
          const { data: { user: currentUser }, error } = await supabaseClient.auth.getUser();
          if (error) {
            console.error('Error refreshing session:', error);
            await supabaseClient.auth.signOut();
            window.location.href = '/signin';
          } else if (!currentUser) {
            console.error('No user found after refresh');
            await supabaseClient.auth.signOut();
            window.location.href = '/signin';
          } else {
            console.log('Session verified successfully:', currentUser.id);
          }
        } catch (err) {
          console.error('Exception refreshing session:', err);
          await supabaseClient.auth.signOut();
          window.location.href = '/signin';
        }
      }
    };

    checkAndRefreshSession();
  }, [session, supabaseClient]);

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider signUp called with:', email);
    
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
          } else {
            console.log('User record created successfully');
            window.location.href = '/account';
          }
        } catch (insertErr) {
          console.error('Exception when creating user record:', insertErr);
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
    
    if (!supabaseClient || !supabaseClient.auth) {
      console.error('Supabase client or auth is not available in signIn function');
      return { data: null, error: new Error('Supabase client is not available') as AuthError };
    }
    
    try {
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

      // Verify the session is established
      const { data: { session: currentSession }, error: sessionError } = await supabaseClient.auth.getSession();
      
      if (sessionError || !currentSession) {
        console.error('Failed to establish session:', sessionError);
        return { data: null, error: sessionError || new Error('Failed to establish session') as AuthError };
      }

      console.log('Sign in successful, redirecting to account...');
      window.location.href = '/account';
      return { data, error: null };
      
    } catch (err: any) {
      console.error('Unexpected error in signIn:', err);
      return { data: null, error: err as AuthError };
    }
  };

  const signOut = async () => {
    if (supabaseClient && supabaseClient.auth) {
      await supabaseClient.auth.signOut();
      window.location.href = '/signin';
    } else {
      console.error('Cannot sign out: Supabase auth is not available');
    }
  };

  const forgotPassword = async (email: string) => {
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
    isLoading,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    supabase: supabaseClient,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 