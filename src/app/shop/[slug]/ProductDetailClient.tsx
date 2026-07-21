'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/lib/types';
import { formatPrice, getStockStatus } from '@/lib/utils';
import { ShoppingBag, Check, ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const stockStatus = getStockStatus(product.stock);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: product.price,
      size: selectedSize === 'Free Size' ? undefined : selectedSize,
      color: selectedColor,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#C4A49E] mb-8">
          <Link href="/" className="hover:text-[#C9A24B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#C9A24B] transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#C9A24B] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#DDD5C8] truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a]">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#C9A24B] text-[#121212] font-bold text-sm px-3 py-1.5 rounded-full">
                  -{discount}%
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-[#C9A24B]' : 'border-[#2a2a2a]'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#C9A24B] text-xs uppercase tracking-widest font-medium">{product.category}</span>
              {product.featured && <Star size={14} className="text-[#C9A24B] fill-[#C9A24B]" />}
              {product.newArrival && (
                <span className="bg-[#6B1420] text-[#F3ECE0] text-xs px-2 py-0.5 rounded-full">New</span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F3ECE0] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display text-3xl font-bold text-[#C9A24B]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-[#C4A49E] text-lg line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {discount > 0 && (
                <span className="text-green-400 text-sm font-medium">Save {discount}%</span>
              )}
            </div>

            {/* Stock */}
            <p className={`text-sm font-medium mb-6 ${stockStatus.color}`}>
              ● {stockStatus.label}
            </p>

            {/* Description */}
            <p className="text-[#DDD5C8] text-sm leading-relaxed mb-6 border-b border-[#2a2a2a] pb-6">
              {product.description}
            </p>

            {/* Color */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[#F3ECE0] text-sm font-medium mb-2">
                  Colour: <span className="text-[#C9A24B]">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        selectedColor === color
                          ? 'border-[#C9A24B] bg-[#C9A24B]/10 text-[#C9A24B]'
                          : 'border-[#2a2a2a] text-[#DDD5C8] hover:border-[#C9A24B]/50'
                      }`}
                      id={`color-${color.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes.length > 0 && product.sizes[0] !== 'Free Size' && (
              <div className="mb-6">
                <p className="text-[#F3ECE0] text-sm font-medium mb-2">
                  Size: <span className="text-[#C9A24B]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg text-sm border transition-colors font-medium ${
                        selectedSize === size
                          ? 'border-[#C9A24B] bg-[#C9A24B]/10 text-[#C9A24B]'
                          : 'border-[#2a2a2a] text-[#DDD5C8] hover:border-[#C9A24B]/50'
                      }`}
                      id={`size-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[#F3ECE0] text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                  id="quantity-decrease"
                >
                  −
                </button>
                <span className="text-[#F3ECE0] font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                  id="quantity-increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base transition-all ${
                  product.stock === 0
                    ? 'bg-[#2a2a2a] text-[#C4A49E] cursor-not-allowed'
                    : added
                    ? 'bg-green-700 text-white'
                    : 'burgundy-gradient text-[#F3ECE0] hover:opacity-90 hover:shadow-burgundy'
                }`}
                id="add-to-bag-button"
              >
                {added ? (
                  <>
                    <Check size={18} />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  router.push('/checkout');
                }}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center py-4 rounded-xl border border-[#C9A24B]/50 text-[#C9A24B] font-semibold hover:bg-[#C9A24B]/10 transition-colors disabled:opacity-50"
                id="reserve-now-button"
              >
                Reserve Now
              </button>
            </div>

            {/* Info footer */}
            <div className="mt-6 pt-6 border-t border-[#2a2a2a] grid grid-cols-2 gap-4 text-xs text-[#C4A49E]">
              <div>💛 Reserve online — pay in store</div>
              <div>📦 Hold for 3 days</div>
              <div>📍 Pickup at Mangalore boutique</div>
              <div>✨ Genuine quality guaranteed</div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-[#F3ECE0] mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
