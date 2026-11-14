import { getAdminUser } from '@/lib/auth/server';
import { getSitePhotos, sitePhoto } from '@/lib/site-photos';
import { countUnreadMessages } from '@/lib/services/messages';
import { AdminNav } from './admin-nav';
import './admin.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  const [unread, photos] = user
    ? await Promise.all([countUnreadMessages().catch(() => 0), getSitePhotos().catch(() => ({}))])
    : [0, {}];

  return (
    <>
      {user ? <AdminNav unread={unread} logo={sitePhoto(photos, 'site.logo')} /> : null}
      {children}
    </>
  );
}
