'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-[#C4A49E] hover:text-red-400 text-sm transition-colors"
      id="admin-logout-button"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
