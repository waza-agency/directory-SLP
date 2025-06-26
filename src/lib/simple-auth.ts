import { supabase } from './supabase';

export interface SimpleAuthResponse {
  success: boolean;
  error?: string;
  user?: any;
}

export const simpleAuth = {
  // Simple signup - only creates auth user
  async signUp(email: string, password: string): Promise<SimpleAuthResponse> {
    try {
      console.log('Simple auth signup:', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Signup error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      if (!data?.user) {
        return {
          success: false,
          error: 'Failed to create user account',
        };
      }

      console.log('Signup successful:', data.user.id);
      return {
        success: true,
        user: data.user,
      };
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Simple signin
  async signIn(email: string, password: string): Promise<SimpleAuthResponse> {
    try {
      console.log('Simple auth signin:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      if (!data?.user) {
        return {
          success: false,
          error: 'Failed to sign in',
        };
      }

      console.log('Signin successful:', data.user.id);
      return {
        success: true,
        user: data.user,
      };
    } catch (error: any) {
      console.error('Unexpected signin error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Simple signout
  async signOut(): Promise<SimpleAuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Signout error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Unexpected signout error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  },

  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error);
        return null;
      }

      return session;
    } catch (error: any) {
      console.error('Unexpected session error:', error);
      return null;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('User error:', error);
        return null;
      }

      return user;
    } catch (error: any) {
      console.error('Unexpected user error:', error);
      return null;
    }
  },
};