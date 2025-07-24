import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch globally
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('renders main heading', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00Z',
        version: '1.0.0'
      })
    });

    render(<App />);
    expect(screen.getByText('Rails + React Full Stack App')).toBeInTheDocument();
  });

  test('renders API health check section', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00Z',
        version: '1.0.0'
      })
    });

    render(<App />);
    expect(screen.getByText('API Health Check')).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays health data when API call succeeds', async () => {
    const mockHealthData = {
      status: 'healthy',
      timestamp: '2024-01-01T12:00:00Z',
      version: '1.0.0'
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockHealthData
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Status:/)).toBeInTheDocument();
    });
    
    expect(screen.getByText('healthy')).toBeInTheDocument();
    expect(screen.getByText(/Version:/)).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText(/Timestamp:/)).toBeInTheDocument();
    expect(screen.getByText('2024-01-01T12:00:00Z')).toBeInTheDocument();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Failed to connect to API')).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('makes API call to correct endpoint', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00Z',
        version: '1.0.0'
      })
    });

    render(<App />);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/health');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('renders tech stack information', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00Z',
        version: '1.0.0'
      })
    });

    render(<App />);
    expect(screen.getByText('Ruby 3.4 + Rails 8.0 + React with TypeScript')).toBeInTheDocument();
  });
});
