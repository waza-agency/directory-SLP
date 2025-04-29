import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

// Add debug logging to verify supabase is available
console.log('Initializing AuthContext with supabase client available:', !!supabase);

export const AuthContext = createContext({
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add verification that supabase is available
  useEffect(() => {
    if (!supabase) {
      console.error('Supabase client is not available in AuthProvider');
    } else {
      console.log('Supabase client is available in AuthProvider');
    }
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      if (!supabase || !supabase.auth) {
        console.error('Supabase client or auth is not available when fetching session');
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Exception when fetching session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    if (!supabase || !supabase.auth) {
      console.error('Supabase client or auth is not available when setting up auth listener');
      return () => {};
    }

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('Exception when setting up auth listener:', err);
      return () => {};
    }
  }, []);

  const signUp = async (email, password) => {
    console.log('AuthProvider signUp called with:', email);
    
    if (!supabase || !supabase.auth) {
      console.error('Supabase client or auth is not available in signUp function');
      return { data: null, error: new Error('Supabase client is not available') };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      console.log('Supabase signUp response:', { data, error });

      if (!error && data?.user) {
        console.log('Creating user record in users table for:', data.user.id);
        try {
          // Create a user record in our users table when they sign up
          const { error: insertError } = await supabase.from('users').insert([
            { 
              id: data.user.id,
              email: data.user.email,
              account_type: 'user', // Default to user account type
            }
          ]);
          
          if (insertError) {
            console.error('Error creating user record:', insertError);
          } else {
            console.log('User record created successfully');
          }
        } catch (insertErr) {
          console.error('Exception when creating user record:', insertErr);
        }
      }

      return { data, error };
    } catch (err) {
      console.error('Unexpected error in signUp:', err);
      return { data: null, error: err };
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const forgotPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return { data, error };
  };

  const resetPassword = async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    return { data, error };
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    supabase,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 