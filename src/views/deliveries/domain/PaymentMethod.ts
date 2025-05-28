export enum PaymentMethod {
  CASH = 'cash',
  MOBILE_PAYMENT = 'mobile_payment',
  BANK_TRANSFER = 'bank_transfer',
  OTHER = 'other',
}

export const PaymentMethodOptions = [
  { value: PaymentMethod.CASH, label: 'Efectivo' },
  { value: PaymentMethod.MOBILE_PAYMENT, label: 'Pago Móvil' },
  { value: PaymentMethod.BANK_TRANSFER, label: 'Transferencia Bancaria' },
  { value: PaymentMethod.OTHER, label: 'Otro' },
] as const;
