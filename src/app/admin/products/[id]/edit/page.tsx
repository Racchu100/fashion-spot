import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdminLogoutButton from '../../../AdminLogoutButton';
import ProductForm from '../../ProductForm';

interface Props {
  params: { id: string };
}

export default function EditProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-[#F3ECE0]">Edit Product</h1>
            <p className="text-[#C4A49E] text-xs line-clamp-1">{product.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/products" className="text-sm text-[#C9A24B] hover:underline">← Products</Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProductForm product={product} mode="edit" />
      </div>
    </div>
  );
}
