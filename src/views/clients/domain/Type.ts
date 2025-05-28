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
