import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../add-test-cultural-event';
import { supabase } from '@/lib/supabase';

// Mock Supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({
      data: [{ id: 'test-id' }],
      error: null
    })
  }
}));

const mockRequest = {
  method: 'POST',
  body: {}
} as NextApiRequest;

const mockResponse = () => {
  const res = {} as NextApiResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('/api/add-test-cultural-event', () => {
  it('should create cultural event and return 201 status', async () => {
    const req = mockRequest;
    const res = mockResponse();

    await handler(req, res);

    // Verify Supabase call
    expect(supabase.from).toHaveBeenCalledWith('events');
    expect(supabase.insert).toHaveBeenCalledWith([expect.objectContaining({
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
    const req = { ...mockRequest, method: 'GET' } as NextApiRequest;
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });
});