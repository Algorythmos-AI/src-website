const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);

/**
 * True only when the connection string points at a database on this machine.
 * Used to decide whether Payload may auto-push schema changes in dev: anything
 * remote (Neon, including production) must change through committed migrations.
 */
export const isLocalDatabase = (connectionString: string | undefined): boolean => {
  if (!connectionString) return false;
  try {
    return LOCAL_HOSTS.has(new URL(connectionString).hostname);
  } catch {
    return false;
  }
};
