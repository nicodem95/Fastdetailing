import { getAdminUser } from '@/lib/auth/server';
import { AdminNav } from './admin-nav';
import './admin.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  return (
    <>
      {user ? (
        <div className="admin admin-nav-wrap">
          <AdminNav />
        </div>
      ) : null}
      {children}
    </>
  );
}
