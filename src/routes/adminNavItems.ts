import ProductPage from '@/modules/dashboard/admin/product/all/AllProductPage';
import AddProductPage from '@/modules/dashboard/admin/product/AddProductPage';
import EditProductPage from '@/modules/dashboard/admin/product/EditProductPage';
import ProductDetailsPage from '@/modules/shared/product/ProductDetailsPage';
import AllUserPage from '@/modules/dashboard/admin/user/all/AllUserPage';
import AddUserPage from '@/modules/dashboard/admin/user/AddUserPage';
import EditUserPage from '@/modules/dashboard/admin/user/EditUserPage';
import UserDetailsPage from '@/modules/shared/user/UserDetailsPage';
import AdminMainPage from '@/modules/dashboard/admin/main/AdminMainPage';
import { LayoutDashboard, Package, User, Users } from 'lucide-react';

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
        noRoute: true, // registered in adminExtraRoutes
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
        component: AllUserPage,
      },
      {
        id: 'add_user',
        label: 'Add User',
        path: 'user/create',
        icon: User,
        component: AddUserPage,
        noRoute: true, // registered in adminExtraRoutes
      },
    ],
  },
];

export const adminExtraRoutes = [
  // Product routes — most specific first
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

  // User routes — most specific first
  {
    path: 'user/create',
    Component: AddUserPage,
  },
  {
    path: 'user/:id/edit',
    Component: EditUserPage,
  },
  {
    path: 'user/:id/permission',
    Component: EditUserPage, // TODO: replace with PermissionPage when built
  },
  {
    path: 'user/:id',
    Component: UserDetailsPage,
  },
];
