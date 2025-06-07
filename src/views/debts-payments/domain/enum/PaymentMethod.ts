export enum PaymentMethod {
  MOBILE_PAYMENT = 'mobile_payment',
  TRANSFER = 'transfer',
  CASH = 'cash',
}

export const PaymentMethodOptions = [
  { value: PaymentMethod.CASH, label: 'Efectivo' },
  { value: PaymentMethod.TRANSFER, label: 'Transferencia' },
  { value: PaymentMethod.MOBILE_PAYMENT, label: 'Pago móvil' },
] as const;

const PaymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.MOBILE_PAYMENT]: 'Pago móvil',
  [PaymentMethod.TRANSFER]: 'Transferencia',
  [PaymentMethod.CASH]: 'Efectivo',
};

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return PaymentMethodLabels[method] ?? 'Desconocido';
}
