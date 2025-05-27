export enum Role {
  ADMIN = 'admin',
  BASIC = 'basic',
}

export const RoleOptions = [
  { value: Role.ADMIN, label: 'administrador' },
  { value: Role.BASIC, label: 'básico' },
] as const;
