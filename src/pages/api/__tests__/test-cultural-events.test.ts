import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../test-cultural-events';
import { supabase } from '@/lib/supabase';

// First, let's look at the full test and make sure our mock matches the implementation in the route handler
jest.mock('@/lib/supabase', () => {
  // This is our mock data that will be returned from the query
  const mockData = [{
    id: 'test-event-1',
    title: 'Cultural Festival',
    description: 'Test event',
    location: 'San Luis Potosí',
    start_date: '2025-01-01',
    end_date: '2025-01-03',
    category: 'cultural'
  }];

  // Create a fully chainable mock with all the methods needed
  return {
    supabase: {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnThis(),
          or: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue({
            data: mockData,
            error: null
          })
        })
      })
    }
  };
});

const mockRequest = {
  method: 'GET',
  query: {}
} as unknown as NextApiRequest;

const mockResponse = () => {
  const res = {} as Partial<NextApiResponse>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as NextApiResponse;
};

describe('/api/test-cultural-events', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return event data with proper structure', async () => {
    const req = mockRequest;
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      currentDate: expect.any(String),
      filteredEvents: expect.any(Array),
      allEvents: expect.any(Array)
    }));
  });

  it('should handle Supabase errors', async () => {
    // Override the implementation for this test only
    (supabase.from as jest.Mock).mockImplementationOnce(() => ({
      select: jest.fn().mockReturnValue({
        or: jest.fn().mockReturnValue({
          gte: jest.fn().mockReturnValue({
            order: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: null,
                error: { message: 'Database error' }
              })
            })
          })
        })
      })
    }));

    const req = mockRequest;
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Failed to test cultural events query' })
    );
  });
});