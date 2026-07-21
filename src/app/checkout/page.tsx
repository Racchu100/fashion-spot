'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CalendarDays, Phone, Mail, User, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Min date = tomorrow, max = 7 days from now
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your bag is empty. Please add items before reserving.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          pickupDate: formData.pickupDate,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            productImage: i.productImage,
            price: i.price,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
          total: totalPrice,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to place reservation');
      }
      const { id } = await res.json();
      clearCart();
      router.push(`/order-confirmation/${id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full px-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#F3ECE0] placeholder-[#C4A49E] text-sm transition-colors';

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F3ECE0] mb-2">Reserve Your Items</h1>
          <p className="text-[#C4A49E] text-sm">
            No payment required now — just fill in your details and we'll hold your items for up to 3 days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
                <h2 className="font-display text-lg font-semibold text-[#F3ECE0] mb-5">Your Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#DDD5C8] mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A49E]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Shetty"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`${inputClass} pl-11`}
                        id="checkout-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#DDD5C8] mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A49E]" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        pattern="[0-9+\s\-]{10,15}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`${inputClass} pl-11`}
                        id="checkout-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#DDD5C8] mb-1.5">Email Address *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A49E]" />
                      <input
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`${inputClass} pl-11`}
                        id="checkout-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#DDD5C8] mb-1.5">Preferred Pickup Date *</label>
                    <div className="relative">
                      <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A49E]" />
                      <input
                        type="date"
                        required
                        min={minDateStr}
                        max={maxDateStr}
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className={`${inputClass} pl-11`}
                        id="checkout-pickup-date"
                      />
                    </div>
                    <p className="text-xs text-[#C4A49E] mt-1">Within the next 7 days. We'll hold your items for 3 days from today.</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/40 rounded-xl text-red-400 text-sm">
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="bg-[#1a1a1a] rounded-2xl border border-[#C9A24B]/20 p-5">
                <p className="text-[#DDD5C8] text-sm leading-relaxed">
                  <span className="text-[#C9A24B] font-semibold">How it works:</span> Once you submit your reservation, we'll set aside your items. Bring this code to our store in Mangalore and pay in-person. No online payment needed!
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 burgundy-gradient text-[#F3ECE0] font-bold text-base rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                id="submit-reservation"
              >
                {loading ? 'Processing...' : 'Confirm Reservation →'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
              <h2 className="font-display text-lg font-semibold text-[#F3ECE0] mb-4">Your Bag</h2>
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#121212]">
                      <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F3ECE0] text-sm font-medium line-clamp-2">{item.productName}</p>
                      <p className="text-[#C4A49E] text-xs mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(' · ')} × {item.quantity}
                      </p>
                      <p className="text-[#C9A24B] font-semibold text-sm mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="flex justify-between font-semibold">
                  <span className="text-[#DDD5C8]">Total</span>
                  <span className="text-[#C9A24B] text-lg font-display">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-[#C4A49E] mt-2">Payable in-store on collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
