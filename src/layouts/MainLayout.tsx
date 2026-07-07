import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="container max-w-[360] mx-auto min-h-[calc(100vh-70px)]">
      {children}
    </div>
  );
}
