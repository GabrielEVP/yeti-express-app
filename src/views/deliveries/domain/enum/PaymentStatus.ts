export enum DeliveryPaymentStatus {
  PENDING = 'pending',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
}

export const DeliveryPaymentStatusOptions = [
  { label: 'Pendiente', value: DeliveryPaymentStatus.PENDING },
  { label: 'Parcialmente Pagado', value: DeliveryPaymentStatus.PARTIALLY_PAID },
  { label: 'Pagado', value: DeliveryPaymentStatus.PAID },
] as const;

export const DeliveryPaymentStatusLabels: Record<DeliveryPaymentStatus, string> = {
  [DeliveryPaymentStatus.PENDING]: 'Pendiente',
  [DeliveryPaymentStatus.PARTIALLY_PAID]: 'Parcialmente Pagado',
  [DeliveryPaymentStatus.PAID]: 'Pagado',
};

export function getDeliveryPaymentStatusLabel(status: DeliveryPaymentStatus): string {
  return DeliveryPaymentStatusLabels[status];
}
