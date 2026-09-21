'use client';

import { useEffect } from 'react';
import { staticT } from '@/lib/i18n-static';

// Renders only when the root layout itself throws, so it must provide <html>.
// This is outside the locale segment, so the default-locale catalogue is used.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = staticT('en', 'error');
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('title')}</h1>
          <p style={{ marginBottom: '2rem' }}>{t('message')}</p>
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
            {t('retry')}
          </button>
        </div>
      </body>
    </html>
  );
}
