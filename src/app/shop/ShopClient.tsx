'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Product, Category } from '@/lib/types';
import ProductGrid from '@/components/shop/ProductGrid';

const CATEGORIES: Category[] = ['Sarees', 'Kurtis', 'Lehengas', 'Western Wear', 'Accessories', 'Dupatta & Stoles'];

const PRICE_RANGES = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹3,000', min: 1000, max: 3000 },
  { label: '₹3,000 – ₹6,000', min: 3000, max: 6000 },
  { label: '₹6,000 – ₹15,000', min: 6000, max: 15000 },
  { label: 'Above ₹15,000', min: 15000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'new', label: 'New Arrivals First' },
  { value: 'name', label: 'Name A–Z' },
];

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setSelectedCategory(cat);
    const sort = searchParams.get('sort') || 'default';
    setSortBy(sort);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  function clearFilters() {
    setSelectedCategory('');
    setSelectedPriceRange(null);
    setSearchQuery('');
    setSortBy('default');
    router.push('/shop');
  }

  const hasFilters = selectedCategory || selectedPriceRange !== null || searchQuery;

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-[#0e0e0e] border-b border-[#2a2a2a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F3ECE0] mb-2">
            {selectedCategory || 'All Products'}
          </h1>
          <p className="text-[#C4A49E] text-sm">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A49E]" />
            <input
              type="text"
              placeholder="Search sarees, kurtis, lehengas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#F3ECE0] placeholder-[#C4A49E] text-sm"
              id="shop-search-input"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#F3ECE0] text-sm cursor-pointer"
              id="sort-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C4A49E] pointer-events-none" />
          </div>

          {/* Filter Toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#DDD5C8] text-sm lg:hidden"
            id="filter-toggle"
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />}
          </button>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6B1420]/30 border border-[#6B1420]/50 text-[#F3ECE0] text-xs rounded-full">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')}><X size={12} /></button>
              </span>
            )}
            {selectedPriceRange !== null && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6B1420]/30 border border-[#6B1420]/50 text-[#F3ECE0] text-xs rounded-full">
                {PRICE_RANGES[selectedPriceRange].label}
                <button onClick={() => setSelectedPriceRange(null)}><X size={12} /></button>
              </span>
            )}
            <button onClick={clearFilters} className="px-3 py-1.5 text-[#C4A49E] text-xs hover:text-[#C9A24B] transition-colors">
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters (desktop always, mobile toggle) */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <div className="sticky top-24 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-[#F3ECE0] mb-3">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-[#6B1420] text-[#F3ECE0]' : 'text-[#DDD5C8] hover:bg-[#2a2a2a]'}`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-[#6B1420] text-[#F3ECE0]' : 'text-[#DDD5C8] hover:bg-[#2a2a2a]'}`}
                      id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] pt-6">
                <h3 className="font-display font-semibold text-[#F3ECE0] mb-3">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${selectedPriceRange === i ? 'bg-[#6B1420] text-[#F3ECE0]' : 'text-[#DDD5C8] hover:bg-[#2a2a2a]'}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filtered}
              emptyMessage="No products match your filters."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
