import fs from 'fs';
import path from 'path';
import { Product, Order } from './types';

const productsPath = path.join(process.cwd(), 'src/data/products.json');
const ordersPath = path.join(process.cwd(), 'src/data/orders.json');

// ── Products ──────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  const raw = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(raw) as Product[];
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
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function getOrders(): Order[] {
  const raw = fs.readFileSync(ordersPath, 'utf-8');
  return JSON.parse(raw) as Order[];
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
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}
