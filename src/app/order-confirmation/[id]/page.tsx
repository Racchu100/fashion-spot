import { getOrderById } from '@/lib/data';
import OrderConfirmationClient from './OrderConfirmationClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reservation Confirmed',
};

interface Props {
  params: { id: string };
}

export default function OrderConfirmationPage({ params }: Props) {
  const order = getOrderById(params.id) || null;
  return <OrderConfirmationClient initialOrder={order} orderId={params.id} />;
}
