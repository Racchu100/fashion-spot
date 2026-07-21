'use client';

import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-[#C4A49E]" />
        </div>
        <h1 className="font-display text-3xl font-bold text-[#F3ECE0] mb-3">Your Bag is Empty</h1>
        <p className="text-[#DDD5C8] mb-8 max-w-sm">
          Discover our beautiful collection and add your favourite pieces to your bag.
        </p>
        <Link
          href="/shop"
          className="flex items-center gap-2 px-8 py-4 burgundy-gradient text-[#F3ECE0] font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F3ECE0] mb-2">
          Shopping Bag
        </h1>
        <p className="text-[#C4A49E] text-sm mb-8">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-5 bg-[#1a1a1a] rounded-2xl p-5 border border-[#2a2a2a] hover:border-[#C9A24B]/30 transition-colors"
              >
                <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-[#121212]">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <h3 className="text-[#F3ECE0] font-medium leading-snug">{item.productName}</h3>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="p-1.5 text-[#C4A49E] hover:text-red-400 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1.5 mb-3">
                    {item.size && (
                      <span className="text-xs px-2 py-0.5 bg-[#121212] border border-[#2a2a2a] text-[#DDD5C8] rounded-full">
                        {item.size}
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 bg-[#121212] border border-[#2a2a2a] text-[#DDD5C8] rounded-full">
                      {item.color}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#121212] rounded-lg border border-[#2a2a2a]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="px-3 py-2 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-[#F3ECE0] font-medium w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="px-3 py-2 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-display text-lg font-bold text-[#C9A24B]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
              <h2 className="font-display text-xl font-semibold text-[#F3ECE0] mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm border-b border-[#2a2a2a] pb-4 mb-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-[#DDD5C8]">
                    <span className="truncate max-w-[180px]">
                      {item.productName} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-semibold text-[#F3ECE0] mb-2">
                <span>Subtotal</span>
                <span className="text-[#C9A24B]">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-[#C4A49E] mb-6">
                💛 Pay when you collect in-store — no online payment required
              </p>
              <Link
                href="/checkout"
                className="block w-full py-4 burgundy-gradient text-[#F3ECE0] font-semibold text-center rounded-xl hover:opacity-90 transition-opacity"
                id="checkout-button"
              >
                Proceed to Reserve
              </Link>
              <Link
                href="/shop"
                className="block w-full py-3 mt-3 border border-[#2a2a2a] text-[#DDD5C8] text-sm font-medium text-center rounded-xl hover:border-[#C9A24B]/40 hover:text-[#C9A24B] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
