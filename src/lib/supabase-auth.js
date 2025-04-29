import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

export const AuthContext = createContext({
  user: null,
  session: null,
  isLoading: true,
  signUp: async () => ({ error: null, data: null }),
  signIn: async () => ({ error: null, data: null }),
  signOut: async () => {},
  forgotPassword: async () => ({ error: null, data: null }),
  resetPassword: async () => ({ error: null, data: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    fetchSession();

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
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data?.user) {
      // Create a user record in our users table when they sign up
      await supabase.from('users').insert([
        { 
          id: data.user.id,
          email: data.user.email,
          account_type: 'user', // Default to user account type
        }
      ]);
    }

    return { data, error };
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 