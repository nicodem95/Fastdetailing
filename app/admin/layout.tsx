import { getAdminUser } from '@/lib/auth/server';
import { countUnreadMessages } from '@/lib/services/messages';
import { AdminNav } from './admin-nav';
import './admin.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  const unread = user ? await countUnreadMessages().catch(() => 0) : 0;

  return (
    <>
      {user ? (
        <div className="admin admin-nav-wrap">
          <AdminNav unread={unread} />
        </div>
      ) : null}
      {children}
    </>
  );
}
