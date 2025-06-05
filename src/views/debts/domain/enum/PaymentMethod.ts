export enum PaymentMethod {
  MOBILE_PAYMENT = 'mobile_payment',
  TRANSFER = 'transfer',
  CASH = 'cash',
}

export const PaymentMethodOptions = [
  { value: PaymentMethod.MOBILE_PAYMENT, label: 'Pago móvil' },
  { value: PaymentMethod.TRANSFER, label: 'Transferencia' },
  { value: PaymentMethod.CASH, label: 'Efectivo' },
] as const;

const PaymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.MOBILE_PAYMENT]: 'Pago móvil',
  [PaymentMethod.TRANSFER]: 'Transferencia',
  [PaymentMethod.CASH]: 'Efectivo',
};

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return PaymentMethodLabels[method] ?? 'Desconocido';
}
