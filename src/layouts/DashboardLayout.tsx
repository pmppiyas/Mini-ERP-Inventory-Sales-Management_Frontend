import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ProfileBadge from '@/modules/auth/ProfileBadge';
import Navbar from '@/modules/shared/Navbar';
import { DashboardProvider } from '@/provider/dashboard.provider';
import { getNavItems } from '@/utils/getNavItems';
import { getRolebasedLinks } from '@/utils/getRolebaseLinks';
import {
  Bell,
  Calculator,
  ClipboardCheck,
  Download,
  Menu,
  Printer,
  QrCode,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const DashboardLayoutContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const location = useLocation();
  const { me } = useAuth();
  const userRole = me?.data?.role;
  const navItems = getNavItems(userRole);

  const quickActions = [
    {
      label: 'Generate QR',
      path: '/qr-generator',
      icon: QrCode,
      color: 'bg-purple-500',
    },
    {
      label: 'Price Calculator',
      path: '/price-calculator',
      icon: Calculator,
      color: 'bg-green-500',
    },
    {
      label: 'Print Labels',
      path: '/print-labels',
      icon: Printer,
      color: 'bg-orange-500',
    },
    {
      label: 'Export Data',
      path: '/export',
      icon: Download,
      color: 'bg-cyan-500',
    },
    {
      label: 'Stock Alerts',
      path: '/stock-alerts',
      icon: Bell,
      color: 'bg-red-500',
    },
    {
      label: 'Stock Audit',
      path: '/stock-audit',
      icon: ClipboardCheck,
      color: 'bg-emerald-500',
    },
  ];

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location]);

  const renderSidebarItem = (item: any) => {
    const route = getRolebasedLinks(userRole);
    const fullPath = item.path ? `${route}/${item.path}` : route;
    const isActive = activeSection === fullPath;

    return (
      <Link
        to={fullPath}
        key={item.id}
        onClick={() => setSidebarOpen(false)}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          <span className="truncate">{item.label}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-card border-r transform transition-transform duration-300 ease-in-out
            flex flex-col
            lg:translate-x-0 lg:static lg:inset-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* User Profile Section */}
          <ProfileBadge me={me.data} />

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navItems.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                  {section.section}
                </h3>
                <div className="space-y-1">
                  {section?.items?.map(renderSidebarItem)}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t bg-muted/30">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-16 p-2"
                >
                  <div className={`p-1 w-max rounded ${action.color}`}>
                    <action.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-card border-b flex items-center justify-between px-6 gap-4">
            <div className="flex items-center md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Pass all controls via context */}
          <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
            <Outlet />
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <DashboardLayoutContent />
    </DashboardProvider>
  );
};

export default DashboardLayout;
