export enum PaymentMethod {
  CASH = 'cash',
  MOBILE_PAYMENT = 'mobile_payment',
  BANK_TRANSFERED = 'bank_transfered',
}

export const PaymentMethodOptions = [
  { value: PaymentMethod.CASH, label: 'Efectivo' },
  { value: PaymentMethod.MOBILE_PAYMENT, label: 'Pago Móvil' },
  { value: PaymentMethod.BANK_TRANSFERED, label: 'Transferencia Bancaria' },
] as const;

export const PaymentMethodLabelMap: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: 'Efectivo',
  [PaymentMethod.MOBILE_PAYMENT]: 'Pago Móvil',
  [PaymentMethod.BANK_TRANSFERED]: 'Transferencia Bancaria',
};

export function formatPaymentMethod(method: PaymentMethod): string {
  return PaymentMethodLabelMap[method] ?? 'Método de pago desconocido';
}