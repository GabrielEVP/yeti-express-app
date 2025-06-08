export enum DeliveryStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivery',
  REFUSED = 'refused',
}

export const DeliveryStatusOptions = [
  { value: DeliveryStatus.PENDING, label: 'Pendiente' },
  { value: DeliveryStatus.IN_TRANSIT, label: 'En transito' },
  { value: DeliveryStatus.DELIVERED, label: 'Entregado' },
  { value: DeliveryStatus.REFUSED, label: 'Rechazado' },
] as const;

export const DeliveryStatusLabels: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: 'Pendiente',
  [DeliveryStatus.IN_TRANSIT]: 'En transito',
  [DeliveryStatus.DELIVERED]: 'Entregado',
  [DeliveryStatus.REFUSED]: 'Rechazado',
};

export function getDeliveryStatusLabel(status: DeliveryStatus): string {
  return DeliveryStatusLabels[status];
}
