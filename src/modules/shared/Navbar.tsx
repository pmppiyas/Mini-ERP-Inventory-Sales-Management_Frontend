import { Menu } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from '@/modules/shared/Logo';
import { useLogoutMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/redux/baseApi';

const navLinks = [
  { title: 'Dashboard', url: '/admin' },
  { title: 'Products', url: '/admin/products' },
  { title: 'Sales', url: '/admin/sales' },
  { title: 'Reports', url: '/admin/reports' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { me } = useAuth();

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
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="container mx-auto lg:px-5">
        {/* Desktop */}
        <nav className="hidden h-14 lg:flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo />

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {me?.data?.email ? (
              <>
                <div className="flex items-center gap-1 text-sm border border-border rounded-lg px-3 py-1">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[9px] font-bold">
                    {me?.data?.name[0]}
                  </div>
                  <span className="font-medium text-foreground">
                    {me?.data?.name}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {me?.data?.role}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex h-14 items-center justify-between lg:hidden">
          <Logo />

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 mt-4">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border flex flex-col gap-2">
                {me?.data?.email ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth/login">Login</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
