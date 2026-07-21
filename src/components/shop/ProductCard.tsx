'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isOutOfStock = product.stock === 0;

  return (
    <Link href={`/shop/${product.slug}`} className="group block" id={`product-${product.id}`}>
      <div className="product-card bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#C9A24B]/40">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#121212]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && (
              <span className="px-2.5 py-1 bg-[#6B1420] text-[#F3ECE0] text-xs font-semibold rounded-full">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-[#C9A24B] text-[#121212] text-xs font-bold rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Stock badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="px-4 py-2 bg-[#121212]/90 text-[#C4A49E] text-sm font-medium rounded-full border border-[#2a2a2a]">
                Out of Stock
              </span>
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <div className="absolute bottom-3 left-3 right-3">
              <span className="block text-center px-2 py-1 bg-amber-900/80 text-amber-300 text-xs font-medium rounded-lg backdrop-blur-sm">
                Only {product.stock} left
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="flex items-center gap-2 px-4 py-2.5 bg-[#6B1420] text-[#F3ECE0] text-sm font-medium rounded-full">
              <ShoppingBag size={14} />
              View & Reserve
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[#C4A49E] text-xs uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="text-[#F3ECE0] font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#C9A24B] transition-colors">
            {product.name}
          </h3>

          {/* Colors preview */}
          {product.colors.length > 0 && (
            <div className="flex gap-1 mb-3">
              {product.colors.slice(0, 4).map((color, i) => (
                <span
                  key={i}
                  className="text-xs text-[#C4A49E] bg-[#121212] border border-[#2a2a2a] px-2 py-0.5 rounded-full"
                >
                  {color}
                </span>
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-[#C4A49E]">+{product.colors.length - 4}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[#C9A24B] font-bold text-base">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-[#C4A49E] text-xs line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.featured && (
              <Star size={14} className="text-[#C9A24B] fill-[#C9A24B]" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
