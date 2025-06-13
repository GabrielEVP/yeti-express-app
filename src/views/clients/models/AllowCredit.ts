export enum AllowCredit {
  YES = '1',
  NO = '0',
}

export const AllowCreditOptions = [
  { value: AllowCredit.YES, label: 'Sí' },
  { value: AllowCredit.NO, label: 'No' },
] as const;

export const AllowCreditLabelMap: Record<AllowCredit, string> = {
  [AllowCredit.YES]: 'Sí',
  [AllowCredit.NO]: 'No',
};

export function formatAllowCredit(value: boolean | number): string {
  if (value === true || value === 1) return 'Sí';
  if (value === false || value === 0) return 'No';
  return 'Desconocido';
}
