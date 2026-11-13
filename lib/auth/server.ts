import 'server-only';
import { createNeonAuth } from '@neon/auth/next/server';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

// Returns the signed-in administrator, or null when signed out or not on the ADMIN_EMAILS allowlist.
export async function getAdminUser() {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email?.toLowerCase();
  if (!session?.user || !email || !adminEmails().includes(email)) return null;
  return session.user;
}
