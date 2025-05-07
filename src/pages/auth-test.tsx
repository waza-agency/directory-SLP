import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/supabase-auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function AuthTest() {
  const { signIn, user, session, isLoading } = useAuth();
  const supabaseClient = useSupabaseClient();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [directResult, setDirectResult] = useState<any>(null);
  
  useEffect(() => {
    console.log('Auth state:', { user, session, isLoading });
  }, [user, session, isLoading]);
  
  const handleSignIn = async () => {
    setResult(null);
    setError(null);
    
    try {
      console.log('Attempting sign in with custom auth');
      const res = await signIn(email, password);
      console.log('Sign in result:', res);
      setResult(res);
      
      if (res.error) {
        setError(res.error.message);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message);
    }
  };
  
  const handleDirectSignIn = async () => {
    setDirectResult(null);
    setError(null);
    
    try {
      console.log('Attempting direct sign in with Supabase');
      const res = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      console.log('Direct sign in result:', res);
      setDirectResult(res);
      
      if (res.error) {
        setError(res.error.message);
      }
    } catch (err: any) {
      console.error('Direct sign in error:', err);
      setError(err.message);
    }
  };
  
  const checkSupabase = () => {
    console.log('Supabase client:', supabaseClient);
    console.log('Supabase auth:', supabaseClient.auth);
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Auth Test Page</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Auth State:</label>
        <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
          {JSON.stringify({ 
            user: user ? user.id : null,
            session: session ? 'active' : 'none',
            isLoading 
          }, null, 2)}
        </pre>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In (Custom)
        </button>
        
        <button 
          onClick={handleDirectSignIn}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign In (Direct)
        </button>
        
        <button 
          onClick={checkSupabase}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Check Supabase
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {result && (
        <div className="mb-4">
          <label className="block mb-2">Custom Auth Result:</label>
          <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
            {JSON.stringify({
              error: result.error ? {
                message: result.error.message,
                code: result.error.code
              } : null,
              data: result.data ? {
                user: result.data.user ? {
                  id: result.data.user.id,
                  email: result.data.user.email
                } : null,
                session: result.data.session ? 'active' : 'none'
              } : null
            }, null, 2)}
          </pre>
        </div>
      )}
      
      {directResult && (
        <div>
          <label className="block mb-2">Direct Auth Result:</label>
          <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
            {JSON.stringify({
              error: directResult.error ? {
                message: directResult.error.message,
                code: directResult.error.code
              } : null,
              data: directResult.data ? {
                user: directResult.data.user ? {
                  id: directResult.data.user.id,
                  email: directResult.data.user.email
                } : null,
                session: directResult.data.session ? 'active' : 'none'
              } : null
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 