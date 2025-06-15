export enum PaymentType {
  PARTIAL = 'partial',
  FULL = 'full',
}

export const PaymentTypeOptions = [
  { label: 'Credito', value: PaymentType.PARTIAL },
  { label: 'Contado', value: PaymentType.FULL },
] as const;

export const PaymentTypeLabels: Record<PaymentType, string> = {
  [PaymentType.PARTIAL]: 'Credito',
  [PaymentType.FULL]: 'Contado',
};

export function getPaymentTypeLabel(status: PaymentType): string {
  return PaymentTypeLabels[status];
}
