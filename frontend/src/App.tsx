import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/health')
      .then(response => response.json())
      .then((data: HealthResponse) => {
        setHealth(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to connect to API');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Rails + React Full Stack App</h1>
        
        <div style={{ margin: '20px 0' }}>
          <h2>API Health Check</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {health && (
            <div style={{ textAlign: 'left', background: '#282c34', padding: '20px', borderRadius: '5px' }}>
              <p><strong>Status:</strong> {health.status}</p>
              <p><strong>Version:</strong> {health.version}</p>
              <p><strong>Timestamp:</strong> {health.timestamp}</p>
            </div>
          )}
        </div>

        <p>
          Ruby 3.4 + Rails 8.0 + React with TypeScript
        </p>
      </header>
    </div>
  );
}

export default App;
