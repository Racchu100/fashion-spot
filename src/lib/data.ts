import fs from 'fs';
import path from 'path';
import os from 'os';
import { Product, Order } from './types';
import initialProducts from '@/data/products.json';
import initialOrders from '@/data/orders.json';

const ordersTmpPath = path.join(os.tmpdir(), 'fashion_spot_orders.json');
const productsTmpPath = path.join(os.tmpdir(), 'fashion_spot_products.json');

// In-memory fallback cache for serverless environments
let memoryOrders: Order[] | null = null;
let memoryProducts: Product[] | null = null;

// ── Products ──────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  if (memoryProducts) return memoryProducts;
  try {
    if (fs.existsSync(productsTmpPath)) {
      const raw = fs.readFileSync(productsTmpPath, 'utf-8');
      memoryProducts = JSON.parse(raw) as Product[];
      return memoryProducts;
    }
  } catch {
    // fallback
  }
  memoryProducts = [...(initialProducts as Product[])];
  return memoryProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return getProducts().filter((p) => p.newArrival);
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.unshift(product);
  }
  memoryProducts = [...products];
  try {
    fs.writeFileSync(productsTmpPath, JSON.stringify(products, null, 2));
  } catch {
    // ignore filesystem write errors in serverless
  }
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  memoryProducts = [...products];
  try {
    fs.writeFileSync(productsTmpPath, JSON.stringify(products, null, 2));
  } catch {
    // ignore
  }
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function getOrders(): Order[] {
  if (memoryOrders) return memoryOrders;
  try {
    if (fs.existsSync(ordersTmpPath)) {
      const raw = fs.readFileSync(ordersTmpPath, 'utf-8');
      memoryOrders = JSON.parse(raw) as Order[];
      return memoryOrders;
    }
  } catch {
    // fallback
  }
  memoryOrders = [...(initialOrders as Order[])];
  return memoryOrders;
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.unshift(order);
  }
  memoryOrders = [...orders];
  try {
    fs.writeFileSync(ordersTmpPath, JSON.stringify(orders, null, 2));
  } catch {
    // ignore
  }
}
