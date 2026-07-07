import type { ISidebarItem } from '@/interfaces/dashboard.interface';

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => {
      if (route.index) {
        return {
          index: true,
          Component: route.component,
        };
      }

      return {
        path: route.path,
        Component: route.component,
      };
    })
  );
};
