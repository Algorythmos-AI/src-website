// Fails if any locale is missing keys present in the default (en) messages,
// or has extra keys that en does not. Run in CI to keep translations complete.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const messagesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'messages');
const base = 'en';

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object' && !Array.isArray(value)
      ? flatten(value, path)
      : [path];
  });
}

const load = (locale) => JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), 'utf8'));

const baseKeys = new Set(flatten(load(base)));
const locales = readdirSync(messagesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace('.json', ''))
  .filter((l) => l !== base);

let failed = false;
for (const locale of locales) {
  const keys = new Set(flatten(load(locale)));
  const missing = [...baseKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !baseKeys.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`\n[${locale}] mismatch vs ${base}:`);
    if (missing.length) console.error(`  missing: ${missing.join(', ')}`);
    if (extra.length) console.error(`  extra:   ${extra.join(', ')}`);
  }
}

if (failed) {
  console.error('\ni18n key parity check failed.');
  process.exit(1);
}
console.log(`i18n key parity OK across: ${[base, ...locales].join(', ')}`);
