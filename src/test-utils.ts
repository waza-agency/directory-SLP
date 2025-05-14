import { SupabaseClient } from '@supabase/supabase-js';

// Mock Supabase client
export const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  mockResponse: (data: any, error: any = null) => ({
    data,
    error,
    then: (fn: any) => fn({ data, error })
  })
} as unknown as SupabaseClient;

// Test config
export const TEST_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  TEST_USER: {
    email: 'test@example.com',
    password: 'password123'
  }
};