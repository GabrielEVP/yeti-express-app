export enum DeliveryStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  REFUSED = 'cancelled',
}

export const DeliveryStatusOptions = [
  { value: DeliveryStatus.PENDING, label: 'Pendiente' },
  { value: DeliveryStatus.IN_TRANSIT, label: 'En transito' },
  { value: DeliveryStatus.DELIVERED, label: 'Entregado' },
  { value: DeliveryStatus.REFUSED, label: 'Cancelado' },
] as const;

export const DeliveryStatusLabels: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: 'Pendiente',
  [DeliveryStatus.IN_TRANSIT]: 'En transito',
  [DeliveryStatus.DELIVERED]: 'Entregado',
  [DeliveryStatus.REFUSED]: 'Cancelado',
};

export function getDeliveryStatusLabel(status: DeliveryStatus): string {
  return DeliveryStatusLabels[status];
}
