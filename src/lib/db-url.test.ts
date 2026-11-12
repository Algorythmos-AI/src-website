import { describe, expect, it } from 'vitest';
import { isLocalDatabase } from './db-url';

describe('isLocalDatabase', () => {
  it('accepts databases on this machine', () => {
    expect(isLocalDatabase('postgres://me@localhost:5432/src')).toBe(true);
    expect(isLocalDatabase('postgresql://me:pw@127.0.0.1/src')).toBe(true);
    expect(isLocalDatabase('postgres://me@[::1]:5432/src')).toBe(true);
  });

  it('rejects remote, missing and malformed connection strings', () => {
    expect(
      isLocalDatabase('postgres://u:p@ep-x-pooler.us-east-1.aws.neon.tech/db?sslmode=require')
    ).toBe(false);
    expect(isLocalDatabase('postgres://u@localhost.example.com/db')).toBe(false);
    expect(isLocalDatabase(undefined)).toBe(false);
    expect(isLocalDatabase('')).toBe(false);
    expect(isLocalDatabase('not a url')).toBe(false);
  });
});
