import fs from 'fs';
import path from 'path';
import os from 'os';
import { Product, Order } from './types';

const seedProductsPath = path.join(process.cwd(), 'src/data/products.json');
const seedOrdersPath = path.join(process.cwd(), 'src/data/orders.json');

function getWritablePath(fileName: string, seedPath: string): string {
  const tmpPath = path.join(os.tmpdir(), fileName);
  if (fs.existsSync(tmpPath)) {
    return tmpPath;
  }
  try {
    fs.accessSync(seedPath, fs.constants.W_OK);
    return seedPath;
  } catch {
    if (fs.existsSync(seedPath)) {
      const content = fs.readFileSync(seedPath, 'utf-8');
      try {
        fs.writeFileSync(tmpPath, content);
      } catch {
        // ignore
      }
    }
    return tmpPath;
  }
}

function safeWriteFile(fileName: string, seedPath: string, content: string): void {
  const targetPath = getWritablePath(fileName, seedPath);
  try {
    fs.writeFileSync(targetPath, content);
  } catch {
    const tmpPath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(tmpPath, content);
  }
}

// ── Products ──────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  const targetPath = getWritablePath('products.json', seedProductsPath);
  const raw = fs.readFileSync(targetPath, 'utf-8');
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
  safeWriteFile('products.json', seedProductsPath, JSON.stringify(products, null, 2));
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  safeWriteFile('products.json', seedProductsPath, JSON.stringify(products, null, 2));
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function getOrders(): Order[] {
  const targetPath = getWritablePath('orders.json', seedOrdersPath);
  const raw = fs.readFileSync(targetPath, 'utf-8');
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
  safeWriteFile('orders.json', seedOrdersPath, JSON.stringify(orders, null, 2));
}
