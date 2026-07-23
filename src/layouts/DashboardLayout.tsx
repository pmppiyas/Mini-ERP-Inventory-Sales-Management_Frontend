import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/modules/shared/Logo';
import { DashboardProvider } from '@/provider/dashboard.provider';
import { baseApi } from '@/redux/baseApi';
import { useLogoutMutation } from '@/redux/features/auth/auth.api';
import { getNavItems } from '@/utils/getNavItems';
import { getRolebasedLinks } from '@/utils/getRolebaseLinks';
import {
  Bell,
  Calculator,
  ChevronRight,
  ClipboardCheck,
  Download,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const quickActions = [
  {
    label: 'Calculator',
    path: '/price-calculator',
    icon: Calculator,
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    label: 'Export',
    path: '/export',
    icon: Download,
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    label: 'Audit',
    path: '/stock-audit',
    icon: ClipboardCheck,
    color: 'text-green-500 bg-green-500/10',
  },
];

const DashboardLayoutContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const location = useLocation();
  const { me } = useAuth();
  const userRole = me?.data?.role;
  const navItems = getNavItems(userRole);

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location]);

  const renderSidebarItem = (item: any) => {
    const route = getRolebasedLinks(userRole);
    const fullPath = item.path ? `${route}/${item.path}` : route;
    const isActive = activeSection === fullPath;
    const Icon = item.icon;

    return (
      <Link
        to={fullPath}
        key={item.id}
        onClick={() => setSidebarOpen(false)}
        className="relative block"
      >
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            isActive
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-foreground rounded-r-full opacity-60" />
          )}
          <Icon className="h-4 w-4 shrink-0" />
          <span className="truncate flex-1">{item.label}</span>
          {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
        </div>
      </Link>
    );
  };

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(baseApi.util.resetApiState());
      navigate('/', { replace: true });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="container max-w-360 mx-auto min-h-[calc(100vh-70px)] flex h-screen overflow-hidden bg-muted/30">
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col
          bg-card border-r border-border
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border">
          <Logo />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navItems.map((section: any) => (
            <div key={section.section}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
                {section.section}
              </p>
              <div className="space-y-0.5">
                {section?.items?.map(renderSidebarItem)}
              </div>
            </div>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="px-4 py-4 border-t border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Quick Actions
          </p>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-muted hover:bg-accent transition-all duration-200 group"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${action.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 pb-5">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            onClick={() => handleLogout()}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm">
              <span className="text-foreground font-medium capitalize">
                {location.pathname.split('/').pop() || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-2">
            {/* Notification */}
            <button className="relative h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              {/* <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" /> */}
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-border">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                {me?.data?.name?.slice(0, 1)?.toUpperCase() || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-foreground leading-none">
                  {me?.data?.name || 'Admin'}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
                  {me?.data?.role || 'Administrator'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const DashboardLayout = () => (
  <DashboardProvider>
    <DashboardLayoutContent />
  </DashboardProvider>
);

export default DashboardLayout;
