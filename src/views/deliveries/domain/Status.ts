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
