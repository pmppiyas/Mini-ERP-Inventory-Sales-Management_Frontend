import AdminHome from '@/modules/dashboard/admin/AdminHome';
import ProductPage from '@/modules/dashboard/admin/product/ProductPage';
import { LayoutDashboard, Package } from 'lucide-react';

export const adminNavItems = [
  {
    section: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        index: true,
        component: AdminHome,
      },
      {
        id: 'products',
        label: 'Products',
        path: 'products',
        icon: Package,
        component: ProductPage,
      },
      // {
      //   id: 'add-product',
      //   label: 'Add Product',
      //   path: 'products/create',
      //   icon: Boxes,
      //   component: AddProduct,
      // },
      // {
      //   id: 'sales',
      //   label: 'Sales',
      //   path: 'sales',
      //   icon: ShoppingCart,
      //   component: Sales,
      // },
      // {
      //   id: 'create-sale',
      //   label: 'Create Sale',
      //   path: 'sales/create',
      //   icon: ClipboardList,
      //   component: CreateSale,
      // },
    ],
  },

  // {
  //   section: 'Management',
  //   items: [
  //     {
  //       id: 'users',
  //       label: 'Users',
  //       path: 'users',
  //       icon: Users,
  //       component: UsersPage,
  //     },
  //     {
  //       id: 'reports',
  //       label: 'Reports',
  //       path: 'reports',
  //       icon: ChartColumn,
  //       component: Reports,
  //     },
  //   ],
  // },

  // {
  //   section: 'Settings',
  //   items: [
  //     {
  //       id: 'profile',
  //       label: 'Profile',
  //       path: 'profile',
  //       icon: Users,
  //       component: Profile,
  //     },
  //     {
  //       id: 'settings',
  //       label: 'Settings',
  //       path: 'settings',
  //       icon: Settings,
  //       component: AppSettings,
  //     },
  //   ],
  // },
];
