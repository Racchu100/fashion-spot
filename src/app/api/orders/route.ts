import { NextRequest, NextResponse } from 'next/server';
import { getOrders, saveOrder } from '@/lib/data';
import { generateReservationCode } from '@/lib/utils';
import { Order } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = body.customerName || body.name || '';
    const customerPhone = body.customerPhone || body.phone || '';
    const customerEmail = body.customerEmail || body.email || '';
    const pickupDate = body.pickupDate || new Date().toISOString().split('T')[0];
    const items = body.items || [];
    const total = body.total ?? (items?.reduce((acc: number, item: { price: number; quantity: number }) => acc + (item.price * item.quantity), 0) || 0);

    if (!customerName || !customerPhone || !items?.length) {
      return NextResponse.json(
        { error: 'Please provide your name, phone number, and at least one item' },
        { status: 400 }
      );
    }

    const id = 'ord_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const reservationCode = generateReservationCode();

    const order: Order = {
      id,
      reservationCode,
      customerName,
      customerPhone,
      customerEmail,
      pickupDate,
      items,
      total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveOrder(order);
    return NextResponse.json({ id: order.id, reservationCode: order.reservationCode }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to place reservation';
    console.error('Order creation error:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
