import Link from 'next/link';
import AdminLogoutButton from '../../AdminLogoutButton';
import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-[#F3ECE0]">Add New Product</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/products" className="text-sm text-[#C9A24B] hover:underline">← Products</Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProductForm mode="new" />
      </div>
    </div>
  );
}
