import Link from 'next/link';
import { staticT } from '@/lib/i18n-static';

// Root-level 404 for paths that never reach a locale segment. These requests
// carry no locale, so the default-locale (English) catalogue is used.
export default function RootNotFound() {
  const t = staticT('en', 'notFound');
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
          <h1 style={{ fontSize: '4rem', margin: 0, color: 'rgba(111,30,12,0.15)' }}>
            {t('code')}
          </h1>
          <p style={{ fontSize: '1.25rem', margin: '1rem 0 2rem' }}>{t('message')}</p>
          <Link
            href="/en"
            style={{
              background: '#6f1e0c',
              color: '#fff',
              padding: '0.9rem 2rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            {t('returnHome')}
          </Link>
        </div>
      </body>
    </html>
  );
}
