import type { Access, FieldAccess, PayloadRequest } from 'payload';

type AccessArgs = { req: PayloadRequest; id?: string | number };

/** True when a request comes from any authenticated user. */
export const isAuthenticated = ({ req }: AccessArgs): boolean => Boolean(req.user);

/** Admins only. */
export const isAdmin = ({ req }: AccessArgs): boolean => req.user?.role === 'admin';

export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin';

/** Admins or editors (the content team). */
export const isAdminOrEditor = ({ req }: AccessArgs): boolean => {
  const role = req.user?.role;
  return role === 'admin' || role === 'editor';
};

/** Public may read published docs; logged-in users may read drafts too. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return {
    _status: {
      equals: 'published',
    },
  };
};

/** Fully public read. */
export const anyone = (): boolean => true;
