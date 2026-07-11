import ProductPage from '@/modules/dashboard/admin/product/ProductPage';
import AddProductPage from '@/modules/dashboard/admin/product/AddProductPage';
import EditProductPage from '@/modules/dashboard/admin/product/EditProductPage';
import ProductDetailsPage from '@/modules/shared/product/ProductDetailsPage';
import { LayoutDashboard, Package, Users } from 'lucide-react';
import AllUserWrapper from '@/modules/dashboard/admin/user/all/AllUserWrapper';
import AdminMainPage from '@/modules/dashboard/admin/main/AdminMainPage';
import UserDetailsPage from '@/modules/shared/user/UserDetailsPage';

export const adminNavItems = [
  {
    section: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        index: true,
        component: AdminMainPage,
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

  {
    section: 'Users',
    items: [
      {
        id: 'users',
        label: 'All Users',
        path: 'users',
        icon: Users,
        component: AllUserWrapper,
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
    path: 'products/:id/edit',
    Component: EditProductPage,
  },
  {
    path: 'products/:id',
    Component: ProductDetailsPage,
  },
  {
    path: 'user/:id',
    Component: UserDetailsPage,
  },
];
