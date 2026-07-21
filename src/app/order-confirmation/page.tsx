import { getOrderById } from '@/lib/data';
import OrderConfirmationClient from './[id]/OrderConfirmationClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reservation Confirmed',
};

interface Props {
  searchParams: { id?: string; code?: string };
}

export default function OrderConfirmationFallbackPage({ searchParams }: Props) {
  const id = searchParams.id || 'latest';
  const order = getOrderById(id) || null;
  return <OrderConfirmationClient initialOrder={order} orderId={id} />;
}
