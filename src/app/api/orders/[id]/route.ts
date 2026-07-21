import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, saveOrder } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const order = getOrderById(params.id);
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const order = getOrderById(params.id);
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const updated = {
    ...order,
    ...body,
    updatedAt: new Date().toISOString(),
  };
  saveOrder(updated);
  return NextResponse.json(updated);
}
