export enum PaymentType {
  PARTIAL = 'partial',
  FULL = 'full',
}

export const PaymentTypeOptions = [
  { value: PaymentType.PARTIAL, label: 'Parcial' },
  { value: PaymentType.FULL, label: 'Completo' },
] as const;
