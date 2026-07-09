import AdminHome from '@/modules/dashboard/admin/AdminHome';
import ProductPage from '@/modules/dashboard/admin/product/ProductPage';
import AddProductPage from '@/modules/dashboard/admin/product/AddProductPage';
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
    ],
  },

  {
    section: 'Product',
    items: [
      {
        id: 'products',
        label: 'Products',
        path: 'products',
        icon: Package,
        component: ProductPage,
      },
      {
        id: 'add_products',
        label: 'Add Product',
        path: 'products/create',
        icon: Package,
        component: AddProductPage,
        noRoute: true,
      },
    ],
  },
];

export const adminExtraRoutes = [
  {
    path: 'products/create',
    Component: AddProductPage,
  },
  {
    path: 'products/:id',
    Component: ProductDetailsPage,
  },
];
