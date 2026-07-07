import { Role, type TRole } from '@/interfaces/user.interface';
import { adminNavItems } from '@/routes/adminNavItems';

export const getNavItems = (role: TRole) => {
  switch (role) {
    case Role.ADMIN:
      return adminNavItems;

    default:
      return [];
  }
};
