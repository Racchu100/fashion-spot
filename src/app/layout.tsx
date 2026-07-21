import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Fashion Spot — Ladies Boutique in Mangalore',
    template: '%s | Fashion Spot Mangalore',
  },
  description:
    'Fashion Spot is a premium ladies boutique in Mangalore offering Sarees, Kurtis, Lehengas, Western Wear and Accessories. Reserve your favourite pieces online and pick up in store.',
  keywords: ['ladies boutique Mangalore', 'sarees Mangalore', 'kurtis Mangalore', 'Fashion Spot', 'women fashion Mangalore'],
  openGraph: {
    siteName: 'Fashion Spot Mangalore',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#121212] text-[#F3ECE0] font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
