'use client';

import { useCart } from '@/lib/cart-context';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useEffect } from 'react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#1a1a1a] border-l border-[#2a2a2a] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="cart-drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#C9A24B]" />
            <span className="font-display text-xl font-semibold text-[#F3ECE0]">
              Your Bag
            </span>
            {totalItems > 0 && (
              <span className="bg-[#6B1420] text-xs text-[#F3ECE0] rounded-full px-2 py-0.5 font-medium">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors rounded-lg hover:bg-[#2a2a2a]"
            aria-label="Close cart"
            id="close-cart-button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#C4A49E]" />
              </div>
              <div>
                <p className="text-[#DDD5C8] font-medium mb-1">Your bag is empty</p>
                <p className="text-[#C4A49E] text-sm">Add some beautiful pieces to get started</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#6B1420] text-[#F3ECE0] rounded-lg text-sm font-medium hover:bg-[#8B1A28] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 bg-[#121212] rounded-xl p-4 border border-[#2a2a2a]"
              >
                <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-[#2a2a2a]">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#F3ECE0] text-sm font-medium leading-snug line-clamp-2">
                    {item.productName}
                  </h4>
                  <p className="text-[#C4A49E] text-xs mt-1">
                    {[item.size, item.color].filter(Boolean).join(' · ')}
                  </p>
                  <p className="text-[#C9A24B] font-semibold mt-1.5 text-sm">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="p-1.5 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm text-[#F3ECE0] w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="p-1.5 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="p-1.5 text-[#C4A49E] hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#2a2a2a] space-y-4">
            <div className="flex justify-between text-sm text-[#DDD5C8]">
              <span>Subtotal ({totalItems} items)</span>
              <span className="text-[#C9A24B] font-semibold text-base">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-[#C4A49E]">
              💛 Reserve now — pay when you collect in-store
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-4 bg-gradient-to-r from-[#6B1420] to-[#8B1A28] text-[#F3ECE0] font-semibold text-center rounded-xl hover:opacity-90 transition-opacity"
              id="proceed-to-checkout-button"
            >
              Proceed to Reserve
            </Link>
            <button
              onClick={onClose}
              className="block w-full py-3 border border-[#C9A24B]/40 text-[#C9A24B] text-sm font-medium text-center rounded-xl hover:bg-[#C9A24B]/10 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
