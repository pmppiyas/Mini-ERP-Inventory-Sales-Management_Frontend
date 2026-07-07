import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { router } from '@/routes/routes.ts';
import { Toaster } from '@/components/ui/sonner';
import { store } from '@/redux/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>
);
