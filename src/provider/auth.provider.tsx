import { AuthContext } from '@/context/auth.context';

import { useGetMeQuery } from '@/redux/features/auth/auth.api';
import { type ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: me, isLoading, isError, refetch } = useGetMeQuery(undefined);

  return (
    <AuthContext.Provider
      value={{
        me: me ?? null,
        isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
