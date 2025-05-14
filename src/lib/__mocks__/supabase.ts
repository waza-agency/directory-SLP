// Mock Supabase client for tests
export const supabase = {
  from: jest.fn().mockImplementation(() => {
    // Create a chainable mock object with all methods
    const mockChain = {
      select: jest.fn().mockReturnValue(mockChain),
      insert: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnValue({
          data: [{ id: 'test-id' }],
          error: null
        })
      })),
      update: jest.fn().mockReturnValue(mockChain),
      delete: jest.fn().mockReturnValue(mockChain),
      eq: jest.fn().mockReturnValue(mockChain),
      or: jest.fn().mockReturnValue(mockChain),
      gte: jest.fn().mockReturnValue(mockChain),
      order: jest.fn().mockReturnValue(mockChain),
      limit: jest.fn().mockResolvedValue({
        data: [{
          id: 'test-event-1',
          title: 'Cultural Festival',
          description: 'Test event',
          location: 'San Luis Potosí',
          start_date: '2025-01-01',
          end_date: '2025-01-03',
          category: 'cultural'
        }],
        error: null
      })
    };
    return mockChain;
  })
};