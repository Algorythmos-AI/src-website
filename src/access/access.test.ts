import { describe, expect, it } from 'vitest';
import { anyone, isAdmin, isAdminOrEditor, isAuthenticated, publishedOrLoggedIn } from './index';

// Minimal req stubs; only the `user` field is read by these functions.
const asReq = (user: unknown) => ({ req: { user } }) as never;

describe('access control', () => {
  it('isAuthenticated is true only with a user', () => {
    expect(isAuthenticated(asReq({ role: 'editor' }))).toBe(true);
    expect(isAuthenticated(asReq(null))).toBe(false);
  });

  it('isAdmin is true only for admins', () => {
    expect(isAdmin(asReq({ role: 'admin' }))).toBe(true);
    expect(isAdmin(asReq({ role: 'editor' }))).toBe(false);
    expect(isAdmin(asReq(null))).toBe(false);
  });

  it('isAdminOrEditor accepts both roles, rejects others', () => {
    expect(isAdminOrEditor(asReq({ role: 'admin' }))).toBe(true);
    expect(isAdminOrEditor(asReq({ role: 'editor' }))).toBe(true);
    expect(isAdminOrEditor(asReq({ role: 'viewer' }))).toBe(false);
    expect(isAdminOrEditor(asReq(null))).toBe(false);
  });

  it('anyone is always true', () => {
    expect(anyone()).toBe(true);
  });

  it('publishedOrLoggedIn: logged-in users get full access', () => {
    expect(publishedOrLoggedIn(asReq({ role: 'editor' }))).toBe(true);
  });

  it('publishedOrLoggedIn: anonymous users are constrained to published docs', () => {
    const result = publishedOrLoggedIn(asReq(null));
    expect(result).toEqual({ _status: { equals: 'published' } });
  });
});
