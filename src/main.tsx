import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { router } from '@/routes/routes.ts';
import { Toaster } from '@/components/ui/sonner';
import { store } from '@/redux/store';
import { AuthProvider } from '@/provider/auth.provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>
);
