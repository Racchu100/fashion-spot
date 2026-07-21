'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import CartDrawer from '@/components/cart/CartDrawer';

const NAV_LINKS = [
  { href: '/shop', label: 'All Products' },
  { href: '/shop?category=Sarees', label: 'Sarees' },
  { href: '/shop?category=Kurtis', label: 'Kurtis' },
  { href: '/shop?category=Lehengas', label: 'Lehengas' },
  { href: '/shop?category=Western+Wear', label: 'Western' },
  { href: '/shop?category=Accessories', label: 'Accessories' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#C9A24B]/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-28">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden transition-transform group-hover:scale-105 shadow-xl">
                <Image
                  src="/logo.svg"
                  alt="Fashion Spot Mangalore"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#DDD5C8] hover:text-[#C9A24B] transition-colors duration-200 tracking-wide uppercase font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <Link
                href="/shop"
                className="p-2 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                aria-label="Search products"
              >
                <Search size={20} />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                aria-label={`Cart with ${totalItems} items`}
                id="cart-button"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#6B1420] text-[#F3ECE0] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
              <button
                className="lg:hidden p-2 text-[#DDD5C8] hover:text-[#C9A24B] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
                id="mobile-menu-button"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#1a1a1a] border-t border-[#2a2a2a]">
            <nav className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 text-[#DDD5C8] hover:text-[#C9A24B] hover:bg-[#6B1420]/10 rounded-lg transition-colors text-sm font-medium tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
