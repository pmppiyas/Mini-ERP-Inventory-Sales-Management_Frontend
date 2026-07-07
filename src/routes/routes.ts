import App from '@/App';
import { Role } from '@/interfaces/user.interface';
import DashboardLayout from '@/layouts/DashboardLayout';
import { checkAuth } from '@/middleware/checkAuth';
import Login from '@/modules/auth/Login';
import Home from '@/modules/Home/Home';
import { adminNavItems } from '@/routes/adminNavItems';
import { generateRoutes } from '@/utils/generateRoutes';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'auth/login',
        Component: Login,
      },
    ],
  },
  {
    path: '/admin',
    Component: checkAuth(DashboardLayout, [Role.ADMIN]),
    children: [...generateRoutes(adminNavItems)],
  },
]);
