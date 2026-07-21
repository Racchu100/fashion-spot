export type Category =
  | 'Sarees'
  | 'Kurtis'
  | 'Lehengas'
  | 'Western Wear'
  | 'Accessories'
  | 'Dupatta & Stoles';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface ProductVariant {
  size?: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  variants: ProductVariant[];
  stock: number; // total stock
  featured: boolean;
  newArrival: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  size?: string;
  color: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  size?: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  reservationCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupDate: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
