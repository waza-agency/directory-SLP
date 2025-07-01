import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../add-test-cultural-event';
import { supabase } from '@/lib/supabase';

// Mock Supabase client with the right structure
jest.mock('@/lib/supabase', () => {
  const mockInsertChain = {
    select: jest.fn().mockReturnValue({
      data: [{ id: 'test-id' }],
      error: null
    })
  };

  return {
    supabase: {
      from: jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue(mockInsertChain)
      })
    }
  };
});

// Define reusable request and response mocks
const mockRequest = (method = 'POST') => ({
  method,
  body: {}
}) as NextApiRequest;

const mockResponse = () => {
  const res = {} as Partial<NextApiResponse>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as NextApiResponse;
};

// Test implementation
describe('/api/add-test-cultural-event', () => {
  it('should create cultural event and return 201 status', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await handler(req, res);

    // Verify Supabase call
    expect(supabase.from).toHaveBeenCalledWith('events');
    expect(supabase.from().insert).toHaveBeenCalledWith([expect.objectContaining({
      title: 'Cultural Festival of San Luis Potosí',
      category: 'cultural',
      featured: true
    })]);

    // Verify response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test cultural event created successfully',
      event: [{ id: 'test-id' }]
    });
  });

  it('should reject non-POST methods', async () => {
    const req = mockReques"DEFAULT";
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });
});