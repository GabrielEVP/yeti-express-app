export enum Role {
  ADMIN = 'admin',
  BASIC = 'basic',
}

export const RoleOptions = [
  { value: Role.ADMIN, label: 'Administrador' },
  { value: Role.BASIC, label: 'Básico' },
] as const;

export const RoleLabels: Record<Role, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.BASIC]: 'Básico',
};

export function getRoleLabel(role: Role): string {
  return RoleLabels[role];
}
