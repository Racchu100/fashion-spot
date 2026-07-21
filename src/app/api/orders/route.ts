import { NextRequest, NextResponse } from 'next/server';
import { getOrders, saveOrder } from '@/lib/data';
import { generateReservationCode } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@/lib/types';

export async function GET() {
  const orders = getOrders();
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = body.customerName || body.name;
    const customerPhone = body.customerPhone || body.phone;
    const customerEmail = body.customerEmail || body.email;
    const pickupDate = body.pickupDate;
    const items = body.items;
    const total = body.total ?? (items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) || 0);

    if (!customerName || !customerPhone || !customerEmail || !pickupDate || !items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields', received: { customerName, customerPhone, customerEmail, pickupDate, itemsCount: items?.length } },
        { status: 400 }
      );
    }

    const order: Order = {
      id: uuidv4(),
      reservationCode: generateReservationCode(),
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
