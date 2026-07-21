import { getProducts } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import AdminLogoutButton from '../AdminLogoutButton';
import AdminProductActions from './AdminProductActions';

export default function AdminProductsPage() {
  const products = getProducts();

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
            <Link
              href="/admin/products/new"
              className="px-4 py-2 burgundy-gradient text-[#F3ECE0] text-sm font-medium rounded-lg"
              id="add-product-link"
            >
              + Add Product
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden hover:border-[#C9A24B]/30 transition-colors"
            >
              <div className="relative aspect-[3/2] bg-[#121212]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full border ${
                    product.stock === 0
                      ? 'bg-red-900/60 text-red-300 border-red-700/40'
                      : product.stock <= 3
                      ? 'bg-amber-900/60 text-amber-300 border-amber-700/40'
                      : 'bg-green-900/60 text-green-300 border-green-700/40'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : `Stock: ${product.stock}`}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[#C4A49E] text-xs">{product.category}</p>
                <h3 className="text-[#F3ECE0] font-medium text-sm mt-0.5 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#C9A24B] font-bold">{formatPrice(product.price)}</span>
                  <AdminProductActions productId={product.id} productSlug={product.slug} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
