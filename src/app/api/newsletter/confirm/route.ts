import { getPayloadClient } from '@/lib/payload';
import { hashToken } from '@/lib/forms/security';
import { staticT, isRtl, normalizeLocale } from '@/lib/i18n-static';

export const runtime = 'nodejs';

function page(locale: string, title: string, message: string, status = 200): Response {
  const t = staticT(locale, 'newsletter');
  const dir = isRtl(locale) ? 'rtl' : 'ltr';
  const arrow = dir === 'rtl' ? '→' : '←';
  return new Response(
    `<!doctype html><html lang="${normalizeLocale(locale)}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
    <body style="font-family:system-ui,sans-serif;background:#f7e8d2;color:#211008;min-height:100vh;display:flex;align-items:center;justify-content:center;margin:0">
      <div style="text-align:center;padding:2rem;max-width:32rem">
        <h1 style="color:#6f1e0c;font-size:1.75rem">${title}</h1>
        <p>${message}</p>
        <p><a href="/${normalizeLocale(locale)}" style="color:#6f1e0c;font-weight:bold">${arrow} ${t('returnHome')}</a></p>
      </div>
    </body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');
  const locale = normalizeLocale(url.searchParams.get('locale'));
  const t = staticT(locale, 'newsletter');
  if (!token || !email) return page(locale, t('invalidTitle'), t('invalidIncomplete'), 400);

  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'newsletter-subscribers',
    where: { email: { equals: email.toLowerCase() } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const sub = res.docs[0];

  if (!sub || sub.tokenHash !== hashToken(token)) {
    return page(locale, t('invalidTitle'), t('invalidExpired'), 400);
  }

  await payload.update({
    collection: 'newsletter-subscribers',
    id: sub.id,
    overrideAccess: true,
    data: { status: 'confirmed', confirmedAt: new Date().toISOString(), tokenHash: null },
  });

  return page(locale, t('confirmedTitle'), t('confirmedBody'));
}
