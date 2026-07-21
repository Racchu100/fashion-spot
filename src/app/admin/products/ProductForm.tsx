'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES: Category[] = ['Sarees', 'Kurtis', 'Lehengas', 'Western Wear', 'Accessories', 'Dupatta & Stoles'];

interface ProductFormProps {
  product?: Product;
  mode: 'new' | 'edit';
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: (product?.category || 'Sarees') as Category,
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    description: product?.description || '',
    images: product?.images?.join('\n') || '',
    sizes: product?.sizes?.join(', ') || '',
    colors: product?.colors?.join(', ') || '',
    stock: product?.stock || '',
    featured: product?.featured || false,
    newArrival: product?.newArrival || false,
  });

  const previewImage = formData.images.split('\n').filter(Boolean)[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      name: formData.name,
      category: formData.category as Category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      description: formData.description,
      images: formData.images.split('\n').map((s) => s.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map((s) => s.trim()).filter(Boolean),
      stock: Number(formData.stock),
      variants: [],
      featured: formData.featured,
      newArrival: formData.newArrival,
    };

    try {
      const url = mode === 'new' ? '/api/products' : `/api/products/${product?.id}`;
      const method = mode === 'new' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      router.push('/admin/products');
      router.refresh();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const inputClass = 'w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-xl text-[#F3ECE0] placeholder-[#C4A49E] text-sm';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-sm text-[#DDD5C8] mb-1.5">Product Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="e.g. Burgundy Silk Banarasi Saree"
            id="product-name-input"
          />
        </div>

        <div>
          <label className="block text-sm text-[#DDD5C8] mb-1.5">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            className={inputClass}
            id="product-category-select"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-[#DDD5C8] mb-1.5">Stock *</label>
          <input
            type="number"
            required
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className={inputClass}
            placeholder="e.g. 10"
            id="product-stock-input"
          />
        </div>

        <div>
          <label className="block text-sm text-[#DDD5C8] mb-1.5">Price (₹) *</label>
          <input
            type="number"
            required
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className={inputClass}
            placeholder="e.g. 4999"
            id="product-price-input"
          />
        </div>

        <div>
          <label className="block text-sm text-[#DDD5C8] mb-1.5">Original Price (₹) <span className="text-[#C4A49E]">optional</span></label>
          <input
            type="number"
            min="0"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            className={inputClass}
            placeholder="e.g. 6500 (for strike-through)"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-[#DDD5C8] mb-1.5">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`${inputClass} resize-none`}
            placeholder="Describe the product, fabric, occasion, etc."
            id="product-description-textarea"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-[#DDD5C8] mb-1.5">
            Image URLs <span className="text-[#C4A49E]">(one per line)</span>
          </label>
          <textarea
            rows={3}
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            className={`${inputClass} resize-none`}
            placeholder="/saree-burgundy.png&#10;/saree-burgundy-2.png"
            id="product-images-input"
          />
          {previewImage && (
            <div className="relative w-20 h-24 mt-2 rounded-lg overflow-hidden bg-[#1a1a1a]">
              <Image src={previewImage} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-[#DDD5C8] mb-1.5">
            Sizes <span className="text-[#C4A49E]">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={formData.sizes}
            onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
            className={inputClass}
            placeholder="XS, S, M, L, XL or Free Size"
            id="product-sizes-input"
          />
        </div>

        <div>
          <label className="block text-sm text-[#DDD5C8] mb-1.5">
            Colours <span className="text-[#C4A49E]">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={formData.colors}
            onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
            className={inputClass}
            placeholder="Burgundy, Navy Blue, Green"
            id="product-colors-input"
          />
        </div>

        <div className="sm:col-span-2 flex gap-6">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-[#C9A24B]"
              id="product-featured-checkbox"
            />
            <span className="text-[#DDD5C8] text-sm">Featured on homepage</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.newArrival}
              onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
              className="w-4 h-4 accent-[#C9A24B]"
              id="product-newarrival-checkbox"
            />
            <span className="text-[#DDD5C8] text-sm">Mark as New Arrival</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 burgundy-gradient text-[#F3ECE0] font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
          id="save-product-button"
        >
          {saving ? 'Saving...' : mode === 'new' ? 'Add Product' : 'Save Changes'}
        </button>
        <Link
          href="/admin/products"
          className="px-6 py-3.5 border border-[#2a2a2a] text-[#DDD5C8] rounded-xl hover:border-[#C9A24B]/40 transition-colors text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
