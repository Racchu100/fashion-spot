import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product: Product = {
    ...body,
    id: uuidv4(),
    slug: body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
  };
  saveProduct(product);
  return NextResponse.json(product, { status: 201 });
}
