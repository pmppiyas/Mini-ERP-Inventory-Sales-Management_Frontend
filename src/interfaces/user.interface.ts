export const Role = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export type TRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
