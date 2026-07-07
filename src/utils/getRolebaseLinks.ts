import { Role, type TRole } from '@/interfaces/user.interface';

export const getRolebasedLinks = (role: TRole) => {
  switch (role) {
    case Role.ADMIN:
      return '/admin';

    case Role.MANAGER:
      return '/manager';

    case Role.EMPLOYEE:
      return '/employee';

    default:
      return '/';
  }
};
