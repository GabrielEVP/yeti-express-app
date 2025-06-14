export enum DeliveryPaymentStatus {
  PENDING = 'pending',
  PARTIAL_PAID = 'partial_paid',
  PAID = 'paid',
}

export const DeliveryPaymentStatusOptions = [
  { label: 'Pendiente', value: DeliveryPaymentStatus.PENDING },
  { label: 'Parcialmente Pagado', value: DeliveryPaymentStatus.PARTIAL_PAID },
  { label: 'Pagado', value: DeliveryPaymentStatus.PAID },
] as const;

export const DeliveryPaymentStatusLabels: Record<DeliveryPaymentStatus, string> = {
  [DeliveryPaymentStatus.PENDING]: 'Pendiente',
  [DeliveryPaymentStatus.PARTIAL_PAID]: 'Parcialmente Pagado',
  [DeliveryPaymentStatus.PAID]: 'Pagado',
};

export function getDeliveryPaymentStatusLabel(status: DeliveryPaymentStatus): string {
  return DeliveryPaymentStatusLabels[status];
}
