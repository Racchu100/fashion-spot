import { getOrderById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { formatPrice, formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, MapPin, Clock, Phone, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reservation Confirmed',
};

interface Props {
  params: { id: string };
}

export default function OrderConfirmationPage({ params }: Props) {
  const order = getOrderById(params.id);
  if (!order) notFound();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Success Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Circular badge motif */}
            <div className="w-24 h-24 rounded-full bg-[#6B1420]/20 border-2 border-[#C9A24B]/60 flex items-center justify-center animate-float">
              <CheckCircle size={36} className="text-[#C9A24B]" />
            </div>
            <div className="absolute inset-0 rounded-full border border-[#C9A24B]/20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <h1 className="font-display text-4xl font-bold text-[#F3ECE0] mb-3">
            You&apos;re Reserved! 🎉
          </h1>
          <p className="text-[#DDD5C8] text-sm leading-relaxed max-w-sm mx-auto">
            Your items have been set aside at our Mangalore boutique. Bring your reservation code when you visit.
          </p>
        </div>

        {/* Reservation Ticket */}
        <div className="bg-[#1a1a1a] border border-[#C9A24B]/30 rounded-3xl overflow-hidden mb-6">
          {/* Ticket Header */}
          <div className="burgundy-gradient px-6 py-5 text-center relative">
            <div className="absolute top-3 left-3 w-14 h-14 rounded-full border border-[#C9A24B]/30" />
            <div className="absolute bottom-2 right-4 w-10 h-10 rounded-full border border-[#C9A24B]/20" />
            <p className="text-[#F3ECE0]/70 text-xs tracking-widest uppercase mb-1 font-medium">Fashion Spot Mangalore</p>
            <h2 className="font-display text-2xl font-bold text-[#F3ECE0] mb-2">Reservation Confirmed</h2>
            {/* Reservation Code */}
            <div className="inline-flex items-center gap-2 bg-[#121212]/50 border border-[#C9A24B]/40 rounded-xl px-5 py-2.5 mt-1">
              <span className="text-[#C4A49E] text-xs">Code</span>
              <span className="font-mono text-[#C9A24B] font-bold text-xl tracking-widest" id="reservation-code">
                {order.reservationCode}
              </span>
            </div>
          </div>

          {/* Dashed divider with circles */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#121212] border-r-0 border-2 border-[#2a2a2a] -ml-3" />
            <div className="flex-1 border-t-2 border-dashed border-[#2a2a2a]" />
            <div className="w-6 h-6 rounded-full bg-[#121212] border-l-0 border-2 border-[#2a2a2a] -mr-3" />
          </div>

          {/* Ticket Body */}
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#C4A49E] text-xs mb-0.5">Customer</p>
                <p className="text-[#F3ECE0] font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-[#C4A49E] text-xs mb-0.5">Phone</p>
                <p className="text-[#F3ECE0] font-medium">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-[#C4A49E] text-xs mb-0.5">Email</p>
                <p className="text-[#F3ECE0] font-medium text-xs truncate">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-[#C4A49E] text-xs mb-0.5">Preferred Pickup</p>
                <p className="text-[#F3ECE0] font-medium">{formatDate(order.pickupDate)}</p>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-[#121212]">
                    <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F3ECE0] text-sm font-medium line-clamp-1">{item.productName}</p>
                    <p className="text-[#C4A49E] text-xs">
                      {[item.size, item.color].filter(Boolean).join(' · ')} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-[#C9A24B] font-semibold text-sm shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-[#2a2a2a] pt-3 flex justify-between">
              <span className="text-[#DDD5C8] font-medium">Total to Pay In-Store</span>
              <span className="font-display text-xl font-bold text-[#C9A24B]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MapPin, title: 'Visit Us', text: 'Hampankatta, Mangalore — 575001' },
            { icon: Clock, title: 'Hold Period', text: 'Items held for 3 days from today' },
            { icon: Phone, title: 'Questions?', text: 'Call +91 98765 43210' },
          ].map((card) => (
            <div key={card.title} className="glass-card rounded-2xl p-4 text-center">
              <card.icon size={22} className="text-[#C9A24B] mx-auto mb-2" />
              <p className="text-[#F3ECE0] text-sm font-medium">{card.title}</p>
              <p className="text-[#C4A49E] text-xs mt-0.5 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/919876543210?text=Hi! I have a reservation at Fashion Spot. Code: ${order.reservationCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 bg-green-700 text-white font-semibold text-center rounded-xl hover:bg-green-600 transition-colors text-sm"
            id="whatsapp-share"
          >
            📱 Share on WhatsApp
          </a>
          <Link
            href="/shop"
            className="flex-1 py-3.5 border border-[#C9A24B]/40 text-[#C9A24B] font-medium text-center rounded-xl hover:bg-[#C9A24B]/10 transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
