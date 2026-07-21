import { getOrders, getProducts } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import AdminLogoutButton from './AdminLogoutButton';

export default function AdminDashboard() {
  const orders = getOrders();
  const products = getProducts();

  const pending = orders.filter((o) => o.status === 'Pending').length;
  const confirmed = orders.filter((o) => o.status === 'Confirmed').length;
  const lowStock = products.filter((p) => p.stock <= 3 && p.stock > 0);
  const outOfStock = products.filter((p) => p.stock === 0);
  const totalRevenue = orders.filter((o) => o.status === 'Completed').reduce((s, o) => s + o.total, 0);

  const recentOrders = orders.slice(0, 8);

  const STATUS_COLORS: Record<string, string> = {
    Pending: 'bg-amber-900/40 text-amber-300 border-amber-700/40',
    Confirmed: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
    Cancelled: 'bg-red-900/40 text-red-300 border-red-700/40',
    Completed: 'bg-green-900/40 text-green-300 border-green-700/40',
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      {/* Admin Header */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image src="/logo.svg" alt="Fashion Spot" fill className="object-cover" />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-[#C9A24B] hover:underline">View Store →</Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Nav */}
        <div className="flex gap-3 mb-8">
          {[
            { href: '/admin', label: 'Dashboard' },
            { href: '/admin/orders', label: 'Orders' },
            { href: '/admin/products', label: 'Products' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#DDD5C8] hover:text-[#C9A24B] hover:border-[#C9A24B]/40 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Pending Orders', value: pending, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-900/20' },
            { label: 'Confirmed', value: confirmed, icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-900/20' },
            { label: 'Total Products', value: products.length, icon: Package, color: 'text-[#C9A24B]', bg: 'bg-[#C9A24B]/10' },
            { label: 'Revenue Collected', value: formatPrice(totalRevenue), icon: ShoppingBag, color: 'text-green-400', bg: 'bg-green-900/20' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[#C4A49E] text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {(lowStock.length > 0 || outOfStock.length > 0) && (
          <div className="bg-amber-900/10 border border-amber-700/30 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-amber-400" />
              <h3 className="text-amber-300 font-semibold">Stock Alerts</h3>
            </div>
            <div className="space-y-2">
              {outOfStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-[#F3ECE0]">{p.name}</span>
                  <span className="text-red-400 font-medium">Out of Stock</span>
                </div>
              ))}
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-[#F3ECE0]">{p.name}</span>
                  <span className="text-amber-400 font-medium">Only {p.stock} left</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-[#F3ECE0]">Recent Orders</h2>
              <Link href="/admin/orders" className="text-[#C9A24B] text-xs hover:underline">View all →</Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-[#C4A49E] text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders?id=${order.id}`}
                    className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-0 hover:opacity-80 transition-opacity"
                  >
                    <div>
                      <p className="text-[#F3ECE0] text-sm font-medium">{order.customerName}</p>
                      <p className="text-[#C4A49E] text-xs font-mono">{order.reservationCode}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                      <p className="text-[#C9A24B] text-xs font-medium mt-1">{formatPrice(order.total)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
              <h2 className="font-display font-semibold text-[#F3ECE0] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/admin/products/new"
                  className="flex items-center gap-3 px-4 py-3.5 burgundy-gradient rounded-xl text-[#F3ECE0] font-medium text-sm hover:opacity-90 transition-opacity"
                  id="add-new-product-btn"
                >
                  <Package size={18} />
                  Add New Product
                </Link>
                <Link
                  href="/admin/orders"
                  className="flex items-center gap-3 px-4 py-3.5 bg-[#121212] border border-[#2a2a2a] rounded-xl text-[#DDD5C8] text-sm hover:border-[#C9A24B]/40 hover:text-[#C9A24B] transition-colors"
                >
                  <ShoppingBag size={18} />
                  Manage Orders ({pending} pending)
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-3 px-4 py-3.5 bg-[#121212] border border-[#2a2a2a] rounded-xl text-[#DDD5C8] text-sm hover:border-[#C9A24B]/40 hover:text-[#C9A24B] transition-colors"
                >
                  <Package size={18} />
                  All Products ({products.length})
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
