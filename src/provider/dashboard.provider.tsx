import { DashboardContext } from '@/context/dashboard.context';
import { useState, type ReactNode } from 'react';

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [geoLocation, setGeoLocation] = useState<Location | null>(null);

  return (
    <DashboardContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,
        sidebarOpen,
        setSidebarOpen,
        geoLocation,
        setGeoLocation,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
