'use client';

import { useEffect } from 'react';

// Renders only when the root layout itself throws, so it must provide <html>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#f7e8d2',
          color: '#211008',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Something went wrong.</h1>
          <p style={{ marginBottom: '2rem' }}>An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            style={{
              background: '#6f1e0c',
              color: '#fff',
              border: 0,
              padding: '0.9rem 2rem',
              borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
