'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Share2, Globe } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer className="bg-[#0e0e0e] border-t border-[#C9A24B]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold gold-text mb-3">Fashion Spot</h2>
            <p className="text-[#C4A49E] text-xs tracking-widest uppercase mb-4">Mangalore&apos;s Premier Ladies Boutique</p>
            <p className="text-[#DDD5C8] text-sm leading-relaxed mb-6 max-w-sm">
              Curating the finest Indian and western wear for the modern woman. Discover timeless sarees, elegant kurtis, 
              stunning lehengas and more — reserve online, collect in-store.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:bg-[#6B1420] hover:border-[#6B1420] transition-colors"
                aria-label="Instagram"
              >
                <Share2 size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:bg-[#6B1420] hover:border-[#6B1420] transition-colors"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-[#C9A24B] font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {['Sarees', 'Kurtis', 'Lehengas', 'Western Wear', 'Accessories', 'Dupatta & Stoles'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    className="text-[#DDD5C8] hover:text-[#C9A24B] text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-[#C9A24B] font-semibold mb-4">Visit Us</h3>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm text-[#DDD5C8]">
                <MapPin size={16} className="text-[#C9A24B] mt-0.5 shrink-0" />
                <span>Fashion Spot, Hampankatta,<br />Mangalore, Karnataka — 575001</span>
              </div>
              <div className="flex gap-3 text-sm text-[#DDD5C8]">
                <Phone size={16} className="text-[#C9A24B] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#C9A24B] transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex gap-3 text-sm text-[#DDD5C8]">
                <Mail size={16} className="text-[#C9A24B] shrink-0" />
                <a href="mailto:hello@fashionspot.in" className="hover:text-[#C9A24B] transition-colors">
                  hello@fashionspot.in
                </a>
              </div>
            </div>
            <div className="mt-4 text-xs text-[#C4A49E] leading-relaxed">
              <p className="font-medium text-[#DDD5C8]">Store Hours</p>
              <p>Mon – Sat: 10:00 AM – 8:00 PM</p>
              <p>Sunday: 11:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#C4A49E] text-xs">
            © {new Date().getFullYear()} Fashion Spot, Mangalore. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-[#C4A49E] hover:text-[#C9A24B] text-xs transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
