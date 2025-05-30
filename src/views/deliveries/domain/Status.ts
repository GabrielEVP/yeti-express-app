export enum DeliveryStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUSED = 'refused',
}

export const DeliveryStatusOptions = [
  { value: DeliveryStatus.PENDING, label: 'Pendiente' },
  { value: DeliveryStatus.PAID, label: 'Pagado' },
  { value: DeliveryStatus.REFUSED, label: 'Rechazado' },
] as const;

export const DeliveryStatusLabels: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: 'Pendiente',
  [DeliveryStatus.PAID]: 'Pagado',
  [DeliveryStatus.REFUSED]: 'Rechazado',
};

export function getDeliveryStatusLabel(status: DeliveryStatus): string {
  return DeliveryStatusLabels[status];
}
