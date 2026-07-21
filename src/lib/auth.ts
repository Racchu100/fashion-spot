import { cookies } from 'next/headers';

const SESSION_COOKIE = 'fs_admin_session';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'fashionspot@admin';
const SESSION_SECRET = process.env.SESSION_SECRET || 'fs-secret-2024';

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  // Simple base64 token — swap for JWT in production
  return Buffer.from(`${SESSION_SECRET}:${Date.now()}`).toString('base64');
}

export function verifySession(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded.startsWith(`${SESSION_SECRET}:`);
  } catch {
    return false;
  }
}

export function getSession(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export function isAuthenticated(): boolean {
  const session = getSession();
  if (!session) return false;
  return verifySession(session);
}

export { SESSION_COOKIE };
