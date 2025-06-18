import { render, screen, waitFor } from '@testing-library/react';
import Contact from '../src/pages/contact';

// Mock fetch for /api/stats
beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url === '/api/stats') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ placesCount: 42, servicesCount: 17 })
      });
    }
    return Promise.reject(new Error('Unknown endpoint'));
  }) as jest.Mock;
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Contact Page Stats', () => {
  it('displays the real places and services count from the API', async () => {
    render(<Contact />);
    // Wait for the stats to load
    await waitFor(() => {
      expect(screen.getByTestId('places-count').textContent).toBe('42');
      expect(screen.getByTestId('services-count').textContent).toBe('17');
    });
  });

  it('shows ... while loading', () => {
    render(<Contact />);
    expect(screen.getByTestId('places-count').textContent).toBe('...');
    expect(screen.getByTestId('services-count').textContent).toBe('...');
  });
});