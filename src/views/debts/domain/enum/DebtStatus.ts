export enum DebtStatus {
  PENDING = 'pending',
  PARTIAL_PAID = 'partial_paid',
  PAID = 'paid',
}

export const DebtStatusOptions = [
  { value: DebtStatus.PENDING, label: 'Pendiente' },
  { value: DebtStatus.PARTIAL_PAID, label: 'Parcialmente pagado' },
  { value: DebtStatus.PAID, label: 'Pagado' },
] as const;

const DebtStatusLabels: Record<DebtStatus, string> = {
  [DebtStatus.PENDING]: 'Pendiente',
  [DebtStatus.PARTIAL_PAID]: 'Parcialmente pagado',
  [DebtStatus.PAID]: 'Pagado',
};

export function getDebtStatusLabel(status: DebtStatus | string): string {
  if (status in DebtStatusLabels) {
    return DebtStatusLabels[status as DebtStatus];
  }
  return 'Desconocido';
}
