import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import type { TRole } from '@/interfaces/user.interface';

export function checkAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles: TRole[]
) {
  return function (props: P): JSX.Element {
    const { me, isLoading, isError } = useAuth();
    const location = useLocation();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (!me || !requiredRoles.includes(me.data.role)) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
}
