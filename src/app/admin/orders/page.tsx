import { getOrders } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import OrdersClient from './OrdersClient';
import AdminLogoutButton from '../AdminLogoutButton';

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image src="/logo.svg" alt="Fashion Spot" fill className="object-cover" />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-[#C9A24B] hover:underline">← Dashboard</Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <OrdersClient initialOrders={orders} />
      </div>
    </div>
  );
}
