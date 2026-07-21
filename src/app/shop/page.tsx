import { getProducts } from '@/lib/data';
import ShopClient from './ShopClient';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our full collection of sarees, kurtis, lehengas, western wear and accessories at Fashion Spot, Mangalore.',
};

export default function ShopPage() {
  const products = getProducts();
  return (
    <Suspense>
      <ShopClient products={products} />
    </Suspense>
  );
}
