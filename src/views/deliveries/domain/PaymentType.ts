export enum PaymentType {
  PARTIAL = 'partial',
  FULL = 'full',
}

export const PaymentTypeOptions = [
  { label: 'Parcial', value: PaymentType.PARTIAL },
  { label: 'Completo', value: PaymentType.FULL },
] as const;
