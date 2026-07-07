import App from '@/App';
import Login from '@/modules/auth/Login';
import Home from '@/modules/Home/Home';
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
]);
