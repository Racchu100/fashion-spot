import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { getFeaturedProducts, getNewArrivals } from '@/lib/data';
import ProductCard from '@/components/shop/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fashion Spot — Premium Ladies Boutique in Mangalore',
  description:
    'Discover exquisite sarees, kurtis, lehengas and western wear at Fashion Spot, Mangalore\'s premier ladies boutique. Browse online, reserve your favourite, collect in-store.',
};

const CATEGORIES = [
  { name: 'Sarees', image: '/cat-sarees.png', href: '/shop?category=Sarees', desc: 'Silk, Georgette & more' },
  { name: 'Kurtis', image: '/cat-kurtis.png', href: '/shop?category=Kurtis', desc: 'Ethnic & fusion styles' },
  { name: 'Lehengas', image: '/lehenga-maroon.png', href: '/shop?category=Lehengas', desc: 'Bridal & festive' },
  { name: 'Western Wear', image: '/western-dress.png', href: '/shop?category=Western+Wear', desc: 'Modern & trendy' },
  { name: 'Accessories', image: '/accessories-gold.png', href: '/shop?category=Accessories', desc: 'Jewellery & more' },
];

const FEATURES = [
  { icon: ShieldCheck, title: 'Genuine Quality', desc: 'Every piece is personally curated and quality-checked' },
  { icon: MapPin, title: 'In-Store Pickup', desc: 'Reserve online, collect at our Mangalore boutique' },
  { icon: Clock, title: 'Hold for 3 Days', desc: 'We keep your reservation for 3 days with no payment needed' },
  { icon: Star, title: 'Expert Styling', desc: 'Our staff can help you find the perfect outfit' },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Fashion Spot boutique"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/95 via-[#121212]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        </div>

        {/* Decorative circles */}
        <div className="absolute right-8 top-1/4 w-64 h-64 rounded-full border border-[#C9A24B]/15 animate-spin-slow hidden lg:block" />
        <div className="absolute right-20 top-1/3 w-40 h-40 rounded-full border border-[#6B1420]/30 hidden lg:block" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-[#C9A24B]" />
              <span className="text-[#C9A24B] text-xs tracking-[0.3em] uppercase font-medium">
                Mangalore&apos;s Premier Boutique
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] leading-tight mb-6">
              Wear Your{' '}
              <span className="gold-text">Story</span>
            </h1>
            <p className="text-[#DDD5C8] text-lg leading-relaxed mb-8 max-w-md">
              Discover timeless sarees, elegant kurtis, and stunning lehengas curated for the modern Indian woman.
              Reserve online — no payment needed — and collect at our Mangalore store.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="group flex items-center gap-2 px-8 py-4 burgundy-gradient text-[#F3ECE0] font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-burgundy"
                id="hero-shop-button"
              >
                Explore Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?category=Sarees"
                className="px-8 py-4 border border-[#C9A24B]/50 text-[#C9A24B] font-medium rounded-xl hover:bg-[#C9A24B]/10 transition-colors"
              >
                Shop Sarees
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-[#2a2a2a]">
              {[['500+', 'Styles'], ['10K+', 'Happy Customers'], ['5★', 'Store Rating']].map(([val, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-[#C9A24B]">{val}</p>
                  <p className="text-[#C4A49E] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[#C4A49E] text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A24B] to-transparent" />
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#C9A24B]" />
            <span className="text-[#C9A24B] text-xs tracking-[0.3em] uppercase">Explore</span>
            <div className="h-px w-12 bg-[#C9A24B]" />
          </div>
          <h2 className="font-display text-4xl font-bold text-[#F3ECE0]">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#C9A24B]/40 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
              id={`category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display font-bold text-[#F3ECE0] text-lg">{cat.name}</h3>
                <p className="text-[#C4A49E] text-xs mt-0.5 group-hover:text-[#C9A24B] transition-colors">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── New Arrivals ────────────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-[#C9A24B]" />
                <span className="text-[#C9A24B] text-xs tracking-[0.3em] uppercase">Fresh In</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-[#F3ECE0]">New Arrivals</h2>
            </div>
            <Link
              href="/shop?sort=new"
              className="text-[#C9A24B] text-sm hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Featured Products ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-[#C9A24B]" />
              <span className="text-[#C9A24B] text-xs tracking-[0.3em] uppercase">Handpicked</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#F3ECE0]">Featured Collection</h2>
          </div>
          <Link href="/shop" className="text-[#C9A24B] text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#F3ECE0] mb-3">How It Works</h2>
            <p className="text-[#DDD5C8] text-sm">Simple, hassle-free boutique shopping</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Browse & Choose', desc: 'Explore our curated collection and pick your favourites' },
              { step: '02', title: 'Add to Bag', desc: 'Select your size and colour, add to your shopping bag' },
              { step: '03', title: 'Reserve Online', desc: 'Fill in your details and get an instant reservation code' },
              { step: '04', title: 'Collect & Pay', desc: 'Visit our Mangalore store within 3 days and pay in-person' },
            ].map((item) => (
              <div key={item.step} className="glass-card rounded-2xl p-6 text-center hover:border-[#C9A24B]/30 transition-colors">
                <div className="w-14 h-14 rounded-full border-2 border-[#C9A24B]/40 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-[#C9A24B] font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-[#F3ECE0] font-semibold mb-2">{item.title}</h3>
                <p className="text-[#C4A49E] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-start gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-[#6B1420]/20 flex items-center justify-center">
                <f.icon size={20} className="text-[#C9A24B]" />
              </div>
              <div>
                <h3 className="text-[#F3ECE0] font-semibold text-sm">{f.title}</h3>
                <p className="text-[#C4A49E] text-xs mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center burgundy-gradient rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-[#C9A24B]/20 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-[#C9A24B]/10 -translate-x-1/3 translate-y-1/3" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F3ECE0] mb-4">
              Visit Us in Mangalore
            </h2>
            <p className="text-[#DDD5C8] mb-6 max-w-lg mx-auto">
              Experience the full collection in person at our boutique in Hampankatta. Our expert stylists are here to help you find your perfect look.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="px-8 py-4 bg-[#C9A24B] text-[#121212] font-bold rounded-xl hover:bg-[#D4B06A] transition-colors"
                id="cta-shop-now"
              >
                Shop Now
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-[#F3ECE0]/40 text-[#F3ECE0] font-medium rounded-xl hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
