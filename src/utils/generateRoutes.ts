import type { ISidebarItem } from '@/interfaces/dashboard.interface';

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) => {
    return (section.items ?? [])
      .filter((route) => !route.noRoute)
      .map((route) => {
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
      });
  });
};
