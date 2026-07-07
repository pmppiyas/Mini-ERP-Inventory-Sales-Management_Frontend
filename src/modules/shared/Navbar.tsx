import { Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { title: 'Dashboard', url: '/admin' },
  { title: 'Products',  url: '/admin/products' },
  { title: 'Sales',     url: '/admin/sales' },
  { title: 'Reports',   url: '/admin/reports' },
];

export default function Navbar() {
  const isLoggedIn = true;
  const user = { name: 'Admin', role: 'Admin' };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="container mx-auto px-5">

        {/* Desktop */}
        <nav className="hidden h-14 lg:flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="font-bold text-foreground text-base">Mini ERP</span>
          </Link>

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
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[9px] font-bold">
                    {user.name[0]}
                  </div>
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {user.role}
                  </span>
                </div>
                <Button variant="outline" size="sm">Logout</Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex h-14 items-center justify-between lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="font-bold text-foreground text-base">Mini ERP</span>
          </Link>

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
                {isLoggedIn ? (
                  <Button variant="outline" className="w-full">Logout</Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/auth/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
