export enum ClientType {
  VENEZOLANO = 'venezolano',
  FOREING = 'foreing',
  LEGAL = 'legal',
  COMMUNE = 'commune',
  GOVERNMENT = 'government',
  PASAPORT = 'pasaport',
  PERSONAL_SIGNATURE = 'personal_signature',
}

export const ClientTypeOptions = [
  { value: ClientType.VENEZOLANO, label: 'Venezolano' },
  { value: ClientType.FOREING, label: 'Extranjero' },
  { value: ClientType.LEGAL, label: 'Juridico' },
  { value: ClientType.COMMUNE, label: 'Comuna' },
  { value: ClientType.GOVERNMENT, label: 'Gubernamental' },
  { value: ClientType.PASAPORT, label: 'Pasaporte' },
  { value: ClientType.PERSONAL_SIGNATURE, label: 'Firma Personal' },
] as const;

export const ClientTypeLabelMap: Record<ClientType, string> = {
  [ClientType.VENEZOLANO]: 'Venezolano',
  [ClientType.FOREING]: 'Extranjero',
  [ClientType.LEGAL]: 'Juridico',
  [ClientType.COMMUNE]: 'Comuna',
  [ClientType.GOVERNMENT]: 'Gubernamental',
  [ClientType.PASAPORT]: 'Pasaporte',
  [ClientType.PERSONAL_SIGNATURE]: 'Firma Personal',
};

export function formatClientType(type: ClientType): string {
  return ClientTypeLabelMap[type] ?? 'Tipo desconocido';
}
