import AdminHome from '@/modules/dashboard/admin/AdminHome';
import ProductPage from '@/modules/dashboard/admin/product/ProductPage';
import ProductDetailsPage from '@/modules/shared/product/ProductDetailsPage';
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
    ],
  },
];

export const adminExtraRoutes = [
  {
    path: 'products/:id',
    Component: ProductDetailsPage,
  },
];

