export enum DebtStatus {
  PENDING = 'pending',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
}

export const DebtStatusOptions = [
  { value: DebtStatus.PENDING, label: 'Pendiente' },
  { value: DebtStatus.PARTIALLY_PAID, label: 'Parcialmente pagado' },
  { value: DebtStatus.PAID, label: 'Pagado' },
] as const;

const DebtStatusLabels: Record<DebtStatus, string> = {
  [DebtStatus.PENDING]: 'Pendiente',
  [DebtStatus.PARTIALLY_PAID]: 'Parcialmente pagado',
  [DebtStatus.PAID]: 'Pagado',
};

export function getDebtStatusLabel(status: DebtStatus | string): string {
  if (status in DebtStatusLabels) {
    return DebtStatusLabels[status as DebtStatus];
  }
  return 'Desconocido';
}
