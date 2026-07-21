'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  productId: string;
}

export default function AdminProductActions({ productId }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeleting(true);
    await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${productId}/edit`}
        className="p-2 text-[#C4A49E] hover:text-[#C9A24B] hover:bg-[#2a2a2a] rounded-lg transition-colors"
        aria-label="Edit product"
        id={`edit-product-${productId}`}
      >
        <Pencil size={15} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 text-[#C4A49E] hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
        aria-label="Delete product"
        id={`delete-product-${productId}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
