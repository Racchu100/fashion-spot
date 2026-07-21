'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import Image from 'next/image';
import { X, ArrowLeft } from 'lucide-react';

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending: 'bg-amber-900/40 text-amber-300 border-amber-700/40',
  Confirmed: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  Cancelled: 'bg-red-900/40 text-red-300 border-red-700/40',
  Completed: 'bg-green-900/40 text-green-300 border-green-700/40',
};

interface OrdersClientProps {
  initialOrders: Order[];
}

export default function OrdersClient({ initialOrders }: OrdersClientProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [notesFeedback, setNotesFeedback] = useState('');
  const [statusFeedback, setStatusFeedback] = useState('');
  const [saveError, setSaveError] = useState('');

  const filtered = filterStatus === 'All'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  async function updateOrderStatus(id: string, status: OrderStatus) {
    setSaving(true);
    setSaveError('');
    setStatusFeedback('');
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      if (selectedOrder?.id === id) setSelectedOrder(updated);
      setStatusFeedback(`Status updated to ${status}`);
      setTimeout(() => setStatusFeedback(''), 3000);
      router.refresh();
    } catch (err: any) {
      setSaveError(err.message || 'Error updating status');
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes(id: string) {
    setSaving(true);
    setSaveError('');
    setNotesFeedback('');
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error('Failed to save notes');
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      setSelectedOrder(updated);
      setNotesFeedback('✓ Notes saved successfully');
      setTimeout(() => setNotesFeedback(''), 3000);
      router.refresh();
    } catch (err: any) {
      setSaveError(err.message || 'Error saving notes');
    } finally {
      setSaving(false);
    }
  }

  function openOrder(order: Order) {
    setSelectedOrder(order);
    setNotes(order.notes || '');
  }

  return (
    <div className="flex gap-6">
      {/* List */}
      <div className="flex-1 min-w-0">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {['All', ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                filterStatus === s
                  ? 'bg-[#6B1420] border-[#6B1420] text-[#F3ECE0]'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#DDD5C8] hover:border-[#C9A24B]/40'
              }`}
              id={`filter-${s}`}
            >
              {s} {s !== 'All' && `(${orders.filter((o) => o.status === s).length})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#C4A49E]">No orders in this status.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <div
                key={order.id}
                onClick={() => openOrder(order)}
                className={`bg-[#1a1a1a] rounded-2xl border cursor-pointer transition-colors hover:border-[#C9A24B]/40 p-5 ${
                  selectedOrder?.id === order.id ? 'border-[#C9A24B]/50' : 'border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[#F3ECE0] font-semibold">{order.customerName}</p>
                    <p className="text-[#C4A49E] text-xs font-mono mt-0.5">{order.reservationCode}</p>
                    <p className="text-[#C4A49E] text-xs mt-1">
                      {order.items.length} item(s) · Pickup: {formatDate(order.pickupDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                    <p className="text-[#C9A24B] font-bold mt-1.5">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedOrder && (
        <div className="w-full lg:w-96 shrink-0">
          <div className="sticky top-6 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
            <div className="burgundy-gradient px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-[#F3ECE0]">Order Details</h3>
                <p className="font-mono text-[#C9A24B] text-sm">{selectedOrder.reservationCode}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/50 hover:bg-[#121212]/80 text-[#F3ECE0] rounded-xl text-xs font-semibold transition-colors border border-[#C9A24B]/40"
                id="close-order-details-btn"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Customer */}
              <div className="space-y-1.5 text-sm">
                <p><span className="text-[#C4A49E]">Name:</span> <span className="text-[#F3ECE0]">{selectedOrder.customerName}</span></p>
                <p><span className="text-[#C4A49E]">Phone:</span> <a href={`tel:${selectedOrder.customerPhone}`} className="text-[#C9A24B] hover:underline">{selectedOrder.customerPhone}</a></p>
                <p><span className="text-[#C4A49E]">Email:</span> <span className="text-[#F3ECE0] text-xs">{selectedOrder.customerEmail}</span></p>
                <p><span className="text-[#C4A49E]">Pickup:</span> <span className="text-[#F3ECE0]">{formatDate(selectedOrder.pickupDate)}</span></p>
              </div>

              {/* Items */}
              <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-[#121212]">
                      <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F3ECE0] text-xs font-medium leading-tight">{item.productName}</p>
                      <p className="text-[#C4A49E] text-xs">{[item.size, item.color].filter(Boolean).join(' · ')} × {item.quantity}</p>
                      <p className="text-[#C9A24B] text-xs font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2a2a2a] pt-3 flex justify-between font-semibold text-sm">
                <span className="text-[#DDD5C8]">Total</span>
                <span className="text-[#C9A24B]">{formatPrice(selectedOrder.total)}</span>
              </div>

              {saveError && (
                <div className="p-2.5 bg-red-900/20 border border-red-800/40 rounded-xl text-red-400 text-xs">
                  {saveError}
                </div>
              )}

              {/* Status */}
              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs text-[#C4A49E]">Update Status</label>
                  {statusFeedback && (
                    <span className="text-[11px] text-green-400 font-medium">{statusFeedback}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      disabled={saving || selectedOrder.status === status}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors disabled:opacity-50 ${
                        selectedOrder.status === status
                          ? STATUS_COLORS[status]
                          : 'bg-[#121212] border-[#2a2a2a] text-[#DDD5C8] hover:border-[#C9A24B]/40'
                      }`}
                      id={`status-${status.toLowerCase()}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs text-[#C4A49E]">Internal Notes</label>
                  {notesFeedback && (
                    <span className="text-[11px] text-green-400 font-medium">{notesFeedback}</span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  className="w-full px-3 py-2.5 bg-[#121212] border border-[#2a2a2a] rounded-xl text-[#F3ECE0] placeholder-[#C4A49E] text-xs resize-none"
                  id="order-notes-textarea"
                />
                <button
                  onClick={() => saveNotes(selectedOrder.id)}
                  disabled={saving}
                  className="mt-2 w-full py-2.5 burgundy-gradient text-[#F3ECE0] text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  id="save-notes-button"
                >
                  {saving ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
