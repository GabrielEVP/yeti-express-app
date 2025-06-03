export type DebtStatus = 'pending' | 'partial_paid' | 'paid';

export const DebtStatusOptions = [
  { value: 'pending' as DebtStatus, label: 'Pendiente' },
  { value: 'partial_paid' as DebtStatus, label: 'Parcialmente pagado' },
  { value: 'paid' as DebtStatus, label: 'Pagado' },
] as const;

const DebtStatusLabels: Record<DebtStatus, string> = {
  pending: 'Pendiente',
  partial_paid: 'Parcialmente pagado',
  paid: 'Pagado',
};

export function getDebtStatusLabel(status: DebtStatus | string): string {
  if (status in DebtStatusLabels) {
    return DebtStatusLabels[status as DebtStatus];
  }
  return 'Desconocido';
}
