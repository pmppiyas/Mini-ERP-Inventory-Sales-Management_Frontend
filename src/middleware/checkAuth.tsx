import React, { type JSX } from 'react';

import { useAuth } from '@/hooks/useAuth';
import type { TRole } from '@/interfaces/user.interface';
import { Navigate } from 'react-router-dom';

export function checkAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles: TRole[]
) {
  return function (props: P): JSX.Element {
    const { me, isLoading, isError } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <Navigate to="/auth/login" replace />;
    }

    if (!me || !requiredRoles.includes(me.data.role)) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
}
